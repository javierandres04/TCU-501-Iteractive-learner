import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './Dropdowns.css'


export const Dropdowns = () => {
  //Cambiar los datos quemados por map
  return (
    <div id='dropdown-bar'>
      <h4 id='selectText'> Select a theme for the games</h4>
      <div id='dropdown-container'>
        <Dropdown>
          <Dropdown.Toggle variant='secondary'>
            Grade
          </Dropdown.Toggle>

          <Dropdown.Menu variant='dark'>
            <Dropdown.Item > 4th </Dropdown.Item>
            <Dropdown.Item > 5th </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant='secondary'>
            Unit
          </Dropdown.Toggle>

          <Dropdown.Menu variant='dark'>
            <Dropdown.Item > Unit 1 </Dropdown.Item>
            <Dropdown.Item > Unit 2 </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant='secondary'>
            Theme
          </Dropdown.Toggle>
          <Dropdown.Menu variant='dark'>
            <Dropdown.Item > Wheather and Seasons </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );

};