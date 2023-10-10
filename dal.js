import MongoClient from "mongodb";

const url   = 'mongodb://localhost:27017';
let db      = null;

//connect to mongo, get a handle on the "myproject" database and confirm through message
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log("Connected successfully to db server");
    db = client.db('myproject');
});

//Create new user
function create(name, email, password){
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
        return new Promise((resolve, reject) => {
            const collection = db.collection('users');
            const doc        = {name, email, password, balance: 0};
            collection.insertOne(doc, {w:1}, function(err, result){
                if(err){
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    });
//    visualize();
}

//All users
function all(){
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
        return new Promise((resolve, reject) => {    
            const collection = db.collection('users');
            const doc = {name, email, password, balance: 0};
            collection.insertOne(doc, {w:1}, function(err, result) {
                err ? reject(err) : resolve(doc);
            });    
        })  
    });
}

//I added this block to visualize the database "users collection" because 3T won't connect to the mongo database I made
function visualize(){
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    let users = db
        .collection('users')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:', docs);

            //This closes the connection like "Ctrl + C"
            client.close();
        });    
});
};

export {create, all, visualize};