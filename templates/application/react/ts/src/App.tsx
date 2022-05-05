import React, { Fragment } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import NothingHere from "./components/NothingHere"
// @ts-ignore
const SharedLayout = React.lazy(() => import("appshell/SharedLayout"))
import "./main.css"

export const SCOPE = "{{SAFE_NAME}}"

const App = () => {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/">
          <Route index element={<NothingHere />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

const LocalDev = () => (
  <React.Suspense fallback={"loading shell..."}>
    <SharedLayout>
      <Routes>
        <Route path={`/${SCOPE}`}>
          <Route index element={<NothingHere />} />
          <Route path="*" element={<Navigate to={`/${SCOPE}`} />} />
        </Route>
      </Routes>
    </SharedLayout>
  </React.Suspense>
)

export { LocalDev }

export default App
