# 博客项目
## 前端

### 所选框架和技术


### 项目前端启动


## 中台
使用nodejs开发

### 所选框架和技术
1. koa框架
2. koa-bodyparser(解决post请求参数)
3. koa-router(路由模块)
4. koa-static(处理静态资源)
5. koa2-cors(处理跨域)
6. mysql(链接mysql数据库)
7. jsonwebtoken(处理token)
8. koa-jwt(主要提供路有权限控制的功能，它会对需要限制的资源请求进行检查)

### 接口
1. 前端接口
2. 后端接口: 

(1) /admin/checkLogin 登录接口

接受参数:


|  参数  | 描述 |
|  ---  | ---  |
| userName  | 用户名 |
| password  | 密码 |

返回值:
> token

(2) /admin/getTypeInfo 获取类别接口

接受参数:无

返回值：

`{code:200,data:类别所有内容} OR  {code:400,data:暂无数据}`

(3) /admin/addArticle 添加文章接口

接受参数:


|  参数  | 描述 |
|  ---  | ---  |
| type_id  | 文章类型编号 |
| title  | 文章标题 |
| article_content  | 文章主题内容 |
| introduce  | 文章简介 |
| addTime  | 文章发布时间 |
| view_count  | 浏览次数 |

返回值:

`{code:200,isScuccess:true,insertId:增加返回的id} AND {code:400,isScuccess:false,insertId:增加返回的id}`

(4) /admin/getArticleList 文章类表接口

接收参数:无

返回值:
`{code:200,data:所有文章} OR  {code:400,data:暂无数据}`

## 后端

### 所选框架和技术
1. React Hooks
2. antd
3. marked
4. axios

## 数据库
使用mysql数据库
1. > 文章类型表(type表)
   
|  字段   | 类型  | 描述 |
|  ---  | ---  | --- |
| id  | int | 类型编号<font color=red>(主键)</font> |
| typeName  | varchar | 文章类型名称 |
| orderNum  | int | 类型排序编号 |


2. > 文章内容表(article表)
   
|  字段   | 类型  | 描述 |
|  ---  | ---  | --- |
| id  | int | 文章编号<font color=red>(主键)</font> |
| type_id  | varchar | 文章标题 |
| article_cointent   | text | 文章主体内容 |
| introduce | text | 文章简介 |
| addTime | int(11) | 文章发布时间 |
| view_count | int类型 | 浏览次数 |

3. > 用户表(admin_user)

| 字段 | 类型 | 描述 |
| --- | ---| --- |
| id | int | 用户id<font color=red>(主键)</font> |
| userName | varchar | 用户名 |
| password | varchar | 密码 |