import React, { useEffect } from 'react'
import './Dropdowns.css'
import { dataMap } from '../../data/dataMap';
import Form from 'react-bootstrap/Form';

export const Dropdowns = ({ grade, setGrade, unit, setUnit, theme, setTheme }) => {

  useEffect(() => {
    if (grade === 'Grade') {
      setUnit('Unit');
      setTheme('Theme');
    }
  }, [grade])
  
  useEffect(() => {
    if (unit === 'Unit') {
      setTheme('Theme');
    }
  }, [unit])

  const handleGradeChange = (newGrade) => {
    setGrade(newGrade);
    setUnit('Unit'); // Reset the Unit when Grade changes
    setTheme('Theme'); // Reset the Theme when Grade changes
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    setTheme('Theme'); // Reset the Theme when Unit changes
  };

  return (
    <div id='dropdown-bar'>
      <div id='dropdown-container'>

        <Form.Select id='select-dropdown' value={grade} onChange={(e) => { handleGradeChange(e.target.value);  }}>
          <option>
            Grade
          </option>
          {dataMap.map((element) => (
            <option key={element.Id} value={element.Grade} > {element.Grade} </option>
          ))}
        </Form.Select>

        {grade === 'Grade' ?
          <>
            <Form.Select id='select-dropdown' disabled onChange={(e) => { handleUnitChange(e.target.value); }}>
              <option>
                Unit
              </option>
            </Form.Select>
            <Form.Select id='select-dropdown' disabled onChange={(e) => { setTheme(e.target.value);  }}>
              <option>
                Theme
              </option>
            </Form.Select>
          </>
          :
          <>
            <Form.Select id='select-dropdown' value={unit} onChange={(e) => { setUnit(e.target.value);  }}>
              <option>
                Unit
              </option>
              {dataMap.filter(element => element.Grade === grade)[0].Units.map((element) => (
                <option key={element.Id} value={element.Unit} > {element.Unit} </option>
              ))}
            </Form.Select>

            {
              unit === 'Unit' ?
                <Form.Select id='select-dropdown' disabled onChange={(e) => { setTheme(e.target.value);  }}>
                  <option>
                    Theme
                  </option>
                </Form.Select> :
                <Form.Select id='select-dropdown' value={theme} onChange={(e) => { setTheme(e.target.value);  }}>
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