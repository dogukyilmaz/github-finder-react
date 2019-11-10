import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';

import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github Users
  const handleSearch = async inputText => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${inputText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data.items);
      setLoading(false);
    } catch (error) {
      setUsers([]);
      setLoading(false);
      // console.clear();
    }
  };

  // Get Github User Page
  const handleGetUser = async username => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setUser({});
      setLoading(false);
      // console.clear();
    }
  };

  // Get User's Repos
  const handleGetRepos = async username => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setRepos(res.data);
      setLoading(false);
    } catch (error) {
      setRepos({});
      setLoading(false);
      // console.clear();
    }
  };

  // Clear Users
  const handleClear = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Alert
  const handleAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Remove Alert Button
  const handleRemoveAlert = e => {
    setAlert(null);
  };
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
                  <Alert alert={alert} removeAlert={handleRemoveAlert} />
                  <Search
                    searchUsers={handleSearch}
                    clearUsers={handleClear}
                    showClearButton={users.length > 0 ? true : false}
                    setAlert={handleAlert}
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
                  getUser={handleGetUser}
                  user={user}
                  getRepos={handleGetRepos}
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
};

export default App;
