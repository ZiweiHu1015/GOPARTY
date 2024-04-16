import React from 'react'
import "./Add.scss"


const Add = () => {
  return (
    <div className = 'add'>
        <div className="container">
            <h1>Add New Gig</h1>
            <div className="sections">
                        <div className="left">
                            <label htmlFor="">Title</label>
                            <input type="text" pleaceholder = "e.g. I do good balloons"/>
                            <label htmlFor="">Category</label>
                            <select name="cats" id="cats">
                                <option value="balloon"> Balloon</option>
                                <option value="flower"> Web Developmemt</option>
                                <option value="day-of coordination">Animation</option>
                                <option value="venue">Music</option>
                                <option value="catering">Catering</option>
                                <option value="band">Band</option>
                            </select>
                            <label htmlFor="">Cover Image</label>
                            <input type="file" />
                            <label htmlFor="">Upload Images</label>
                            <input type="file" multiple/>
                            <label htmlFor="">Description</label>
                            <textarea 
                                name="" 
                                id="" 
                                cols="30" 
                                rows="16"
                                placeholder = "brief description to introduce your service to customers"
                            ></textarea>
                            <button> Create </button>
                        </div>

                        <div className="right">
                            <label htmlFor=""> Service Title</label>
                                <input type="text" pleaceholder="e.g. One-page web design" />
                            <label htmlFor=""> Short Description</label>
                            <textarea name="" id="" cols="30" rows="10" placeholder="short description of your service"></textarea>

                            <label htmlFor=""> Delivery Time(e.g. 3 days)</label>
                                <input type="number" min = {1} />
                            <label htmlFor=""> Revision Number</label>
                                <input type="number" min = {1} />
                            <label htmlFor=""> Add Features</label>
                                <input type="text" placeholder="e.g. flower design" />
                                <input type="text" placeholder="e.g. balloon design" />
                                <input type="text" placeholder="e.g. day-of corrdination" />
                                <input type="text" placeholder="e.g. catering" />
                            <label htmlFor=""> Price</label>
                                <input type="number" min = {1} />

                        </div>
            </div>
        </div>
    </div>
  )
}


export default Add