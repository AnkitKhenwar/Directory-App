import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect({ countries, handleChange, country }) {
  return (
    <Box
      sx={{
        minWidth: 300,
        "@media (max-width:448px)": {
          width: "100%",
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Countries</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleChange}
          sx={{ height: "50px" }}
        >
          <MenuItem disabled>Select Country</MenuItem>
          {countries?.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
