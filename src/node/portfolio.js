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
    var count = parseInt(request.query.count);
    var page = parseInt(request.query.page);
    var query = {};

    if (!count || count < 1) {
        count = 1;
    }
    else if (count > 15) {
        count = 15;
    }
    // Ensure that page exists and is a positive number.
    if (!page || page < 1) {
        page = 1;
    }

    console.log("Sending %d articles from page %d", count, page);

    if (request.query.tag) { query.tags = new RegExp('.*' + request.query.tag + '.*', 'i'); }


    db_connector.collection('portfolio', function(err, portfolio){
        var info = {};
        portfolio.find(query).limit(count).sort({'date': -1}).skip((page - 1) * count, function(err, cursor){
            if (err) {
                response.send("Server database error.", 500);
            }
            else {
                cursor.count(function(err, total) {
                    info.pages = Math.ceil(total / count);

                    cursor.toArray(function(err, data) {
                        info.projects = data;

                        response.send(200, info);
                    });
                })
            }
        });
    })
}


routing.push(function(app) {
    app.post('/api/portfolio/addProject',  portfolio_addProject);
    app.get('/api/portfolio/getProjects', portfolio_getProjects);

});