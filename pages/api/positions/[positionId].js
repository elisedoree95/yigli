import Position from '../../../models/positionModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { query: { positionId }, method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const position = await Position.findById(positionId)
                res.status(200).json({ success: true, data: position })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'PUT':
            try {
                const position = await Position.findByIdAndUpdate(positionId, req.body, {new: true, runValidators: true})
                if (!position) return res.status(400).json({ success: false, message: `Unable to find position with id ${positionId}` })
                res.status(200).json({ success: true, data: position })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'DELETE':
            try {
                const position = await Position.findByIdAndDelete(positionId)
                if (!position) return res.status(400).json({ success: false, message: `Unable to find position with id ${positionId}` })
                res.status(200).json({ success: true})
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        default:
            res.status(400).json({ success: false })
            break;
    }
}

export default handler