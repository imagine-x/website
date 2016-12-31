module.exports = (app, db)=>{
  const nominees = db.collection('nominees')
  const users = db.collection('users')

  console.log('Setting up nomination backend')

  app.get('/nominees', (req,res)=>{
    nominees.find({}).toArray(function(err, nominees) {
      // TODO - strip contact details and anything else not for client
      res.json(nominees)
    });
  })

  app.post('/nomination', (req,res)=>{
    // TODO - validation
    users.insert(req.body.submitter)
    nominees.insert(req.body.nominee)
  })

  app.post('/endorse', (req,res)=>{
    // TODO - validation
    console.log('POST /endorse', req.body)
    let name = req.body.name
    nominees.update({name}, { $inc : { support: 1} })
  })
}

// app.post('/login', (req,res)=>{
//   let {mail, postal} = req.body
//   events.find({}).toArray(function(err, items) {
//     res.send(items)
//   });
// })
//
//
