/**
 * fetchModel - Fetch a model from the web server.
 * @param {string} url - The URL to fetch from (e.g., "/user/list")
 * @returns {Promise} - A promise that resolves to an object with the data.
 */
function fetchModel(url) {
  return new Promise((resolve, reject) => {
    // SỬ DỤNG URL MÀ BẠN VỪA KIỂM TRA THÀNH CÔNG
    const baseURL = "https://c3qzd5-8081.csb.app"; 

    fetch(`${baseURL}${url}`)
      .then((response) => {
        if (!response.ok) {
          // Trả về lỗi nếu server phản hồi lỗi (ví dụ 400 hoặc 500)
          return response.text().then((text) => {
            reject(new Error(`HTTP Error ${response.status}: ${text}`));
          });
        }
        return response.json();
      })
      .then((data) => {
        // Trả về object có thuộc tính data theo đúng yêu cầu
        resolve({ data: data });
      })
      .catch((error) => {
        reject(new Error(`Network error: ${error.message}`));
      });
  });
}

export default fetchModel;