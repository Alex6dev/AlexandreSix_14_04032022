import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

/**show Header  
 * @returns {JSX}
 */

export default function Header(props){
  let type= props.type
  return ( 
    <header>
      <img src={logo} alt="logo Wealt Health" className='headerLogo ' />
      {type==="newEmployee"?(
        <Link to="/employee-list" className='headerLink button'>
          <p>View Current Employees</p>
        </Link>
      ):(
        <>
          <Link to="/" className='headerLink button'>
            <p>Create Employee</p>
          </Link>
        </>
      )}
      
    </header>     
  );  
}
