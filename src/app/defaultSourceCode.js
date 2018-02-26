const defaultSourceCode =
`import React from 'react'

class MainApp extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello World!</h1>
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

export default override || defaultSourceCode
