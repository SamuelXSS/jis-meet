import React, { useState, FormEvent } from 'react'

import { Input, PageHeader, Textarea } from '../../components'
import { ToastProvider, useToasts } from 'react-toast-notifications'

import api from '../../services/api'

import './styles.css'

const SecretForm: React.FC = () => {

    
    const FormWithToasts = () => {
        const [name, setName] = useState('')
        const [secret, setSecret] = useState('')
        const { addToast } = useToasts()
        const SubmitSecret = async(e: FormEvent) => {
            e.preventDefault()
            await api.post('/secret', {
                name,
                secret
            }).then((res) => {
                addToast(res.data.success, { appearance: 'success' })
                
            }).catch((err) => {
                if (err.response) {
                    addToast(err.response.data.error, { appearance: 'error' })
                }
            })
        }
        return (
            <form id="tell-secret" onSubmit={SubmitSecret}>
                <Input
                    name="name"
                    label="Nome anônimo"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Textarea
                    name="bio"
                    label="Biografia"
                    value={secret}
                    onChange={(e) => { setSecret(e.target.value) }}
                />
                <button type="submit" onSubmit={SubmitSecret}>
                    Contar
                </button>
            </form>
        )
    }


    return (
        <div id="page-tell-secret" className="container">
            <PageHeader title="Publique seu maior segredo! Ah, pode ficar tranquilo(a), seu anonimato é garantido.">
            </PageHeader>
            <main>
                <ToastProvider>
                    <FormWithToasts />
                </ToastProvider>
            </main>
        </div>
    )
}

export default SecretForm