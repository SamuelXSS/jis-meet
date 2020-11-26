import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'

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
    
    return (
        <article className="secret-item">
            <header>
                <div>
                    <strong>{secret.name} </strong>
                    <span style={{fontSize: 10}}>Anônimo</span>
                </div>
            </header>
    
            <div className="content">
                <p className="secret-content">
                    {secret.secret}
                </p>
            </div>
    
            <footer>
                <p>
                    <FontAwesomeIcon className="likeBtn" icon={faHeart} />
                    <small> {secret.like} Em breve</small>
                </p>
                <p>
                    <FontAwesomeIcon className="commentBtn" icon={faComment} />
                    <small> {secret.comment} Em breve</small>
                </p>
            </footer>
        </article>
    )
}

export default SecretItem