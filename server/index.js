const express=require('express')

const app=express()

//设置一个全局变量,用于签名
app.set('secret','asfegrgnrituriw')

//跨域
app.use(require('cors')())
//解析json格式数据
app.use(express.json())

//托管静态文件
app.use('/uploads',express.static(__dirname+'/uploads'))



//把app当参数传过去
//数据库
require('./plugins/db')(app)
//监听admin端的路由
require('./routes/admin')(app)
//监听web端路由
require('./routes/web')(app)




app.listen(3008,()=>{
    console.log('http://localhost:3008')
})