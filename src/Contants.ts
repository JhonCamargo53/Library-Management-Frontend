export const COOKIE_NAME = 'library-management'

/**
 *  Lista de roles
 */

export const ADMIN = "ADMIN";
export const USER = "USER";
export const GUEST = "GUEST";


/**
 * 
 * 
 * Al crear un role se debe agregar a AllowRole 
 */

export type AllowedRole = typeof ADMIN |
    typeof USER |
    typeof GUEST

/*
 Diccionario de Roles
 */

export const roleDictionary: { [role: string]: number } = {
    [ADMIN]: 0,
    [USER]: 1,
    [GUEST]: 2,
};
