import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth';
import logoImg from '../../assets/images/logo.png'
import profileImg from '../../assets/images/tenor.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import api from '../../services/api'

import Autocomplete from '@material-ui/lab/Autocomplete';

import Chip from '@material-ui/core/Chip';

import './style.css'

interface ChipData {
    id: number;
    name: string;
}

interface Interests {
    id: number;
    name: string;
}

const Profile: React.FC = () => {
    const interests: any = []
    const allInterests: any = []

    const context = useAuth();
    const { user, Logout } = context
    const [ chipData, setChipData ] = useState<ChipData[]>(interests);
    const [ userInterests, setUserIntersts ] = useState<Interests[]>(allInterests);


    useEffect(() => {
        async function getInterests() {
            const res = await api.get(`/users/${user?.id}/interest`)
            setChipData(res.data)
        }
        async function getUserInterests() {
            const res = await api.get('/interests')
            setUserIntersts(res.data)
        }
        getInterests()
        getUserInterests()
    });

    async function updateInterest(value: string) {
        await api.post(`/users/${user?.id}/interest`, {
            name: value
        })
            .then(res => { console.log(res) })
            .catch(err => { if (err.response) console.log(err.response.data) })
    }

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    };

    async function handleLogout() {
        Logout()
    }

    return (
        <div id="page-profile">
            <header className="page-profile-header">
                <div className="top-bar-container">
                    <div>
                        <Link to="/">
                            <img src={backIcon} alt="Voltar" />
                        </Link>
                    </div>
                    <div className="loginContainer">
                        <img className="loginImg" src={logoImg} alt="Proffy" />
                    </div>
                </div>
            </header>
            <div id="page-profile-content" className="container">

                <div className="sidebar-container">
                    <div className="sidebar">
                        <div className="sidebar-header">
                            <div className="avatar">
                                <img className="profile-img" src={profileImg} alt="Perfil" />
                            </div>
                            <div style={{ fontWeight: 600, color: '#fff', marginTop: 5 }}>{user?.name}</div>
                            <div style={{ fontSize: 13 }}>20 anos</div>
                            <div style={{ fontSize: 13 }}>Segredos: {user?.secrets.quantity}</div>
                        </div>

                        <div className="divider"></div>

                        <div className="sidebar-content">
                            <div className="achievments">
                                Achievments
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="sidebar-footer">
                            <div className="menu-items">
                                <ul>
                                    <li onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faLock} /> Alterar Senha
                                    </li>
                                    <li onClick={handleLogout}>
                                        <Link className="removeLink" to='/'><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-box-container">
                    <div className="profile-box-1">
                        <div className="profile-header">
                            Perfil
                        </div>
                        <div className="profile-content">
                            <div className="profile-content-header">
                                Interesses:
                                <Autocomplete
                                    id="tags-standard"
                                    onInputChange={(event, newValue) => {
                                        setChipData([...chipData, { id: 3, name: newValue }])
                                        updateInterest(newValue)
                                    }}
                                    options={userInterests}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref}>
                                            <input type="text" {...params.inputProps} />
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="chip-content">
                                {chipData.map((data) => {
                                    return (
                                        <li key={data.id}>
                                            <Chip
                                                variant="outlined"
                                                style={{
                                                    color: '#fff',
                                                    borderColor: '#fff',
                                                    margin: 3,
                                                    height: 25,
                                                    fontWeight: 600,
                                                    fontSize: 13,
                                                }}
                                                label={data.name}
                                                onDelete={handleDelete(data)}
                                            />
                                        </li>
                                    )
                                })}
                            </div>
                            <div className="divider"></div>
                        </div>
                        <div className="profile-footer">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile