import { Router } from "./routers"
import { GlobalStyles } from "./styles"
import { Providers } from "./providers"

export default function App() {
  return (
    <Providers>
      <GlobalStyles />
      <Router />
    </Providers>
  )
}