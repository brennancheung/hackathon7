import React from 'react'
import CodeEditor from './CodeEditor'

const ASTViewer = ({ value, onChange }) => (
  <CodeEditor
    value={value}
    onChange={onChange}
    title="Abstract Syntax Tree (AST)"
  />
)

export default ASTViewer
