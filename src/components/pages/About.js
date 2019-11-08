import React, { Fragment, useEffect } from 'react';
const About = () => {
  useEffect(() => {
    let title = 'About';
    document.title = title;
  });
  return (
    <Fragment>
      <h1>About this App</h1>
      <p>App to Search Github Users</p>
      <p>Version: 1.0.0</p>
    </Fragment>
  );
};

export default About;
