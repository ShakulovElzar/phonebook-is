import axios from "axios";

export const useFetching = async (
  dataToSend,
  setData,
  path,
  type,
  setErrorMessage
) => {
  const accessToken = localStorage.getItem("atoken");
  switch (type) {
    case "get":
      await axios
        .get(`http://10.200.24.103:8089/${path}`, {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
        .then(response => {
          setData(response.data);
        })
        .catch(error => setErrorMessage(error));
      break;
    case "post":
      await axios
        .post(`http://10.200.24.103:8089/${path}`, dataToSend, {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
        .catch(error => setErrorMessage(error));
      break;
    case "patch":
      await axios
        .patch(`http://10.200.24.103:8089/${path}`, dataToSend, {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
        .catch(error => setErrorMessage(error));
      break;
    case "delete":
      await axios
        .delete(`http://10.200.24.103:8089/${path}`, {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
        .catch(error => setErrorMessage(error));
      break;
    default:
      break;
  }
};
