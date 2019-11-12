import React, { useContext } from 'react';
import { UserItem } from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from "../../context/github/githubContext"

export const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;
  const  data = Array.from(users);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        { data.map(user => (
          <UserItem key={user.id} user={user} />
        )) }
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
