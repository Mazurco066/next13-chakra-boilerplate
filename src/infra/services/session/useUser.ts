// Dependencies
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// Session user hook
export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const router = useRouter()
  const { data: user } = useQuery(['user'], async () => {
    const response = await axios.get("/api/user");
    return response.data;
  });

  useEffect(() => {
    // No need to redirect if there is no redirect url
    if (!redirectTo || !user) return

    // Rediret to defined page if user is logged in
    if (
      (redirectTo && !redirectIfFound && !user?.data.isLoggedIn) ||
      (redirectIfFound && user?.data.isLoggedIn)
    ) {
      router.push(redirectTo)
    }

  }, [user, redirectIfFound, redirectTo])
}