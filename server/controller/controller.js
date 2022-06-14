var apps_collection = require('../model/model');

// create and save new app
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new app
    const app = new apps_collection.app_model({
        name : req.body.name,
        package : req.body.package,
        current_version : req.body.version,
        app_icon: req.body.icon,
        modifiedAt : new Date(),
    });

    // save app in the database
    app.save(app)
        .then(data => {
            //res.send(data)
            res.redirect('/add-app');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all apps/ retrieve and return a single app
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        apps_collection.app_model.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found app with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving app with id " + id})
            })

    }else{
        apps_collection.app_model.find()
            .then(app => {
                res.send(app)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving app information" })
            })
    }

    
}

// Update a new indetified app by app id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    apps_collection.app_model.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update app with ${id}. Maybe app not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update app information"})
        })
}

// Delete a app with specified app id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    apps_collection.app_model.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "App deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete App with id=" + id
            });
        });
}