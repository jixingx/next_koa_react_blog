import React,{useState} from 'react';
import 'antd/dist/antd.css';
import {Card,Input,Icon,Button,Spin} from 'antd';

import '../static/css/Login.css';

function Login(){
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    const checkLogin = ()=>{
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    return(
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="博客后台管理登录" bordered={true} style={{ width: 400 ,transform: 'translateX(-50%)'}} >
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