import React, { useState, useEffect, useRef } from 'react';
import { generateArray, delay, DEFAULT, ALGORITHM, generateAlgorithmData } from '../code/utilities';
import { motion } from "framer-motion"
import VisualizerControls from './VisualizerControls';
import Header from './Header';
import Footer from './Footer';

function getStateColor(state) {
  switch (state) {
    case "sorted":
      return "bg-lime-500";
    case "swapping":
      return "bg-red-500";
    case "comparing":
      return "bg-yellow-500";
    default:
      return "bg-slate-500";
  }
}

function Visualizer({ darkMode, toggleDarkMode }) {
  const [algorithmData, setAlgorithmData] = useState(() => generateAlgorithmData(ALGORITHM.SELECTION.ID));
  const [currentSnapshot, setCurrentSnapshot] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const timer = useRef(null);
  const speed = useRef(delay["1x"]);

  useEffect(() => {
    stop();
    setCurrentSnapshot(0);
  }, [algorithmData]);

    useEffect(() => {
    if (currentSnapshot >= algorithmData.snapshots.length - 1) {
      stop();
    }
  }, [currentSnapshot]);

  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(() => {
        setCurrentSnapshot((value) => value + 1);
      }, speed.current);
    } else {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [isPlaying]);

  function setAlgorithm(id) {
    setAlgorithmData(generateAlgorithmData(id))
  }

  const play = () => {
    setIsPlaying(true);
  }

  const stop = () => {
    setIsPlaying(false);
  }

  const backwardToStart = () => {
    setIsPlaying(false);
    setCurrentSnapshot(0);
  }

  const backwardOneStep = () => {
    setIsPlaying(false);
    setCurrentSnapshot((value) => value - 1);
  }

  const forwardOneStep = () => {
    setIsPlaying(false);
    setCurrentSnapshot((value) => value + 1);
  }

  const forwardToEnd = () => {
    setIsPlaying(false);
    setCurrentSnapshot(algorithmData.snapshots.length - 1);
  }

  function setDelay(newSpeed) {
    speed.current = newSpeed;
    if (isPlaying) {
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setCurrentSnapshot((value) => value + 1);
      }, speed.current);
    }
  }

  return (
    <>
    <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} setAlgorithm={setAlgorithm} algorithmName={algorithmData.name} />
      <div className="mt-[50px] mb-[50px] ml-2 mr-2 p-2 bg-gray-200 dark:bg-slate-800 h-screen">
        <div className="flex items-end gap-2 h-[65%]">
          {algorithmData.snapshots[currentSnapshot]?.map((snapshot, index) => (
            <motion.div
              key={algorithmData.options.key == "value" ? snapshot.value : index}
              className={`w-[100%] border-2 border-slate-600  dark:border-slate-700 transition-colors ${getStateColor(snapshot.state)}`}
              style={{height: `${snapshot.value / DEFAULT.ARR_SIZE * 100}%`, transitionDuration: `${speed.current * 0.5}ms`}}
              layout
              transition={{ duration: `${speed.current / 1000 }` }}
            />
          ))}
        </div>
        <VisualizerControls
          isPlaying={isPlaying}
          onPlay={play}
          onStop={stop}
          onBackwardToStart={backwardToStart}
          onBackwardOneStep={backwardOneStep}
          onForwardOneStep={forwardOneStep}
          onForwardToEnd={forwardToEnd}
          onSetDelay={setDelay}
          currentSnapshot={currentSnapshot}
          totalSnapshots={algorithmData.snapshots.length}
        />
        <div>
          <h1></h1>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default Visualizer