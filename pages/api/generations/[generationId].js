import Generation from '../../../models/generationModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { query: { generationId }, method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const generation = await Generation.findById(generationId)
                res.status(200).json({ success: true, data: generation })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'PUT':
            try {
                const generation = await Generation.findByIdAndUpdate(generationId, req.body, { new: true, runValidators: true })
                if (!generation) return res.status(400).json({ success: false, message: `Unable to find generation with id ${generationId}` })
                res.status(200).json({ success: true, data: generation })
            } catch (error) {
                res.status(400).json({ success: false, message: error.response.data })
            }
            break;

        case 'DELETE':
            try {
                const deletedgeneration = await Generation.findByIdAndDelete(generationId)
                if (!deletedgeneration) return res.status(400).json({ success: false, message: `Unable to find generation with id ${generationId}` })
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