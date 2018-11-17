# Server-side Pagination, Filtering and Sorting

###### Implemented a Node.js application to -
1. Return all the data given in the sample.json file.
2. Implement server side pagination, sorting and filtering with a maximum of 3 sorts and filters. 
3. Save a new record to the sample JSON file. 

###### Assumptions and Limitations - 
1. The fields id and email are unique to a user, hence can't be added to the JSON file.

###### Endpoints -
1. Get all the Users' Data
    - GET request - http://localhost:1984/transaction/getalldocs
    
2. Server side pagination, sorting and filtering 
    - POST request -  http://localhost:1984/transaction/getselected
    - Example
         ```
        {
            "page_no" : 1,
            "page_size" : 1000,
            "sort" : {
                "first_name" : "asc"
            },
            "filter": [
                {"field":"last_name", "operator":"CONTAINS", "value":"Van"},
                {"field":"age", "operator":"GREATERTHAN", "value":20}
                ]
        }
        
    
3. Save new record to the sample JSON file 
    - POST request - http://localhost:1984/transaction/adddoc

4. To get a unique record by its id (To test if a record is successfully inserted)
    - GET request - http://localhost:1984/transaction/getdocid?id=enter_id_here
    - Example - http://localhost:1984/transaction/getdocid?id=4715

###### Output Screenshots
| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/getalldocs.png">  Get All Users' Data |  <img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/pagination.png"> Pagination |<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/adddoc.png"> Add New Record |
|<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/newrecord.png"> JSON file |  <img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/recordexists.png"> Record Exists |<img width="1604" src="https://github.com/neelimavangipuram/Server-side-Pagination/blob/master/images/getdocid.png"> Get Record by ID |
|<img width="1604" src="https://user-images.githubusercontent.com/297678/29892310-03e92256-8d83-11e7-9b58-986dcb6f702e.png">  |  <img width="1604" src="https://user-images.githubusercontent.com/297678/29892310-03e92256-8d83-11e7-9b58-986dcb6f702e.png">|<img width="1604" src="https://user-images.githubusercontent.com/297678/29892310-03e92256-8d83-11e7-9b58-986dcb6f702e.png">|