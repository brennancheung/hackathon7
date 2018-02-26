const keysToRemove = ['loc', 'start', 'end']

function cleanAst (node) {
  if (node instanceof Array) {
    return node.map(cleanAst)
  }
  if (node instanceof Object) {
    return Object.entries(node).reduce((accum, [key, value]) => {
      if (keysToRemove.includes(key) || value === undefined) {
        return accum
      }
      if (value instanceof Object) {
        const cleaned = cleanAst(value)
        accum[key] = cleaned
      }
      accum[key] = cleanAst(value)
      return accum
    }, {})
  }
  return node
}

export default cleanAst
