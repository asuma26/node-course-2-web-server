const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
const port=process.env.PORT||3000;
app.set('view engine','hbs');


hbs.registerPartials(__dirname+'/views/partials')

/*app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});*/

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url} `;
  console.log(log);
  fs.appendFile('sever.log',log+'\n',(err)=>{
    if(err)
    console.log('Not able to put data on file!!!');
  });
  next();
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getcurrentyear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamit',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express!</h1>');
  /*res.send({
    name :"Ashsih",
    likes:['games','biking','mercedez']
  });*/
  res.render('home.hbs',{
    pagetitle:'Home!! page',
      hh:'AAAshish MMMishra',
    mess:'Welcome brooo ksa h sb thik naa chl bye abhi!! kudos to yu!!'
  //  current_year: new Date().getFullYear()
  })
});
app.get('/about',(req,res)=>{
//  res.send('About route');
res.render('about.hbs',{
  pagetitle:'About page',
  hh:'AAAshish MMMishra'
//  current_year: new Date().getFullYear()
});
});
app.get('/projects',(req,res)=>{
  res.render('projects.hbs');
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:"hahahhhahahahhahafiuchkuu!!"
  });
});
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
