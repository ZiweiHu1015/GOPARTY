import React from 'react';
import {Link} from "react-router-dom";
import "./Messages.scss";

const Messages = () => {

    const currentUser = {
        id: 1,
        username : "Emma Hu",
        isSeller:true
    };

    const message = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'


  return (
    <div className = "messages">
      <div className="container">
        <div className="title">
            <h1>Messages</h1>
            
        </div>
        <table>
            <tr className="active">
                <th>Buyer</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
            <tr className="active">
                <td>
                    Joe Biden
                </td>
                <td><Link className='link' to = "/message/123" >{message.substring(0,100)}...</Link></td>
                <td>1 day ago</td>
                <td>
                    <button>Mark as Read</button>
                </td>
            </tr>

            <tr className="active">
                <td>
                    Joe Biden
                </td>
                <td><Link className='link' to = "/message/123">{message.substring(0,100)}...</Link></td>
                <td>1 day ago</td>
                <td>
                    <button>Mark as Read</button>
                </td>
            </tr>

            <tr className="active">
                <td>
                    Joe Biden
                </td>
                <td><Link className='link' to = "/message/123">{message.substring(0,100)}...</Link></td>
                <td>1 day ago</td>
                <td>
                    <button>Mark as Read</button>
                </td>
            </tr>
        </table>
      </div>
    </div>
  )
}

export default Messages
