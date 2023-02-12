// Dependencies
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/infra/services'

// Logout using iron session route
function logoutRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  req.session.destroy()
  res.json({})
}

// Exporting logout route
export default withIronSessionApiRoute(logoutRoute, sessionOptions)
