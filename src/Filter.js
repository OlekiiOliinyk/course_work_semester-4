import React from 'react';

export const getFilteredItems = (query, obj) => {

    if (!query){
        return obj;
    }
    return obj.filter((el) => el.title.toLowerCase().includes(query.toLowerCase()));
}



const Filter = ({ value, onChange }) => {



    return (
        <input 
            type="text" 
            onChange={onChange}
            value={value}
            placeholder="Search..." 
        />
    );
}

export default Filter;