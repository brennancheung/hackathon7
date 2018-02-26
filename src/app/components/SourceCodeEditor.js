import React from 'react'
import CodeEditor from './CodeEditor'

const SourceCodeEditor = ({ value, onChange }) => (
  <CodeEditor
    value={value}
    onChange={onChange}
    title="Source Code"
  />
)

export default SourceCodeEditor
