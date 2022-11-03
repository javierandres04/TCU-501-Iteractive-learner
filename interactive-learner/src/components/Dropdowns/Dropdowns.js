import React from 'react'
import './Dropdowns.css'
import { dataMap } from '../../data/dataMap';
import Form from 'react-bootstrap/Form';

export const Dropdowns = ({ grade, setGrade, unit, setUnit, theme, setTheme }) => {
  return (
    <div id='dropdown-bar'>
      <h4 id='selectText'> Select a theme for the games</h4>
      <div id='dropdown-container'>
        
        <Form.Select id='select-dropdown' value={grade} onChange={(e) => { setGrade(e.target.value) }}>
          <option>
            Grade
          </option>
          {dataMap.map((element) => (
            <option key={element.Id} value={element.Grade} > {element.Grade} </option>
          ))}
        </Form.Select>

        {grade === 'Grade' ?
          <>
            <Form.Select id='select-dropdown' disabled onChange={(e) => { setUnit(e.target.value) }}>
              <option>
                Unit
              </option>
            </Form.Select>
            <Form.Select id='select-dropdown' disabled onChange={(e) => { setTheme(e.target.value) }}>
              <option>
                Theme
              </option>
            </Form.Select>
          </>
          :
          <>
            <Form.Select id='select-dropdown' value={unit} onChange={(e) => { setUnit(e.target.value) }}>
              <option>
                Unit
              </option>
              {dataMap.filter(element => element.Grade === grade)[0].Units.map((element) => (
                <option key={element.Id} value={element.Unit} > {element.Unit} </option>
              ))}
            </Form.Select>

            {
              unit === 'Unit' ?
                <Form.Select id='select-dropdown' disabled onChange={(e) => { setTheme(e.target.value) }}>
                  <option>
                    Theme
                  </option>
                </Form.Select> :
                <Form.Select id='select-dropdown' value={theme} onChange={(e) => { setTheme(e.target.value) }}>
                  <option>
                    Theme
                  </option>
                  {dataMap.filter(element => element.Grade === grade)[0].Units.filter(element =>
                    element.Unit === unit)[0].Themes.map((element) => (
                      <option key={element.Name} value={element.Name} > {element.Name} </option>
                    ))
                  }
                </Form.Select>
            }
          </>
        }

      </div>
    </div>
  );

};