//引入koa-router
const Router=require('koa-router');
const router=new Router();
//引入Db函数，连接mysql
const Dd=require('../model/Db')

//读取文章类别
router.get('/getTypeInfo',async (ctx)=>{
    try {
        let sql = 'SELECT * FROM type'
        let qureyData=await Dd(sql)
        if(qureyData.length>0){
            ctx.body={
                code:200,
                data:qureyData
            }
        }else{
            ctx.body={
                code:400,
                data:'文章类别获取失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
    
})

module.exports=router