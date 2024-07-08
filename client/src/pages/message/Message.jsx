import React, { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Message.scss";

const Message = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();
    const currentUser = JSON.parse(localStorage.getItem("currentUser")).user;
    const otherUser = location.state?.otherUser;
    
    const { isLoading, error, data } = useQuery({
        queryKey: ["messages", id], 
        queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
      });

    const isImageUrl = (url) => {
      return /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

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

    const fileInputRef = useRef(null);

    const handleFileSelectAndSend = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
          const imageUrl = await upload(file);
          mutation.mutate({
              conversationId: id,
              desc: imageUrl,
          });
      } catch (error) {
          console.error('Failed to upload image:', error);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const messageDesc = e.target[0].value;
      e.target[0].value = "";

      if (messageDesc) {
          mutation.mutate({
              conversationId: id,
              desc: messageDesc,
          });
          e.target.elements[0].value = "";
      }
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
                  
                  {isImageUrl(m.Description) ? (
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
            <textarea name="message" placeholder="Write a message"></textarea>
            <div className="button-container">
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileSelectAndSend}
              />
              <button type="button" onClick={() => fileInputRef.current.click()}>Photo</button>
              <button type="submit">Send</button>
            </div>
          </form>

        </div>
      </div>
    );
};

export default Message;
