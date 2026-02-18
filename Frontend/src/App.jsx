import Routing from "./routes/Routing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./features/auth/AuthActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <>
      <Routing />
    </>
  );
};

export default App;
