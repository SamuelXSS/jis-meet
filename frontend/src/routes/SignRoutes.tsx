import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Landing';
import SecretForm from '../pages/SecretForm'
import SecretArchive from '../pages/SecretArchive'

const SignRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/contar-segredo" component={SecretForm} />
      <Route path="/arquivo-segredos" component={SecretArchive} />
    </BrowserRouter>
  );
};

export default SignRoutes;