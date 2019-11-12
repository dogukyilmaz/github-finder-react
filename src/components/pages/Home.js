import React, { Fragment } from 'react';
import Search from '../users/Search';
import Alert from '../layout/Alert';
import Users from '../users/Users';

const Home = () => {
  return (
    <Fragment >
      <Alert />
      <Search />
      <Users />
    </Fragment>
  )
}

export default Home;
