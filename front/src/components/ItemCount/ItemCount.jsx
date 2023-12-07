import { useState } from 'react';
import { Link } from "react-router-dom";
import './ItemCount.css'


const ItemCount = ({ initial, stock, onAdd }) => {
  const [counter, setCounter] = useState(initial);

  const Sumar = () => {
    setCounter(counter + 1);
  };
  const Restar = () => {
    setCounter(counter - 1)

  }

  return (
    <>
      {stock <= 0 ? (
        <div>
          <p className='count noStock'>No hay stock del producto</p>
        </div>
      ) : (
        <div className='count'>
          <p>Stock: {stock}</p>
          <button className='down' disabled={counter <= 1} onClick={Restar}>-</button>
          <span>{counter}</span>
          <button className='up' disabled={counter >= stock} onClick={Sumar}>+</button>
          <div>
            < Link to={"proyecto-ecommerce-react/cart"}>
              <button className='addCart' disabled={stock <= 0} onClick={() => onAdd(counter)} >Agregar al carrito</button>
            </Link>
          </div>

        </div>
      )}

    </>
  );
};

export default ItemCount;
