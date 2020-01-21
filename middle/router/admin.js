//引入koa-router
const Router=require('koa-router');
const router=new Router();
//引入Db函数，连接mysql
const Dd=require('../model/Db')
//引入jsonwebtoken模块
const jwt=require('jsonwebtoken')

//登录接口
router.post('/checkLogin',async (ctx)=>{
    try {
        let {userName,password}=ctx.request.body
        //console.log(userName,password)
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

//获取文章类别的接口
router.get('/getTypeInfo',async (ctx)=>{
    try {
        let sql=`SELECT * FROM type`;
        let qureyDate=await Dd(sql)
        if(qureyDate.length>0){
            ctx.body={
                code:200,
                data:qureyDate
            }
        }else{
            ctx.body={
                code:200,
                data:'暂无数据'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})

//获取文章接口
router.post('/addArticle',async (ctx)=>{
    try {
        let {type_id,title,article_content,introduce,addTime,view_count}=ctx.request.body
        article_content=article_content.replace(/;/g,"々");
        //console.log(article_content)
        let sql=`
            INSERT INTO article 
            (Id,type_id,title,article_content,introduce,addTime,view_count) 
            VALUES(null,${type_id},'${title}','${article_content}','${introduce}','${addTime}',${view_count})
            `
        let addData=await Dd(sql);
        if(addData.affectedRows>0){
            ctx.body={
                code:200,
                isScuccess:true,
                insertId:addData.insertId
            }
        }else{
            ctx.body={
                code:400,
                isScuccess:false,
                insertId:addData.insertId
            }
        }
        //console.log(addData)
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})

//文章列表接口
router.get('/getArticleList',async (ctx)=>{
    try {
        let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '
        let qureyDate=await Dd(sql)
        if(qureyDate.length>0){
            ctx.body={
                code:200,
                data:qureyDate
            }
        }else{
            ctx.body={
                code:400,
                data:'暂无数据'
            }
        }
    }catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})

//删除文章列表接口
router.get('/delArticle/:id',async (ctx)=>{
    try {
        let id = ctx.params.id
        let sql=`DELETE FROM article WHERE id=${id}`;
        let delDate=await Dd(sql)
        //console.log(delDate)
        if(delDate.affectedRows>0){
            ctx.body={
                code:200,
                data:'文章删除成功'
            }
        }else{
            ctx.body={
                code:400,
                data:'文章删除失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})

//获得单个文章接口
router.get('/getArticleById/:id',async (ctx)=>{
    try {
        let id = ctx.params.id

        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        let Bydata=await Dd(sql)
        if(Bydata.length>0){
            ctx.body={
                code:200,
                data:Bydata
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

//修改文章
router.post('/updateArticle',async (ctx)=>{
    try {
        let {Id,type_id,title,article_content,introduce,addTime}=ctx.request.body
        article_content=article_content.replace(/'/g,"々");
        //console.log(article_content)
        let sql=`
            UPDATE article SET  
            type_id=${type_id},
            title='${title}',
            article_content='${article_content}',
            introduce='${introduce}',
            addTime='${addTime}'
            WHERE Id=${Id}
            `
        let updateData=await Dd(sql);
        if(updateData.affectedRows>0){
            ctx.body={
                code:200,
                isScuccess:true,
                insertId:updateData.insertId
            }
        }else{
            ctx.body={
                code:400,
                isScuccess:false,
                insertId:updateData.insertId
            }
        }
        //console.log(addData)
    } catch (error) {
        ctx.body={
            code:500,
            msg:error
        }
    }
})

module.exports=router


