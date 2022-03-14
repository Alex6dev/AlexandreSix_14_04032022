import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayRowTable from '../DisplayRowTable';
import Header from '../Header';


/**show Page Employee list
 *  
 * @returns {JSX}
 */

 export default function EmployeeList(){

  const employeeListRedux=useSelector((state)=>state.employee.listEmployee)  
  const [listEmployeeLocal,setListEmployeeLocal]=useState(employeeListRedux)
  const [currentList,setCurrentList]=useState(listEmployeeLocal.slice(0,currentEntries))
  const [currentPage,setCurrentPage]=useState(1)
  const [currentEntries,setCurrentEntries]=useState(10)
  const [currentEmployeeMin,setCurrentEmployeeMin]=useState(0)
  const [currentEmployeeMax,setCurrentEmployeeMax]=useState(currentEmployeeMin+currentList.length)
  const [displayBtnPagePrevious,setDisplayBtnPagePrevious]=useState(false)
  const [displayBtnPageNext,setDisplayBtnPageNext]=useState(true)
  
     
  //change the list by the entries
  useEffect(()=>{
    setCurrentList(listEmployeeLocal.slice(0,currentEntries))
    setCurrentEmployeeMax(currentEmployeeMin+listEmployeeLocal.slice(currentEmployeeMax,currentEmployeeMax+currentEntries).length)
    
  },[currentEntries])
  
  //change index Page
  function changePage(type){
    if(type==="previous"){
      setCurrentPage(currentPage-1)
      setCurrentList(listEmployeeLocal.slice(currentEmployeeMin-currentEntries,currentEmployeeMin))
      setCurrentEmployeeMin(currentEmployeeMin-currentEntries)
      setCurrentEmployeeMax(currentEmployeeMin)
    }else if(type==="next"){
      setCurrentPage(currentPage+1)   
      setCurrentList(listEmployeeLocal.slice(currentEmployeeMax,currentEmployeeMax+currentEntries))   
      setCurrentEmployeeMin(currentEmployeeMax)
      setCurrentEmployeeMax(currentEmployeeMax+listEmployeeLocal.slice(currentEmployeeMax,currentEmployeeMax+currentEntries).length)
    }
  }
  
  
  
  useEffect(()=>{
    if(currentPage===1){
      setDisplayBtnPagePrevious(false)
      setCurrentEmployeeMax(currentList.length)
      if(currentEmployeeMin+currentEntries+currentList.length<listEmployeeLocal.length){
        setDisplayBtnPageNext(true)
      }
    }else if(currentPage>1){
      setDisplayBtnPagePrevious(true)
      if(currentEmployeeMin+currentList.length<listEmployeeLocal.length){
        setDisplayBtnPageNext(true)
      }else{
        setDisplayBtnPageNext(false)
      }
    }
  },[currentList])
  

  return ( 
    <>
      <Header/>
      <main>
      <section className='newEmployeeContent'>
          <h1>Current Employees</h1>
          <div>
            <p>
              Show 
              <select onChange={(e)=>setCurrentEntries(Number(e.target.value))}>
                <option >2</option>
                <option >3</option>
                <option >4</option>
                <option >5</option>
              </select>
              entries
            </p>
            <label htmlFor="search">Search: </label><input type="text" />
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Start Date</th>
                <th scope="col">Department</th>
                <th scope="col">Street</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Zip Code<i className="fa-solid fa-caret-up"></i></th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((employee)=><DisplayRowTable key={employee.zipCode} employeeProps={employee}/>)}
            </tbody>
          </table>
          <div>
            <p>Showing {currentEmployeeMin+1} to {currentEmployeeMax} of {employeeListRedux.length} entries</p>
            {displayBtnPagePrevious? <button type='button' onClick={()=>changePage("previous")}>Previous</button> : null}
            {displayBtnPageNext?<button type='button' onClick={()=>changePage("next")}>Next</button> : null}
          </div>
        </section>
      </main>

    </>
  )   
}
/**
 * 
 */