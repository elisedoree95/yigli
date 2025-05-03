import Expense from '../../../models/expenseModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { query: { expenseId }, method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const expense = await Expense.findById(expenseId)
                res.status(200).json({ success: true, data: expense })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'PUT':
            try {
                const expense = await Expense.findByIdAndUpdate(expenseId, req.body, { new: true, runValidators: true })
                if (!expense) return res.status(400).json({ success: false, message: `Unable to find expense with id ${expenseId}` })
                res.status(200).json({ success: true, data: expense })
            } catch (error) {
                res.status(400).json({ success: false, message: error.response.data })
            }
            break;

        case 'DELETE':
            try {
                const deletedexpense = await Expense.findByIdAndDelete(expenseId)
                if (!deletedexpense) return res.status(400).json({ success: false, message: `Unable to find expense with id ${expenseId}` })
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false, message: error.response.data })
            }
            break;

        default:
            res.status(400).json({ success: false })
            break;
    }
}

export default handler