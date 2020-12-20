import React, { useState } from 'react'

import SecretItem, { Secret } from '../../components/SecretItem'
import { PageHeader } from '../../components'

import api from '../../services/api'

import './styles.css'
import bg from '../../assets/images/bg-secret.png'

function SecretArchive() {
    const [secrets, setSecrets] = useState([])
    
    
    async function getSecrets() {
        const response = await api.get('/secret')

        setSecrets(response.data)
        console.log(response.data)
    }

    return (
        <div id="page-secret-archive" onLoad={() => {getSecrets()}} className="container">
            <PageHeader
                image={bg}
                title="Olá! Aqui você econtrará todo tipo de conteúdo, tenha cuidado!"
            />

            <main>
                {secrets.map((secret: Secret) => {
                    return <div key={secret.id} className="secret-card"><SecretItem secret={secret} /></div>
                })}
            </main>
        </div>
    )
}

export default SecretArchive