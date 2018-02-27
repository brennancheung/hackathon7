import { connect } from "react-redux";
import React from 'react';

const mapState = state => ({
  username: state.username,
  displayName: state.displayName,
  hometown: state.hometown,
  phoneNumber: state.phoneNumber
});

class MainApp extends React.Component {
  handleConnectedChange = key => value => dispatch => {
    dispatch({
      type: 'SET_VALUE',
      payload: {
        key,
        value
      }
    });
  };

  render() {
    const {
      someProp,
      username,
      displayName,
      hometown,
      phoneNumber
    } = this.props;

    return <div>
      <input type="text" value={username} onChange={this.handleConnectedChange("username")} />
      <input type="text" value={displayName} onChange={this.handleConnectedChange("displayName")} />
      <input type="text" value={hometown} onChange={this.handleConnectedChange("hometown")} />
      <input type="text" value={phoneNumber} onChange={this.handleConnectedChange("phoneNumber")} />
      <button>Update</button>
    </div>;
  }
}

export default MainApp;
