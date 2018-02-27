import * as t from 'babel-types'

const jsxAttrib = (key, value) =>
  t.JSXAttribute(
    t.JSXIdentifier(key),
    t.JSXExpressionContainer(value)
  )

const memberExpr = (left, right) =>
  t.memberExpression(
    t.Identifier(left),
    t.Identifier(right)
  )

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
  const connectedValue = getConnectedValue(node.value, t)

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
}

function handleFirebaseMount (path) {
  const { node } = path
  const mountObject = getConnectedValue(node.value)
  console.log(mountObject)

  const valueNode = jsxAttrib(
    'value',
    memberExpr('data', mountObject.property)
  )

  const onChangeNode = jsxAttrib(
    'onChange',
    t.CallExpression(
      t.MemberExpression(
        t.ThisExpression(),
        t.Identifier('handleFirebaseDocChange')
      ),
      [t.stringLiteral(mountObject.property)]
    )
  )

  path.replaceWithMultiple([valueNode, onChangeNode])
}

const visitor = {
  JSXAttribute (path) {
    const hasKey = (node, key) => t.isJSXIdentifier(node.name, { name: key })

    const { node } = path

    if (hasKey(node, 'connect-to')) {
      handleConnectTo(path)
    }
    if (hasKey(node, 'firebase-mount')) {
      handleFirebaseMount(path)
    }
  }
}

export default visitor
