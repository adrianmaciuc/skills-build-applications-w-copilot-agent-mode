import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'
import { useResource } from '../hooks/useResource.js'

const fetchTeams = (signal) =>
  fetch(`${API_BASE_URL}/api/teams/`, { signal })

const columns = [
  { field: 'name', label: 'Team' },
  { field: 'description', label: 'About' },
  { field: 'members', label: 'Members' },
]

function Teams() {
  const resource = useResource(fetchTeams)

  return (
    <ResourcePage
      columns={columns}
      description="Find your crew and see who is training together."
      emptyMessage="Teams created by the community will appear here."
      title="Teams"
      {...resource}
    />
  )
}

export default Teams
