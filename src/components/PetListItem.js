import React from 'react';

const PetListItem = ({ pet }) => {
    return (
        <div className='item' data-type={''}>
            {/* <img
                className='ui avatar image'
                src={
                    'https://render-us.worldofwarcraft.com/icons/56/' +
                    props.pet.icon
                }
            /> */}
            <div className='right floated content'>
                <div className='ui button'>wowhead</div>
            </div>
            <div className='content'>
                <a className='header'>{pet.name}</a>
                <div className='description'>{pet.petSource.source}</div>
            </div>
        </div>
    );
};

export default PetListItem;
