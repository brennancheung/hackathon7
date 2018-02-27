import React from 'react'
import CodeEditor from './CodeEditor'

const DiffViewer = ({ value, onChange }) => (
  <CodeEditor
    value={value}
    onChange={onChange}
    title="Diff Viewer"
  />
)

export default DiffViewer
