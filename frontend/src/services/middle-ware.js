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

export const getTripById = async (tripId) => {
  return await api.get(`/getTripById/${tripId}`);
};

export const getGeiminiResponse = async (history) => {
  return await api.post("/askGemini", history);
};

export const createCheckoutSession = async () => {
  return await api.post("/createCheckoutSession");
};

export const changeSubscribeStatus = async () => {
  return await api.post("/changeSubscribeStatus");
};

export const sendrequestToOwner = async ({ tripId, userId }) => {
  return await api.post("/sendrequestToOwner", { tripId, userId });
};

export const acceptQueryRequest = async ({ from_user_id, trip_id }) => {
  return await api.post("/acceptQueryRequest", { from_user_id, trip_id });
};

export const fetchQueryRequests = async () => {
  return await api.get("/fetchQueryRequests");
};

export const getOwnerDetails = async ({ user_id, trip_id }) => {
  return await api.post("/getOwnerDetails", { user_id, trip_id });
};

export const checkTripRequested = async (tripId) => {
  return await api.get(`/checkTripRequested/${tripId}`);
};
