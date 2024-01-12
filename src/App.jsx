import Routing from "./config/routing.jsx"
import { ThemeProvider } from './config/themeContext.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <Routing />
    </ThemeProvider>
  )
}