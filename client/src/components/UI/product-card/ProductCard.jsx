import React from "react";
import "../../../styles/product-card.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { _id, title, img, price } = props.item;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log(user)
  //const isLogAdmin = user !== null && user.isAdmin === true;
   const isLogAdmin = false;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        img,
        price,
      })
    );
  };

  const handleUpdate = () => {
    navigate(`/updatefoods/${_id}`)
  }

  const handleDelete = () => {
    fetch(`http://localhost:5000/product/delete/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Product deleted successfully") {
          alert("Product deleted successfully");
          navigate(`/home`); // Move navigate inside this block
          // You can handle product removal from your UI or state here
        } else {
          console.error("Failed to delete product:", data.msg);
        }
      })
      .catch((error) => {
        console.error("Failed to delete product", error);
      });
  };
  
  return (
    <div className="product__item">
      <div className="product__img">
        <img src={`http://localhost:5000/images/${img}`} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${_id}`}>{title}</Link>
        </h5>
        <div>
          {isLogAdmin ? (
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <span className="product__price">${price}</span>
                <button className="addTOCart__btn" onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
              <div className="up__delete">
              <div className="d-flex align-items-center justify-content-between">
                <button className="addTOCart__btn" onClick={handleUpdate}>
                  Edit
                </button>
                <button className="addTOCart__btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
              </div>
              
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-between">
              <span className="product__price">${price}</span>
              <button className="addTOCart__btn" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
