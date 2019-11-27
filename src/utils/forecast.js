const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/129b68f5420ba483474536854bddcdb6/'+ latitude+','+longitude+'?lang=es'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect forecast services',undefined);
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'This is '+body.currently.temperature+' degree out. There is '+body.currently.precipProbability+'% chance of Rain.')
        }
    })
}
module.exports=forecast