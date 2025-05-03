import mongoose from "mongoose";
const {Schema} = mongoose

const generationSchema = new Schema({
    index: {
        type: Number
    },
    label: {
        type: String
    },
    contributionAmount: {
        type: Number
    },
    dependent: {
        type: Boolean
    },
    
}, {
    timestamps: true
})

export default mongoose.models.Generation || mongoose.model('Generation', generationSchema)