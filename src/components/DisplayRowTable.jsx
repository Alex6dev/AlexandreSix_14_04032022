import React from 'react';


/**show row Table data  
 * @returns {JSX}
 */

export default function DisplayRowTable(props){
  let employee= props.employeeProps
  return ( 
    <tr>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.birthDay}</td>
        <td>{employee.startDay}</td>
        <td>{employee.department}</td>
        <td>{employee.street}</td>
        <td>{employee.city}</td>
        <td>{employee.state}</td>
        <td>{employee.zipCode}</td>
    </tr>
  );  
}
