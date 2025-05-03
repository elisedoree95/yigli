import Generation from '../../../models/generationModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const generations = await Generation.find()
                res.status(200).json({ success: true, data: generations })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;
        case 'POST':
            try {
                const generation = await Generation.create(req.body)
                res.status(201).json({ success: true, data: generation })
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