import React, { useState, createContext, useEffect } from "react";


const CartContext = createContext({
    productosCarrito: []
});


const CartProvider = ({ children }) => {


    const [compra, setCompra] = useState([]);
    const [cantidadCompra, setCantidadCompra] = useState(0);


    useEffect(() => {
        const getQtyItem = () => {
            let quantity = 0;
            compra.forEach(product => {
                quantity += product.quantity
            })
            setCantidadCompra(quantity);
        }

        getQtyItem();

    }, [compra])

    const addItem = (product) => {
        if (isInCart(product.id)) {
            const found = compra.find(p => p.id === product.id);
            const index = compra.indexOf(found);
            const auxCompra = [...compra];
            auxCompra[index].quantity += product.quantity;
            setCompra(auxCompra);
        } else {
            setCompra([...compra, product])
        };
    }

    const removeItem = (id) => {
        setCompra(compra.filter(product => product.id !== id));
    }

    const clear = () => {
        setCompra([]);
        setCantidadCompra(0);
    }

    const isInCart = (id) => {
        return compra.some(compra => compra.id === id);
    }

    const totalCompra = () => {
        let total = 0;
        compra.forEach((e) => total = total + parseFloat(e.quantity * e.price))

        return total.toFixed(2);
    }

    return (
        <CartContext.Provider value={{
            productosCarrito: compra,
            addItem,
            removeItem,
            clear,
            cantidadCompra,
            totalCompra
        }}>
            {children}
        </CartContext.Provider>
    );

}

export { CartContext, CartProvider }; 