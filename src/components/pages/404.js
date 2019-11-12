import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center">
      <h1> Ohh, 're u lost?</h1>
      <p className="lead">404 Not Found</p>
      <Link to="/">Find Your Way</Link>
    </div>
  )
}

export default NotFound;
