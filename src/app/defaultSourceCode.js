const defaultSourceCode =
`import React from 'react';

const mapState = state => ({ foo: 'bar' });

class MainApp extends React.Component {
  render() {
    const { username } = this.props;

    return <div>
      <input type="text" connect-to={username} />
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
