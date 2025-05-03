import Meeting from '../../../models/meetingModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const { query: { meetingId }, method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const meeting = await Meeting.findById(meetingId)
                res.status(200).json({ success: true, data: meeting })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'PUT':
            try {
                const meeting = await Meeting.findByIdAndUpdate(meetingId, req.body, { new: true, runValidators: true })
                if (!meeting) return res.status(400).json({ success: false, message: `Unable to find meeting with id ${meetingId}` })
                res.status(200).json({ success: true, data: meeting })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;

        case 'DELETE':
            try {
                const deletedMeeting = await Meeting.findByIdAndDelete(meetingId)
                if (!deletedMeeting) return res.status(400).json({ success: false, message: `Unable to find meeting with id ${meetingId}` })
                res.status(200).json({ success: true })
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