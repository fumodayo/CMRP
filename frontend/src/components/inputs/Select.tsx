import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const Select = ({ field, onSelectChange }) => {
  const locations = ["online", "offline", "hybrid"];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Loại
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: field.name,
            id: "uncontrolled-native",
          }}
          defaultValue={locations[0]}
          value={field.value}
          onChange={(e) => {
            const data = e.target.value;
            field.onChange(data);
            onSelectChange(data);
          }}
        >
          {locations.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
