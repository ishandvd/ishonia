import { useEffect, useState } from 'react'
import { GUEST_CODES } from '../guestCodes'

export default function useGuest() {
  const [guest, setGuest] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code && GUEST_CODES[code]) setGuest(GUEST_CODES[code])
    setReady(true)
  }, [])
  return { guest, ready }
}
