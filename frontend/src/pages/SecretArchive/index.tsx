import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import SecretItem, { Secret } from '../../components/SecretItem'
import { Input, Select, PageHeader } from '../../components'

import api from '../../services/api'

import './styles.css'

function DoctorForm() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [crm, setCrm] = useState('')
    const [like, setLike] = useState('')
    const [comment, setComment] = useState('')

    const secret = [
        {
            id: 1,
            name: 'Samuel',
            secret: 'EU EU EU EUUUEU EU UE UEUE UEU EU UEU EUE UEUE UE U EUE UEUEUUE UE UE U EUEU EU EU EU EU EUUUEU EU UE UEUE UEU EU UEU EUE UEUE UE U EUE UEUEUUE UE UE U EUEU EU EU EU EU EUUUEU EU UE UEUE UEU EU UEU EUE UEUE UE U EUE UEUEUUE UE UE U EUEU EU U EUE UEUEUUE UE UE U EUEU EU EU EU EU EUUUEU EU UE UEUE UEU EU UEU EUE UEUE UE U EUE UEUEUUE UE UE U EUEU EU U EUE UEUEUUE UE UE U EUEU EU EU EU EU EUUUEU EU UE UEUE UEU EU UEU EUE UEUE UE U EUE UEUEUUE UE UE U EUEU EU ',
            like: 10,
            comment: 20
        },
        {
            id: 1,
            name: 'Samuel',
            secret: 'EU EU EU EUUUEU EU UE UEUE UEU EU UEU EUE UEUE UE U EUE UEUEUUE UE UE U EUEU EU ',
            like: 10,
            comment: 20
        },
        
    ]

    function handleCreateAppointment(e: FormEvent) {
        e.preventDefault()

        api.get('/secrets').then(() => {
            alert('Cadastro realizado com sucesso!')

            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro!')
        })
    }

    return (
        <div id="page-secret-archive" className="container">
            <PageHeader
                title="Olá! Aqui você econtrará todo tipo de conteúdo, tenha cuidado!"
                description="Basta rolar a tela e interagir curtindo ou comentando nos segredos."
            />

            <main>
                {secret.map((secret: Secret) => {
                    return <div className="secret-card"><SecretItem key={secret.id} secret={secret} /></div>
                })}
            </main>
        </div>
    )
}

export default DoctorForm