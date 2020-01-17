import React from 'react';

import {Row,Col,Menu,Icon} from 'antd'
import '../static/style/components/header.css';

const Header=()=>(
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">小星</span>
                <span className="header-txt">一入前端深似海</span>
            </Col>
            <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
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
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header