import { useState, useEffect } from 'react';
import axios from 'axios';

const getCharactersPets = (serverName, characterName, accessToken) => {
    const [charactersPets, setCharactersPets] = useState([]);

    useEffect(() => {
        (async (serverName, characterName, accessToken) => {
            if (accessToken) {
                const response = await axios({
                    method: 'get',
                    url: `${
                        process.env.REACT_APP_US_BLIZZARD_CHARACTER_API_URL
                    }/${serverName}/${characterName}?fields=pets&locale=en_US&access_token=${accessToken}`
                });

                setCharactersPets(response.data.pets.collected);
            }
        })(serverName, characterName, accessToken);
    }, [accessToken]);

    return charactersPets;
};

export default getCharactersPets;
