import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import '../styles/add-foods.css'
import { Container } from "reactstrap";

const AddFoods = () => {
    const [title, setTitle] = useState("")
    const [description, setDesc] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const navigate = useNavigate()

    const {token} = useSelector((state) => state.auth);


    // type="file", e.target.files[0]
    const onChangeFile = (e) => {
      setImage(e.target.files[0])
    }
  
    const handleCloseImg = () => {
      setImage('')
    }
  
    const handleCreateProduct = async (e) => {
      e.preventDefault();
  
      try {
          const formData = new FormData();
          let filename = null;
  
          if (image) {
              filename = Date.now() + image.name;
              formData.append("filename", filename);
              formData.append("image", image);
  
              await fetch(`http://localhost:5000/upload/image`, {
                  headers: {
                      "Authorization": `Bearer ${token}`
                  },
                  method: "POST",
                  body: formData
              });
  
          }
  
          // uploading product 
          const res = await fetch(`http://localhost:5000/product/`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              method: 'POST',
              body: JSON.stringify({
                  title,
                  description,
                  img: filename,
                  price,
                  category
              })
          });
  
          if (res.ok) {
              alert("Food Added!");
              navigate(`/foods`);
          } else {
              const errorResponse = await res.json();
              throw new Error(errorResponse.message);
          }
      } catch (error) {
          console.error(error.message);
          alert("Error: " + error.message);
      }
  }
    

    return(
        <Helmet title="addfoods">
            <CommonSection title="Add Foods" />

            <section>
                <Container>
                    <div className="container__all">
                        <div className="wrapper">
                            <form onSubmit={handleCreateProduct} encType="multipart/form-data">
                                <div className="inputWrapper">
                                    <label>Title: </label>
                                    <input type="text"
                                    placeholder='Title...'
                                    className="input"
                                    onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="inputWrapper">
                                    <label>Description: </label>
                                    <input type="text"
                                    placeholder='Description...'
                                    className="input"
                                    onChange={(e) => setDesc(e.target.value)}
                                    />
                                </div>
                                <div className="inputWrapperImage">
                                    <label htmlFor="image" className="labelFileInput">Image: <span>Upload here</span></label>
                                    <input type="file"
                                    id="image"
                                    placeholder='Image...'
                                    className="input"
                                    onChange={onChangeFile}
                                    style={{ display: 'none' }}
                                    />
                                    {image && <p className="imageName">{image.name} <AiOutlineCloseCircle onClick={handleCloseImg} className="closeIcon" /></p>}
                                </div>
                                <div className="inputWrapper">
                                    <label>Price: </label>
                                    <input type="number"
                                    step={0.01}
                                    placeholder='Price...'
                                    className="input"
                                    onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="inputWrapper">
                                    <label>Category: </label>
                                    <input type="text"
                                    placeholder='Category...'
                                    className="input"
                                    onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>
                                <div className="buttonWrapper">
                                    <button type="submit" className="submitBtn">
                                    Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>
        </Helmet>
    )
}

export default AddFoods