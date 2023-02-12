// Dependencies
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/infra/services'

// Login using iron session route
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({})
}

// Exporting login route
export default withIronSessionApiRoute(loginRoute, sessionOptions)