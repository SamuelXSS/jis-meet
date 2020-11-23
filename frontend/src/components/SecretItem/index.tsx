import React from 'react'
import api from '../../services/api'

import './styles.css'

export interface Secret {
    name: string
    secret: string
    id: number
    like: number
    comment: number
}

interface SecretItemProps {
    secret: Secret
}

const SecretItem: React.FC<SecretItemProps> = ({ secret }) => {
    function createNewConnection() {
        api.post('/connections', {
            user_id: secret.id
        })
    }
    
    return (
        <article className="secret-item">
            <header>
                <div>
                    <strong>{secret.name} </strong>
                    <span style={{fontSize: 10}}>Anônimo</span>
                </div>
            </header>
    
            <p className="content">
                {secret.secret}
            </p>
    
            <footer>
                <p>
                    Likes
                    <strong> {secret.like}</strong>
                </p>
                <p>
                    Comentários
                    <strong> {secret.comment}</strong>
                </p>
            </footer>
        </article>
    )
}

export default SecretItem