const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/apps
    axios.get('http://localhost:3000/api/apps')
        .then(function(response){
            console.log(response.data);
            res.render('index', { apps : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
    
}

exports.add_app = (req, res) =>{
    res.render('add_app');
}

exports.update_app = (req, res) =>{
    axios.get('http://localhost:3000/api/apps', { params : { id : req.query.id }})
        .then(function(appdata){
            res.render("update_app", { app : appdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}