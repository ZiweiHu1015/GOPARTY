import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
    const { id } = useParams();
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const queryClient = useQueryClient();
  
    const otherUser = location.state?.otherUser;
    
    const { isLoading, error, data } = useQuery({
        queryKey: ["messages", id], // Include the conversation ID in the query key
        queryFn: () =>
          newRequest.get(`/messages/${id}`).then((res) => {
            console.log("data", res.data);
            return res.data;
          }),
      });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} {otherUser?.Username || 'Loading...'}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userID === currentUser.userID ? "owner item" : "item"} key={m.MessageID}>
                <img
                  src={m.userID === currentUser.userID ? (currentUser.img || '../img/placeholder.jpg') : 
                  (otherUser.img || '../img/placeholder.jpg')}
                  alt={m.userID === currentUser.userID ? "You" : "Other User"}
                />
                <p>{m.Description}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
