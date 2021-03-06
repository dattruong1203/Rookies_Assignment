import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    USER_PROFILE_STORAGE_KEY,
    REQUEST_ACCESS_TOKEN_STORAGE_KEY,
} from '../../Constants/oidc-config';
import { HOME } from '../../Constants/pages';
import AuthServie from '../../Services/auth-service';
import Request from '../../Services/request';

const Auth = () => {
    const history = useHistory();
    const { action } = useParams();

    useEffect(() => {
        switch (action) {
            case 'login-callback':
                AuthServie.completeLoginAsync(window.location.href).then(
                    (values) => {
                        Request.setAuthentication(values.access_token);
                        localStorage.setItem(
                            USER_PROFILE_STORAGE_KEY,
                            JSON.stringify(values.profile)
                        );
                        localStorage.setItem(
                            REQUEST_ACCESS_TOKEN_STORAGE_KEY,
                            values.access_token
                        );
                        history.replace(HOME);
                        window.location.reload();
                    }
                );

                break;

            case 'logout-callback':
                AuthServie.completeLogoutAsync(window.location.href).then(
                    () => {
                        localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
                        localStorage.removeItem(
                            REQUEST_ACCESS_TOKEN_STORAGE_KEY
                        );
                        history.replace(HOME);
                        window.location.reload();
                    }
                );

                break;

            default:
                break;
        }
    }, [action]);

    return <></>;
};

export default Auth;
