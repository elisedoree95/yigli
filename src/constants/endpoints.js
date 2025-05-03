export const ENDPOINTS = {
    addMember: '/api/members',
    editMember: (memberId) => `/api/members/${memberId}`,

    addMeeting: '/api/meetings',
    editMeeting: (meetingId) => `/api/meetings/${meetingId}`,

    addContribution: '/api/contributions',
    editContribution: (contributionId) => `/api/contributions/${contributionId}`,

    addGeneration: '/api/generations',
    editGeneration: (generationId) => `/api/generations/${generationId}`,

    addAgendaItem: '/api/agendaitems',
    editAgendaItem: (agendaItemId) => `/api/agendaitems/${agendaItemId}`,

    addPosition: '/api/positions',
    editPosition: (positionId) => `/api/positions/${positionId}`,
}