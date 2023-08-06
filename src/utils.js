const domain = "https://staybooking-394717.wm.r.appspot.com";

export const login = (credential, asHost) => {
  const loginUrl = `${domain}/authenticate/${asHost ? "host" : "guest"}`;

  const requestStatus = fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });

  requestStatus.then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }

    return response.json();
  });
};

export const register = (credential, asHost) => {
  const registerUrl = `${domain}/register/${asHost ? "host" : "guest"}`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

export const getReservations = () => {
  const authToken = localStorage.getItem("authToken");
  const listReservationsUrl = `${domain}/reservations`;

  return fetch(listReservationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get reservation list");
    }

    return response.json();
  });
};

export const searchStays = (query) => {
  const authToken = localStorage.getItem("authToken");
  const searchStaysUrl = new URL(`${domain}/search/`);
  searchStaysUrl.searchParams.append("guest_number", query.guest_number);
  searchStaysUrl.searchParams.append(
    "checkin_date",
    query.checkin_date.format("YYYY-MM-DD")
  );
  searchStaysUrl.searchParams.append(
    "checkout_date",
    query.checkout_date.format("YYYY-MM-DD")
  );
  searchStaysUrl.searchParams.append("lat", 37);
  searchStaysUrl.searchParams.append("lon", -122);

  return fetch(searchStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search stays");
    }

    return response.json();
  });
};