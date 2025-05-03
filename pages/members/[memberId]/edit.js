import Container from "@mui/material/Container"
import EditMemberForm from "../../../components/forms/EditMemberForm"

import dbConnect from "../../../db/connect"
import Member from '../../../models/memberModel'
import Generation from '../../../models/generationModel'
import Meta from "../../../layouts/Meta"

const EditMemberPage = ({ member, spouseList, parentList, childrenList, generations }) => {
    return (
        <Container>
            <Meta title='Modifier membre' />
            <EditMemberForm
                member={member}
                spouseList={spouseList}
                generations={generations}
                parentList={parentList}
                childrenList={childrenList}
            />
        </Container>
    )
}

export default EditMemberPage

export const getServerSideProps = async (context) => {
    const { memberId } = context.params

    await dbConnect()

    const [member, memberResult, generations] = await Promise.all([
        Member.findById(memberId).lean(),
        Member.find().lean(),
        Generation.find().lean()
    ])

    delete member.password
    delete member.createdAt
    delete member.updatedAt
    member.gen = { ...generations.find(g => g._id.toString() === member.generation?.toString()) }

    const otherMembers = memberResult.map(doc => {
        const mem = {...doc}
        mem.gen = { ...generations.find(g => g._id.toString() === mem.generation?.toString()) }
        
        return mem
    })

    const spouseList = otherMembers.filter(m => (m.sex !== member.sex) && (m.gen.index === member.gen.index))
    const parentList = otherMembers.filter(m => m.gen.index === member.gen.index - 1)
    const childrenList = otherMembers.filter(m => m.gen.index === member.gen.index + 1)

    return {
        props: {
            member: JSON.parse(JSON.stringify(member)),
            spouseList: JSON.parse(JSON.stringify(spouseList)),
            generations: JSON.parse(JSON.stringify(generations)),
            parentList: JSON.parse(JSON.stringify(parentList)),
            childrenList: JSON.parse(JSON.stringify(childrenList)),
        }
    }
}