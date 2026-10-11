import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'
import { useResource } from '../hooks/useResource.js'

const fetchActivities = (signal) =>
  fetch(`${API_BASE_URL}/api/activities/`, { signal })

const columns = [
  { field: 'type', label: 'Activity' },
  { field: 'userId', label: 'User' },
  { field: 'duration', label: 'Minutes' },
  { field: 'date', label: 'Date' },
  { field: 'points', label: 'Points' },
]

function Activities() {
  const resource = useResource(fetchActivities)

  return (
    <ResourcePage
      columns={columns}
      description="See the movement and training logged by your community."
      emptyMessage="Activity entries will appear here when members log a workout."
      title="Activities"
      {...resource}
    />
  )
}

export default Activities
