import React from "react";
import DatePicker from "react-datepicker";
import { Typography, Box } from "@mui/material";
import us from "date-fns/locale/en-US";
import "react-datepicker/dist/react-datepicker.css";

const CalendarSelector = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#17B9DD",
        padding: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6" color="#17B9DD" fontWeight="bold">
          Start
        </Typography>
        <DatePicker
          sx={{ backgroundColor: "#f0f0f0" }}
          locale={us}
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={date1 => setStartDate(date1)}
        />
      </Box>
      <Box>
        <Typography variant="h6" color="#859194" fontWeight="bold">
          End
        </Typography>{" "}
        <DatePicker
          locale={us}
          dateFormat="yyyy/MM/dd"
          selected={endDate}
          onChange={date2 => setEndDate(date2)}
        />
      </Box>
    </Box>
  );
};

export default CalendarSelector;
