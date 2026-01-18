import "./App.css";
import { TopNavBar } from "./components/TopNavBar";
import Home from "./pages/Home";
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
