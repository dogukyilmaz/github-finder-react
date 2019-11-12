import React, { useContext } from 'react';
import AlertContext from "../../context/alert/alertContext";

export const Alert = () => {
  const alertContext = useContext(AlertContext);
  const {alert, removeAlert} = alertContext;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg} <i
            className='fas fa-times text-right'
              style={{verticalAlign: "middle",fontSize: 25, cursor: 'pointer' }}
            onClick={removeAlert}
          ></i>
      </div>
    )
  );
};

export default Alert;
