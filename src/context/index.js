import React from 'react';
import cookies from 'js-cookie';

export default React.createContext(cookies.get().userName);
