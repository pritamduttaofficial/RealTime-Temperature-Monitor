import React, { useState } from "react";
import TemperatureGraph from "../components/TemperatureGraph";

const Home: React.FC = () => {
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [minTemp, setMinTemp] = useState<number>(0);
  const [maxTemp, setMaxTemp] = useState<number>(0);
  const [avgTemp, setAvgTemp] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleUpdateStats = (
    current: number,
    min: number,
    max: number,
    avg: number
  ) => {
    setCurrentTemp(current);
    setMinTemp(min);
    setMaxTemp(max);
    setAvgTemp(avg);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`container mx-auto p-4 ${
        darkMode ? "bg-slate-950 text-white" : "bg-white text-black"
      } transition-all duration-300`}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-500 inline-block text-transparent bg-clip-text">
          Temperature Dashboard
        </h1>
        <label
          htmlFor="AcceptConditions"
          className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
        >
          <input
            type="checkbox"
            id="AcceptConditions"
            className="peer sr-only"
            onChange={toggleDarkMode}
            checked={darkMode}
          />
          <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6"></span>
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center w-full h-64 mb-2">
        <div
          className={`relative border h-full w-full flex flex-col items-center justify-center rounded ${
            darkMode
              ? "bg-slate-900 border-slate-700 hover:bg-slate-950"
              : "bg-gray-100 border-gray-300 hover:bg-gray-200 "
          }  duration-200`}
        >
          <p className="absolute right-1 top-1 sm:top-1 sm:inset-x-auto opacity-70 font-semibold text-sm">
            Current Temp
          </p>
          <p className="text-6xl sm:text-9xl font-mono text-green-500">
            {currentTemp}
            <span className="text-4xl ml-4">°C</span>
          </p>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center gap-2">
          <div
            className={`relative h-full w-full flex items-center justify-center rounded border ${
              darkMode
                ? "bg-slate-900 border-slate-700 hover:bg-slate-950"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }  duration-200`}
          >
            <p className="absolute right-1 top-1 sm:top-1 sm:inset-x-auto opacity-70 font-semibold text-sm">
              Max Temp
            </p>
            <p className="text-6xl font-mono text-blue-600">
              {maxTemp}
              <span className="text-2xl ml-4">°C</span>
            </p>
          </div>
          <div
            className={`relative h-full w-full flex items-center justify-center rounded border ${
              darkMode
                ? "bg-slate-900 border-slate-700 hover:bg-slate-950"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }  duration-200`}
          >
            <p className="absolute right-1 top-1 sm:top-1 sm:inset-x-auto opacity-70 font-semibold text-sm">
              Min Temp
            </p>
            <p className="text-6xl font-mono text-blue-600">
              {minTemp}
              <span className="text-2xl ml-4">°C</span>
            </p>
          </div>
        </div>
        <div
          className={`relative border h-full w-full flex items-center justify-center rounded ${
            darkMode
              ? "bg-slate-900 border-slate-700 hover:bg-slate-950"
              : "bg-gray-100 border-gray-300 hover:bg-gray-200"
          }  duration-200`}
        >
          <p className="absolute right-1 top-1 sm:top-1 sm:inset-x-auto opacity-70 font-semibold text-sm">
            Avg Temp
          </p>
          <p className="text-6xl sm:text-9xl font-mono text-green-500">
            {avgTemp.toFixed(1)}
            <span className="text-4xl ml-4">°C</span>
          </p>
        </div>
      </div>
      <div
        className={`border border-slate-700 rounded p-2 ${
          darkMode ? "border-slate-700" : "border-gray-300"
        }`}
      >
        <TemperatureGraph
          onUpdateStats={handleUpdateStats}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Home;
