import React, { useState } from 'react';

const TimePicker: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinute(event.target.value);
  };

  // Generate options for hours (00 to 23)
  const hourOptions: JSX.Element[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    hourOptions.push(<option key={hour} value={hour}>{hour}</option>);
  }

  // Generate options for minutes (00 to 59)
  const minuteOptions: JSX.Element[] = [];
  for (let i = 0; i < 60; i += 15) {
    const minute = i.toString().padStart(2, '0');
    minuteOptions.push(<option key={minute} value={minute}>{minute}</option>);
  }

  return (
    <div>
      <label htmlFor="hour">Hour:</label>
      <select id="hour" value={selectedHour} onChange={handleHourChange}>
        {hourOptions}
      </select>

      <label htmlFor="minute">Minute:</label>
      <select id="minute" value={selectedMinute} onChange={handleMinuteChange}>
        {minuteOptions}
      </select>

      <p>Selected Time: {selectedHour}:{selectedMinute}</p>
    </div>
  );
};

export default TimePicker;
