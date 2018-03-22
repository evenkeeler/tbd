//  /api/certification
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { queryString } = req.query
  req.graphApi.getParentNodeList(queryString, 'Certification')
    .then(result => res.send(result))
    .catch(err => res.send(err))
});

module.exports = router;
