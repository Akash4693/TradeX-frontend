export const server = "http://localhost:8000/api/v2";

export const ENDPOINT = process.env.REACT_APP_ENDPOINT;
//export const server = process.env.REACT_APP_SERVER;
//export const server="https://trade-x-backend.vercel.app/api/v2"

export const PORT = process.env.REACT_APP_PORT;

console.log("Socket Endpoint:", ENDPOINT);
console.log("Backend Server:", server);
//console.log("API URL:", PORT);

//export const server = process.env.PORT