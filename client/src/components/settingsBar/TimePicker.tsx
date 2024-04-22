interface Props {
  currentTime?: moment.Moment;
  label: string;
  onTimeChange: (newTime: string) => void;
}

export default function TimePicker({
  currentTime,
  label,
  onTimeChange,
}: Props) {
  if (!currentTime) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-row items-center text-sm m-1">
      <h1 className="text-m text-darkGreen">{label}</h1>
      <div className="flex flex-col items-center m-1">
        <h1 className="text-darkGreen">Hour</h1>
        <select
          id="hourDropdown"
          className="preline-dropdow text-darkGreen"
          value={currentTime?.format("h")}
          onChange={(e) => {
            const newHour = parseInt(e.target.value);
            const oldHour = currentTime?.hour();
            currentTime?.hour(newHour);
            if (oldHour! >= 12) {
              const updatedTime = currentTime!.clone().add(12, "hours");
              onTimeChange(updatedTime?.format("HH:mm:ss") || "");
            } else {
              onTimeChange(currentTime?.format("HH:mm:ss") || "");
            }
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
          value={currentTime?.format("m")}
          onChange={(e) => {
            currentTime?.minute(parseInt(e.target.value));
            onTimeChange(currentTime?.format("HH:mm:ss") || "");
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
          value={currentTime?.format("s")}
          onChange={(e) => {
            currentTime?.second(parseInt(e.target.value));
            onTimeChange(currentTime?.format("HH:mm:ss") || "");
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
          value={currentTime?.format("A")}
          onChange={(e) => {
            const newAmPm = e.target.value;
            let updatedTime;

            if (newAmPm === "AM") {
              // Set the time to the same hour but in the morning (AM)
              updatedTime = currentTime!.clone().subtract(12, "hours");
            } else {
              console.log("PM");
              // Set the time to the same hour but in the afternoon (PM)
              updatedTime = currentTime!.clone().add(12, "hours");
              console.log(updatedTime.format("HH:mm:ss"));
            }

            // Update the time in the parent component
            onTimeChange(updatedTime.format("HH:mm:ss"));
          }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}
