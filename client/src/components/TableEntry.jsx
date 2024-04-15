import PropTypes from "prop-types";

function TableEntry({ data }) {
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

TableEntry.propTypes = {
  data: PropTypes.shape({
    time: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    humd: PropTypes.number.isRequired,
    ph: PropTypes.number.isRequired,
    light: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TableEntry;
