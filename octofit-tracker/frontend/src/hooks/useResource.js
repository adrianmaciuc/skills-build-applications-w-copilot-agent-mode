import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'

export function useResource(fetchResource) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetchResource(controller.signal)
        if (!response.ok) {
          throw new Error(`The API request failed with status ${response.status}.`)
        }

        const payload = await response.json()
        setRecords(normalizeCollection(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this information.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [fetchResource])

  return { records, loading, error }
}
