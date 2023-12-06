import { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultiSelectProps {
  field?: any;
  array: { name: string; value: string | number }[];
  name: string;
  onMultiSelectChange?: (value) => void;
  reset?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  field,
  array,
  name,
  onMultiSelectChange,
  reset,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (onMultiSelectChange) {
      onMultiSelectChange(value);
    }

    if (field) {
      field.onChange(value);
    }
  };

  useEffect(() => {
    if (reset) {
      setPersonName([]);
    }
  }, [reset]);

  return (
    <div>
      <FormControl sx={{ width: "100%", minWidth: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{name}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected: (string | number)[]) => {
            const selectedLabels = array
              .sort((a, b) => a.value - b.value)
              .filter((item) => selected.includes(item.value))
              .map((item) => item.name);

            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selectedLabels.map((label) => (
                  <Chip key={label} label={label} />
                ))}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {array.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              style={getStyles(item.name, personName, theme)}
            >
              {item.name.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelect;
