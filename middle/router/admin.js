//引入koa-router
const Router=require('koa-router');
const router=new Router();
//引入Db函数，连接mysql
const Dd=require('../model/Db')
//引入jsonwebtoken模块
const jwt=require('jsonwebtoken')

router.post('/checkLogin',async (ctx)=>{
    try {
        let {userName,password}=ctx.request.body
        let sql=`SELECT userName,id FROM admin_user WHERE userName='${userName}' AND password='${password}'`;
        let qureyDate=await Dd(sql)
        //console.log(qureyDate[0].userName)
        if(qureyDate.length>0){
            let rule={id:qureyDate[0].id,userName:qureyDate[0].userName}
            /**
             * 签名方法:jwt.sign(payload, secretOrPrivateKey, [options, callback])
                payload 是一个json对象或者是一个可以json化的buffer或字符串 这个对象可以存储用户id,会话信息等,这里的信息都是可以使用jwt.verify()方法拿到的. 

                secretOrPrivateKey是加密的key或者叫做密匙,不知道密匙是无法解析payload参数的.

                options 参数 是一个json对象

                expiresIn : 表示有效期  不带单位默认为秒  如带单位如: "2 days", "10h", "7d"
                还有很多参数设置,具体请查看官文
                * 
                */
            //jwt.sign("规则","加密名字","过期时间","箭头函数")
            let token=jwt.sign(rule,"secret",{expiresIn:'1h'})
            ctx.body={
                code:200,
                data:"Bearer "+token
            }
        }else{
            ctx.body={
                code:400,
                data:'登录失败'
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