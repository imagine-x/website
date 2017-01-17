
var SlackService = require('../services/slackService');
var slack = new SlackService()

module.exports = (app, db)=>{
  console.log('Setting up nomination backend')
  const nominees = db.collection('nominees')

  app.get('/x/nominees', (req,res)=>{
      console.log('GET /x/nominees')
      // find all
      nominees.find({approved:true}, {
          // This is the projection (fields being returned)
          name: 1,
          occupation:1,
          location:1,
          why:1,
          official:1,
          twitter:1,
          link:1,
          supporters:1,
          riding:1
      }).toArray(function(err, nominees) {
          res.json(nominees)
      })
  })

  app.post('/x/nomination', (req,res)=>{
      req.body.supporters = []
      slack.nomineeNotify(req.body.name)
      nominees.insert(req.body)
  })

  app.post('/x/endorse', (req,res)=>{
      console.log('POST rec /x/endorse', req.body)
      let name = req.body.name
      nominees.update({name}, {
          $inc : { support: 1 },
          $push: { supporters: req.body.supporterId },
      })
      res.send()
  })

  app.post('/x/unendorse', (req,res)=>{
      console.log('POST rec /x/endorse', req.body)
      let name = req.body.name
      nominees.update({name}, {
          $inc : { support: -1 },
          $pull: { supporters: req.body.supporterId },
      })
      res.send()
  })

}
