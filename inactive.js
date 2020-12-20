const express=require('express')
const app=express();
let $Port=8000;
let minutes=0;
let seconds=0;
const user = {
    name: "Qasim Asad",
    age: "25",
    city: "san francisco",
    lastActivity: new Date().getTime()
}

const inactiveFirstStage = () => {
    console.log("User has been inactive for the past 1-2 minutes",user.lastActivity);
}

const inactiveSecondStage = () => {
    console.log("User has been inactive for the past 3-4 minutes",user.lastActivity);
}

const inactiveThirdStage = () => {
    console.log("User has been inactive for the past 5-6 minutes",user.lastActivity);
}

//action
app.get('/action',(req,res)=>{
    user.lastActivity= new Date().getTime();
    minutes=0;
    res.send("triggered route by user");
})

// this is the main method that acts like a worker and runs every 1 minute
setInterval(function(){
    // please write your code here
    seconds=seconds+1
    if(seconds===60)
    { seconds=0;
        minutes=minutes+1;
    }
    if(minutes<=2)
    {
        inactiveFirstStage();
    }
    else if(minutes<=4 && minutes>2)
    {
        inactiveSecondStage();
    }
    else if(minutes<6 && minutes>4)
    {
        inactiveThirdStage();
    }
    else{
    minutes=0;
    }

    console.log("time passing");
}, 1000);



app.listen($Port,()=>{
    console.log("server is running on",$Port);
})