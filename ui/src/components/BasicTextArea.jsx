import React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useReclamoForm } from "../context/formReclamoContext";

const textareaStyles = {
  width: "100%",
  fontFamily: "IBM Plex Sans, sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: "1.5rem",
  padding: "12px",
  borderRadius: "12px 12px 0 12px",
  color: "#000",
  background: "#fff",
  border: "1px solid #ccc",
  boxShadow: "0px 2px 2px #f0f0f0",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

const hoverStyles = {
  borderColor: "#007bff",
};

const focusStyles = {
  borderColor: "#007bff",
  boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.2)",
};

export default function BasicTextArea({ textToShow, handleChange, inputKey }) {
  const { formFields } = useReclamoForm();

  return (
    <TextareaAutosize
      placeholder={textToShow}
      value={formFields[inputKey] || null}
      maxLength={300}
      onChange={event => handleChange(inputKey, event.target.value)}
      style={{
        ...textareaStyles,
        "&:hover": hoverStyles,
        "&:focus": focusStyles,
      }}
    />
  );
}
