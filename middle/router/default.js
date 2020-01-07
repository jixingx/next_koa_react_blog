//引入koa-router
const Router=require('koa-router');
const router=new Router();
//引入Db函数，连接mysql
const Dd=require('../model/Db')

router.get('/my',async (ctx)=>{
    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
              'article.view_count as view_count ,'+
              '.type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id'
    let qureyDate=await Dd(sql)
    console.log(qureyDate)
    ctx.body="123"
})

module.exports=router