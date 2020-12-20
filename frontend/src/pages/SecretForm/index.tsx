import React, { useState, FormEvent } from 'react'

import { Input, PageHeader, Textarea, SecretItemExample } from '../../components'
import { Notification } from '../../components/Notifications'
import { useAuth } from '../../contexts/auth'
import api from '../../services/api'
import { TwitterPicker } from 'react-color';

import './styles.css'

const SecretForm: React.FC = () => {

    const context = useAuth();
    const { signed, user } = context
    const [name, setName]: any = useState('')
    const [secretColor, setColor] = useState('')
    const [secretColor2, setColor2] = useState('')
    const [textColor, setTextColor] = useState('')
    const [secret, setSecret] = useState('')

    const secreted = {
        id: 0,
        name,
        color1: secretColor,
        color2: secretColor2,
        text_color: textColor,
        secret,
        like: 0,
        comment: 0
    }

    const SubmitSecret = async (e: FormEvent) => {
        e.preventDefault()
        await api.post(`/user/${user?.id}/secret`, {
            name,
            secret,
            color1: secretColor2,
            color2: secretColor,
            text_color: textColor
        }).then((res) => {
           Notification('success', res.data.success)

        }).catch((err) => {
            if (err.response) {
               Notification('error', err.response.data.error)
            }
        })
    }

    const handleColor = (color: any, event: any) => {
        setColor(color.hex)
    }
    const handleColor2 = (color: any, event: any) => {
        setColor2(color.hex)
    }
    const handleTextColor = (color: any, event: any) => {
        setTextColor(color.hex)
    }


    return (
        <div id="page-tell-secret" className="container">
            <PageHeader title="Publique seu maior segredo! Ah, pode ficar tranquilo(a), seu anonimato é garantido.">
            </PageHeader>
            <main>
                <div className="secret-sub-container">
                    <form id="tell-secret" onSubmit={SubmitSecret}>
                        {!signed ? <Input
                            name="name"
                            label="Nome anônimo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        /> : <Input
                                name="name"
                                label="Nome"
                                disabled={true}
                                value={user?.name}
                                onChange={(e) => { setName(e.target.value) }}
                            />}
                        <label className="label-font">Cor Box <small>(Gradient)</small></label>
                        <TwitterPicker onChange={handleColor2} className="color-picker" color={secretColor2} onChangeComplete={handleColor2} />
                        <label className="label-font">Cor Box <small>(Background)</small></label>
                        <TwitterPicker onChange={handleColor} className="color-picker" color={secretColor} onChangeComplete={handleColor} />
                        <label className="label-font">Cor Texto</label>
                        <TwitterPicker onChange={handleTextColor} className="color-picker" color={textColor} onChangeComplete={handleTextColor} />
                        <Textarea
                            name="bio"
                            label="Segredo"
                            value={secret}
                            onChange={(e) => { setSecret(e.target.value) }}
                        />
                        <button type="submit" style={{ marginBottom: 20 }} onSubmit={SubmitSecret}>
                            Contar
                    </button>
                    </form>
                    <div className="secret-box-container">
                        <label className="label-font">Prévia</label>
                        <SecretItemExample secret={secreted} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SecretForm