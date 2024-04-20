import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import moment from "moment";

interface Props {
  currentValue?: string;
}

export default function PollingOptions({ currentValue }: Props) {
  return (
    <div className="w-fit">
      <MultiSectionDigitalClock
        ampm={false}
        value={moment("18:00:00")}
        views={["hours", "minutes", "seconds"]}
        slotProps={{
          digitalClockSectionItem: {
            style: {
              maxHeight: "30px",
            },
          },
        }}
      />
      ;
    </div>
  );
}
