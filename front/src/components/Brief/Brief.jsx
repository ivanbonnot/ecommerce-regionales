import React, { useState, useContext } from "react";
import { CartContext } from '../../context/CartContext';
//import { db } from '../../firebase/firebase';
//import { collection, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Spinner from "../Spinner/Spinner";
import '../Brief/Brief.css'

export const Brief = () => {
    // const formCont = document.querySelector('.formContainer')

    //const { productosCarrito, clear, totalCompra } = useContext(CartContext)
    const [idOrden, setIdOrden] = useState()
    const [loading] = useState(false)
    const [buyer, setBuyer] = useState({
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Email: '',
        EmailComp: ''
    })
    const { Nombre, Apellido, Telefono, Email, EmailComp } = buyer

    const Input = (e) => {
        setBuyer(({
            ...buyer,
            [e.target.name]: e.target.value
        }))
    }

    // const generarPedido = async (data) => {
    //     try {
    //         msjerror('Su orden se está procesando', 'green')
    //         const col = collection(db, 'ordenes')
    //         const order = await addDoc(col, data)

    //         //Actualizando stcok en firebase
    //         const productos = data.items.map(item => {
    //             const idProd = item.id
    //             const stockRef = doc(db, 'items', idProd)
    //             const stock = productosCarrito.map(prod => { return { stock: prod.stock } })
    //             const newStock = {
    //                 stock: (stock[0].stock - item.Cantidad).toString()
    //             }
    //             updateDoc(stockRef, newStock)
    //         })

    //         setIdOrden(order.id)
    //         clear()


    //     } catch (error) {
    //         return (
    //             error
    //         )
    //     }
    // }

    // const enviar = (e) => {
    //     e.preventDefault()

    //     if (Nombre === '' || Apellido === '' || Telefono === '' || Email === '') {
    //         msjerror('Todos los compos son obligatorios', 'red')

    //     } else if (Email !== EmailComp) {
    //         msjerror('La dirección de mail debe coincidir', 'red')

    //     } else {
    //         const dia = serverTimestamp()
    //         const total = totalCompra()
    //         const items = productosCarrito.map(prod => { return { id: prod.id, Titulo: prod.title, Precio: prod.price, Cantidad: prod.quantity } })
    //         const data = { buyer, dia, items, total }
    //         //generarPedido(data)
    //     }
    // }

    // const msjerror = (mensaje, color) => {
    //     const button = document.querySelector('.send')
    //     const comprobar = document.createElement('p')
    //     comprobar.classList.add('comprobacion')
    //     comprobar.style.border = `2px solid ${color}`
    //     comprobar.innerHTML = `${mensaje}`
    //     formCont.appendChild(comprobar)
    //     button.disabled = true
    //     setTimeout(() => {
    //         button.disabled = false
    //         formCont.removeChild(comprobar)
    //     }, 3000);
    // }


    return (
        <>
            {loading ?
                <div className="spinner">
                    <Spinner />
                </div>
                : (!idOrden && <div>
                    <form

                        className="formContainer" >
                        <div>
                            <h2> Carga tus datos</h2>
                        </div>
                        <div>
                            <p>
                                <input type="text" name='Nombre' onChange={Input} value={Nombre} placeholder="Nombre" />

                            </p>
                            <p>
                                <input type="text" name="Apellido" onChange={Input} value={Apellido} placeholder="Apellido" />

                            </p>
                            <p>
                                <input type="number" name="Telefono" onChange={Input} value={Telefono} placeholder="Teléfono" />

                            </p>
                            <p>
                                <input type="email" name="Email" onChange={Input} placeholder="eMail" value={Email} />
                            </p>
                            <p>
                                <input type="email" name="EmailComp" onChange={Input} placeholder="Ingrese de nuevo su eMail" value={EmailComp} />
                            </p>
                            <p>
                                <button className="send" type="submit"> Enviar</button>
                            </p>
                        </div>
                    </form>
                </div>)}
            <div>
                {
                    idOrden && (
                        <div className="orderReady">
                            <h3>¡Gracias por su Compra!</h3>
                            <p >{`Su codigo de operacion es: ${idOrden}`}</p>
                            <p >{`Le enviarenos a ${Email} la factura electronica de su compra`}</p>
                            <div>
                                <button><Link to={'proyecto-ecommerce-react/'}>Realizar otra compra</Link></button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )

}
