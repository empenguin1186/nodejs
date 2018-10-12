var MongoClient = require('mongodb').MongoClient,
    settings = require('./settings');
MongoClient.connect(settings.dbPath + "/"+settings.db, function(err, client) {
    if (err) {return console.dir(err);}
    console.log("connected to db");
    var db = client.db('example_0000');
    db.collection("users", function(err, collection) {
        var docs = [
            {name: "a", score:40},
            {name: "b", score:30},
            {name: "c", score:20}
        ];
        /*
        collection.insert(docs, function(err, result) {
            console.dir(result);
        });
        collection.find({name: "a"}).toArray(function(err, items) {
            console.log(items);
        });
        */
        var stream = collection.find().stream();
        stream.on("data", function(item) {
            console.log(item);
        });
        stream.on("end",function() {
            console.log("finished");
        });
    });
});
