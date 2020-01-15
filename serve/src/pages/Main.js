import React,{useState,useEffect} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main(){
    const [isLogin,setIslogin]=useState(true)
    useEffect(()=>{
        
        if(localStorage.getItem('Token')){
            setIslogin(true)
        }else{
            setIslogin(false)
        }
        console.log(isLogin)
    },[isLogin])
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/index/"  render={()=>(
                    isLogin?(<AdminIndex />):(<Redirect to="/"/>)
                )}  />
            </Switch>
        </Router>
    )
}

export default Main