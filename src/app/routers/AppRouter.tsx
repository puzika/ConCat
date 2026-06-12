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
          <Route path="chat/:chatId" element={<ChatPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}