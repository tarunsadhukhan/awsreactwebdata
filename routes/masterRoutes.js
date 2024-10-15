const express = require('express');
const router = express.Router();
const db = require('../Connection');

router.get('/combobox-department', (req, res) => {
    const { variable_name, company_id } = req.query;

    let sqlQuery;
    const queryParams = [];
  
    if (variable_name === 'vardepartment') {
      sqlQuery = 'SELECT dept_id, dept_desc FROM department_master WHERE company_id = ? ORDER BY dept_desc';
      queryParams.push(company_id);
    } else {
      return res.status(400).json({ error: 'Invalid variable_name' });
    }
  
    db.query(sqlQuery, queryParams, (err, results) => {
      if (err) {
        console.error('Error fetching combobox options:', err);
        return res.status(500).json({ error: 'Failed to fetch combobox options' });
      }
      res.json(results); // Send the fetched options as response
    });
  });

  router.get('/combobox-designation', (req, res) => {
    const { variable_name, company_id } = req.query;

  let sqlQuery;
  const queryParams = [];

  if (variable_name === 'vardesignation') {
    sqlQuery = 'SELECT id desg_id, desig FROM designation WHERE company_id = ? ORDER BY desig';
    queryParams.push(company_id);
  } else {
    return res.status(400).json({ error: 'Invalid variable_name' });
  }

  db.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching combobox options:', err);
      return res.status(500).json({ error: 'Failed to fetch combobox options' });
    }
    res.json(results); // Send the fetched options as response
  });
});


module.exports = router;