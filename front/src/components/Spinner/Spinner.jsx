import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: "2",
  borderColor: "red",
};

function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <RingLoader color={color} loading={loading} cssOverride={override} size={100} aria-label="Loading Spinner" />
    </div>
  );
}

export default Spinner;