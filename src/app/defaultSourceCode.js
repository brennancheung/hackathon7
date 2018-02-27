const defaultSourceCode =
`import React from 'react'

class MainApp extends React.Component {
  render () {
    const { email, password } = this.props

    return (
      <div>
        <input type="text" connect-to={email} />
        <input type="password" connect-to={password} />
        <button>Log in</button>
      </div>
    )
  }
}

export default MainApp`

let override

override =
`function foo () {
  // @field
  let num = 123

  return num
}`

override = null

export default override || defaultSourceCode
