import React from 'react';
import gon from 'gon';

const { channels } = gon;
const renderChannels = data => (
  <ul className="list-group">
    {data.map(({ id, name }) => (
      <li className="list-group-item" key={id}>
        <a href={`#${name}`}>{`#${name}`}</a>
      </li>
    ))}
  </ul>
);

const Channels = () => (
  <div className="col-3">
    {renderChannels(channels)}
  </div>
);

export default Channels;
