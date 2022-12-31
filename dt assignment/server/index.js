// creating connection to database and connecting to database
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json());
mongoose.connect("mongodb+srv://admin:admin@stack-overflow-clone.cg7wmh0.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err)
    {
        console.log("connected")
    }
    else{
        console.log("not connected")
    }
})
// SCHEMA
const sch = {
    Title: String,
    Trailer_for_your_Process: String,
    Oppurtunity_Description: String,
    Learning_Outcomes: String,
    Pre_requisites: String,
    Category: String,
    Commitment: String,
    imageUrl: String,
    id:Number
}
const monmodel = mongoose.model("NEWCOL3",sch)
// POST
app.post("/post",async(req,res)=>{
    console.log("inside post function");
    
    const data = new monmodel({
    Title: req.body.Title,
    Trailer_for_your_Process: req.body.Trailer_for_your_Process,
    Oppurtunity_Description: req.body.Oppurtunity_Description,
    Learning_Outcomes: req.body.Learning_Outcomes,
    Pre_requisites: req.body.Pre_requisites,
    Category: req.body.Category,
    Commitment: req.body.Commitment,
    imageUrl: req.body.imageUrl,
    id: req.body.id
        
    });
    const val = await data.save();
    res.json(val);
})
// PUT
app.put("/update/:id",async(req,res)=>{
    let upid = req.params.id;
  let upname = req.body.name;
  let upemail = req.body.email;
  let Title1 = req.body.Title;
  let Trailer_for_your_Process1 = req.body.Trailer_for_your_Process;
  let Oppurtunity_Description1 = req.body.Oppurtunity_Description;
  let Learning_Outcomes1 = req.body.Learning_Outcomes;
  let Pre_requisites1 = req.body.Pre_requisites;
  let Category1 = req.body.Category;
  let Commitment1 = req.body.Commitment;
  let imageUrl1 =   req.body.imageUrl;
    //find id
    // update
    monmodel.findOneAndUpdate({ id: upid }, { $set: { name: upname, email: upemail,Title:Title1,Trailer_for_your_Process:Trailer_for_your_Process1,Oppurtunity_Description:Oppurtunity_Description1,Learning_Outcomes:Learning_Outcomes1,Pre_requisites:Pre_requisites1,Category:Category1,Commitment:Commitment1,imageUrl: imageUrl1} },{new:false},(err,data)=>{
        // what is user id which is not in db
        if(err)
        {
            res.send("erro")
            
        }
        else{
        if(data==null)
        {
            res.send("nothing found");
        }
        else{
            res.send(data);
        }
    }
    })
})
// fetch 
app.get('/fetch/:id',function(req,res){
    let fetchid = req.params.id
    // sice getting from parameter we have to type params
    monmodel.find(({id:fetchid}),function(err,val){
        if(err)
        {
            res.send("error")
        }
        else{
        if(val.length==0)
        {
            res.send("data does not exist")
        }
        else{
        res.send(val);
        }}
    })
})
// delete
app.delete('/del/:id',function(req,res){
    let delid = req.params.id;
    monmodel.findOneAndDelete(({id:delid}),function(err,docs){
        if(err)
        {
            res.send("error")
        }
        else
        {
        if(docs==null)
        {
            res.send("wrong id")
        }
        else{
        res.send("deleted");
        }
    }
    })
})
// connecting app to the port
app.listen(50005,()=>{
    console.log("on port 50005")
})


