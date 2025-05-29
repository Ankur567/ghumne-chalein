import api from "./api";

export const signUp = async (userData) => {
  return await api.post("/signup", userData);
};

export const logIn = async (userData) => {
  return await api.post("/login", userData);
};

export const checkToken = async () => {
  return await api.get("/checkToken");
};

export const dashboard = async () => {
  return await api.get("/dashboard");
};

export const addTrip = async (tripData) => {
  return await api.post("/addTrip", tripData);
};

export const getAllTrips = async () => {
  return await api.get("/getAllTrips");
};

export const getTripByHomeLocation = async (homeLocation) => {
  return await api.get(`/getTripByHomeLocation/${homeLocation}`);
};

export const getGeiminiResponse = async (history) => {
  return await api.post("/askGemini", history);
};

export const createCheckoutSession = async () => {
  return await api.post("/createCheckoutSession");
};
