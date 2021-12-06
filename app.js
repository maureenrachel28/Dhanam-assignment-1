const express=require('express')
const bodyParser=require('body-parser')
const http=require('https')

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs');

//listening on local host 
app.listen('3000',function(){
    console.log('Server is running')
})

//declaring an array to store the data from JSON object
var englandAndWales=[]
var northernIreland=[]
var scotland=[]
var holidaysData=[]




app.get('/',function(req,res){
  
    
    


    options='https://www.gov.uk/bank-holidays.json'
    let str=''
    http.request(options, function(response) {

      response.on('data', function (chunk) {
        str += chunk;
      });
    
      response.on('end', function () {
        holidaysData=JSON.parse(str)
        northernIreland=holidaysData['northern-ireland'].events
        englandAndWales=holidaysData['england-and-wales'].events
        scotland=holidaysData.scotland.events 
        


      });
    }).end();
    
    res.render('home',{northernIrelandEvents:northernIreland,englandAndWalesEvents:englandAndWales,scotlandEvents:scotland})
    // var today = new Date()
    // var yesterday = new Date(today)
    // var temp=new Date()
    // yesterday.setDate(yesterday.getDate() - 1)
    
    // today=today.toDateString()
    // yesterday=yesterday.toDateString()
    // console.log(today,yesterday)
    // var temp='2021-12-06'
    // temp=temp.toDateString()
    // if(today==temp){
    //   console.log('yes')
    // }
    // else{
    //   console.log('no')
    // }
    
    // var date= new Date()
    // var month=date.getMonth()
    // lastmonth='5'
    // var result=[]
    // northernIreland.forEach(function(item){
    //   // if(item.date.includes(lastmonth)){
    //   //   result.push(item)
    
    //   // }
    //   result=new Date(item)
    //   console.log(result)
      var today = new Date()
        var options={
            weekday:'long',
            day:'numeric',
            month:'numeric'
        };
        var today=today.toLocaleDateString('en-US',options);
        console.log(today)
    
});

