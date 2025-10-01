import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/slices/filterSlice";
import type { RootState } from "../redux/store";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      Search:{" "}
      <input value={filter} onChange={handleChange} placeholder="search..." />
    </div>
  );
};

export default Filter;
