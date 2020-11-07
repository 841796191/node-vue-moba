module.exports=options=>{
    return async (req,res,next)=>{
        //把前端传过来的url参数里的:resource中的类名改为大写单数,:resource在app.use里定义的
        const modelName=require('inflection').classify(req.params.resource)
        //Model挂载到req中，不然router中访问不到Model
        req.Model=require(`../models/${modelName}`)
        next()
    }
}