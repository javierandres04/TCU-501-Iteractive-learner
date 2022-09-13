import React from 'react';

export const MainPage = () => {
    const metodo = ()=>{
        console.log('Hola Munndo');
    }
    return (
        <button onClick = {metodo}></button>
    );
};