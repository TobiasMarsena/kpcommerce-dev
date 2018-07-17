import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Main from './Main'
import Login from './login/FormGrid'
import FormForgot from './login/FormForgot'
import FormReset from './login/FormReset'
import CheckMail from './login/CheckMail'
import Carousel from './Carousel'
import Browse from './Browse'
import Footer from './Footer'
import Profile from './profile/Profile'
import Edit from './profile/Edit'
import Payment from './payment/Payment'
import Success from './payment/Success'
import Unfinished from './payment/Unfinished'
import Failed from './payment/Failed'
import Media from './instagram/InstagramMedia'
import Subscription from './youtube/Subscription'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Carousel} />
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/check-mail" component={CheckMail} />
            <Route exact path="/forgot" component={FormForgot} />
            <Route path="/reset/:token" component={FormReset} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/edit" component={Edit} />
            <Route exact path="/media" component={Media} />
            <Route exact path="/subscriptions" component={Subscription} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/payment/success" component={Success} />
            <Route exact path="/payment/unfinished" component={Unfinished} />
            <Route exact path="/payment/failed" component={Failed} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
