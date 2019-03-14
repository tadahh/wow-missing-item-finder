import { useState, useEffect } from 'react';
import axios from 'axios';

const setActiveIndex = (activeIndex, index) => {
    useEffect(() => {}, [activeIndex]);

    return [activeIndex, index];
};

export default setActiveIndex;
