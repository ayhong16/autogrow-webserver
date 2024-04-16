import { DataEntry } from "../types/Data.ts";

export default function TableEntry({ data }: { data: DataEntry }) {
  return (
    <>
      <td>{data.time}</td>
      <td>{data.temp}</td>
      <td>{data.humd}</td>
      <td>{data.ph}</td>
      <td>{data.light ? "On" : "Off"}</td>
    </>
  );
}
