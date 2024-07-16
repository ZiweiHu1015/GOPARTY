import React, { useReducer, useState, useRef } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [category, setCategory] = useState(''); // Initialize category without a default value
  const [imageUploaded, setImageUploaded] = useState(false);//use for image upload
  const [submitError, setSubmitError] = useState('');
  const errorMessageRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === 'cat') {
      setCategory(e.target.value);
    }
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      setImageUploaded(true);  // Set to true once upload is successful
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/listing", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
    onError: (error) => {
      console.error('Error creating gig:', error);
      // Handle error appropriately, maybe set an error state and display message
      setSubmitError('Failed to create gig. Please try again.');
      errorMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUploaded) {
      setSubmitError('Image is not uploaded. Please click upload button before creating listing.');
      errorMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return; // Prevent form submission
    }

    console.log(state);
    mutation.mutate(state);
     navigate("/mygigs");
  };


  return (
    <div className="add">
      <div className="container">
        <h1>Add New Listing</h1>
        {submitError && <p ref={errorMessageRef} className="error-message">{submitError}</p>}
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g.Balloon Marqueen"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" value={category} onChange={handleChange}>
              <option value="" disabled>Select a category</option>
              <option value="balloon">Balloon Art</option>
              <option value="floral">Florist</option>
              <option value="cake">Cake</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image (please click upload after select your image)</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Product Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Color</label>
            <input
              type="text"
              name="color"
              placeholder="e.g. sage green & cream"
              onChange={handleChange}
            />
            <label htmlFor="">Size</label>
            <input
              type="text"
              name="size"
              placeholder="e.g. 3 ft * 3 ft"
              onChange={handleChange}
            />
            <label htmlFor="">Delivery Type</label>
            <select name="deliveryType" id="type" onChange={handleChange}>
             <option value="GnG">Grab and Go</option>
             <option value="on-site">On-site installation</option>
             <option value="delivery">Delivery</option>
           </select>
            
            <label htmlFor="">What car can it fit in if pick up</label>
            <form action="" name="whatCar" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. toyota camery" />
              <button type="submit">add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
              
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
