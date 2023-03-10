var axios = require("axios")

var ServerURL = "http://localhost:5000"
const getData = async (url) => {
    try {
        // `${ServerUrl}/${url}` 
        const response = await fetch(`${ServerURL}/${url}`, {
            method: "GET",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            mode: "cors"
        });
        const result = await response.json();
        return result;
    } catch (e) {
        return null;
    }
}
const postData = async (url, body) => {
    try {
         //`${ServerUrl}/${url}` 
        const response = await fetch(`${ServerURL}/${url}`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        return result;
    } catch (e) {
        return null;
    }
}
const postDataAndImage = async (url, formData) => {
    try {
        const response = await axios.post(`${ServerURL}/${url}`, formData, { headers: { "content-Type": "multipart/formData" } });
        const result = await response.data;
        return result
    } catch (e) {
        return null;
    }
}
export { ServerURL, postDataAndImage, postData, getData }