import { Link, Outlet } from "react-router-dom";
import { NavbarSimple } from "./NavbarWithSearch";
const MainLayout = () => {
  const fullname = localStorage.getItem("fullname");
  return (
    <>
      <div>
        <div>Brand Name</div>
        <div>User Login:{fullname}</div>
        <div className="">
          <Link to={"/"} className=" p-2">
            <button className="">Homepage</button>
          </Link>
          <Link to={"/login"} className=" p-2">
            <button>Login</button>
          </Link>
          <Link to={"/register"} className=" p-2">
            <button>Register</button>
          </Link>
        </div>
        <NavbarSimple />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
