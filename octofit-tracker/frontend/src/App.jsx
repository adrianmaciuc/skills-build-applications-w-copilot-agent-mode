import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/users">
            <img className="brand-logo" src={logo} alt="" />
            <span>Octofit Tracker</span>
          </NavLink>
          <button
            aria-controls="main-navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-bs-target="#main-navigation"
            data-bs-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="main-navigation">
            <div className="navbar-nav ms-auto">
              {navigation.map(({ label, path }) => (
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  key={path}
                  to={path}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container app-content">
        <Routes>
          <Route element={<Navigate replace to="/users" />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Workouts />} path="/workouts" />
          <Route
            element={
              <div className="alert alert-light border">
                Page not found. Choose a section from the navigation.
              </div>
            }
            path="*"
          />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container">Move together. Get stronger together.</div>
      </footer>
    </div>
  )
}

export default App
