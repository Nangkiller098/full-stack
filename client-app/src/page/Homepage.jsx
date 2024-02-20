import { useEffect, useState } from "react";
import { request } from "../config/request";
const HomePage = () => {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getListCategory();
  }, []);

  const getListCategory = async () => {
    const res = await request("customer/getlist", "GET", {});
    if (res) {
      setList(res.list);
      setMessage("Data has been Get");
      setRole("");
    }
    console.log(res);
  };

  return (
    <>
      <div>
        <h1>HomePage</h1>
        <h1>message : {message}</h1>
        <h1>role : {role + ""}</h1>
        <h1>List : {list.length}</h1>
        {list.length > 0 && (
          <h1>
            Username : {list[0].Firstname}-{list[0].Lastname}
          </h1>
        )}
        <div>
          {list.map((item, index) => (
            <div key={item.Id}>
              <div style={{ backgroundColor: "green" }}>
                <div>
                  {index + 1}. {item.Firstname}-{item.Lastname}
                </div>
                <div>Gender : {item.Gender}</div>
                <div>Contact : {item.Tel}</div>
                <div>Email : {item.Email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
