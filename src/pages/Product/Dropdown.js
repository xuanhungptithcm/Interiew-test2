import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, ListItemText } from "@mui/material";

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
// function getStyles(item, itemSelected, theme) {
//   return {
//     fontWeight: itemSelected.find(({ key }) => key === item.key)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }
export default function MultipleSelectChip({ list = [], setFilter , priceFrom}) {
  const theme = useTheme();
  const [itemSelected, setItemSelected] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const isExists =
      value.filter((item) => {
        return itemSelected.find((v) => v.key === item.key);
      }).length === itemSelected.length;

    if (isExists) {
      setItemSelected(value);
      setFilter(value);
    } else {
      setItemSelected(value);
      setFilter(value);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, margin: 0 }} fullWidth margin="none">
        <InputLabel id="demo-multiple-chip-label">Lọc</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={itemSelected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(({ key, name }) => (
                <Chip key={key} label={name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {list
            ?.filter(({ isSearchable }) => !!isSearchable)
            .map((item) => (
              <MenuItem key={item.key} value={item}>
                <Checkbox
                  checked={!!itemSelected.find(({ key }) => key === item.key)}
                />
                <ListItemText primary={item?.name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
