import mongoose from 'mongoose'
const {Schema} = mongoose

const agendaItemModel = new Schema({
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    resolution: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.models.AgendaItem || mongoose.model('AgendaItem', agendaItemModel)