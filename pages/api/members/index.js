import Member from '../../../models/memberModel'
import dbConnect from '../../../db/connect'
import bcrypt from 'bcryptjs'

const handler = async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const members = await Member.find()
                res.status(200).json({ success: true, data: members })
            } catch (error) {
                res.status(400).json({ success: false, message: error.message })
            }
            break;
        case 'POST':
            try {
                const { email, password } = req.body
                const memberExists = await Member.findOne({ email })
                if (memberExists) {
                    return res.status(400).json({ success: false, message: 'Member already exists' })
                }
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const newBody = { ...req.body, password: hashedPassword }
                const member = await Member.create(newBody)
                let sanitisedMember = member.toObject()
                delete sanitisedMember.password
                res.status(201).json({ success: true, data: sanitisedMember })
            } catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;

        default:
            res.status(400).json({ success: false })
            break;
    }
}

export default handler