import React, { useState, useRef, useEffect } from "react";
import functions from "../utils/functionalities";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { set, clear } = functions;
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const ref = useRef("");
  const firstRender = useRef(true);

  async function verifyUser() {
    try {
      const url = "http://localhost:3000/user/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.verified) {
        enqueueSnackbar("Successfully Login..", { variant: "success" });
        localStorage.setItem("username", credentials.username);
        // localStorage.setItem("token", data.token);
        set();
        navigate("/home");
      } else {
        console.log("else", data);
        enqueueSnackbar(data.message, { variant: "error" });
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center  h-screen">
      <form
        className="bg-black border-2 border-solid w-[30vw] h-[40vh]   flex flex-col justify-center items-center "
        onSubmit={(e) => {
          e.preventDefault();
          console.log({ credentials });
          verifyUser();
          setCredentials({ username: "", password: "" });
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
          Login
        </button>
        <p className="text-white">
          New User?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up Now.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
