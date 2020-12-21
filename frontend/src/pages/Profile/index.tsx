import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth';
import logoImg from '../../assets/images/logo.png'
import profileImg from '../../assets/images/tenor.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import api from '../../services/api'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';


import './style.css'

interface ChipData {
    id: number;
    name: string;
}

interface Interests {
    inputValue?: string;
    id: number;
    name: string;
}
const filter = createFilterOptions<Interests>();

const Profile: React.FC = () => {
    let lastId = 0

    const context = useAuth();
    const { user, Logout } = context
    const [value, setValue] = React.useState<Interests | null >(null);
    const [chipData, setChipData] = useState<ChipData[]>([]);
    const [interests, setInterests] = useState<Interests[]>([]);


    useEffect(() => {
        async function getInterests() {
            const res = await api.get(`/users/${user?.id}/interest`)
            setChipData(res.data)
        }
        async function getUserInterests() {
            const res = await api.get('/interests')
            const id = res.data[res.data.length -1 ].id
            lastId = id

            setInterests(Object.keys(res.data).map((key) => res.data[key]) as Interests[])
            
            console.log(interests.map(x => { return x }))
        }
        getInterests()
        getUserInterests()
    }, []);

    async function updateInterest(value: string) {
        await api.post(`/users/${user?.id}/interest`, {
            name: value
        })
            .then(res => { console.log(res) })
            .catch(err => { if (err.response) console.log(err.response.data) })
    }

    async function deleteInterest(value: number) {
        await api.delete(`/users/${user?.id}/interest/${value}`)
            .then(res => { console.log(res) })
            .catch(err => { if (err.response) console.log(err.response.data) })
    }

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id ));
        deleteInterest(chipToDelete.id)
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
                                    value={value}
                                    onChange={(event, newValue) => {
                                        if (typeof newValue === 'string') {
                                            setChipData([...chipData, {
                                                name: newValue,
                                                id: lastId + 1
                                            }]);
                                            updateInterest(newValue)
                                        } else if (newValue && newValue.inputValue) {
                                            setChipData([...chipData, {
                                                name: newValue.inputValue,
                                                id: lastId + 1
                                            }]);
                                            updateInterest(newValue.inputValue)
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        if (params.inputValue !== '') {
                                            filtered.push({
                                                inputValue: params.inputValue,
                                                name: `Adicionar "${params.inputValue}"`,
                                                id: lastId + 1
                                            });
                                        }
                                        return filtered;
                                    }}
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    id="free-solo-with-text-demo"
                                    options={interests}
                                    getOptionLabel={(option) => {
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        if (option.inputValue) {
                                            return option.inputValue;
                                        }
                                        return option.name;
                                    }}
                                    renderOption={(option) => option.name}
                                    style={{ width: 300 }}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" />
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