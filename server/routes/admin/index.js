//把app当参数传进来，方便
module.exports=app=>{
    const express=require('express')
    const jwt=require('jsonwebtoken')
    const AdminUser=require('../../models/AdminUser')
    const assert=require('http-assert')
    const router=express.Router({
        mergeParams:true//合并url参数，不然router里面获取不到,只能在最下面的app.use里获取到
    })

    //保存资源
    router.post('/',async (req,res)=>{
        const model=await req.Model.create(req.body)
        res.send(model)
    })

    //更新资源
    router.put('/:id',async (req,res)=>{
        const model=await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    //删除资源
    router.delete('/:id',async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })

    //资源列表
    router.get('/',async (req,res)=>{
        //setOptions 动态设置参数,当请求的参数为分类时动态添加populate函数
        const queryOptions={}
        if(req.Model.modelName==='Category'){
            queryOptions.populate='parent'
        }
        const items=await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //编辑资源
    router.get('/:id',async (req,res)=>{
        const model=await req.Model.findById(req.params.id)
        res.send(model)
    })

    //登录校验中间件
    const authMiddleware=require('../../middleware/auth')

    //资源提取中间件
    const resourceMiddleware=require('../../middleware/resource')



    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)

    //multer是处理资源上传的
    const multer=require('multer')
    //dest:上传的目标地址是哪里,
    //__dirname是当前文件所在的文件夹的绝对路径,即../server/routes/admin/
    //+'/../../uploads'表示根据当前地址回退两级到server文件夹下的uploads文件夹
    const upload=multer({dest:__dirname + '/../../uploads'})
    //upload.single中间件处理上传的文件,file字段对应前端Formdata中的file,会为req添加一个file属性
    app.post('/admin/api/upload',authMiddleware(), upload.single('file') ,async (req,res)=>{
        const file=req.file
        file.url=`http://localhost:3008/uploads/${file.filename}`
        res.send(file)
    })


    //登录校验
    app.post('/admin/api/login',async (req,res)=>{
        const {username,password}=req.body
        //根据用户名找用户
        
        //因为数据库密码select设为false，取不到密码，所以要加select取,'+'表示强制提取
        const user=await AdminUser.findOne({username}).select('+password')
        
        //assert作用跟下面注释五行代码功能一样,user为判断的变量,422为错误的状态码,最后参数为返回前端的报错信息
        assert(user,422,'用户不存在')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }

        //校验密码
        const isValid=require('bcryptjs').compareSync(password,user.password)
        assert(isValid,422,'密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        
        //返回token
        
        //签名,因为app.get跟路由的get冲突,以参数判断是定义路由还是获取配置,一个参数是获取配置
        const token=jwt.sign({id:user._id},app.get('secret'))
        res.send({token})//如果需要用户名等信息也可以加在里面
    })


    //错误处理中间件
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })

}