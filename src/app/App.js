import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Main from './components/Main'

import './app.css'

class App extends React.Component {
  render () {
    const theme = createMuiTheme({
      palette: {
        type: this.props.theme
      }
    })

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div id="main-container">
            <div id="main-content">
              <Switch>
                <Route path="/" component={Main} />
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
