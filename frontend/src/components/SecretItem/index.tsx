import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/auth'

import './styles.css'

export interface Secret {
    name: string
    secret: string
    id: number
    like: number
    comment: number
    color1: string
    color2: string
    text_color: string
}

interface SecretItemProps {
    secret: Secret
}

const SecretItem: React.FC<SecretItemProps> = ({ secret }) => {
    const context = useAuth();
    const { signed, user} = context
    
    return (
        <article key={secret.id} className="secret-item">
            <header style={{
                backgroundImage: `linear-gradient(${secret.color1},${secret.color2})`,
                borderImage: `linear-gradient(${secret.color1},${secret.color2})`
            }}>
                <div style={{color: secret.text_color}}>
                    {signed ? user?.name : secret.name}
                </div>
            </header>
    
            <div className="content" style={{ backgroundColor: secret.color2 }}>
                <p className="secret-content" style={{color: secret.text_color}}>
                    {secret.secret}
                </p>
            </div>
    
            <footer style={{ backgroundImage: `linear-gradient(${secret.color2},${secret.color1})` }}>
                <p>
                    <FontAwesomeIcon className="likeBtn" icon={faHeart} />
                    <small> {secret.like} 0</small>
                </p>
                <p>
                    <FontAwesomeIcon className="commentBtn" icon={faComment} />
                    <small> {secret.comment} 0</small>
                </p>
            </footer>
        </article>
    )
}

export default SecretItem