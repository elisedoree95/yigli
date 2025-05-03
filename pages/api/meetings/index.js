import Meeting from '../../../models/meetingModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const meetings = await Meeting.find()
                res.status(200).json({ success: true, data: meetings })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;
        case 'POST':
            try {
                /*
                    TO DO:
                    1. Set the upcoming field to false if the meeting date is in the past
                */
                const meeting = await Meeting.create(req.body)
                res.status(201).json({ success: true, data: meeting })
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