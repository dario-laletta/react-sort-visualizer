import React, { useState } from 'react'
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { ALGORITHM } from '../code/utilities';


function getThemeToggleButton(darkMode, toggleDarkMode) {
  const className = "text-[30px] cursor-pointer"
  return darkMode ? <MdOutlineLightMode className={className} onClick={() => toggleDarkMode(false)} /> : <MdOutlineDarkMode className={className} onClick={() => toggleDarkMode(true)} />
}

function getAlgorithms(callback) {
  const list = null;
  for (const prop in ALGORITHM) {
    // list.push(<li className={className} onClick={() => { callback(); setAlgorithmMenuOpen(false); }}>{prop.NAME}</li>)
    list.push(<li></li>);
  }
  return list;
}

const className="cursor-pointer text-sm";

function Header({ darkMode, toggleDarkMode, setAlgorithm, algorithmName }) {
  const [algorithmMenuOpen, setAlgorithmMenuOpen] = useState(false);

  return (
    <div className="fixed w-full h-[50px] top-0 bg-white dark:bg-slate-700 items-center flex justify-between p-2 shadow-md z-10">
      <h1 className="text-[25px] font-bold text-center">Sort visualizer</h1>
      <div className="flex gap-2 items-center">
        <div>
          <button type="button" className="inline-flex justify-center items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300" id="menu-button"
            onClick={() => setAlgorithmMenuOpen(!algorithmMenuOpen)}
          >
            {algorithmName}
            <svg className="-mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          <ul className={`absolute bg-white dark:bg-slate-700 p-2 rounded-md flex-col gap-4 shadow-lg ${algorithmMenuOpen ? "flex" : "hidden" }`}>
            {
              Object.keys(ALGORITHM).map((key) => (
                <li key={key} className="cursor-pointer text-sm" onClick={() => { setAlgorithm(ALGORITHM[key].ID); setAlgorithmMenuOpen(false); }}>{ALGORITHM[key].NAME}</li>
              ))
              
            }
          </ul>
        </div>
        {getThemeToggleButton(darkMode, toggleDarkMode)}
      </div>
    </div>
  )
}

export default Header