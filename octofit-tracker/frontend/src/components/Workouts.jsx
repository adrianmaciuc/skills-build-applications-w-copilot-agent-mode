import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'
import { useResource } from '../hooks/useResource.js'

const fetchWorkouts = (signal) =>
  fetch(`${API_BASE_URL}/api/workouts/`, { signal })

const columns = [
  { field: 'name', label: 'Workout' },
  { field: 'activityType', label: 'Activity' },
  { field: 'duration', label: 'Minutes' },
  { field: 'difficulty', label: 'Level' },
  { field: 'description', label: 'Details' },
]

function Workouts() {
  const resource = useResource(fetchWorkouts)

  return (
    <ResourcePage
      columns={columns}
      description="Explore workout ideas to help plan your next session."
      emptyMessage="Workout suggestions will appear here when they are available."
      title="Workouts"
      {...resource}
    />
  )
}

export default Workouts
