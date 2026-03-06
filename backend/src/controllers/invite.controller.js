const { inviteUser } = require('../services/invite.service')

const inviteUserHandler = (targetRole) => async (req, res) => {

  try {

    const {email} = req.body;

    const result = await inviteUser({

      email,
      tenantId: req.tenantId,
      role: targetRole,
      invitedByRole: req.user?.role

    });

    res.status(200).json({

      message: `${targetRole} invited successfully`,
      ...result,

    });

  } catch (e) {

    res.status(400).json({ message: e.message });
  }

};

module.exports = { inviteUserHandler }