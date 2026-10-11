import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'
import { useResource } from '../hooks/useResource.js'

const fetchLeaderboard = (signal) =>
  fetch(`${API_BASE_URL}/api/leaderboard/`, { signal })

const columns = [
  { field: 'rank', label: 'Rank' },
  { field: 'userId', label: 'User' },
  { field: 'points', label: 'Points' },
]

function Leaderboard() {
  const resource = useResource(fetchLeaderboard)

  return (
    <ResourcePage
      columns={columns}
      description="Celebrate the members earning points through their activities."
      emptyMessage="Scores will show up here as activity points are recorded."
      title="Leaderboard"
      {...resource}
    />
  )
}

export default Leaderboard
