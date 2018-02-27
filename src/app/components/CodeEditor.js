import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/mode/diff/diff'
import PropTypes from 'prop-types'

const options = {
  theme: 'ambiance',
  lineNumbers: true,
}

class CodeEditor extends React.Component {
  handleChange = (editor, data, value) => {
    this.props.onChange(value)
  }

  render () {
    const { title, value, className } = this.props
    return (
      <div className="editor-container full-height">
        <h1>{title}</h1>
        <CodeMirror
          className={className || 'full-height'}
          value={value}
          onBeforeChange={this.handleChange}
          options={options}
        />
      </div>
    )
  }
}

CodeEditor.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default CodeEditor
