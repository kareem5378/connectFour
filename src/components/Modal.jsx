import React from "react";

const Modal = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <h2>{message}</h2>
        <button
          onClick={onClose}
          style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
