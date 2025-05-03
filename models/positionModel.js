import mongoose from 'mongoose'
const {Schema} = mongoose

const positionModel = new Schema({
    label: {
        type: String
    },
    code: {
        type: String
    },
    adjunct: {
        type: Boolean,
        default: false
    },
    appointee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }
}, {
    timestamps: true
})

export default mongoose.models.Position || mongoose.model('Position', positionModel)