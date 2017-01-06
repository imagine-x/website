
module.exports = (app, db)=>{
  console.log('Setting up nomination backend')
  const nominees = db.collection('nominees')

  app.get('/x/nominees', (req,res)=>{
      console.log('GET /x/nominees')
      // find all
      nominees.find({}, {
          // This is the projection (fields being returned)
          name: 1,
          occupation:1,
          location:1,
          why:1,
          official:1,
          twitter:1,
          link:1,
          support:1,
      }).toArray(function(err, nominees) {
          res.json(nominees)
      })
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
          $push: { supporters: 'TODO ID HERE'},
      })
      res.send('Todo Return Update Results')
  })

  app.post('/x/unendorse', (req,res)=>{
      console.log('POST rec /x/endorse', req.body)
      let name = req.body.nominee
      nominees.update({name}, {
          $inc : { support: -1 },
          $pull: { supporters: 'TODO ID HERE' },
      })
      res.send('Todo Return Update Results')
  })

}
