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

//文章列表请求
router.get('/getArticleList/:id',async (ctx)=>{
    try {
        let id = ctx.params.id
        let sql = 'SELECT article.Id as id,'+
                 'article.title as title,'+
                 'article.introduce as introduce,'+
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
                 'article.view_count as view_count ,'+
                 'type.typeName as typeName '+
                 'FROM article LEFT JOIN type ON article.type_id = type.Id'+
                 ' WHERE article.type_id='+id
        let ListData=await Dd(sql);
        if(ListData.length>0){
            ctx.body={
                code:200,
                data:ListData
            }
        }else{
            ctx.body={
                code:400,
                data:'文章列表获取失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})

//详细页面请求
router.get('/getArticleById/:id',async (ctx)=>{
    try {
        let id = ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        let ListData=await Dd(sql);
        if(ListData.length>0){
            ctx.body={
                code:200,
                data:ListData
            }
        }else{
            ctx.body={
                code:400,
                data:'文章获取失败'
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