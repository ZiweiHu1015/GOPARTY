import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")).user;

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      try {
        const res = await newRequest.get('/conversations');
        const conversations = res.data;
        await Promise.all(conversations.map(async (conversation) => {
          const otherUserId = currentUser.isSeller ? conversation.buyerId : conversation.sellerId;
          const userDetails = await newRequest.get(`/users/${otherUserId}`);
          conversation.otherUser = userDetails.data;
        }));
        // data
        console.log("conversations:", conversations);
        return conversations;
      } catch (error) {
        console.error("Failed to fetch conversations or user details", error);
        throw new Error("Failed to fetch data");
      }
    },
    onError: (err) => {
      console.error("Query error:", err.message);
    }
  });  

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/isRead/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller === 1 ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr
                  className={
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)
                      ? 'active'
                      : undefined // This ensures that the className is not set to a boolean
                  }
                  key={c.ConversationID}
                >
                  <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>

                  <td>
                  <Link 
                    to={`/message/${c.ConversationID}`} 
                    className="link"
                    state={{ otherUser: c.otherUser }} // Pass the entire user object
                  >
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                  </td>

                  <td>{moment(c.updatedAt).fromNow()}</td>

                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.ConversationID)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
