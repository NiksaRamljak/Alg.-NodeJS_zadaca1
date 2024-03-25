/*
npm i express mysql nodemon
npx nodemon ./index.js
aplikacija je pokrenuta na localhost:3000
za dodavanje:   localhost:3000/dodaj/<ime novog odjela(automatski daje ID)>
za ocitvanje:   localhost:3000/ocitaj (printa sastav tablice u json formi na ruti, također u konzoli)
*/
const express=require('express');
const app=express();
const port=3000;
const mysql=require('mysql');

const con=mysql.createConnection({host:"localhost",user:"root",password:"",database:"Sample"});

con.connect(function(err){
    if(err){
        throw err;
    }
    app.get('/dodaj/:naziv',(req,res)=>{
        let naziv=req.params.naziv;

        var sql="INSERT INTO ODJEL(ODJEL_IME) VALUES('"+naziv+"')";
        con.query(sql,(err,result,field)=>{
            if(err){
                res.send('Greška!'+err);
            }
            res.send('Dodano!')
        });
    });
    app.get('/ocitaj',(req,res)=>{
        sql="SELECT * FROM ODJEL";
        con.query(sql,(err,result,field)=>{
            res.send(result);
            console.log(result);
        })
    })
});
app.listen(port, () => {
    console.log(`Web aplikacija pokrenuta na portu ${port}`);
});