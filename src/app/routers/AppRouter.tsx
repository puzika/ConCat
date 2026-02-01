import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Whatup</h1>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}