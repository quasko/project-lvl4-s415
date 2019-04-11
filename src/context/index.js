import React from 'react';
import faker from 'faker';

const userName = faker.name.firstName();

export default React.createContext(userName);
