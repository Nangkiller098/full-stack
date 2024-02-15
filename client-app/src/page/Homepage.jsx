import { useEffect, useState } from "react";
import axios from "axios";
const HomePage = () => {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [a, setA] = useState(undefined);

  useEffect(() => {
    getListCategory();
  }, []);

  const getListCategory = () => {
    axios({
      url: "http://localhost:8081/api/customer/getlist",
      method: "get",
      data: {
        // Fistname:"Dara",
        // Gender:"Dara",
      },
    })
      .then((res) => {
        console.log(res.data);
        setList(res.data.list);
        setMessage(res.data.message);
        setRole(res.data.role); //
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>HomePage</h1>
      <h1>message : {message}</h1>
      <h1>role : {role + ""}</h1>
      <h1>List : {list.length}</h1>
      {a && <h1>a : {a.name}</h1>}
      <h1>a : {a?.name}</h1>
      {list.length > 0 && (
        <h1>
          Username : {list[0].Firstname}-{list[0].Lastname}
        </h1>
      )}
      <div>
        {list.map((item, index) => (
          <>
            <div
              style={{ padding: 10, backgroundColor: "green", marginTop: 10 }}
            >
              <div>
                {index + 1}. {item.Firstname}-{item.Lastname}
              </div>
              <div>Gender : {item.Gender}</div>
              <div>Contact : {item.Tel}</div>
              <div>Email : {item.Email}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
