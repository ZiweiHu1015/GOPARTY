import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get('/conversations').then(async (res) => {
        const conversations = res.data;
        await Promise.all(conversations.map(async (conversation) => {
          const otherUserId = currentUser.isSeller ? conversation.buyerId : conversation.sellerId;
          const userDetails = await newRequest.get(`/users/${otherUserId}`); // Fetch each user's details
          conversation.otherUser = userDetails.data; // Assuming `data` holds the necessary user details
        }));
        return conversations;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
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
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
              className={
                (currentUser.isSeller && !c.readBySeller) ||
                (!currentUser.isSeller && !c.readByBuyer)
                  ? 'active'
                  : undefined // This ensures that the className is not set to a boolean
              }
              key={c.id}
            >
                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                <td>
                <Link 
                  to={`/message/${c.id}`} 
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
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
