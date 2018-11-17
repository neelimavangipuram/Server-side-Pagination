# Server-side Pagination, Filtering and Sorting

###### A Node.js application to -
1. Return all the data given in the sample.json file.
2. Implement server side pagination, sorting and filtering with a maximum of 3 sorts and filters. 
3. Save a new record to the sample JSON file. 

###### Assumptions and Limitations - 
1. The fields id and email are unique to a user, hence can't be added to the JSON file.

###### Instructions -
1. sudo npm install - to install all the dependencies.
2. Run the application on a browser/Postman - http://localhost:1984/transaction/enter_endpoints_here

###### Endpoints -
1. Get all the Users' Data - getalldocs
    - GET request - http://localhost:1984/transaction/getalldocs
    - The endpoint getalldocs gets all the users data.
    
2. Server side pagination, sorting and filtering - getselected
    - POST request -  http://localhost:1984/transaction/getselected
    - Example
         ```
        {
            "page_no" : 1,
            "page_size" : 10,
            "sort" : {
                "id":"desc",
                "first_name" : "asc",
                "last_name":"desc",
            },
            "filter": [
                {"field":"last_name", "operator":"CONTAINS", "value":"Van"},
                {"field":"age", "operator":"GREATERTHAN", "value":20}
                ]
        }
    
    - Example 1 - Test pagination and sort (if the sort columns exceeds 3, the application throws an error)
        ```
        {
            "page_no" : 1,
            "page_size" : 10,
            "sort" : {
                "id":"desc",
                "first_name" : "asc",
                "last_name":"desc",
            }
        }
    - Example 2 - Test for filtering (Retrives 10 records for the applied filter). The filter throws an error when the column size exceeds 3
        ```
        {
            "page_no" : 1,
            "page_size" : 10,
            "filter": [
                {"field":"last_name", "operator":"CONTAINS", "value":"Van"},
                {"field":"age", "operator":"GREATERTHAN", "value":20}
                ]
        }
    
3. Save new record to the sample JSON file - adddoc
    - POST request - http://localhost:1984/transaction/adddoc
    - Example 1 - To test for a duplicate record
        ```
        {
            "id": 1,
            "first_name": "Andrea",
            "last_name": "Duffus",
            "email": "aduffus0@163.com",
            "gender": "Female",
            "age": 24
        }
    - Example 2 - To add a new record
        ```
        {
            "id": 1790,
            "first_name": "Test_New",
            "last_name": "VaTest_New",
            "email": "test@163.com",
            "gender": "Female",
            "age": 25
      }

4. To get a unique record by its id (To test if a record is successfully inserted) - getdocid
    - GET request - http://localhost:1984/transaction/getdocid?id=enter_id_here
    - Example 1 - http://localhost:1984/transaction/getdocid?id=4715
    - Example 2 - http://localhost:1984/transaction/getdocid?id=1790 can be tested to see successful insert of the record from the previous example.
    

###### Output Screenshots
| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/getalldocs.png">  Get All Users' Data |  <img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/pagination.png"> Pagination |<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/adddoc.png"> Add New Record |
|<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/newrecord.png"> JSON file |  <img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/recordexists.png"> Record Exists |<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/getdocid.png"> Get Record by ID |
