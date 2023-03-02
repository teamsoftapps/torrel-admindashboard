import { useState, useEffect } from "react";
// import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { api } from "../services/api";
// import { useAuthContext } from "./useAuthContext";

export const useFetch = (url, method = "GET") => {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  // const [newData, setNewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  // console.log("User__token>>>>", user.data.token);

  const apiData = (formData) => {
    console.log("formData", formData);
    setOptions(formData);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (Api, payload) => {
      setIsLoading(true);
      setError(null);
      //   let api = null;
      try {
        // if (method == "GET") {
        //   api = axios.get;
        // }
        // if (method == "POST") {
        //   api = axios.post;
        // }
        // if (method == "PATCH") {
        //   api = axios.patch;
        // }
        // if (method == "DELETE") {
        //   api = axios.delete;
        // }

        // if (!user) {
        //   return alert("Please logged in to get access!");
        // }

        const { data } = await Api(url, payload, {
          signal: controller.signal,
          // headers: {
          //   Authorization: `Bearer ${user?.data?.token}`,
          // },
        });
        if (data) {
          console.log("Fetched__Data>>>>>", data);
          setData(data);
          // setNewData(data);
        }
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setError(error);
      }
    };

    if (method == "GET") {
      fetchData(api.get);
    }
    if (method == "POST" && options) {
      fetchData(api.post, options);
    }
    if (method === "PATCH" && options) {
      fetchData(api.patch, options);
    }
    if (method == "DELETE") {
      fetchData(api.delete);
    }
    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isLoading, error, apiData };
};
