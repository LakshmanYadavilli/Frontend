import React, { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../utils/userSlice";
import functions from "../utils/functionalities";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { set, clear } = functions;

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const fetchApi = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      //   console.log({ status: res.ok });
      const data = await res.json();
      //   console.log({ data });
      if (data.status) {
        console.log("navigate to Home");
        // localStorage.setItem("token", data.token);
        localStorage.setItem("username", credentials.username);
        enqueueSnackbar("Successfully Signup..", { variant: "success" });
        set();
        navigate("/home");
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }

      console.log({ data });
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  h-screen">
      <form
        className="bg-black border-2 border-solid w-[30vw] h-[50vh]   flex flex-col justify-center items-center "
        onSubmit={(e) => {
          e.preventDefault();

          fetchApi();

          //   setCredentials({ username: "", password: "", email: "" });
        }}
      >
        <input
          type="text"
          required
          className="bg-gray-500 text-black p-2 w-[80%]"
          placeholder="Enter UserName:"
          value={credentials.username}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <br />
        <input
          type="email"
          placeholder="Enter Email:"
          required
          className="bg-gray-500 text-black p-2 w-[80%]"
          value={credentials.email}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <br />
        <input
          className="bg-gray-500 text-black p-2 w-[80%]"
          type="password"
          required
          placeholder="Enter Password:"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <br />
        <button className="bg-blue-600 w-20 rounded-md" type="submit">
          Signup
        </button>
        <p className="text-white">
          Already User?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login Now.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
