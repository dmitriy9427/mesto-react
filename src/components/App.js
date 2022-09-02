import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from './ImagePopup';
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App()
{
    const [isEditProfilePopupOpen, setPopupProfileOpened] = React.useState(false);
    const [isAddPlacePopupOpen, setPopupPlaceOpened] = React.useState(false);
    const [isEditAvatarPopupOpen, setPopupAvatarOpened] = React.useState(false);

    const [cards, setCards] = React.useState([]);

    const [selectedCard, setCardOpen] = React.useState({});

    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() =>
    {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([userData, cards]) =>
            {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch(console.log);
    }, []);

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

    function handleCardLike(card)
    {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) =>
        {
            setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            console.log("cards", newCard);
        });
    }

    function handleCardDelete(card)
    {
        api
            .deleteCard(card._id)
            .then(() =>
                setCards((state) => state.filter((c) => c._id !== card._id && c))
            )
            .catch(console.log);
    }

    function handleUpdateUser(user)
    {
        api
            .editProfile(user.name, user.about)
            .then((editUserInfo) =>
            {
                setCurrentUser({
                    ...currentUser,
                    name: editUserInfo.name,
                    about: editUserInfo.about,
                });
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleUpdateAvatar(data)
    {
        api
            .changeAvatar(data.avatar)
            .then((res) =>
            {
                setCurrentUser({
                    ...currentUser,
                    avatar: res.avatar,
                });
                closeAllPopups();
            })
            .catch(console.log);
    }

    function handleAddNewCard(card)
    {
        api
            .addNewCard(card.name, card.link)
            .then((newCard) =>
            {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.log);
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddNewCard}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div >

    );
}

export default App;
