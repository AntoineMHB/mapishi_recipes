import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {/* <TopNavBar /> */}
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
