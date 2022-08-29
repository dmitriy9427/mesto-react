import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App()
{
    const [isEditProfilePopupOpen, setPopupProfileOpened] = React.useState(false);
    const [isAddPlacePopupOpen, setPopupPlaceOpened] = React.useState(false);
    const [isEditAvatarPopupOpen, setPopupAvatarOpened] = React.useState(false);

    const [selectedCard, setCardOpen] = React.useState({});

    //функции открытия попапов
    function handleEditAvatarClick()
    {
        setPopupAvatarOpened(true);
    }

    function handleEditProfileClick()
    {
        setPopupProfileOpened(true);
    }

    function handleAddPlaceClick()
    {
        setPopupPlaceOpened(true);
    }

    function handleCardClick(card)
    {
        setCardOpen(card)
    }

    function closeAllPopups()
    {
        setPopupAvatarOpened(false);
        setPopupProfileOpened(false);
        setPopupPlaceOpened(false);
        setCardOpen({});
    }

    return (
        <div className="page">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                title="Редактировать профиль"
                buttonText="Сохранить"
                name="profile-edit"
            >
                <input id="username" type="text" name="name" placeholder="Имя"
                    className="popup__input popup__input_type_name" minLength="2" maxLength="40" required />
                <span id="error-username" className="error-message"></span>

                <input id="namejob" type="text" name="about" placeholder="Занятие"
                    className="popup__input popup__input_type_job" minLength="2" maxLength="200" required />
                <span id="error-namejob" className="error-message"></span>
            </PopupWithForm>

            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                title="Новое место"
                buttonText="Создать"
                name="add-cards"
            >
                <input id="card-name" type="text" name="card-name" placeholder="Название"
                    className="popup__input popup__input_type_card-name" minLength="2" maxLength="30" required />
                <span id="error-cardname" className="error-message"></span>

                <input id="card-link" type="url" name="card-link" placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_card-link" required />
                <span id="error-cardlink" className="error-message"></span>

            </PopupWithForm>

            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                title="Обновить аватар"
                buttonText="Сохранить"
                name="update-avatar"
                containerClass="popup__avatar-container"
            >

                <input id="avatar-link-input" name="avatar" type="url"
                    className="popup__input popup__input_type_update-avatar" placeholder="Ссылка на картинку"
                    required />
                <span id="error-avatar-link-input" className="error-message"></span>

            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </div >

    );
}

export default App;
