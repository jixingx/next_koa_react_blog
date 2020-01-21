import React,{useEffect,useState} from 'react';
// import Router from 'next/router'
//import Link from 'next/link'
import {Row,Col,Menu,Icon} from 'antd'
import '../static/style/components/header.css';

import axios from '../config/apiUrl'

const Header=(props)=>{
    const [navArray,setNavArray]=useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const result= await axios.get("/getTypeInfo").then(
                 (res)=>{
                     setNavArray(res.data.data)
                     return res.data.data
                 }
               )
            setNavArray(result)
         }
         fetchData()
    },[])
    //点解获取对应key值
    const handleClick = (e)=>{
        //console.log(e.key)
        props.NavClick(e.key)
    }
    return(
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">小星</span>
                    <span className="header-txt">一入前端深似海</span>
                </Col>
                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu 
                    mode="horizontal"
                    onClick={handleClick}
                    defaultSelectedKeys="[1]"
                    >
                        {/* <Menu.Item key="home">
                            <Icon type="html5" />
                            web前端
                        </Menu.Item>
                        <Menu.Item key="video">
                            <Icon type="chrome" />
                            php
                        </Menu.Item>
                        <Menu.Item key="life">
                            <Icon type="windows" />
                            python
                        </Menu.Item> */}
                        {
                            navArray.map((item)=>{
                                return(
                                    <Menu.Item key={item.Id}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header