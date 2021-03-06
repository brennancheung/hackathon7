const defaultSourceCode =
`import React from 'react';

class MainApp extends React.Component {
  render() {
    const {
      someProp
    } = this.props;

    return <div>
      <input type="text" disable-connect-to={username} />
      <input type="text" disable-connect-to={displayName} />
      <input type="text" disable-connect-to={hometown} />
      <input type="text" disable-connect-to={phoneNumber} />
      <button>Update</button>
    </div>;
  }
}

export default MainApp;`

let override

override =
`function foo () {
  // @field
  let num = 123

  return num
}`

override = null

export default override || defaultSourceCode
