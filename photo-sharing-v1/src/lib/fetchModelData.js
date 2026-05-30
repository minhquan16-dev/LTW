const baseURL = "http://localhost:8081";

// GET request
function fetchModel(url) {
  return fetch(`${baseURL}${url}`, {
    credentials: "include",
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP Error ${response.status}: ${text}`);
      });
    }
    return response.json().then((data) => ({ data }));
  });
}

// POST request (JSON body)
function postModel(url, body) {
  return fetch(`${baseURL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP Error ${response.status}: ${text}`);
      });
    }
    return response.json().then((data) => ({ data }));
  });
}

// POST request (FormData - dùng cho upload file)
function postFormData(url, formData) {
  return fetch(`${baseURL}${url}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP Error ${response.status}: ${text}`);
      });
    }
    return response.json().then((data) => ({ data }));
  });
}

export default fetchModel;
export { postModel, postFormData, baseURL };