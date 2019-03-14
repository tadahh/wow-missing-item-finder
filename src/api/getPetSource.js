import axios from 'axios';

const getPetSource = (speciesId, accessToken) => {
    const fetchData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `https://us.api.blizzard.com/wow/pet/species/${speciesId}?locale=en_US&access_token=${accessToken}`
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return fetchData();
};

export default getPetSource;
