import React, { Fragment } from 'react';
const About = () => {
  // useEffect(() => {
  //   let title = 'About';
  //   document.title = title;
  //   // eslint-disable-next-line
  // }, []);
  return (
    <Fragment>
      <h1>About this App</h1>
      <p>App to Search Github Users</p>
      <p>Version: 1.0.0</p>
      <p>A learning based basic app... </p>
    </Fragment>
  );
};

export default About;
