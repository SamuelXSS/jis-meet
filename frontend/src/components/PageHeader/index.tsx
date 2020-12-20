import React from 'react'

import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

interface PageHeaderProps {
    title: string;
    description?: string;
    image: any;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong style={{zIndex:999}}>{props.title}</strong>
                { props.description && <p style={{zIndex:999}}>{props.description}</p>}

                <img src={props.image} className="header-logo" alt="Background" />
                {props.children}
            </div>
        </header>
    )
}

export default PageHeader