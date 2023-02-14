// Dependencies
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { requestServer, sessionOptions } from '@/infra/services'

// Refresh user using nextjs api
async function userRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const blankUser = {
    isLoggedIn: false,
    isEmailconfirmed: false,
    name: '',
    username: '',
    avatar: '',
    token: '',
    email: '',
    id: ''
  }

  // Verify if user already logged in
  if (req.session.user) {    
    const response = await requestServer('/accounts/me', 'get', undefined, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.session.user?.token}`
      }
    })

    // Verify if server confirmed user authentication
    if (response.status < 300) {
      const { data: {
        isEmailconfirmed,
        name,
        username: login,
        avatar,
        email,
        id
      }} = response.data

      // Updated user payload from server
      const updatedUser: any = {
        ...req.session.user,
        username: login,
        isEmailconfirmed,
        name,
        avatar,
        email,
        id,
        isLoggedIn: true
      }

      // Saving to session and returning updated user
      req.session.user = updatedUser
      await req.session.save()
      res.status(200).json(updatedUser)

    } else {
      if ([401, 403].includes(response.status)) {
        req.session.destroy()
        res.json(blankUser)
      } else {
        res.status(200).json({
          ...req.session.user,
          isLoggedIn: true
        })
      }
    }
  } else {
    res.status(200).json(blankUser)
  }
}

// Exporting refresh user service
export default withIronSessionApiRoute(userRoute, sessionOptions)
