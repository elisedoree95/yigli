import mongoose from 'mongoose'
const {Schema} = mongoose

const minuteItemSchema = new Schema({
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    },
    title: {
        type: String
    },
    details: {
        type: String
    },
    resolution: {
        type: String
    },
    appointees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }]
}, {
    timestamps: true
})

export default mongoose.models.MinuteItem || mongoose.model('MinuteItem', minuteItemSchema)