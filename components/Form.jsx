import axios from 'axios'
import { useState } from 'react'

const Form = () => {
    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState(200)
    const [lateFee, setLateFee] = useState(200)
    const [absenteeFee, setAbsenteeFee] = useState(500)

    const handleSubmit = async e => {
        e.preventDefault()

        if (label) {
            const body = {
                label,
                contributionAmount: amount,
                lateFee,
                absenteeFee
            }

            const { data } = await axios.post('/api/generations', body, { headers: { 'Content-Type': 'application/json' } })
            console.log(data);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="label">Libellé: </label>
                    <input type="text" name="label" id="label" value={label} onChange={e => setLabel(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="amount">Montant Contrib.: </label>
                    <input type="number" name="amount" id="amount" value={amount} onChange={e => setAmount(parseInt(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="lateFee">Pénalité retard: </label>
                    <input type="number" name="lateFee" id="lateFee" value={lateFee} onChange={e => setLateFee(parseInt(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="absenteeFee">Pénalité absence: </label>
                    <input type="number" name="absenteeFee" id="absenteeFee" value={absenteeFee} onChange={e => setAbsenteeFee(parseInt(e.target.value))} />
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </>
    )
}

export default Form