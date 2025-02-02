import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(filter);

  // Дебаунсинг ввода
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(changeFilter(inputValue));
    }, 300); // Задержка в 300 мс

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Find contacts by name or number"
        variant="outlined"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </Box>
  );
};

export default SearchBox;
