import { configs } from "../../contants"

export const exchangeCodeForAccessToken = async (code: string) => {
    const basicAuthToken = btoa(`${configs.clientId}:clientSecret`);
    const response = await fetch('https://api.fitbit.com/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${basicAuthToken}`, 'Accept': 'application/json' },
        body: new URLSearchParams({
            client_id: configs.clientId,
            grant_type: 'authorization_code',
            redirect_uri: configs.redirectUrl,
            code,
        })
    })
    if (response.status === 400) {
        throw Error('Authentication')
    }
    return await response.json();
}

export interface ProfileResponse {
    user: {
        firstName: string;
        lastName: string;
    }
}

export const getProfile = async (): Promise<ProfileResponse> => {
    const token = localStorage.getItem('fitbit.access_token')
    const response = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    })
    return await response.json();
}