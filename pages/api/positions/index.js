import Position from '../../../models/positionModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const positions = await Position.find()
                res.status(200).json({ success: true, data: positions })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;
        case 'POST':
            try {
                const position = await Position.create(req.body)
                res.status(201).json({ success: true, data: position })
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