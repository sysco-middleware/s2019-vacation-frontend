export const setCookie = (email) => {

    /*
    //for 30min expiration:
    let now = new Date();
    const minutes = 30;
    now.setTime(now.getTime() + (minutes * 60 * 1000));
    document.cookie="expires=" + now.toUTCString() + ";"
    */

    document.cookie = "email=" + email + ";";
    document.cookie = "loggedIn=true;";
    //document.write(document.cookie);
};

export const checkCookie = (cookieName) => {
    let cookie = cookieName + "=";

    const decodedCookie = decodeURIComponent(document.cookie);
    const splitString = decodedCookie.split(';');

    for (let i = 0; i < splitString.length; i++) {
        let c = splitString[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookie) === 0) {
            return c.substring(cookie.length, c.length);
        }
    }
    return "";
};

export const deleteCookie = () => {
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
};