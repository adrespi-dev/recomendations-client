import axios from "axios";
import { API_URL } from "./Env";

export const API_CLIENT = axios.create({ baseURL: API_URL });
