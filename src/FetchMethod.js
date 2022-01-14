import { URLDATA } from "./Config";

const token = localStorage.getItem("token");

export const fetchMethod = (Query, Variables) => {
  return fetch(URLDATA.url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      query: Query,
      variables: Variables,
    }),
    headers: {
      "Content-type": "application/json",
      access_token: token,
    },
  });
};
