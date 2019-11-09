import React from 'react';
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';

const Repos = ({ repos }) => {
  return repos.map((repo, index) => (
    <RepoItem repo={repo} key={repo.id} index={index} />
  ));
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;
