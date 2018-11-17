const _ = require('lodash');
const fs = require('fs');

const config = require('../config/transaction.config');

function get_all_docs(req, res) {
    fs.readFile(config.DATA_PATH, "utf8", function (err, data) {
        if (err) return next(new Error('Data source can\'t be found!'));

        var users = JSON.parse(data);
        res.send(users);
    });
}

function get_doc_id(req, res) {
    var id = req.query.id;

    fs.readFile(config.DATA_PATH, "utf8", function (err, data) {
        if (err) return next(new Error('Data source can\'t be found!'));

        var users = JSON.parse(data);
        res.send(_.find(users, function (t) {
            return t.id == id;
        }));
    });
}

function apply_filter(txns, filters) {
    if (!filters) return txns;
    for (i = 0; i < filters.length; i++) {
        switch (filters[i].operator) {
            case 'EQUAL':
                txns = _.filter(txns, function (t) {
                    return t[filters[i].field] == filters[i].value;
                });
                break;
            case 'STARTSWITH':
                txns = _.filter(txns, function (t) {
                    return t[filters[i].field].startsWith(filters[i].value);
                });
                break;
            case 'CONTAINS':
                txns = _.filter(txns, function (t) {
                    return t[filters[i].field].includes(filters[i].value);
                });
                break;
            case 'GREATERTHAN':
                txns = _.filter(txns, function (t) {
                    return t[filters[i].field] > filters[i].value;
                });
                break;
            case 'LESSTHAN':
                txns = _.filter(txns, function (t) {
                    return t[filters[i].field] < filters[i].value;
                });
                break;
        }
    }
    return txns;
}

function chunk_array(big_array, chunk_size) {
    var chunks = [];
    while (big_array.length) {
        chunks.push(big_array.splice(0, chunk_size));
    }
    return chunks;
}

function get_selected(req, res, next) {
    var txns = JSON.parse(fs.readFileSync(config.DATA_PATH, 'utf8'));
    var req_body = req.body;

    if (
        !req_body.page_no ||
        !req_body.page_size
    ) {
        return next(new Error('Page information not available'));
    }

    // step 1: apply filters
    if (req_body.filter && req_body.filter.length > 3) {
        return next(new Error('Number of filters have exceeded the allowed limit'));
    }
    var filtered_txns = apply_filter(txns, req_body.filter);

    // step 2: apply sorting}
    var sort_keys = _.keys(req_body.sort);
    var sort_values = _.values(req_body.sort);
    if (sort_keys > 3) {
        next(new Error('Number of sorts have exceeded the allowed limit'));
    }
    var sorted_txns = _.orderBy(filtered_txns, sort_keys, sort_values);

    // step 3: paginate and return requested page
    var page_no = req_body.page_no - 1;
    var page_size = req_body.page_size;
    var split_array = chunk_array(sorted_txns, page_size);
    if (page_no > -1 && page_no < split_array.length) {
        return res.send(split_array[page_no]);
    }

    return next(new Error('Invalid page requested'));

}

function add_doc(req, res, next) {
    var req_body = req.body;
    fs.readFile(config.DATA_PATH, 'utf8', function (err, data) {
        if (err) return next(new Error('Data source can\'t be found!'));
        users = JSON.parse(data);
        var has_match = false;
        _.find(users, function (users) {
            if (users.id == req_body.id || users.email == req_body.email) {
                has_match = true;
            }
        });
        if (!has_match) {
            users.push(req_body);
            fs.writeFile(config.DATA_PATH, JSON.stringify(users, null, 2), function (err) {
                if (err) return next(err);
                res.send('The new record is inserted!');
            });
        } else {
            res.send('A record already exists with this id/email!');
        }
    });
}

exports.get_all_docs = get_all_docs;
exports.get_doc_id = get_doc_id;
exports.get_selected = get_selected;
exports.add_doc = add_doc;