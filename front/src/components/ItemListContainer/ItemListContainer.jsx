import React, { useEffect, useState } from 'react';
import { Cards } from '../Cards/Cards';
import '../ItemListContainer/ItemListContainer.css'
import { useParams } from 'react-router-dom';




export function ItemListContainer() {

  const [products, setProducts] = useState([]);
  const { categoryid } = useParams();

  // useEffect(() => {
  //   const consulta = categoryid
  //     ? query(collection(db, 'items'), where('categoryid', '==', categoryid))
  //     : collection(db, 'items');

  //   getDocs(consulta)
  //     .then(result => {
  //       const lista = result.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         }
  //       })
  //       setProducts(lista);
  //     })
  //     .catch(error => (error))
  //     .finally(() => setLoading(false))
  // }, [categoryid])

  return (
    <>
      <div className="container d-flex mt-5 align-items-center justify-content-center">
        <div className="row">
          {
            products.map(product => (
              <div className="col-md-4" key={product.id}>
                < Cards image={product.image}
                  title={product.title}
                  description={product.descriptionShort}
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


