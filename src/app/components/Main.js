import React from 'react'
import SourceCodeEditor from './SourceCodeEditor'
import ASTViewer from './ASTViewer'
import GeneratedCodeViewer from './GeneratedCodeViewer'
import DiffViewer from './DiffViewer'
import YAML from 'js-yaml'
import * as JSDiff from 'diff'

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
    patch: '',
    showAst: true,
    showDiff: true,
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
        plugins: ['jsx', 'classProperties', 'objectRestSpread', 'transformDecoratorsLegacy']
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
        const generatedCode = generate(ast, generateOptions).code
        if (generatedCode) {
          this.setState({ generatedCode: generatedCode })
          const patch = JSDiff.createTwoFilesPatch('original', 'new', value, generatedCode)
          this.setState({ patch })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const { showAst, showDiff } = this.state

    return (
      <div className="columns">
        <SourceCodeEditor
          value={this.state.sourceCode}
          onChange={this.handleSourceCodeChange}
        />
        <GeneratedCodeViewer value={this.state.generatedCode} />
        {showDiff && <DiffViewer value={this.state.patch} />}
        {showAst && <ASTViewer value={this.state.ast} />}
      </div>
    )
  }
}

export default Main
