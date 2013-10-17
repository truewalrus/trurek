collections.push(function(err, db) {
    if (!err) {
        console.log("Connected to test 1!");
        db.collection('portfolio', {strict: true}, function(err, collection) {
            if (err) {
                console.log("The portfolio collection doesn't exist.  Creating it now.");
                db_connector.createCollection('portfolio', {strict: true}, function(err, collection) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            db.ensureIndex('portfolio', {'id': 1}, {unique: true, dropDups: true}, function() {});

        });
    }

});

function portfolio_addProject(request, response){
    var d = new Date();
    db_connector.collection('portfolio', function(err, portfolio){
        portfolio.insert({ "siteName": request.body.siteName, "id": request.body.siteName.toUpperCase(), "siteAddress": request.body.siteAddress, "description": request.body.description, "information": request.body.information, "date": d.getTime()}, function(error, data){
            if (error){
                return response.send(401, "Not added");
            }
            else{
                console.log("Project added");
                return response.send(200);
            }
        });
    });
}

function portfolio_getProjects(request, response){
    db_connector.collection('portfolio', function(err, portfolio){
        portfolio.find().sort({'date':-1}).toArray(function(err, items){
            if (err) response.send(401, "error");
            response.send(items);
        })
    })
}


routing.push(function(app) {
    app.post('/api/portfolio/addProject',  portfolio_addProject);
    app.get('/api/portfolio/getProjects', portfolio_getProjects);

});