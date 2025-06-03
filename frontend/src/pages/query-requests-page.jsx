import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import {
  acceptQueryRequest,
  fetchQueryRequests,
} from "../services/middle-ware";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const QueryRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetchQueryRequests();
        setRequests(response.data.requests);
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };
    fetchRequest();
  }, []);

  const updateRequestStatus = (trip_id, from_user_id, status) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.trip_id === trip_id && req.from_user_id === from_user_id
          ? { ...req, hasAccepted: status === "accepted", hasRejected: status === "rejected" }
          : req
      )
    );
  };

  const acceptRequest = async (from_user_id, trip_id) => {
    try {
      await acceptQueryRequest({ from_user_id, trip_id });
      updateRequestStatus(trip_id, from_user_id, "accepted");
    } catch (error) {
      console.log("Error accepting request");
    }
  };

  const rejectRequest = async (from_user_id, trip_id) => {
    try {
      // await rejectQueryRequest({ from_user_id, trip_id });
      updateRequestStatus(trip_id, from_user_id, "rejected");
    } catch (error) {
      console.log("Error rejecting request");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Query Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req, index) => (
            <Card key={index} className="bg-white/80 dark:bg-gray-800 shadow-md">
              <CardHeader className="flex flex-col items-start gap-1">
                <span className="text-sm text-gray-500">
                  Requested on {new Date(req.requested_at).toLocaleString()}
                </span>
                <div className="text-lg font-semibold">Trip ID: {req.trip_id}</div>
              </CardHeader>
              <CardBody className="flex flex-col gap-3">
                <div className="text-gray-600 dark:text-gray-300">
                  From User ID: <span className="font-mono">{req.from_user_id}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {req.hasAccepted ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle size={16} /> Accepted
                    </span>
                  ) : req.hasRejected ? (
                    <span className="text-red-600 flex items-center gap-1">
                      <XCircle size={16} /> Rejected
                    </span>
                  ) : (
                    <span className="text-yellow-600 flex items-center gap-1">
                      <Clock size={16} /> Pending
                    </span>
                  )}
                </div>

                {!req.hasAccepted && !req.hasRejected && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      onPress={() => acceptRequest(req.from_user_id, req.trip_id)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() => rejectRequest(req.from_user_id, req.trip_id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryRequestsPage;
