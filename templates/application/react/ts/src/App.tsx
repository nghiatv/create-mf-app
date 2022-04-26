import React, { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// @ts-ignore
const SharedLayout = React.lazy(() => import('appshell/SharedLayout'))
import './main.css'

export const SCOPE = '{{SAFE_NAME}}'

const Tenant = () => {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Fragment />}>
          <Route index element={<List />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

const LocalDev = () => (
  <React.Suspense fallback={'loading shell...'}>
    <SharedLayout>
      <Routes>
        <Route path={`/${SCOPE}`} element={<Fragment />}>
          <Route index element={<List />} />
        <Route path="*" element={<Navigate to={`/${SCOPE}`} />} />
      </Routes>
    </SharedLayout>
  </React.Suspense>
)

export { LocalDev }

export default Tenant
