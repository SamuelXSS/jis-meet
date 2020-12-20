import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { PageHeader, Input } from '../../components'
import SecretItem, { Secret } from '../../components/SecretItem'

import api from '../../services/api'
import bg from '../../assets/images/bg.png'

import './styles.css'

function JisMeet() {
    const [meets, setMeets] = React.useState([])
    const [name, setName] = React.useState('')
    const [age, setAge] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function getMeets() {
        const response = await api.get('/meets')

        setMeets(response.data)
    }

    return (
        <div id="page-secret-archive" onLoad={() => { getMeets() }} className="container">
            <PageHeader
                title="Finalmente, o Jis Meet"
                image={bg}
                description="Crie seu perfil para que todos te achem! Lembre-se, todo meio de contato é opcional e a JIS não se responsabiliza por nenhum dado perdido."
            />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open responsive dialog
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
                <Input
                    name="name"
                    label="Nome anônimo"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Input
                    name="age"
                    label="Idade"
                    value={age}
                    onChange={(e) => { setAge(e.target.value) }}
                />
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>

            <main>
                {meets.map((secret: Secret) => {
                    return <div className="secret-card"><SecretItem key={secret.id} secret={secret} /></div>
                })}
            </main>
        </div>
    )
}

export default JisMeet