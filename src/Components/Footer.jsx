import React from 'react'
import { FaG, FaGit, FaGithub, FaLinkedin } from "react-icons/fa6";


function Footer() {
  return (
    <div className="fixed bottom-0 h-[50px] w-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-[0_0_5px_0px_rgba(0,0,0,0.5)] gap-4">
      <a href="https://github.com/dario-laletta">
        <FaGithub className="text-[30px]" />
      </a>
      <a href="https://www.linkedin.com/in/dario-laletta">
        <FaLinkedin className="text-[30px]" />
      </a>
      
    </div>
  )
}

export default Footer