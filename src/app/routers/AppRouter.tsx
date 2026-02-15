import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { RootPage } from "../../pages/root";
import { ChatPage } from "../../pages/chat";
import { AuthPage } from "../../pages/auth";
import { SignUpPage } from "../../pages/sign-up";
import { SignInPage } from "../../pages/sign-in";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="chat" element={<ChatPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />}>
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}