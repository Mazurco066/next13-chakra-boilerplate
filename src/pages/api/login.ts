// Dependencies
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { requestServer, sessionOptions } from '@/infra/services'

// Login using iron session route
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body
  
  // Request server login endpoint
  const response = await requestServer(
    '/auth/authenticate',
    'post',
    {
      username,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  // Check if response is not an error
  if (response.status < 300) {
    const {
      data: {
        token,
        account: { isEmailconfirmed, name, username: login, avatar, email, id },
      },
    } = response.data

    // Session user object
    const user = {
      isLoggedIn: true,
      isEmailconfirmed: isEmailconfirmed,
      name: name,
      username: login,
      avatar: avatar,
      token: token,
      email: email,
      id: id,
    }

    // Save session user and return ok
    req.session.user = user
    await req.session.save()
    res.status(200).json(user)

  } else {
    res.status(response.status).json(response.data)
  }
}

// Exporting login route
export default withIronSessionApiRoute(loginRoute, sessionOptions)
