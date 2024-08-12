import { Topbar } from "./components/Topbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
