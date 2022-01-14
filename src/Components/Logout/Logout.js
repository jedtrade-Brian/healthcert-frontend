import  { Component } from "react";
import authService from '../../services/authService'
import {withRouter} from 'react-router-dom'

class Logout extends Component {
  componentWillMount() {
      authService.logout()
      if(this.props && this.props.match && this.props.match.path === '/logout'){
        this.props.history.push('login')
      }
      if(this.props && this.props.match && this.props.match.path === '/logoutFinancial'){
        this.props.history.push('loginFinancier')
      }
  }
  render() {
    return null
  }
}

export default withRouter(Logout);
