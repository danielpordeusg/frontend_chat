import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(18);

  return (
    <AppContext.Provider
      value={ { userEmail, setUserEmail, userId, setUserId} }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
