const path=require('path')  
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port=process.env.PORT || 3000


const app=express()

//Define path for express config
const publicPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../template/views')
const partialPath=path.join(__dirname,'../template/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Mainak'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Mainak'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpMessege:'This is some helpfull text',
        title:'Help',
        name:'Mainak'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({
            error:'Address is not provided'
        });
    
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })

            })
        })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
        return res.send({
            error:'Search parameter is not provided'
        });
    console.log(req.query.search);
    res.send({
        product:[]
    });
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Mainak',
        title:'404',
        errorMessage:'Article is not found'
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'Mainak',
        title:'404',
        errorMessage:'Page not found'
        
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})