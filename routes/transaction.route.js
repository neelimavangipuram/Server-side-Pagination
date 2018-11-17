const express = require('express');
const router = express.Router();

const transaction_controller = require('../controllers/transaction.controller');

// For all records
router.get('/getalldocs', transaction_controller.get_all_docs);

// For getting a unique record by id
router.get('/getdocid', transaction_controller.get_doc_id);

// For filtered/sorted/paginated records
router.post('/getselected', transaction_controller.get_selected);

// For adding a new record
router.post('/adddoc', transaction_controller.add_doc);

module.exports = router;