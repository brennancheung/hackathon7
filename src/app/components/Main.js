import React from 'react'
import SourceCodeEditor from './SourceCodeEditor'
import ASTViewer from './ASTViewer'
import GeneratedCodeViewer from './GeneratedCodeViewer'
import YAML from 'js-yaml'

import * as babylon from 'babylon'
import generate from 'babel-generator'
import traverse from 'babel-traverse'
import visitor from '../visitor'

import cleanAst from '../util/cleanAst'
import defaultSourceCode from '../defaultSourceCode'

class Main extends React.Component {
  state = {
    sourceCode: defaultSourceCode,
    ast: '',
    astObject: {},
    generatedCode: '',
    showAst: false,
  }

  componentDidMount () {
    this.handleSourceCodeChange(this.state.sourceCode)
  }

  handleSourceCodeChange = value => {
    try {
      this.setState({ sourceCode: value })

      // Parsing
      const ast = babylon.parse(value, {
        sourceType: 'module',
        plugins: ['jsx']
      })

      if (ast) {
        this.setState({ astObject: ast })

        // Clean up AST
        const simplified = cleanAst(ast)
        const astYaml = YAML.dump(simplified)
        this.setState({ ast: astYaml })

        traverse(ast, visitor)

        // Generated code
        const generateOptions = { concise: false, minified: false }
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
    const { showAst } = this.state

    return (
      <div className="columns">
        <SourceCodeEditor
          value={this.state.sourceCode}
          onChange={this.handleSourceCodeChange}
        />
        {showAst && <ASTViewer value={this.state.ast} />}
        <GeneratedCodeViewer value={this.state.generatedCode} />
      </div>
    )
  }
}

export default Main
