import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';

import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   //GITLAB
  //   // const res = await axios.get('http://gitlab.com/api/v4/users?username=douscriptist');
  //   this.setState({ users: res.data, loading: false });
  // }

  // Search Github Users
  handleSearch = async inputText => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${inputText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ users: res.data.items, loading: false });
    } catch (error) {
      this.setState({ users: [], loading: false });
      // console.clear();
    }
  };

  // Get Github User Page
  handleGetUser = async username => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ user: res.data, loading: false });
    } catch (error) {
      this.setState({ user: {}, loading: false });
      // console.clear();
    }
  };

  // Get User's Repos
  handleGetRepos = async username => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ repos: res.data, loading: false });
    } catch (error) {
      this.setState({ repos: {}, loading: false });
      // console.clear();
    }
  };

  // Clear Users
  handleClear = () => {
    this.setState({ users: [] });
  };

  // Set Alert
  handleAlert = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  // Remove Alert Button
  handleRemoveAlert = e => {
    this.setState({ alert: null });
  };

  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Alert
                      alert={this.state.alert}
                      removeAlert={this.handleRemoveAlert}
                    />
                    <Search
                      searchUsers={this.handleSearch}
                      clearUsers={this.handleClear}
                      showClearButton={users.length > 0 ? true : false}
                      setAlert={this.handleAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.handleGetUser}
                    user={user}
                    getRepos={this.handleGetRepos}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
