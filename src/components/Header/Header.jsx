import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

/**show Header  
 * @returns {JSX}
 */

export default function Header(){
  let fonction= true
  return ( 
    <header>
      <img src={logo} alt="logo Wealt Health" className='headerLogo ' />
      {fonction?(
        <Link to="/employee-list" className='headerLink button'>
          <p>View Current Employees</p>
        </Link>
      ):(
        <>
          <Link to="/" className='headerLink button'>
            <p>Home</p>
          </Link>
        </>
      )}
      
    </header>     
  );  
}
