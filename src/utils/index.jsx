export const formatCurrency = (amt, currency = "INR") => {
  const opts = { style: "currency", currency };
  return amt.toLocaleString("en-IN", opts);
};

export const makeCall = async (url, config) => {
  const req = await fetch(url, config);
  const resp = await req.json();
  return resp;
};

export const getData = async (url) => {
  const resp = await makeCall(url, { method: "GET" });
  return resp;
};
export const deleteData = async (url) => {
  const resp = await makeCall(url, { method: "DELETE" });
  return resp;
};

export const postData = async (url, body) => {
  console.log("body-->", body);
  const resp = await makeCall(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });

  return resp;
};

//userID -- whenever we load the app a new id is created
export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => {
    const uuid =
      c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)));

    return uuid.toString(16);
  });
}
