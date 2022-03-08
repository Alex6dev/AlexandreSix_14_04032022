import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NewEmployee from './components/page/NewEmployee';
import EmployeeList from './components/page/EmployeList';


//Element page home and router contained

export default function App(){
   return ( 
      <Router>
        <Switch>
          <Route exact path="/" component={ NewEmployee }/>
          <Route path="/employee-list" component={ EmployeeList }/>
        </Switch>            
      </Router>   
    );
}