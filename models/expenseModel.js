import mongoose from "mongoose";

const expenseModel = mongoose.Schema({
    beneficiaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    amount: {
        type: Number,
        required: [true, 'Please enter an expense amount']
    },
    date: {
        type: Date,
        required: [true, 'Please enter an expense date']
    },
    justification: {
        type: String,
    }
}, {
    timestamps: true
})

export default mongoose.models.Expense || mongoose.model('Expense', expenseModel)