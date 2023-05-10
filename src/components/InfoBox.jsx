import React from "react";

const InfoBox = ({ title, value, unit, Icon }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // border: "2px solid white",
        marginBottom: "2rem",
        borderRadius: "2rem",
      }}
      className="info__container"
    >
      <h1 style={{ fontWeight: "500", fontSize: "3rem" }}>{value}</h1>
      <div>{Icon}</div>

      <p>{title}</p>
      <p style={{ marginTop: "-1rem" }}> ({unit})</p>
    </div>
  );
};

export default InfoBox;
