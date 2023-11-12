import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useReclamoForm } from "../context/formReclamoContext";

function BasicSelect({ itemsValues, label, handleChange, inputKey }) {
  const { formFields } = useReclamoForm();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          sx={{ height: "3rem" }}
          label={label}
          value={formFields[inputKey].value ? formFields[inputKey] : null}
          onChange={event => handleChange(inputKey, event.target.value)}
        >
          {itemsValues.map(currentItem => (
            <MenuItem key={currentItem.id} value={currentItem}>
              {currentItem.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
