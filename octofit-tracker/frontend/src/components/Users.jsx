import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'
import { useResource } from '../hooks/useResource.js'

const fetchUsers = (signal) =>
  fetch(`${API_BASE_URL}/api/users/`, { signal })

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'username', label: 'Username' },
  { field: 'email', label: 'Email' },
  { field: 'teamId', label: 'Team' },
]

function Users() {
  const resource = useResource(fetchUsers)

  return (
    <ResourcePage
      columns={columns}
      description="Meet the members building healthier routines together."
      emptyMessage="Member profiles will appear here when people join Octofit."
      title="Users"
      {...resource}
    />
  )
}

export default Users
