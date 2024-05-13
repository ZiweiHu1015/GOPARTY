import axios from "axios";

const upload =  async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "GoParty");

      try{
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/djwkv2lp2/image/upload",
             data
        );
        const { url } = res.data;
        return url;
      }catch(err){
        console.error("Error uploading file:", err.response ? err.response.data : err);
        console.log(err)
      }
};

export default upload;