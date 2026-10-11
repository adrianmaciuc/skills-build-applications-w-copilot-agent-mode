const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const safeCodespaceName =
  configuredCodespaceName && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(configuredCodespaceName)
    ? configuredCodespaceName
    : undefined

export const API_BASE_URL = safeCodespaceName
  ? `https://${safeCodespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results
    }
    if (Array.isArray(payload.items)) {
      return payload.items
    }
    if (Array.isArray(payload.data)) {
      return payload.data
    }
    if (payload.data && typeof payload.data === 'object') {
      if (Array.isArray(payload.data.results)) {
        return payload.data.results
      }
      if (Array.isArray(payload.data.items)) {
        return payload.data.items
      }
    }
  }

  throw new Error('The API returned an unsupported collection response.')
}
