import React,{useState} from 'react';
import 'antd/dist/antd.css';
import {Card,Input,Icon,Button,Spin,message} from 'antd';

import axios from '../config/apiurl'

import '../static/css/Login.css';

function Login(props){
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    const checkLogin = ()=>{
        setIsLoading(true)
        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        // let dataProps = {
        //     'userName':userName,
        //     'password':password
        // }

        axios.post('/checkLogin',{
            'userName':userName,
            'password':password
        }).then((res)=>{
            setIsLoading(false)
            if(res.data.code===200){
                localStorage.setItem('Token',res.data.data)
                props.history.push("/index/")
            }else{
                message.error('用户名密码错误')
            }
        }).catch(function (error) {
            console.log(error);
        });

        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return(
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="博客后台管理登录" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="请输入用户名"
                        value={userName}
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="请输入密码"
                        value={password}
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > 登录 </Button>
                </Card>
            </Spin>
        </div>
    )
    
}

export default Login