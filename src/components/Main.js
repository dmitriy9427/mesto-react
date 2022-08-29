import React from 'react';
import { api } from '../utils/Api'
import Card from './Card';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick })
{
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() =>
    {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([userData, cards]) =>
            {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(cards);
            })
            .catch(console.log);
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <button type="button" aria-label="Обновить аватар" onClick={onEditAvatar} title="Обновить аватар" className="profile__edit">
                    <img src={userAvatar} alt="аватар" className="profile__image" /></button>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <p className="profile__subtitle">{userDescription}</p>
                    <button type="button" onClick={onEditProfile} aria-label="Редактировать профиль" title="Редактировать профиль"
                        className="profile__edit-btn"></button>
                </div>
                <button type="button" onClick={onAddPlace} aria-label="Добавить новую фотографию" title="Добавить новую фотографию"
                    className="profile__add-btn"></button>
            </section>
            <section className="elements">
                <ul className="elements__items">
                    {cards.map((card) =>
                    {
                        return (
                            <Card key={card._id} card={card} onCardClick={onCardClick} />
                        )
                    })}
                </ul>
            </section>
        </main>

    )
}
export default Main;