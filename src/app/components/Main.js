/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps (state, ownProps) {
  return {
  }
}

@connect(mapStateToProps)
class Main extends React.Component {
  render () {
    return (
      <div>
        <h1>TODO</h1>
      </div>
    )
  }
}

export default Main
