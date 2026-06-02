const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";

function getToken() {
  return localStorage.getItem("token");
}

// GET request
function fetchModel(url) {
  const headers = {};
  const token = getToken();
  if (token) headers["Authorization"] = "Bearer " + token;

  return fetch(baseURL + url, { headers }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error("HTTP Error " + response.status + ": " + text);
      });
    }
    return response.json().then((data) => ({ data }));
  });
}

// POST request (JSON body)
function postModel(url, body) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = "Bearer " + token;

  return fetch(baseURL + url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error("HTTP Error " + response.status + ": " + text);
      });
    }
    return response.json().then((data) => ({ data }));
  });
}

// POST request for public endpoints like login/register.
function postPublicModel(url, body) {
  return fetch(baseURL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error("HTTP Error " + response.status + ": " + text);
      });
    }
    return response.json().then((data) => ({ data }));
  });
}

// POST request (FormData - dùng cho upload file)
function postFormData(url, formData) {
  const headers = {};
  const token = getToken();
  if (token) headers["Authorization"] = "Bearer " + token;

  return fetch(baseURL + url, {
    method: "POST",
    headers,
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error("HTTP Error " + response.status + ": " + text);
      });
    }
    return response.json().then((data) => ({ data }));
  });
}

export default fetchModel;
export { postModel, postPublicModel, postFormData, baseURL };
