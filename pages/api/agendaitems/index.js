import AgendaItem from '../../../models/agendaItemModel'
import dbConnect from '../../../db/connect'

const handler = async (req, res) => {
    const {method} = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const agendaItems = await AgendaItem.find()
                res.status(200).json({success: true, data: agendaItems})
            } catch (error) {
                res.status(400).json({success: false, message: error.message})
            }
            break;
        case 'POST':
            try {
                const itemData = {...req.body}
                const item = await AgendaItem.create(itemData)
                res.status(201).json({success: true, data: item})
            } catch (error) {
                res.status(400).json({success: false, message: error.message})
            }
            break;
        
        default:
            res.status(400).json({success: false})
    }
}

export default handler