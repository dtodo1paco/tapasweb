import React from 'react';
import './styles.css';

const Loading = props => (
  <React.Fragment>
  { props.message && <h3>{props.message}</h3>}
  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  </React.Fragment>
)

export default Loading;