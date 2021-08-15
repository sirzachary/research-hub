import React, { useLayoutEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { exchangeCodeForAccessToken, getProfile, ProfileResponse } from '../../service/fitbit';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const AuthCompleteScreen = () => {
    const query = useQuery();
    const code = query.get('code');
    const [accessToken, setAccessToken] = useState();
    const [profile, setProfile] = useState<ProfileResponse>();
    const [error, setError] = useState<Error>();

    useLayoutEffect(() => {
        if (accessToken) {
            getProfile().then((profile) => {
                setProfile(profile);
            })
        }
    }, [accessToken])

    useLayoutEffect(() => {
        if (code) {
            console.log('Exchanging code for token')
            exchangeCodeForAccessToken(code).then((data) => {
                console.log('resolving')
                localStorage.setItem('fitbit.access_token', data.access_token)
                setAccessToken(data.access_token)
            }).catch((error) => {
                console.log(error)
                setError(error);
            })
        }
    }, [code])

    if (error) {
        return <Redirect to="/login" />
    }

    if (profile == null) {
        return null;
    }

    return <div className="relative py-16 px-8 bg-white">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">You've successfully enrolled in this study, <span className="text-indigo-600">{profile.user.firstName}</span>!</span>

        </h2>
        <p className="mt-3 text-md font-bold tracking-tight text-gray-700">You may now close this page.</p>
    </div>
}