import { useState, useEffect } from 'react';
import axios from 'axios';

const getPets = accessToken => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        (async accessToken => {
            if (accessToken) {
                const response = await axios({
                    method: 'get',
                    url: `https://us.api.blizzard.com/wow/pet/?locale=en_US&access_token=${accessToken}`
                });

                setPets(response.data.pets);
            }
        })(accessToken);
    }, [accessToken]);

    return pets;
};

export default getPets;
