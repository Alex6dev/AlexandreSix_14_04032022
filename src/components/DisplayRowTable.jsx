import React from 'react';


/**show row Table data  
 * @returns {JSX}
 */

export default function DisplayRowTable(props){
  let employee= props.employeeProps
  return ( 
    <tr>
        <td><p>{employee.firstName}</p></td>
        <td><p>{employee.lastName}</p></td>
        <td><p>{employee.birthDay}</p></td>
        <td><p>{employee.startDay}</p></td>
        <td><p>{employee.department}</p></td>
        <td><p>{employee.street}</p></td>
        <td><p>{employee.city}</p></td>
        <td><p>{employee.state}</p></td>
        <td><p>{employee.zipCode}</p></td>
    </tr>
  );  
}
