import TableEntry from "./TableEntry.tsx";
import { DataEntry } from "../types/Data.ts";

function DataTable({ data }: {data: DataEntry[]}) {
  return (
    <table className="text-4xl text-[#0039FE]">
      <thead>
        <tr>
          <th>Time</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>pH</th>
          <th>Light Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <TableEntry data={entry} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
