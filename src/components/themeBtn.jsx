import { useContext } from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { ThemeContext } from "../config/themeContext"

export default function ThemeButtons({ position }) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            {theme ?
                <MdDarkMode className={`${position} top-4 right-5 text-blue-800 text-[23px] md:text-[26px] z-50 cursor-pointer ${!theme ? 'hidden' : 'themeIconAni block'}`} onClick={toggleTheme} />
                :
                <MdLightMode className={`${position} top-4 right-5 text-orange-400 text-[23px] md:text-[26px] z-50 cursor-pointer ${theme ? 'hidden' : 'themeIconAni block'}`} onClick={toggleTheme} />
            }
        </>
    )
} 