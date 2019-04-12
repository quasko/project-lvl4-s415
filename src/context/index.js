import React from 'react';
import cookies from 'js-cookie';
import faker from 'faker';

if (!cookies.get().userName) {
  cookies.set('userName', faker.name.firstName());
}
export default React.createContext(cookies.get().userName);
