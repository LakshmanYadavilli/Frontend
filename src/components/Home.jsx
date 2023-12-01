import React, { useRef, useEffect } from "react";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// const fetchApi = async () => {
//   try {
//     const username = localStorage.getItem("username");
//     const res = await fetch("http://localhost:3000/user/get/" + username);
//     const data = await res.json();
//     console.log({ data });
//   } catch (e) {
//     console.log({ e });
//   }
// };

const clearCookie = async () => {
  try {
    const res = await fetch("http://localhost:3000/user/clear-token");
    const data = await res.json();
    console.log("clearCookie", data);
    console.log({ data });
  } catch (e) {
    console.log({ e });
  }
};
const Home = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    // fetchApi();
  }, []);
  return (
    <div>
      <button
        className="absolute right-4 top-2 bg-red-600"
        onClick={() => {
          localStorage.clear();
          enqueueSnackbar("Successfully Log Out..", { variant: "success" });
          clearCookie();
          navigate("/");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
