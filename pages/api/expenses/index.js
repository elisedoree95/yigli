import Expense from '../../../models/expenseModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const expenses = await Expense.find()
                res.status(200).json({ success: true, data: expenses })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;
        case 'POST':
            try {
                const expense = await Expense.create(req.body)
                res.status(201).json({ success: true, data: expense })
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