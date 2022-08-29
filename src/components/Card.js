import React from "react";

function Card(props)
{

    function handleClick()
    {
        props.onCardClick(props.card);
    }

    return (
        <li className="elements__item">
            <img className="elements__img" src={`${props.card.link}`} alt={props.card.name} onClick={handleClick} />
            <div className="elements__info">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__likes">
                    <button type="button" aria-label="Нравится" title="Нравится"
                        className="elements__like-btn"></button>
                    <span className="elements__numberoflikes">{props.card.likes.length}</span>
                </div>
                <button className="elements__delete-btn" type="button" aria-label="Удалить картинку"
                    title="Удалить картинку"></button>
            </div>
        </li>
    )
}

export default Card;