import Contribution from '../../../models/contributionModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { query: { contributionId }, method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const contribution = await Contribution.findById(contributionId)
                res.status(200).json({ success: true, data: contribution })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'PUT':
            try {
                const contribution = await Contribution.findByIdAndUpdate(contributionId, req.body, { new: true, runValidators: true })
                if (!contribution) return res.status(400).json({ success: false, message: `Unable to find contribution with id ${contributionId}` })
                res.status(200).json({ success: true, data: contribution })
            } catch (error) {
                res.status(400).json({ success: false, message: error.response.data })
            }
            break;

        case 'DELETE':
            try {
                const deletedcontribution = await Contribution.findByIdAndDelete(contributionId)
                if (!deletedcontribution) return res.status(400).json({ success: false, message: `Unable to find contribution with id ${contributionId}` })
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