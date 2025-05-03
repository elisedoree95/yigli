import Member from '../../../models/memberModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { query: { memberId }, method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const member = await Member.findById(memberId)
                res.status(200).json({ success: true, data: member })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'PUT':
            try {
                const member = await Member.findByIdAndUpdate(memberId, req.body, { new: true, runValidators: true })
                if (!member) return res.status(400).json({ success: false, message: `Unable to find member with id ${memberId}` })
                res.status(200).json({ success: true, data: member })
            } catch (error) {
                res.status(400).json({ success: false, message: error.response.data })
            }
            break;

        case 'DELETE':
            try {
                const deletedMember = await Member.findByIdAndDelete(memberId)
                if (!deletedMember) return res.status(400).json({ success: false, message: `Unable to find member with id ${memberId}` })
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