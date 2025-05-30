import { useState } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);

  // after the first render, fetch our data

  const fetchData = async (url) => {
    try {
      let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
      console.log("Fetching:", url);
      const item = { ...res.data, id: uuid() }
      setResponse((prev) => [...prev, item ]);
      return item
    } catch (error) {
      setError(error);
    }
  };

  return { response, error, fetchData };
};

export default useAxios;
