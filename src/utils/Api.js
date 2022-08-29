class Api
{
    constructor ({ baseUrl, headers })
    {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    //проверка ответа от сервера
    _checkReponse(res)
    {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    //получение данных профиля
    getProfile()
    {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._checkReponse);
    }

    //получение карточек
    getInitialCards()
    {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._checkReponse);
    }

    //редактирование профиля
    editProfile(name, about)
    {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._checkReponse);
    }

    //добавление новой карточки
    addNewCard(name, link)
    {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._checkReponse);
    }

    deleteCard(id)
    {
        //удаление карточки
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkReponse);
    }

    putLike(id)
    {
        //постановка лайка
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkReponse);
    }

    deleteLike(id)
    {
        //удаление лайка
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkReponse);
    }

    changeAvatar(avatar)
    {
        //редактирование аватара
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        }).then(this._checkReponse);
    }
}

export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
    headers: {
        authorization: "713e9fcb-7164-40b1-8a98-089d93e7cbcd",
        "Content-Type": "application/json",
    },
});
