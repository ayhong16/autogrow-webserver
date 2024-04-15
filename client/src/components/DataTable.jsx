import TableEntry from "./TableEntry.jsx";
import PropTypes from "prop-types";

function DataTable({ data }) {
  return (
    <table>
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

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      humd: PropTypes.number.isRequired,
      pH: PropTypes.number.isRequired,
      light: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default DataTable;
