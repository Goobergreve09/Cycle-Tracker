import { Outlet } from "react-router-dom";
import NavbarComponent from "./Components/Navbar";


function App() {
  return (
    <>
    <NavbarComponent />
      <Outlet />
    </>
  );
}

export default App;