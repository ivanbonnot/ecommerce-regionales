import React from "react";
import "./ItemDetailContainer.css";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

//import { db } from '../..//firebase/firebase';
//import { getDoc, collection, doc } from 'firebase/firestore';


import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";




export function ItemDetailContainer() {
  const { addItem } = useContext(CartContext)
  const [product, setProduct] = useState([])


  const onAdd = (cantidad) => {
    addItem({ ...product, quantity: cantidad })
  }


  return (
    <>
      <div className="container d-flex mt-5 justify-content-center align-items-center">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="card text-center bg-dark">
              <img src={product.image} alt="" className="card-img-top" />
              <div className="card-body text-light">
                <h4 className="card-title">{product.title}</h4>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: {product.price} USD</p>
                <ItemCount initial={1} stock={product.stock} onAdd={onAdd} />
                <button><Link to={`proyecto-ecommerce-react/`} className="atras fs-4"> Atrás </Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
