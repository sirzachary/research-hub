import axios from 'axios';
import { URLSearchParams } from 'url';
import { base64Encode } from '@libs/utils';

interface GetAuthTokenResponse {
    access_token: string;
    expires_in: 28800;
    refresh_token: string;
    scope: string;
    token_type: string;
    user_id: string;
}

export const getAuthToken = async (code: string): Promise<GetAuthTokenResponse> => {
    const redirectUrl = 'http://localhost:3000/auth/fitbit';
    const clientId = process.env['CLIENT_ID'];
    const clientSecret = process.env['CLIENT_SECRET'];
    const basicAuthToken = base64Encode(`${clientId}:${clientSecret}`);

    const response = await axios.post<any>('https://api.fitbit.com/oauth2/token', new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        redirect_uri: redirectUrl,
        code,
    }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${basicAuthToken}`, 'Accept': 'application/json' } })

    if (response.status === 400) {
        throw Error('Authentication failed.')
    }
    return response.data;
}