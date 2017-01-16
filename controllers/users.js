
module.exports = (app, db)=>{
    console.log('Setting up users backend')
    const users = db.collection('users')

    app.post('/x/login', (req,res)=>{
        let mail = req.body.mail
        let postal = req.body.postal
        console.log('attempting login:', {body: req.body})
        users.find({mail,postal}, {_id:1}).toArray( function(err, allMatchedUsers) {
            console.log({allMatchedUsers})
            if ( !allMatchedUsers.length ){
                users.insert(req.body, function(err, newUser){
                    console.log("Returning new user", newUser.insertedIds)
                    res.send(newUser.insertedIds[0])
                })
            } else {
                console.log("Returning existing User ID", allMatchedUsers[0]._id)
                res.send(allMatchedUsers[0]._id)
            }
        })
    })
}
