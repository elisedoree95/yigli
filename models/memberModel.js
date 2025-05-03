import mongoose from "mongoose";
const {Schema} = mongoose

const memberModel = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name']
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        default: 'azerty'
    },
    address: {
        type: String
    },
    sex: {
        type: String,
        enum: ['female', 'male']
    },
    generation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Generation'
    },
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    spouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
}, {
    timestamps: true
})

export default mongoose.models.Member || mongoose.model('Member', memberModel)