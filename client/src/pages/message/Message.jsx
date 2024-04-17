import React from 'react';
import {Link} from 'react-router-dom'
import "./Message.scss"

const Message =()=>{
    return(
        <div className="message"> 
            <div className="container">
                <span className="breadcrumbs">
                   <Link to ="/messages"> Messages  </Link> {">"}Joe Biden {">"}
                </span>
                        <div className="messages">
                            <div className="item">
                                <img src="../img/placeholder.jpg" alt="" />
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                                     when an unknown printer took a galley of type and scrambled it to make a type 
                                     specimen book. It has survived not only five centuries, but also the leap into 
                                     electronic typesetting, remaining essentially unchanged. It was popularised in 
                                     the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                     and more recently with desktop publishing software like Aldus PageMaker including 
                                     versions of Lorem Ipsum.

                                </p>
                            </div>
                            
                            <div className="item">
                                <img src="../img/placeholder.jpg" alt="" />
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                                     when an unknown printer took a galley of type and scrambled it to make a type 
                                     specimen book. It has survived not only five centuries, but also the leap into 
                                     electronic typesetting, remaining essentially unchanged. It was popularised in 
                                     the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                     and more recently with desktop publishing software like Aldus PageMaker including 
                                     versions of Lorem Ipsum.

                                </p>
                            </div>

                            <div className="item owner">
                                <img src="../img/placeholder.jpg" alt="" />
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                                     when an unknown printer took a galley of type and scrambled it to make a type 
                                     specimen book. It has survived not only five centuries, but also the leap into 
                                     electronic typesetting, remaining essentially unchanged. It was popularised in 
                                     the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                     and more recently with desktop publishing software like Aldus PageMaker including 
                                     versions of Lorem Ipsum.

                                </p>
                            </div>
                        </div>
                        <hr/>
                        <div className="write">
                            <textarea name="" pleasehodler = 'write a message' id="" cols="30" rows="10"></textarea>
                            <button>Send</button>
                        </div>
                  
                </div>

            </div>
        
 
    
    
    
        )

}

export default Message