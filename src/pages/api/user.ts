// Dependencies
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/infra/services'

// Refresh user using nextjs api
async function userRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const blankUser = { isLoggedIn: false }

  if (req.session.user) {
    res.status(200).json({})
  } else {
    res.status(200).json(blankUser)
  }
}

// Exporting refresh user service
export default withIronSessionApiRoute(userRoute, sessionOptions)