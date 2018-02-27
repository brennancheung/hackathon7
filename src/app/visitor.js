import * as t from 'babel-types'

function getConnectedValue (node) {
  if (t.isIdentifier(node)) {
    return node.name
  }
  if (t.isJSXExpressionContainer) {
    return getConnectedValue(node.expression)
  }
  return node
}

const visitor = {
  JSXAttribute (path) {
    const { node } = path
    if (t.isJSXIdentifier(node.name, { name: 'connect-to' })) {
      const connectedValue = getConnectedValue(node.value, t)

      const valueNode = t.JSXAttribute(
        t.JSXIdentifier('value'),
        t.JSXExpressionContainer(t.Identifier(connectedValue))
      )

      const onChangeNode = t.JSXAttribute(
        t.JSXIdentifier('onChange'),
        t.JSXExpressionContainer(
          t.CallExpression(
            t.MemberExpression(
              t.ThisExpression(),
              t.Identifier('handleConnectedChange')
            ),
            [t.stringLiteral(connectedValue)]
          ),
        )
      )

      path.replaceWithMultiple([valueNode, onChangeNode])
    }
  }
}

export default visitor
