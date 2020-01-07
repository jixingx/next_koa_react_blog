const Koa=require('koa');
const app=new Koa();

//引入koa2-cors，设置跨域
const cors=require('koa2-cors');
app.use(cors())

//引入koa-bodyparser，解决post请求
const bodyParser=require('koa-bodyparser');
app.use(bodyParser());

//引入koa-static,处理静态资源
const path=require('path');
const static=require('koa-static')
const staticPath='./static'
app.use(static(path.join(__dirname,staticPath)));

//引入koa-router，处理路由
const Router=require('koa-router');
const router=new Router()



//引入自定义路由配置
const defaul=require('./router/default');

//配置路由
router.use('/default',defaul.routes());

app.use(router.routes())//挂载router方法

app.listen(8080);