import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import functions from "../utils/functionalities";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const { set, clear, get } = functions;

const clearCookie = async () => {
  try {
    const res = await axios.get("http://localhost:3000/user/clear-token", {
      credentials: true,
    });
    // const res = await fetch("http://localhost:3000/user/clear-token", {
    //   credentials: true,
    // });
    // const data = await res.json();
    // console.log("clearCookie", data);
    console.log({ res });
  } catch (e) {
    console.log({ e });
  }
};

const Home = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const fetchApi = async () => {
    try {
      const username = localStorage.getItem("username");
      const token = await get();

      console.log(typeof token, "from Frontend");
      const res = await axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUsers(res.data);
      // const data = await res.json();
      // async function token() {
      //   const res = await get();
      //   console.log({ res });
      // }
      // token();
      // console.log({ token });
    } catch (e) {
      console.log({ e });
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div>
      <button
        className="absolute right-4 top-2 bg-red-600"
        onClick={() => {
          localStorage.clear();
          enqueueSnackbar("Successfully Log Out..", { variant: "success" });
          clear();
          navigate("/");
        }}
      >
        Log Out
      </button>
      {/* <div>
        <button
          className="w-20 h-8 bg-red-500 p-2 rounded-md m-2 text-xl font-bold"
          onClick={set}
        >
          set
        </button>
        <button
          className="w-20 h-8 bg-red-500 p-2 rounded-md m-2 text-xl font-bold"
          onClick={get}
        >
          get
        </button>
        <button
          className="w-20 h-8 bg-red-500 p-2 rounded-md m-2 text-xl font-bold"
          onClick={clear}
        >
          clear
        </button>
      </div> */}
      <div>
        {users.map((item) => (
          <div key={item._id} className="m-2 p-2 border-2 w-[40%] ml-[30%]">
            <p>Username:{item.username}</p>
            <p>Email:{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
