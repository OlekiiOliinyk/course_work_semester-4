import React from 'react';
import "./styles/Filter.css"



export const getFilteredItems = (query, obj) => {

    if (!query){
        return obj;
    }
    return obj.filter((el) => el.title.toLowerCase().includes(query.toLowerCase()));
}



const Filter = ({ value, onChange }) => {



    return (
        <input 
            className='input-field'
            type="text" 
            onChange={onChange}
            value={value}
            placeholder="Пошук..." 
        />
    );
}

export default Filter;