import React from 'react';

class MainApp extends React.Component {
  render() {
    const {
      someProp
    } = this.props;

    return <div>
      <input type="text" connect-to={username} />
      <input type="text" connect-to={displayName} />
      <input type="text" connect-to={hometown} />
      <input type="text" connect-to={phoneNumber} />
      <button>Update</button>
    </div>;
  }
}

export default MainApp;
