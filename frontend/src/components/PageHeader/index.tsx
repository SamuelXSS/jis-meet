import React from 'react'

import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import backIcon from '../../assets/images/icons/back.svg'
import bg from '../../assets/images/bg.png'

import './styles.css'

interface PageHeaderProps {
    title: string;
    description?: string;
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
                <img src={bg} className="header-logo" />
                <strong style={{zIndex:999}}>{props.title}</strong>
                { props.description && <p style={{zIndex:999}}>{props.description}</p>}

                {props.children}
            </div>
        </header>
    )
}

export default PageHeader