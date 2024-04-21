import { useState, useEffect } from "react";

interface Props {
  currentValue?: string;
  label: string;
  onTimeChange: (newTime: string) => void;
}

export default function TimePicker({
  currentValue,
  label,
  onTimeChange,
}: Props) {
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
        setHour(formattedHours.toString());
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
  }, [currentValue]);

  const revertTo24Hour = (hour: string) => {
    if (ampm === "AM") {
      return hour === "12" ? "00" : hour;
    } else {
      return hour === "12" ? hour : (parseInt(hour) + 12).toString();
    }
  };

  const handleTimeChange = () => {
    const newHour = revertTo24Hour(hour);
    const newMinute = minute.padStart(2, "0");
    const newSecond = second.padStart(2, "0");
    const newTime = `${newHour}:${newMinute}:${newSecond}`;
    onTimeChange(newTime);
  };

  return (
    <div className="flex flex-row items-center text-sm m-1">
      <h1 className="text-m text-darkGreen">{label}</h1>
      <div className="flex flex-col items-center m-1">
        <h1 className="text-darkGreen">Hour</h1>
        <select
          id="hourDropdown"
          className="preline-dropdow text-darkGreen"
          value={hour}
          onChange={(e) => {
            setHour(() => e.target.value);
            handleTimeChange();
          }}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center m-1">
        <h1 className="text-darkGreen">Minute</h1>
        <select
          id="minuteDropdown"
          className="preline-dropdow text-darkGreen"
          value={minute}
          onChange={(e) => {
            setMinute(e.target.value);
            handleTimeChange();
          }}
        >
          {[...Array(12).keys()].map((i) => (
            <option key={i * 5} value={(i * 5).toString()}>
              {i * 5}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center m-1">
        <h1 className="text-darkGreen">Second</h1>
        <select
          id="secondDropdown"
          className="preline-dropdow text-darkGreen"
          value={second}
          onChange={(e) => {
            setSecond(e.target.value);
            handleTimeChange();
          }}
        >
          {[...Array(6).keys()].map((i) => (
            <option key={i * 10} value={(i * 10).toString()}>
              {i * 10}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center m-1">
        <h1 className="text-darkGreen">AM/PM</h1>
        <select
          id="secondDropdown"
          className="preline-dropdow text-darkGreen"
          value={ampm}
          onChange={(e) => {
            setAmpm(e.target.value);
            handleTimeChange();
          }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}
