export function getCookieValueService(cookieName: string) {
    const cookieRegex = new RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*=\\s*([^;]*).*$)|^.*$`);
    const cookieMatch = document.cookie.match(cookieRegex);

    if (cookieMatch && cookieMatch[1]) {
        return JSON.parse(cookieMatch[1]);
    }

    return null;
}

export const setCookieService = (name: string, value: any, minutes: number) =>{
    var d = new Date();
    d.setTime(d.getTime() + (minutes * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}


