import axios from "axios";
const set = async () => {
  const res = await axios.get("http://localhost:3000/user/set", {
    withCredentials: true,
  });
  console.log({ res });
};

const get = async () => {
  const res = await axios.get("http://localhost:3000/user/get", {
    withCredentials: true,
  });
  console.log({ res });
  return res.data.token;
};

const clear = async () => {
  const res = await axios.get("http://localhost:3000/user/clear", {
    withCredentials: true,
  });
  console.log({ res });
};

export default { set, get, clear };
