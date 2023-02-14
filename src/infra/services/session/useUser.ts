// Dependencies
import Router from 'next/router'
import { useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { requestClient } from '@/infra/services'

// Session user hook
export function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  // User fetching from app server
  const { data: user } = useQuery(['user'], async () => {
    const response = await requestClient('/api/user', 'get', undefined, {
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    return response.data
  })

  useEffect(() => {
    // No need to redirect if there is no redirect url
    if (!redirectTo || !user) return

    // Rediret to defined page if user is logged in
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }

  }, [user, redirectIfFound, redirectTo])

  return {
    user: user?.data
  }
}
