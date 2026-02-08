import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { RootPage } from "../../pages/root";
import { ChatPage } from "../../pages/chat";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<p>Whatup</p>} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}