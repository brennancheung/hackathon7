import * as t from 'babel-types'
import template from 'babel-template'

const jsxAttrib = (key, value) =>
  t.JSXAttribute(
    t.JSXIdentifier(key),
    t.JSXExpressionContainer(value)
  )

/*
const memberExpr = (left, right) =>
  t.memberExpression(
    t.Identifier(left),
    t.Identifier(right)
  )
*/

function getConnectedValue (node) {
  if (t.isIdentifier(node)) {
    return node.name
  }
  if (t.isJSXExpressionContainer(node)) {
    return getConnectedValue(node.expression)
  }
  if (t.isLiteral(node)) {
    return node.value
  }
  if (t.isObjectExpression(node)) {
    return node.properties.reduce((accum, prop) => {
      if (t.isObjectProperty(prop)) {
        const key = prop.key.name
        const value = prop.value.value
        accum[key] = value
      }
      return accum
    }, {})
  }
  return node
}

function handleConnectTo (path) {
  const { node } = path
  const connectedValue = getConnectedValue(node.value)

  const valueNode = jsxAttrib(
    'value',
    t.Identifier(connectedValue)
  )

  const onChangeNode = jsxAttrib(
    'onChange',
    t.CallExpression(
      t.MemberExpression(
        t.ThisExpression(),
        t.Identifier('handleConnectedChange')
      ),
      [t.stringLiteral(connectedValue)]
    )
  )

  path.replaceWithMultiple([valueNode, onChangeNode])

  // check to see if handleConnectChange exists already
  const classBodyPath = path.findParent(path => path.isClassBody())
  const bodyContainer = classBodyPath.get('body')
  const classProperties = bodyContainer.filter(path => path.isClassProperty())
  const handleConnectedChange = classProperties.find(path => path.node.key.name === 'handleConnectedChange')
  if (!handleConnectedChange) {
    // insert the handler
    const connectAst = template(`handleConnectedChange = key => value => dispatch => { dispatch({ type: 'SET_VALUE', payload: { key, value } }) }`)({})
    const arrowFunctionExpression = connectAst.expression.right
    const handleConnectedProp = t.classProperty(
      t.identifier('handleConnectedChange'),
      arrowFunctionExpression
    )
    classBodyPath.unshiftContainer('body', handleConnectedProp)
  }

  // check to see if we already import react-redux
  const programPath = path.findParent(path => path.isProgram())
  const programBodyContainer = programPath.get('body')
  console.log(programBodyContainer)
  const importDeclarations = programBodyContainer.filter(path => path.isImportDeclaration())
  const reactReduxImport = importDeclarations.find(path => path.node.source.value === 'react-redux')
  if (!reactReduxImport) {
    // insert the connect import
    const connectImportNode = t.importDeclaration(
      [
        t.importSpecifier(
          t.identifier('connect'),
          t.identifier('connect'),
        )
      ],
      t.StringLiteral('react-redux')
    )
    programPath.unshiftContainer('body', connectImportNode)
  }
}

const visitor = {
  JSXAttribute (path) {
    const hasKey = (node, key) => t.isJSXIdentifier(node.name, { name: key })

    const { node } = path

    if (hasKey(node, 'connect-to')) {
      handleConnectTo(path)
    }
  }
}

export default visitor
