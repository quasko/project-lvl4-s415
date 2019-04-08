import React from 'react';

const Field = () => (
  <div className="input-group mb-3">
    <input type="text" className="form-control" placeholder="Enter message" />
    <div className="input-group-append">
      <button className="btn btn-outline-secondary" type="button" id="Send">Send</button>
    </div>
  </div>
);

export default Field;
