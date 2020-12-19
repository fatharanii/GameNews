import axios from "axios";
import base_url from "./base-url";

export default axios.create({
    baseURL: base_url,
    headers: {
    "Content-type": "application/json"
    }
});