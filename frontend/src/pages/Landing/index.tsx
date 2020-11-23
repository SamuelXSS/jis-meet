import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import landingImg from '../../assets/images/bg.png'

import secretIcon from '../../assets/images/icons/secret.svg'
import secretFileIcon from '../../assets/images/icons/secret-file.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api'

import './styles.css'

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('/connections')
            .then(res => {
                const { total } = res.data
                
                setTotalConnections(total)
            })
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="DocMeet" />
                    <h2>Conecte-se e interaja anonimamente entre amigos da Jis :D</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Conecte-se e interaja anonimamente entre amigos da Jis"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/contar-segredo" className="search-doctors">
                        <img src={secretIcon} alt="Conte Segredos" />
                        Conte segredos
                    </Link>

                    <Link to="/arquivo-segredos" className="give-appointment">
                        <img  src={secretFileIcon} alt="Arquivo de segredos" />
                        Arquivo
                    </Link>
                </div>
                <span className="total-connections">
                    Total de  {totalConnections}  segredos já contados
                    <img src={purpleHeartIcon} alt="Coração Roxo" />
                </span>

            </div>
        </div>
    )
}

export default Landing