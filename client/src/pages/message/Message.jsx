import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
    const { id } = useParams();
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem("currentUser")).user;
    const queryClient = useQueryClient();
  
    const otherUser = location.state?.otherUser;
    
    const { isLoading, error, data } = useQuery({
        queryKey: ["messages", id], // Include the conversation ID in the query key
        queryFn: () =>
          newRequest.get(`/messages/${id}`).then((res) => res.data),
      });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: (data, variables) => {
      newRequest.put(`/conversations/lastMessage/${id}`, {
        lastMessage: variables.desc
      }).then(() => {
        queryClient.invalidateQueries(["messages"]);
      }).catch(error => {
        console.error("Error updating last message:", error);
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageDesc = e.target[0].value;
    e.target[0].value = "";

    mutation.mutate({
      conversationId: id,
      desc: messageDesc,
    });
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} {otherUser?.Username || 'Loading...'}
          <hr />
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.UserID === currentUser.UserID ? "owner item" : "item"} key={m.MessageID}>
                <div className="avatar">
                  <img
                    src={m.UserID === currentUser.UserID ? (currentUser.img || '../img/placeholder.jpg') : 
                    (otherUser.img || '../img/placeholder.jpg')}
                    alt={m.UserID === currentUser.UserID ? "You" : "Other User"}
                  />
                </div>
                
                {/* <p>{m.Description}</p> */}
                {m.Description.startsWith('http') ? (
                  <img src={m.Description} alt="Uploaded Content" />
                  ) : (
                  <p>{m.Description}</p>
                )}
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
