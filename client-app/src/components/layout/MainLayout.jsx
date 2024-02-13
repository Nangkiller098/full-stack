import { Link, Outlet, useNavigate } from "react-router-dom";
const MainLayout = () => {
  const navigate = useNavigate();
  const onClickHome = () => {
    navigate("");
  };
  const onCLickLogin = () => {
    navigate("login");
  };
  const onClickRegister = () => {
    navigate("register");
  };
  return (
    <div>
      <div>
        <div>Brand Name</div>
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
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
