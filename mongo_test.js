import MongoClient from 'mongodb';
const url = 'mongodb://localhost:27017';


MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!');

    //database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    //new user
    let name = 'kim';
    let email = name + '@mit.edu';

    //Insert into customer table
    const collection = db.collection('customers');
    let doc = {name, email};
    collection.insertOne(doc, {w:1}, async function(err, result){
        console.log('data inserted');
    });

    let customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:', docs);

            //This closes the connection like "Ctrl + C"
            client.close();
        });
});

