import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Accordion, Icon, Label } from 'semantic-ui-react';
import PetListItem from './PetListItem';
import getAccessToken from '../api/getAccessToken';
import getPets from '../api/getPets';
import getCharactersPets from '../api/getCharactersPets';
import getPetSource from '../api/getPetSource';

const petsWithSourceTypes = {};

const getPetsNameArray = pets => {
    const result = [];
    const map = new Map();

    for (const pet of pets) {
        if (!map.has(pet.name)) {
            map.set(pet.name, true);
            result.push(pet.name);
        }
    }

    return result;
};

const getUniqueNumberOfCharactersPets = charactersPets => {
    const result = [];
    const map = new Map();

    for (const pet of charactersPets) {
        if (!map.has(pet.creatureId)) {
            map.set(pet.creatureId, true);
            result.push(pet);
        }
    }

    return result;
};

const notCollectedPets = (allPets, uniqueCharacterPetsNameArray) => {
    return allPets.filter(pet => {
        return !uniqueCharacterPetsNameArray.includes(pet.name);
    });
};

const findNotCollectedPets = (pets, collectedPets) => {
    const uniqueCharacterPets = getUniqueNumberOfCharactersPets(collectedPets);
    const uniqueCharacterPetsNameArray = getPetsNameArray(uniqueCharacterPets);

    return notCollectedPets(pets, uniqueCharacterPetsNameArray);
};

const renderAccordion = () => {
    const panels = Object.keys(petsWithSourceTypes).map(type => {
        const petListItems = petsWithSourceTypes[type].map(pet => {
            return (
                <>
                    <PetListItem key={pet.name} pet={pet} />
                </>
            );
        });

        return {
            key: `panel-${type}`,
            title: type,
            content: {
                content: (
                    <div className='ui relaxed divided list'>
                        {petListItems}
                    </div>
                )
            }
        };
    });

    const accordion = (
        <Accordion defaultActiveIndex={0} panels={panels} fluid styled />
    );

    ReactDOM.render(accordion, document.getElementById('PetList'));
};

const getPetSourceForNotCollectedPets = (notCollectedPets, accessToken) => {
    notCollectedPets.forEach((pet, i) => {
        getPetSource(pet.stats.speciesId, accessToken, pet).then(petSource => {
            pet.petSource = petSource;
            pet.petSource.sourceType = petSource.source.substr(
                0,
                petSource.source.indexOf(':')
            );

            pet.petSource.source = petSource.source.substring(
                petSource.source.indexOf(':') + 1
            );

            if (
                !petsWithSourceTypes.hasOwnProperty(pet.petSource.sourceType) &&
                pet.petSource.sourceType
            ) {
                petsWithSourceTypes[pet.petSource.sourceType] = [];
                petsWithSourceTypes[pet.petSource.sourceType].push(pet);
            } else if (pet.petSource.sourceType) {
                petsWithSourceTypes[pet.petSource.sourceType].push(pet);
            }

            if (notCollectedPets.length === i + 1) {
                renderAccordion();
            }
        });
    });
};

const PetList = () => {
    const accessToken = getAccessToken();
    const pets = getPets(accessToken);
    const charactersPets = getCharactersPets('Illidan', 'Jugy', accessToken);
    const notCollectedPets = findNotCollectedPets(pets, charactersPets);

    return (
        <div id='PetList' className='ui segment'>
            {getPetSourceForNotCollectedPets(notCollectedPets, accessToken)}
        </div>
    );
};

export default PetList;
