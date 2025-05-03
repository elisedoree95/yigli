import AgendaItem from "../../../models/agendaItemModel";
import dbConnect from "../../../db/connect";

const handler = async (req, res) => {
    const { query: {agendaItemId}, method} = req

    await dbConnect()

    switch (key) {
        case 'GET':
            try {
                const agendaItem = await AgendaItem.findById(agendaItemId)
                res.status(200).json({success: true, data: agendaItem})
            } catch (error) {
                res.status(400).json({success: false, message: error.message})
            }
            break;
        case 'PUT':
            try {
                const agendaItem = await AgendaItem.findByIdAndUpdate(agendaItemId, req.body, { new: true, runValidators: true })
                if (!agendaItem) return res.status(400).json({ success: false, message: `Unable to find item with id ${agendaItemId}` })
                res.status(200).json({success: true, data: agendaItem})
            } catch (error) {
                res.status(400).json({ success: false, message: error.response.data })
            }
            break;
        case 'DELETE':
            try {
                const deletedItem = await AgendaItem.findByIdAndDelete(agendaItemId)
                if (!deletedItem) return res.status(400).json({ success: false, message: `Unable to find item with id ${agendaItemId}` })
                res.status(200).json({success: true})
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