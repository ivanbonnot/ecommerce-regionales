import React from "react";
import './Cards.css'
import { Link } from 'react-router-dom';

export function Cards({ image, title, description, id }) {
    return (
        <>
            <div className="card text-center bg-dark">
                <img src={image} alt="" className="card-img-top" />
                <div className="card-body text-light">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{description}</p>

                    <button><Link to={`item/${id}`}> Ver más </Link></button>

                </div>
            </div>
        </>
    )
}

