import { useContext, useEffect, useState } from "react"
import Routing from "./config/routing.jsx"
import { ThemeContext } from "./config/themeContext.jsx"

export default function App() {
  const { theme } = useContext(ThemeContext)
  const [color, setColor] = useState('')

  // CHANGING THEME COLOR
  useEffect(() => {
    const themeColor = theme ? 'bg-bgLightGradient text-darkText' : 'bg-bgDarkGradient text-lightText'
    setColor(themeColor)
  }, [theme])

  return (
    <div className={`${color}`}>
      <Routing />
    </div>
  )
}