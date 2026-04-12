import { Router } from "./routers/AppRouter"
import { GlobalStyles } from "./styles/global"
import { Providers } from "./providers/AppProvider"

export default function App() {
  return (
    <Providers>
      <GlobalStyles />
      <Router />
    </Providers>
  )
}