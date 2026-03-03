const { getMembers, deleteMember } = require("../services/member.service")

const getMembersHandler = async (req, res) => {

  try {

    const members = await getMembers(req.tenantId)

    res.status(200).json({ members })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
  
}


const deleteMemberHandler = async (req, res) => {

  try {

    const { memberId } = req.params

    const result = await deleteMember({
      memberId,
      tenantId: req.tenantId
    })

    res.status(200).json(result)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}

module.exports = { getMembersHandler, deleteMemberHandler }