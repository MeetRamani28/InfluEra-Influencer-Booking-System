import { Outlet } from "react-router-dom";
import Navbar from "../components/molecules/Navbar";
import Footer from "../components/molecules/Footer";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
