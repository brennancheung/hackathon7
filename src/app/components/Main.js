import React from 'react'
import SourceCodeEditor from './SourceCodeEditor'
import ASTViewer from './ASTViewer'
import GeneratedCodeViewer from './GeneratedCodeViewer'
import YAML from 'js-yaml'

import * as babylon from 'babylon'
import generate from 'babel-generator'

import cleanAst from '../util/cleanAst'
import defaultSourceCode from '../defaultSourceCode'

class Main extends React.Component {
  state = {
    sourceCode: defaultSourceCode,
    ast: '',
    astObject: {},
    generatedCode: '',
  }

  componentDidMount () {
    this.handleSourceCodeChange(this.state.sourceCode)
  }

  handleSourceCodeChange = value => {
    try {
      this.setState({ sourceCode: value })

      const ast = babylon.parse(value, {
        sourceType: 'module',
        plugins: ['jsx']
      })

      if (ast) {
        this.setState({ astObject: ast })
        const simplified = cleanAst(ast)
        // const astJson = JSON.stringify(simplified, null, 4)
        const astYaml = YAML.dump(simplified)
        this.setState({ ast: astYaml })
        const generateOptions = {}
        const generatedCode = generate(ast, generateOptions)
        if (generatedCode) {
          this.setState({ generatedCode: generatedCode.code })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (
      <div className="columns">
        <SourceCodeEditor
          value={this.state.sourceCode}
          onChange={this.handleSourceCodeChange}
        />
        <ASTViewer value={this.state.ast} />
        <GeneratedCodeViewer value={this.state.generatedCode} />
      </div>
    )
  }
}

export default Main
