import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Cards } from '../Cards/Cards';
import '../ItemListContainer/ItemListContainer.css'
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;



export function ItemListContainer() {

  const [products, setProducts] = useState([]);
  //const { categoryid } = useParams();


  useEffect(() => {
    axios
      .get(`${apiUrl}/products`, {
      })
      .then((res) => {
        setProducts(res.data.products);
        console.log(res.data.products)
      })
      .catch((err) => console.log(err))
    //.finally(() => setLoading(false))
  }, []);

  return (
    <>
      <div className="container d-flex mt-5 align-items-center justify-content-center">
        <div className="row">
          {products.map(product => (
            <div className="col-md-4" key={product.id}>
              < Cards image={product.thumbnail}
                title={product.title}
                description={product.description}
                id={product.id}
              />
            </div>
          ))
          }
        </div>
      </div>
    </>
  )
};


