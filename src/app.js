const express = require('express');

const app = express();

app.use('/test',(req,res)=>{
  res.send('welcomme to the server')
})
app.use('/hello',(req,res)=>{
  res.send('hello page')
})
app.listen(3000,()=>{
  console.log('Server is running on the port 3000...')
})