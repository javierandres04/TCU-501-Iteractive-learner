import React from 'react'
import './Dropdowns.css'
import { grades } from '../../data/Themes/grades';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';


export const Dropdowns = () => {
  const [grade, setGrade] = useState('Grade');
  const [unit, setUnit] = useState('Unit');
  const [theme, setTheme] = useState('Theme');
  const [route, setRoute] = useState('')


  return (
    <div id='dropdown-bar'>
      <h4 id='selectText'> Select a theme for the games</h4>
      <div id='dropdown-container'>
        <Form.Select id='select-dropdown' onChange={(e) => { setGrade(e.target.value) }}>
          <option>
            Grade
          </option>
          {grades.map((element) => (
            <option key={element.Id} value={element.Grade} > {element.Grade} </option>
          ))}
        </Form.Select>

        {grade === 'Grade' ?
          <Form.Select id='select-dropdown' disabled onChange={(e) => { setUnit(e.target.value) }}>
            <option>
              Unit
            </option>
          </Form.Select> :
          <Form.Select id='select-dropdown' onChange={(e) => { setUnit(e.target.value) }}>
            <option>
              Unit
            </option>
            {grades.filter(element => element.Grade === grade)[0].Units.map((element) => (
              <option key={element.Unit} value={element.Unit} > {element.Unit} </option>
            ))}
          </Form.Select>
        }

        {
          unit === 'Unit' ?
            <Form.Select id='select-dropdown' disabled onChange={(e) => { setTheme(e.target.value) }}>
              <option>
                Theme
              </option>
            </Form.Select> :
            <Form.Select id='select-dropdown' onChange={(e) => { setTheme(e.target.value) }}>
              <option>
                Theme
              </option>
              {grades.filter(element => element.Grade === grade)[0].Units.filter(element =>
                element.Unit === parseInt(unit))[0].Themes.map((element) => (
                  <option key={element.Name} value={element.Name} > {element.Name} </option>
                ))
              }
            </Form.Select>
        }
      </div>
    </div>
  );

};