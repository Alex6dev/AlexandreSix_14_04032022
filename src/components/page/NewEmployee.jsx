import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { states } from '../../assets/states';
import { useHistory } from 'react-router-dom';
import * as employeeActions from '../../features/employee'
import { useDispatch } from 'react-redux';
import Modal from 'plugin_modal_react/dist/components/Modal';
import { ModalExit, ModalContent, ModalTittle, ModalIcons, ModalText } from 'plugin_modal_react';

/**show Page new employee
 *  
 * @returns {JSX}
 */

 export default function NewEmployee(){
  const [newEmployeeState,setNewemployeeState]= useState({
    firstName:null,
    lastName:null,
    birthDay:null,
    startDay:null,
    street:null,
    city:null,
    state:null,
    zipCode:null,
    department:null,
  })
  const [showModal,setShowModal]= useState(false)
  const [routeList,setRouteList]= useState(false)
  const dispatch=useDispatch()
  const history=useHistory()
  
//function submitForm
  function submit(){
    if(newEmployeeState.firstName && newEmployeeState.lastName && newEmployeeState.birthDay && newEmployeeState.startDay && newEmployeeState.street && newEmployeeState.city && newEmployeeState.state && newEmployeeState.zipCode && newEmployeeState.department){
      console.log(newEmployeeState)
      dispatch(employeeActions.addNewEmployee(newEmployeeState))
      setShowModal(true)
    }else{
      alert("formulaire incomplet")
    }
  }
  
  useEffect(()=>{
    if(routeList){
      history.push("/employee-list")
    }
  },[routeList])
  return ( 
    <>
      <Header type="newEmployee"/>
      <main>
        <section className='newEmployeeContent'>
          <h1>Create Employee</h1>
          <form>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={e=>setNewemployeeState({...newEmployeeState,firstName:e.target.value})}></input>
            
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={e=>setNewemployeeState({...newEmployeeState,lastName:e.target.value})}></input>
            
            <label htmlFor="birthDay">Date of Birth</label>
            <input type="date" id="birthDay" onChange={e=>setNewemployeeState({...newEmployeeState,birthDay:e.target.value})}></input>
            
            <label htmlFor="startDay">Start Day</label>
            <input type="date" id="startDay" onChange={e=>setNewemployeeState({...newEmployeeState,startDay:e.target.value})}></input>
            
            <fieldset>
              <legend>Address</legend>
             
              <label htmlFor="street">Street</label>
              <input type="text" id="street" onChange={e=>setNewemployeeState({...newEmployeeState,street:e.target.value})}></input>
              
              <label htmlFor="city">City</label>
              <input type="text" id="city" onChange={e=>setNewemployeeState({...newEmployeeState,city:e.target.value})}></input>
              
              <label htmlFor="state">State</label>
              <select name="state" id="state" onChange={e=>setNewemployeeState({...newEmployeeState,state:e.target.value})}>
                <option disabled>---Select state---</option>
                {  states && states.length > 0 && states.map((item) => <option key={item.name}>{item.name}</option>)}
              </select>
              <label htmlFor="zipCode">Zip Code</label><input type="number" id="zipCode" onChange={e=>setNewemployeeState({...newEmployeeState,zipCode:e.target.value})}></input>
            </fieldset>
            <label htmlFor="department">Department</label>
            <select name="department" id="department" onChange={e=>setNewemployeeState({...newEmployeeState,department:e.target.value})}>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
            </select>
            <button type='button' className='button buttonForm' onClick={()=>submit()}>Save</button>
          </form>
        </section>
        {showModal&&<Modal>
            <ModalContent type={"success"}>
              <ModalTittle>EMPLOYEE ADD TO LIST <ModalIcons type={"success"}/></ModalTittle>
              <ModalText> the employer {newEmployeeState.firstName+" "+newEmployeeState.lastName} is well added to the list of employers</ModalText>
              <ModalExit etat={routeList} set={setRouteList}>employee list</ModalExit>
            </ModalContent>
          </Modal>}
      </main>

    </>
  )   

}
