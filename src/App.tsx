import { Routes, Route, Navigate, Outlet } from 'react-router'
import DashboardLayout from '@/components/layout/dashboard-layouts'
import Overview from './dashboard/overview'
import TalentPool from './dashboard/talent-pool'
import Jobs from './dashboard/jobs'
import Inbox from './dashboard/inbox'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        }
      >
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="talent-pool" element={<TalentPool />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="inbox" element={<Inbox />} />
      </Route>
    </Routes>
  )
}