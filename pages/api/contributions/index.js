import Contribution from '../../../models/contributionModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const contributions = await Contribution.find()
                res.status(200).json({ success: true, data: contributions })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;
        case 'POST':
            try {
                const contributionData = {...req.body, amount: parseInt(req.body.amount)}
                const contribution = await Contribution.create(contributionData)
                res.status(201).json({ success: true, data: contribution })
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