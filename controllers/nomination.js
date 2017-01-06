
module.exports = (app, db)=>{
  console.log('Setting up nomination backend')
  const users = db.collection('users')
  const nominees = db.collection('nominees')

  app.get('/x/nominees', (req,res)=>{
      console.log('GET /x/nominees')
      nominees.find({}).toArray(function(err, nominees) {
        // TODO - strip contact details and anything else not for client
        res.json(nominees)
      });
  })

  app.post('/x/nomination', (req,res)=>{
      console.log('POST /x/nomination')
      users.insert(req.body.submitter)
      nominees.insert(req.body.nominee)
  })

  app.post('/x/endorse', (req,res)=>{
      console.log('POST rec /x/endorse', req.body)
      let name = req.body.nominee
      nominees.update({name}, {
          $inc : { support: 1 },
          $push: { supporters: req.body.login },
      })
      res.send('Todo Return Update Results')
  })

  app.post('/x/unendorse', (req,res)=>{
      console.log('POST rec /x/endorse', req.body)
      let name = req.body.nominee
      nominees.update({name}, {
          $inc : { support: -1 },
          $pull: { supporters: req.body.login },
      })
      res.send('Todo Return Update Results')
  })

  app.post('/x/login', (req,res)=>{
      console.log('POST /x/login')
      let mail = req.body.mail
      let postal = req.body.postal
      console.log({mail,postal})
      users.find({mail}).toArray(function(err, matchedUsers) {
          if (matchedUsers.length > 0){
              console.log('existing user')
              if (matchedUsers.postal === postal){
                  console.log('postal match')
              }
          }
          console.log('responding')
      })
      res.send('todo actually login')
  })
}
