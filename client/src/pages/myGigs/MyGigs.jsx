import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser().user;
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: async () => {
      try {
        const response = await newRequest.get(`/listing?sellerId=${currentUser.UserID}`);
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    },
  });


  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/listing/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
    <div className="container">
      <div className="title">
        <h1>MyGigs</h1>
        {currentUser.isSeller && (
          <Link to="/add">
            <button>Add New Listing</button>
          </Link>
        )}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((gig) => (
                <tr key={gig.ProductID}>
                  <td><img className="image" src={gig.CoverImage} alt="" /></td>
                  <td>{gig.Title}</td>
                  <td>{gig.Price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      onClick={() => handleDelete(gig.ProductID)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No gigs found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  </div>


  );
};
export default MyGigs;
