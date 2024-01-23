import React, { useState } from 'react'
import { FaBackwardFast, FaBackwardStep, FaRegCirclePlay, FaForwardStep, FaForwardFast, FaRegCircleStop } from "react-icons/fa6"
import { delay } from '../code/utilities';

const buttonClasses = "enabled:hover:text-slate-500 enabled:cursor-pointer disabled:opacity-15";
const speedButtonClass = "cursor-pointer p-1 min-w-14 text-center";

function VisualizerControls( { isPlaying, onPlay, onStop, onBackwardToStart, onBackwardOneStep, onForwardOneStep, onForwardToEnd, onSetDelay, currentSnapshot, totalSnapshots } ) {
  const [selectedSpeedButton, setSelectedSpeedButton] = useState(3);
  return (
    <div className="mt-3">
      <div className="flex gap-1 text-[40px] justify-center">
        <button disabled={currentSnapshot == 0} onClick={onBackwardToStart} className={buttonClasses}>
          <FaBackwardFast />
        </button>
        <button disabled={currentSnapshot == 0} onClick={onBackwardOneStep} className={buttonClasses}>
        <FaBackwardStep className={buttonClasses} />
        </button>
        <button className={buttonClasses} disabled={!isPlaying && currentSnapshot >= totalSnapshots - 1}>
          {isPlaying ? <FaRegCircleStop onClick={onStop} /> : <FaRegCirclePlay onClick={onPlay} />}
        </button>
        <button disabled={currentSnapshot >= totalSnapshots - 1} onClick={onForwardOneStep} className={buttonClasses}>
          <FaForwardStep />
        </button>
        <button disabled={currentSnapshot >= totalSnapshots - 1} onClick={onForwardToEnd} className={buttonClasses}>
          <FaForwardFast />
        </button>
      </div>
      <div>
        <ul className="flex justify-center font-bold mt-2">
          <li className={`${speedButtonClass} ${selectedSpeedButton == 1 && "border-2 rounded-lg border-black dark:border-white dark:border-opacity-20 border-opacity-20"}`} onClick={() => {onSetDelay(delay["0.25x"]); setSelectedSpeedButton(1);}}>0.25x</li>
          <li className={`${speedButtonClass} ${selectedSpeedButton == 2 && "border-2 rounded-lg border-black dark:border-white dark:border-opacity-20 border-opacity-20"}`} onClick={() => {onSetDelay(delay["0.5x"]); setSelectedSpeedButton(2);}}>0.5x</li>
          <li className={`${speedButtonClass} ${selectedSpeedButton == 3 && "border-2 rounded-lg border-black dark:border-white dark:border-opacity-20 border-opacity-20"}`} onClick={() => {onSetDelay(delay["1x"]); setSelectedSpeedButton(3);}}>1x</li>
          <li className={`${speedButtonClass} ${selectedSpeedButton == 4 && "border-2 rounded-lg border-black dark:border-white dark:border-opacity-20 border-opacity-20"}`} onClick={() => {onSetDelay(delay["2x"]); setSelectedSpeedButton(4);}}>2x</li>
          <li className={`${speedButtonClass} ${selectedSpeedButton == 5 && "border-2 rounded-lg border-black dark:border-white dark:border-opacity-20 border-opacity-20"}`} onClick={() => {onSetDelay(delay["4x"]); setSelectedSpeedButton(5);}}>4x</li>
        </ul>
      </div>
    </div>
  )
}

export default VisualizerControls