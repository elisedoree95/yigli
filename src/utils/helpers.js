import { CODES } from "../constants/positionCodes"

const extractDate = (dateTimeString) => {
    const date = new Date(dateTimeString)

    let day = date.getDate()
    let month = date.getMonth() + 1
    if (day < 10) day = `0${day}`
    if (month < 10) month = `0${month}`

    return `${day}/${month}/${date.getFullYear()}`
}

const prefillDate = (dateTimeString) => {
    const date = new Date(dateTimeString)

    let day = date.getDate()
    let month = date.getMonth() + 1
    if (day < 10) day = `0${day}`
    if (month < 10) month = `0${month}`

    return `${date.getFullYear()}-${month}-${day}`
}

const formatCurrency = (amount, currency = 'FCFA') => {
    return `${amount} ${currency}`
}

const addProperty = (propName, target, source) => {
    target[propName] = {...source}
}

const formatPosition = (code, sex) => {
    let position
    switch (code) {
        case CODES.president:
            position = sex === 'male' ? 'Président' : 'Présidente'
            return position

        case CODES.treasurer:
            position = sex === 'male' ? 'Trésorier' : 'Trésorière'
            return position

        case CODES.secretary:
            position = 'Secrétaire'
            return position

        case CODES.commOfficer:
            position = sex === 'male' ? 'Chargé de communication' : 'Chargée de communication'
            return position

        case CODES.prayerOfficer:
            position = sex === 'male' ? 'Chargé de prière' : 'Chargée de prière'
            return position

        case CODES.auditor:
            position = 'Commissaire aux comptes'
            return position

        case CODES.censor:
            position = 'Censeur'
            return position
    
        default:
            return 'unknown'
    }
}

const formatAdjunct = sex => sex === 'male' ? 'Adjoint' : 'Adjointe'

export {
    extractDate,
    prefillDate,
    formatCurrency,
    addProperty,
    formatPosition,
    formatAdjunct
}