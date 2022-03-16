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
  
     
  //change the list and employeeMax by the entries 
  useEffect(()=>{
    setCurrentList(listEmployeeLocal.slice(0,currentEntries))
    setCurrentEmployeeMax(currentEmployeeMin+listEmployeeLocal.slice(currentEmployeeMax,currentEmployeeMax+currentEntries).length)
    
  },[currentEntries])

  //change content table by the index page
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
  
  
  //display or not the button previous/next
  useEffect(()=>{
    if(currentPage===1){
      setDisplayBtnPagePrevious(false)
      setCurrentEmployeeMax(currentList.length)
      if(currentList.length<listEmployeeLocal.length){
        setDisplayBtnPageNext(true)
      }else{
        setDisplayBtnPageNext(false)
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
  
  //activate the button select and delete are reverse
  function checkReverseButton(btnId,btnIdReverse){
    document.getElementById(btnId).classList.add('tableButtonActive')
    if(document.getElementById(btnIdReverse).classList.contains('tableButtonActive')){
      document.getElementById(btnIdReverse).classList.remove('tableButtonActive')
    }
  }

  //edit list based on activate button
  function changeOrderList(type,order){
    const list=[...currentList]
    switch(type){
      case'firstName':
        if(order){
          list.sort(function(a,b){return b.firstName.localeCompare(a.firstName)})
          checkReverseButton("buttonFirstBottom","buttonFirstTop")
        }else{
          list.sort(function(a,b){return a.firstName.localeCompare(b.firstName)})
          checkReverseButton("buttonFirstTop","buttonFirstBottom")
        }
    
        break;
      case'lastName':
        if(order){
          list.sort(function(a,b){return b.lastName.localeCompare(a.lastName)})
          checkReverseButton("buttonLastBottom","buttonLastTop")
        }else{
          list.sort(function(a,b){return a.lastName.localeCompare(b.lastName)})
          checkReverseButton("buttonLastTop","buttonLastBottom")
        }
        break;
      case'birthDay':
        if(order){
          list.sort(function(a,b){return Date.parse(b.birthDay)-Date.parse(a.birthDay)})
          checkReverseButton("buttonBirthDayBottom","buttonBirthDayTop")
        }else{
          list.sort(function(a,b){return Date.parse(a.birthDay)-Date.parse(b.birthDay)})
          checkReverseButton("buttonBirthDayTop","buttonBirthDayBottom")
        }
        break;
      case'startDay':
        if(order){
          list.sort(function(a,b){return Date.parse(b.startDay)-Date.parse(a.startDay)})
          checkReverseButton("buttonStartDayBottom","buttonStartDayTop")
        }else{
          list.sort(function(a,b){return Date.parse(a.startDay)-Date.parse(b.startDay)})
          checkReverseButton("buttonStartDayTop","buttonStartDayBottom")
        }
        break;
      case'department':
        if(order){
          list.sort(function(a,b){return b.department.localeCompare(a.department)})
          checkReverseButton("buttonDepartmentBottom","buttonDepartmentTop")
        }else{
          list.sort(function(a,b){return a.department.localeCompare(b.department)})
          checkReverseButton("buttonDepartmentTop","buttonDepartmentBottom")
        }
        break;
      case'street':
        if(order){
          list.sort(function(a,b){return b.street.localeCompare(a.street)})
          checkReverseButton("buttonStreetBottom","buttonStreetTop")
        }else{
          list.sort(function(a,b){return a.street.localeCompare(b.street)})
          checkReverseButton("buttonStreetTop","buttonStreetBottom")
        }
        break;
      case'city':
        if(order){
          list.sort(function(a,b){return b.city.localeCompare(a.city)})
          checkReverseButton("buttonCityBottom","buttonCityTop")
        }else{
          list.sort(function(a,b){return a.city.localeCompare(b.city)})
          checkReverseButton("buttonCityTop","buttonCityBottom")
        }
        break;
      case'state':
        if(order){
          list.sort(function(a,b){return b.state.localeCompare(a.state)})
          checkReverseButton("buttonStateBottom","buttonStateTop")
        }else{
          list.sort(function(a,b){return a.state.localeCompare(b.state)})
          checkReverseButton("buttonStateTop","buttonStateBottom")
        }
        break;
      case'zipCode':
        if(order){
          list.sort(function(a,b){return b.zipCode.localeCompare(a.zipCode)})
          checkReverseButton("buttonZipCodeBottom","buttonZipCodeTop")
        }else{
          list.sort(function(a,b){return a.zipCode.localeCompare(b.zipCode)})
          checkReverseButton("buttonZipCodeTop","buttonZipCodeBottom")
        }
        break;
      }
    setListEmployeeLocal(list)
  }

  //modify the list according to the source list
  useEffect(()=>{ 
    setCurrentList(listEmployeeLocal)
  },[listEmployeeLocal])
  
  //keyword search algorithm
  function searchElement(value){
    let arrayListEmployee=[]
    employeeListRedux.find((employee)=>{ 
      if(employee.firstName.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.lastName.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.birthDay.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.startDay.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.department.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.street.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.city.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.state.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
      if(employee.zipCode.toLocaleLowerCase()===value){
        arrayListEmployee.push(employee)
      }
    })
    const filterArray=arrayListEmployee.filter((ele,pos)=>arrayListEmployee.indexOf(ele)==pos);
    setListEmployeeLocal(filterArray)
  }
  return ( 
    <>
      <Header/>
      <main>
      <section className='EmployeeListContent'>
          <h1>Current Employees</h1>
          <div className='tableBoxEntriesSearch'>
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
            <div className='tableBoxSearch'><label htmlFor="search" >Search: </label><input type="text" onChange={(e)=>searchElement(e.target.value)}/></div>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>First Name</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonFirstTop' onClick={()=>changeOrderList('firstName',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonFirstBottom' onClick={()=>changeOrderList('firstName',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>Last Name</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonLastTop' onClick={()=>changeOrderList('lastName',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonLastBottom' onClick={()=>changeOrderList('lastName',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>Date of Birth</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonBirthDayTop' onClick={()=>changeOrderList('birthDay',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonBirthDayBottom' onClick={()=>changeOrderList('birthDay',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>Start Date</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonStartDayTop' onClick={()=>changeOrderList('startDay',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonStartDayBottom' onClick={()=>changeOrderList('startDay',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>  
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>Department</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonDepartmentTop' onClick={()=>changeOrderList('department',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonDepartmentBottom' onClick={()=>changeOrderList('department',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>                  
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>Street</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonStreetTop' onClick={()=>changeOrderList('street',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonStreetBottom' onClick={()=>changeOrderList('street',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>   
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>City</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonCityTop' onClick={()=>changeOrderList('city',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonCityBottom' onClick={()=>changeOrderList('city',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>   
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>State</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonStateTop' onClick={()=>changeOrderList('state',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonStateBottom' onClick={()=>changeOrderList('state',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>   
                <th scope="col">
                  <div className='tableTitreColums'>
                    <p>ZipCode</p>
                    <div className='tableBoxButton'>
                      <button type="button" className='tableButton' id='buttonZipCodeTop' onClick={()=>changeOrderList('zipCode',false)}>
                        <i className="fa-solid fa-angle-up"></i>
                      </button>
                      <button type="button" className='tableButton' id='buttonZipCodeBottom' onClick={()=>changeOrderList('zipCode',true)}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    </div>
                  </div>
                </th>   
              </tr>
            </thead>
            <tbody>

              {
                currentList.length===0? (<tr><td colSpan={"9"}><p>We couldn't find any jobs with this search</p></td></tr>):(currentList.map((employee)=><DisplayRowTable key={employee.zipCode} employeeProps={employee}/>))
              }
            </tbody>
          </table>
          <div className='tableBottom'>
            <p>Showing {currentEmployeeMin+1} to {currentEmployeeMax} of {employeeListRedux.length} entries</p>
            {displayBtnPagePrevious? <button type='button' className='tableButton' onClick={()=>changePage("previous")}>Previous</button> : null}
            {displayBtnPageNext?<button type='button' className='tableButton' onClick={()=>changePage("next")}>Next</button> : null}
          </div>
        </section>
      </main>

    </>
  )   
}
