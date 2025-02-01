import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();

  return (
    <label className={styles.searchLabel}>
      Find contacts by name:
      <input
        type="text"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </label>
  );
};

export default SearchBox;
