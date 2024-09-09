export const saveCart = (cart) => {
    const cartJsonString = JSON.stringify(cart);
    document.cookie = `myCart=${encodeURIComponent(cartJsonString)};path=/;expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`;
}

export const getCookie = () => {
    let cookieValue
    const value = `; ${document.cookie}`;
    const parts = value.split(`; myCart=`);
    if (parts.length === 2) cookieValue = parts.pop().split(';').shift();
    if (cookieValue) {
        return JSON.parse(decodeURIComponent(cookieValue))
    }
    return [];
}

