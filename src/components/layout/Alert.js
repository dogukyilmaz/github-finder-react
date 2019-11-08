import React from 'react';

export const Alert = ({ alert, removeAlert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
        <i
          className='fas fa-times text-right pad2'
          style={{ marginLeft: '70%', cursor: 'pointer' }}
          onClick={removeAlert}
        ></i>
      </div>
    )
  );
};

export default Alert;
