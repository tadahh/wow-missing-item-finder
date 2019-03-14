import { useState, useEffect } from 'react';
import axios from 'axios';

const getAccessToken = () => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        (async () => {
            const response = await axios({
                method: 'post',
                url: `${
                    process.env.REACT_APP_BATTLE_NET_URL
                }/oauth/token?grant_type=client_credentials`,
                auth: {
                    username: process.env.REACT_APP_BNET_ID,
                    password: process.env.REACT_APP_BNET_SECRET
                }
                // params: {
                //     grant_type: 'client_credentials'
                // }
            });

            setAccessToken(response.data.access_token);
        })();
    }, []);

    return accessToken;
};

export default getAccessToken;
