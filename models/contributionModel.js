import mongoose from "mongoose";

const constributionModel = mongoose.Schema({
    contributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please enter a contribution amount']
    },
    date: {
        type: Date,
        required: [true, 'Please enter a contribution date']
    },
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting'
    }
}, {
    timestamps: true
})

export default mongoose.models.Contribution || mongoose.model('Contribution', constributionModel)