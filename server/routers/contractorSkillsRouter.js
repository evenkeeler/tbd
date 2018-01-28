const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { identity } = req.query;
  console.log('in contractorSkillsRouter get', identity)
  req.graphApi.getContractorSkills(identity)
    .then(result => {
      res.send(result);
    })
})
router.post('/', (req, res) => {

  const { body, query } = req;
  const { identity } = query;
  console.log(body);
  req.graphApi.addSkillToContractor(identity, body)
    .then(result => {
      console.log(result)
      return req.graphApi.getContractorSkills(identity)
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
})

router.delete('/', (req, res) => {

  const { query, graphApi } = req;
  const { identity } = query;

  graphApi.deleteNode(identity)
    .then(result => {
      //this is a really weird thing, it says nothing is deleted, but it gets deleted?? weird
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    })
})

module.exports = router;