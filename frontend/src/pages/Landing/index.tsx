import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/auth';
import { NotificationContainer } from 'react-notifications';

import logoImg from '../../assets/images/logo.png'
import landingImg from '../../assets/images/bg.png'

import { secret, secretFile, purpleHeart, jisMeet } from '../../assets/images/icons/index'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from '../../components'

import { io } from 'socket.io-client'

import api from '../../services/api'
import './styles.css'

const socket = io('http://localhost:3000')

const Landing: React.FC = () => {
    const [ totalConnections, setTotalConnections ] = useState(0)
    const [ name, setName ] = React.useState('')
    const [ userR, setUser ] = React.useState('')
    const [ pass, setPass ] = React.useState('')
    const [ repass, setRepass ] = React.useState('')
    const [ open, setOpen ] = React.useState(false);

    const [ openLogin, setOpenLogin ] = React.useState(false);
    const [ userLogin, setUserLogin ] = React.useState('')
    const [ passLogin, setPassLogin ] = React.useState('')
    
    const context = useAuth();
    const { signed, user } = context

    useEffect(() => {
        async function getSecrets(){
            await api.get('/secrets')
            .then(res => {
                const total = res.data
                console.log(res.data)
                setTotalConnections(total)
            })
        }
        getSecrets()
    })

    const handleClickOpen = (modal: string) => {
        if (modal === 'register') setOpen(true);
        else if (modal === 'login') setOpenLogin(true);
    };
    const handleClose = (modal: string) => {
        if (modal === 'register') setOpen(false)
        else if (modal === 'login') setOpenLogin(false)
    };

    function handleLogin() {
        context.Login(userLogin, passLogin)
        setOpenLogin(false)
    }
    const handleKeyPress = (event:any) => {
        if(event.key === 'Enter'){
          handleLogin()
        }
      }

    async function Register() {
        const user = {
            name: name,
            username: userR,
            pass: pass
        }
        context.Register(user)
    }

    return (
        <div id="page-landing">
            <header className="page-landing-header">
                <div className="top-bar-container">
                    <div>  </div>
                    <div className="loginContainer">
                        <Link className="lpLink" to={signed ? '/perfil' : ''} onClick={() => signed ? '' : handleClickOpen('login')}  >
                            {signed ? user?.name : "Login / Cadastro"}
                        </Link>
                        {/* <img className="loginImg" src={loginImg} alt="Proffy" /> */}
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            <div className="dialog-title">
                                Registro
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <Input
                                name="name"
                                label="Nome anônimo"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <Input
                                name="user"
                                label="Usuário"
                                value={userR}
                                onChange={(e) => { setUser(e.target.value) }}
                            />
                            <Input
                                name="pass"
                                type="password"
                                label="Senha"
                                value={pass}
                                onChange={(e) => { setPass(e.target.value) }}
                            />
                            <Input
                                name="repass"
                                type="password"
                                label="Repetir Senha"
                                value={repass}
                                onChange={(e) => { setRepass(e.target.value) }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => handleClose('register')} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={() => Register()} color="primary" autoFocus>
                                Criar
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openLogin}
                        onClose={() => handleClose('login')}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title"><div className="dialog-title">
                            Não possui conta?
                                <button type='button' className="loginBtn" onClick={() => {
                                handleClickOpen('register')
                                handleClose('login')
                            }}>
                                Cadastrar
                            </button>
                        </div>
                        </DialogTitle>
                        <DialogContent>
                            <Input
                                name="user"
                                label="Usuário"
                                value={userLogin}
                                onChange={(e) => { setUserLogin(e.target.value) }}
                            />
                            <Input
                                name="pass"
                                type="password"
                                label="Senha"
                                onKeyPress={handleKeyPress}
                                value={passLogin}
                                onChange={(e) => { setPassLogin(e.target.value) }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => handleClose('login')} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleLogin} color="primary" autoFocus>
                                Login
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="header-content">
                </div>
            </header>
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
                    <Link to="/contar-segredo" className="tell-secret">
                        <img src={secret} alt="Conte Segredos" />
                        Conte segredos
                    </Link>

                    <Link to="/arquivo-segredos" className="archive">
                        <img src={secretFile} alt="Arquivo de segredos" />
                        Arquivo
                    </Link>
                    <Link to="/" className="jis-meet">
                        <img src={jisMeet} alt="Jis Meet" />
                        <div style={{ flexDirection: "column" }}>
                            JisMeet
                        <p style={{ fontSize: 10 }}><i>Em breve</i></p>
                        </div>
                    </Link>
                </div>
                <span className="total-connections">
                    Total de  {totalConnections}  segredos já contados
                    <img src={purpleHeart} alt="Coração Roxo" />
                </span>

            </div>
            <NotificationContainer/>
        </div>
    )
}

export default Landing