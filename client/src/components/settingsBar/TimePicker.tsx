import { useState, useEffect } from "react";

interface Props {
  currentValue?: string;
  label: string;
}

export default function TimePicker({ currentValue, label }: Props) {
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [second, setSecond] = useState<string>("");
  const [ampm, setAmpm] = useState<string>("");

  const splitTime = (time: string) => {
    const [h, m, s] = time.split(":");
    setHour(h);
    setMinute(m);
    setSecond(s);

    let ampmValue;
    let formattedHours = parseInt(h);
    if (formattedHours >= 12) {
      ampmValue = "PM";
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    } else {
      ampmValue = "AM";
      if (formattedHours === 0) {
        formattedHours = 12;
      }
    }
    setAmpm(ampmValue);
  };

  useEffect(() => {
    if (currentValue) {
      splitTime(currentValue);
    }
  });

  return (
    <div className="flex flex-row items-center text-sm m-1">
      <h1 className="text-m text-darkGreen">{label}:</h1>
      <div className="flex flex-col items-center m-1">
        <label htmlFor="hourDropdown" className="text-darkGreen">
          Hour
        </label>
        <select
          id="hourDropdown"
          className="preline-dropdow text-darkGreen"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center m-1">
        <label htmlFor="minuteDropdown" className="text-darkGreen">
          Minute
        </label>
        <select
          id="minuteDropdown"
          className="preline-dropdow text-darkGreen"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i * 5} value={(i * 5).toString()}>
              {i * 5}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center m-1">
        <label htmlFor="secondDropdown" className="text-darkGreen">
          Second
        </label>
        <select
          id="secondDropdown"
          className="preline-dropdow text-darkGreen"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        >
          {[...Array(6).keys()].map((i) => (
            <option key={i * 10} value={(i * 10).toString()}>
              {i * 10}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center m-1">
        <label htmlFor="ampmDropdown" className="text-darkGreen">
          AM/PM
        </label>
        <select
          id="secondDropdown"
          className="preline-dropdow text-darkGreen"
          value={ampm}
          onChange={(e) => setAmpm(e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}
