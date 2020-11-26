import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth';
import logoImg from '../../assets/images/logo.png'
import profileImg from '../../assets/images/perfil.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Input } from '../../components'

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';

import './style.css'

interface ChipData {
    key: number;
    label: string;
}

const Profile: React.FC = () => {

    const context = useAuth();
    const { user, Logout } = context
    const [chipData, setChipData] = React.useState<ChipData[]>([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    async function handleLogout() {
        Logout()
    }

    return (
        <div id="page-landing">
            <header className="page-landing-header">
                <div className="top-bar-container">
                    <div>  </div>
                    <div className="loginContainer">
                        <img className="loginImg" src={logoImg} alt="Proffy" />
                    </div>
                </div>
            </header>
            <div id="page-landing-content" className="container">

                <div className="sidebar-container">
                    <div className="sidebar">
                        <div className="avatar-header">
                            <div className="avatar">
                                <img className="profile-img" src={profileImg} alt="Perfil" />
                                {user}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="menu-items">
                            <ul>
                                <li onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="profile-box-container">
                        <div className="profile-box-1">
                            <div className="profile-header">
                                Perfil
                        </div>
                            <div className="profile-content">
                                Interesses:
                                    {/* <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        defaultValue={[top100Films[13]]}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Multiple values"
                                                placeholder="Favorites"
                                            />
                                        )}
                                    /> */}
                                <div className="chip-content">
                                    {chipData.map((data) => {
                                        return (
                                            <li key={data.key}>
                                                <Chip
                                                    variant="outlined"
                                                    style={{ color: '#fff', borderColor: '#fff', margin: 3, height: 25, fontWeight: 600 }}
                                                    label={data.label}
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
        </div>
    )
}

export default Profile