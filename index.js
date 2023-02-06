const express = require('express')
require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
//express
const app = express()
app.use(express.json())
//

app.use(cors())

//ChatGPT Configuration
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
//

// app.get("/",async(req,res)=>{
//     res.send("Hello From chatGPT")
// })

//api
app.post("/ChatWithGvm",async(req,res)=>{
    try{
        //`${prompt}`,
        // debugger
        console.log('propmpt',req.body.prompt);
        const {prompt}=req.body;
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        
        return res.status(200).json({
            StatusMessage:"success",
            data:completion.data.choices[0].text
        });
    }catch(err){
        return res.status(400).json({
            ErrorMessage:"Fail",
        });
    }
})
//


//Port listen
const Port =process.env.PORT ||4000

app.listen(Port,()=>console.log(`Server on port ${Port}`))
//
