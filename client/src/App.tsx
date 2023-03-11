import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import Generator from "./components/Generator";
import {fetchGridData} from "./api/api";
import Display from "./components/DigitCode";
import CharacterInput from "./components/CharacterInput";
import Notification from "./components/Notification";

function App() {
  const initialGridValue = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ];
  const [gridData, setGridData] = useState<string[][]>(initialGridValue);
  const [code, setCode]         = useState<string>('');
  const [bias, setBias]         = useState<string>('');
  const [isGeneratorClicked, setIsGeneratorClicked] = useState(false);
  const [lastInputTime, setLastInputTime]           = useState<number>(0);
  const [lastNotification, setLastNotification] = useState<{ message: string; color?: string } | null>(null);

  const handleInputChange = (value: string) => {
    const now = new Date().getTime();
    if (now - lastInputTime < 4000) {
      setLastNotification({ message: 'Cannot type a random character so soon after the last input', color: "red" });
      return;
    }

    if (value.match(/[a-z]/i) || value.length === 0) {
      if (value.length === 0){
        setLastNotification({ message: `No Bias set` });
      } else{
        setLastNotification({ message: `Bias set to ${value}` });
      }
      setBias(value);
    } else {
      setLastNotification({ message: 'Invalid input: must be an alphabetic character', color: "red" });
    }

    setLastInputTime(now);

    // Remove the notification after a delay
    setTimeout(() => {
      setLastNotification(null);
    }, 2000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGeneratorClicked) {
      interval = setInterval(async () => {
        await handleGenerateClick();
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [handleGenerateClick, isGeneratorClicked]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleGenerateClick() {
    setIsGeneratorClicked(true);
    const data = await fetchGridData(bias.toLowerCase());
    
    setGridData(Object.values(data.grid));
    setCode(data.code);
  }

  const handleNotificationRemove = () => {
    setLastNotification(null);
  };

  return (
    <div className="app-container">
      <Generator onClick={handleGenerateClick} />

      <CharacterInput onChange={handleInputChange} />
      {lastNotification && (
      <Notification
        message={lastNotification.message}
        color={lastNotification.color}
        onRemove={handleNotificationRemove}
      />
    )}

      {gridData.length > 0 && <Grid data={gridData} />}

      <Display code={code} />
    </div>
  );
}

export default App;