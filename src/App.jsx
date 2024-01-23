import { useState } from "react";
import Visualizer from "./Components/Visualizer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : "" }`}>
      <div className="bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300">
        <Visualizer darkMode={darkMode} toggleDarkMode={setDarkMode} />
      </div>
    </div>
  )
}

export default App
