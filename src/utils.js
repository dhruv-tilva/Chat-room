import Cookies from "js-cookie";

export const setToken = (token) => {
    Cookies.set("token", token, { expires: 1 })
}

export const setUser = (user) => {
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
}

export const getUSer = () => {
    return JSON.parse(Cookies.get("user"))
}

export const deleteUser = () => {
    Cookies.remove("user")
}

export const getTokenFromCookie = () => {
    return Cookies.get("token");
};

export const deleteTokenCookie = () => {
    Cookies.remove("token");
};