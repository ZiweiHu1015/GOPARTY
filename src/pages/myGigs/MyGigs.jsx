import React from 'react';
import {Link} from "react-router-dom";
import "./MyGigs.scss";

const MyGigs = () => {
  return (
    <div className = "myGigs">
      <div className="container">
        <div className="title">
            <h1>MyGigs</h1>
            <Link to="/add"> 
                <button>Add New Gig</button>
            </Link>
        </div>
        <table>
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
            </tr>
            <tr>
                <td>
                    <img className='img' src="../img/gig.jpg" alt="" />
                </td>
                <td>Gig1</td>
                <td>88</td>
                <td>123</td>
                <td>
                    <img className="delete" src="../img/delete.png" alt="" />
                </td>
            </tr>

            <tr>
                <td>
                    <img className='img' src="../img/gig.jpg" alt="" />
                </td>
                <td>Gig1</td>
                <td>88</td>
                <td>123</td>
                <td>
                    <img className="delete" src="../img/delete.png" alt="" />
                </td>
            </tr>

            <tr>
                <td>
                    <img className='img' src="../img/gig.jpg" alt="" />
                </td>
                <td>Gig1</td>
                <td>88</td>
                <td>123</td>
                <td>
                    <img className="delete" src="../img/delete.png" alt="" />
                </td>
            </tr>
        </table>
      </div>
    </div>
  )
}

export default MyGigs
