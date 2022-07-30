import './App.css'
import './colors.scss'
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UpdatePassword from './components/UpdatePassword'
import SignUp from './components/SignUp'
import UpdateSucess from './components/PasswordUpdateSucess'
import SignIn from './components/SignIn'
import Layout from './components/Layout'
import ForgotPassword from './components/ForgotPassword'
import PasswordReset from './components/PasswordReset'
import HowCanWeHelp from './components/HowCanWeHelp'
import EmailVerification from './components/EmailVerification'
import NPIDetails from './components/NPIDetails'
import Thankyou from './components/Thankyou'
import SubmittedSuccessfully from './components/SubmittedSuccessfully'
import ManualOnboardingMobile from './components/ManualOnboardingMobile'
import PatientDashboard from './components/PatientDashboard'
import PaymentFail from './components/PaymentFail'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Footer from './components/Footer'
import MyDetails from './components/MyDetails'
;<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
  rel="stylesheet"
></link>

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main" id="page-wrap">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <Switch>
                <Route path="/" component={SignIn} exact />
                <Route path="/SignIn" component={SignIn} />
                <Route path="/ForgotPassword" component={ForgotPassword} />
                <Route path="/PasswordReset" component={PasswordReset} />
                <Route path="/HowCanWeHelp" component={HowCanWeHelp} />
                <Route
                  path="/EmailVerification"
                  component={EmailVerification}
                />
                <Route path="/NPIDetails/:id/:status" component={NPIDetails} />
                <Route path="/UpdatePassword/:id" component={UpdatePassword} />
                <Route
                  path="/ManualOnboardingMobile/:code"
                  component={ManualOnboardingMobile}
                />
                <Route path="/Thankyou" component={Thankyou} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/UpdateSuccess" component={UpdateSucess} />
                <Route path="/PaymentFail" component={PaymentFail} />
                <Route path="/PatientDashboard" component={PatientDashboard} />
                <Route
                  path="/SubmittedSuccessfully"
                  component={SubmittedSuccessfully}
                />
                <Route path="/MyDetails2" component={MyDetails} />
                <Route path="/" component={Layout} />
              </Switch>
            </Container>
          </React.Fragment>
        </div>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App
