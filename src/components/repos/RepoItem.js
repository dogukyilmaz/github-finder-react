import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo, index }) => {
  return (
    <div className='card'>
      <h3>
        <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
          <span className='mr3 text-success'>{index + 1} - </span>
          {repo.name}
        </a>
      </h3>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
