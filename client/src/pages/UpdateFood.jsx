import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from "reactstrap";
import '../styles/add-foods.css';

const UpdateFoods = () => {
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/product/find/${id}`);
                if (response.ok) {
                    const product = await response.json();
                    setData(product);
                    setTitle(product.title);
                    setDesc(product.description);
                    setPrice(product.price);
                    setCategory(product.category);
                } else {
                    // Handle non-200 status code, e.g., show an error message
                    console.error("Error fetching product data");
                }
            } catch (error) {
                // Handle fetch error, e.g., show an error message
                console.error(error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/product/update/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                title,
                description,
                price,
                category
            })
        })

        if(res.ok){
            navigate(`/foods`)
        }
    };

    if (!data) {
        // Data is still loading, you can show a loading spinner or message here
        return <div>Loading...</div>;
    }
    return(
        <Helmet title="addfoods">
            <CommonSection title="Update Foods" />

            <section>
                <Container>
                    <img src={`http://localhost:5000/images/${data.img}`} alt="product-img" className="w-50" />  
                    <div className="container__all">
                        <div className="wrapper">
                            <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
                                <div className="inputWrapper">
                                    <label>Title: </label>
                                    <input type="text"
                                    placeholder='Title...'
                                    value={title}
                                    className="input"
                                    onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="inputWrapper">
                                    <label>Description: </label>
                                    <input type="text"
                                    placeholder='Description...'
                                    value={description}
                                    className="input"
                                    onChange={(e) => setDesc(e.target.value)}
                                    />
                                </div>
                                <div className="inputWrapper">
                                    <label>Price: </label>
                                    <input type="number"
                                    step={0.01}
                                    placeholder='Price...'
                                    value={price}
                                    className="input"
                                    onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="inputWrapper">
                                    <label>Category: </label>
                                    <input type="text"
                                    placeholder='Category...'
                                    value={category}
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

export default UpdateFoods