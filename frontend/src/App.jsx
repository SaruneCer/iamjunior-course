import { Topbar } from "./components/Topbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
      <Topbar />
      <Outlet />
        <Footer />
        </UserProvider>
    </div>
  );
}

export default App;
