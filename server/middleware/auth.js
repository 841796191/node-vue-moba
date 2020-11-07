module.exports = options =>{
    const assert=require('http-assert')
    const jwt=require('jsonwebtoken')
    //http-assert判断数据,需要自己加个错误处理中间件
    
    const AdminUser=require('../models/AdminUser')


    return async (req,res,next) =>{
        //String把前端传过来的token转为字符串方便split以空格切割转为数组,然后pop弹出数组最后一个的值拿来验证
        const token=String(req.headers.authorization || '').split(' ').pop()
        
        assert(token,401,'请先登录1')
        // console.log(token)
        //verify校验token,取出校验出来的数据中的id，id为之前签名时放进去的用户_id
        const {id}=jwt.verify(token,req.app.get('secret'))
        assert(id,401,'请先登录2')
        //查找数据库中有无这个用户,并把user挂载到req上则全局都能用
        req.user=await AdminUser.findById(id)
        assert(req.user,401,'请先登录3')
        await next()
    }
    
}