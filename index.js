import express from 'express';
const app = express();
import cors from 'cors';
import {visualize, create, all} from "../kim_bank/dal.js";

//To serve my static files from the public directory
app.use(express.static('public'));
app.use(cors());
let createAccount = 'hey';

//Route for user account creation
app.get('/account/create/:name/:email/:password', function (req, res) {

    create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);            
        });           
});

app.get('/account/all', function (req, res){
    all().then((docs)=>{
        console.log(docs);
        res.send(docs);
    });
});

//Route for Login user
app.get('/account/login/:email/:password', function(req, res){
    res.send({
        email: req.params.email,
        password: req.params.password
    });
});

//Route for All Accounts
app.get('/account/all', function(req, res){
    res.send({
        name: 'peter',
        email: 'peter@mit.edu',
        password: 'secret'
    });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
})
