import { useEffect, useState } from "react";

const useFetchAPI = (params, callbackCallAPI) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchAPI = async () => {
    setLoading(false);
    try {
      const response = await callbackCallAPI(params);
      if (response?.data.result) {
        setData(response?.data?.data);
      }
      setMsg(response?.data?.msg);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAPI();
    })();
  }, []);

  return { loading, data, msg };
};

export default useFetchAPI;
