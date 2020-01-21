import React,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Row,Col,List,Icon} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

import "../static/style/pages/index.css"

import axios from '../config/apiUrl'

const Home = (list) => {
  const [mylist,setList]=useState(list.data)
  const NavClick=(key)=>{
    console.log(key)
    
    axios.get('/getArticleList/'+key).then((res)=>{
      if(res.data.code===200){
        setList(res.data.data)
      }else{
        setList([])
      }
        
    })
  }
  return(
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header NavClick={NavClick} />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <List 
              header={<div>学习列表</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item=>(
                <List.Item>
                  
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>  
                </List.Item>  
              )}
            />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </>
  )
}
Home.getInitialProps=async ()=>{
  const promise=new Promise((resolve)=>{
    axios.get('/getArticleList/1').then((res)=>{
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
    })
  })
  return promise;
}
export default Home
