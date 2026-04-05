import {BASE_URL, ENDPOINTS} from "./usersApiConfig.js";

export const getUsers = async () => {
    try {
        let res = await fetch(`${BASE_URL}${ENDPOINTS.users}`);
        return await res.json()
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        let res = await fetch(
            `${BASE_URL}${ENDPOINTS.users}/${userId}`);
        return await res.json()
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createUser = async (user) => {
    try {
        let res = await fetch(
            `${BASE_URL}${ENDPOINTS.users}`,
            {method: "POST",
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(user)},
            );
        return await res.json()
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateUser = async (userId, user) => {
    try {
        let res = await fetch(
            `${BASE_URL}${ENDPOINTS.users}/${userId}`,
            {method: "PUT",
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(user)},
            );
        return await res.json()
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        let res = await fetch(
            `${BASE_URL}${ENDPOINTS.users}/${userId}`,
            {method: "DELETE"});
        return await res.json()
    } catch (error) {
        console.error(error);
        throw error;
    }
}