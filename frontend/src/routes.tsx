import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import SecretForm from './pages/SecretForm'
import SecretArchive from './pages/SecretArchive'

function Routes() {
    return (
        <BrowserRouter>
            <Route  path="/" exact component={Landing} />
            <Route  path="/contar-segredo" component={SecretForm} />
            <Route  path="/arquivo-segredos" component={SecretArchive} />
        </BrowserRouter>
    )
}

export default Routes