import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SecretArchive from '../pages/SecretArchive';
import SecretForm from '../pages/SecretForm';
import Landing from '../pages/Landing';
import JisMeet from '../pages/JisMeet';
import Profile from '../pages/Profile';


const AuthRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/contar-segredo" component={SecretForm} />
            <Route path="/arquivo-segredos" component={SecretArchive} />
            <Route path="/jis-meet" component={JisMeet} />
            <Route path="/perfil" component={Profile} />
        </BrowserRouter>
    );
};

export default AuthRoutes;