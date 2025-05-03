
export const memberFields = {
    title: 'Member',
    fields: [
        {
            name: 'firstName',
            displayedText: 'Prénom',
            type: 'text'
        },
        {
            name: 'lastName',
            displayedText: 'Nom',
            type: 'text'
        },
        {
            name: 'email',
            displayedText: 'Email',
            type: 'email'
        },
        {
            name: 'password',
            displayedText: 'Mot de passe',
            type: 'password'
        },
        {
            name: 'address',
            displayedText: 'Adresse',
            type: 'text'
        },
        {
            name: 'sex',
            displayedText: 'Sexe',
            type: 'radio',
            options: [
                { value: 'female', key: 'F' },
                { value: 'male', key: 'M' }
            ]
        },
    ],
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        sex: ''
    },
    endpoint: '/api/members'
}


export const memberEditFields = {
    title: 'Member',
    fields: [
        {
            name: 'firstName',
            displayedText: 'Prénom',
            type: 'text'
        },
        {
            name: 'lastName',
            displayedText: 'Nom',
            type: 'text'
        },
        {
            name: 'email',
            displayedText: 'Email',
            type: 'email'
        },
        {
            name: 'address',
            displayedText: 'Adresse',
            type: 'text'
        },
        {
            name: 'sex',
            displayedText: 'Sexe',
            type: 'radio',
            options: [
                { value: 'female', key: 'F' },
                { value: 'male', key: 'M' }
            ]
        },
        {
            name: 'generation',
            displayedText: 'Génération',
            type: 'select'
        },
        {
            name: 'parents',
            displayedText: 'Parents',
            type: 'select',
            multiple: true
        },
        {
            name: 'children',
            displayedText: 'Enfants',
            type: 'select',
            multiple: true
        },
        {
            name: 'spouse',
            displayedText: 'Conjoint(e)',
            type: 'select'
        },
    ],
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        sex: '',
        generation: '',
        parents: '',
        children: '',
        spouse: ''
    },
    endpoint: '/api/members'
}


export const meetingFields = {
    fields: [
        {
            name: 'date',
            displayedText: 'Date',
            type: 'date'
        },
        {
            name: 'location',
            displayedText: 'Lieu',
            type: 'text'
        },
    ],
    initialValues: {
        date: '',
        location: ''
    },
    endpoint: '/api/meetings'
}


export const contributionFields = {
    fields: [
        {
            name: 'contributor',
            displayedText: 'Contributeur',
            type: 'select'
        },
        {
            name: 'amount',
            displayedText: 'Montant',
            type: 'number'
        },
        {
            name: 'date',
            displayedText: 'Date',
            type: 'date'
        },
    ],
    initialValues: {
        contributor: '',
        amount: '',
        date: ''
    },
    endpoint: '/api/contributions'
}