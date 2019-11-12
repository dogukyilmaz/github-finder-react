import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

let githubClientID;
let githubClientSECRET;

if(process.env.NODE_ENV !== "production"){
  githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
else{
  githubClientID = process.env.GITHUB_CLIENT_ID;
  githubClientSECRET = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Github Users
  const searchUsers = async inputText => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${inputText}&client_id=${githubClientID}&client_secret=${githubClientSECRET}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  };

  // Get Github User Page
  const getUsers = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientID}&client_secret=${githubClientSECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  };

  // Get User's Repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS })
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      getUsers,
      clearUsers,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>

}

export default GithubState;