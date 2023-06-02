# Moneyhub Tech Test - Investments and Holdings

Moneyhub uses microservices to partition and separate the concerns of the codebase. In this exercise, I was given an example `admin` service and some accompanying services to work with. In this case, the admin service backs a front-end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a CSV formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the CSV report to be sent with content-type application/json 
    - The CSV should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure the use of up-to-date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

They prefer:
- Do the task in only 1-2 hours
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

## Getting Started
To develop against all the services each one will need to be started in each service run

```bash
npm intsall
```
```bash
npm start
```

To run all test suits:
```bash
npm test
```

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a CSV formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies' details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id

Added new route:
- `/report-csv/` generate a report and send it to the `/export` endpoint

#### Regarding the questions to be answered by completion of the task:
### 1. How might you make this service more secure?
* First and foremost, switching from HTTP protocol to HTTPS in order to protect from interceptions
* by changing GET requests to POST
* by implementing Authentication and Authorization, to ensure that only authorized administrators can access the API. This can be achieved through techniques like username/password authentication, token-based authentication (such as JWT), or even integrating with an existing identity provider (e.g., OAuth)
* by implementing an input validation to validate and sanitize all inputs received from the administrators before sending them to the internal API
* by implementing rate limiting on API itself to prevent abuse
* by taking care of secure storage, e.g. keeping the URLs and other sensitive data in environment variables

### 2. How would you make this solution scale to millions of records?
* In the given example the input data was given in a local .csv file, but in real life, I assume, it would be stored in DataBase. So, database normalization is the first thing that comes to mind. Also, appropriate indexing and partitioning strategies can improve query performance.
* If we don't need very precise up-to-date holdings, we could have had this data collected and stored in the cache for admin to retrieve whenever needed. E.g. with a scheduled AWS lambda (or triggered by every new addition of a holding) and Redis queue not to overload the Database.

### 3. What else would you have liked to improve given more time?
* Since this tool's purpose is to allow non-technical staff to interact with data and they don't have to know how to use Postman or VSCode REST Client extension (the one I am using), I would definitely suggest having a proper admin panel with UI/UX.
* Technical documentation, comments on how it works, at least JS Docs comments as functions description.
* Since in Javascript you practically not going to face errors in case of passing data type or structure you weren't supposed to pass (e.g. I called the function on an array of arrays of strings instead of an array of strings) it might be a good idea to switch to Typescript. Sometimes errors are preferred over unpredicted output results (sorry, JS 😒 ).
* Would try to come up with a smarter solution instead of forEachs one after another and not optimal filtering. Also, having everything distributed in smaller and cleaner functions would be ideal.
* Would fix all the no-console errors and/or override the rule.
* Better error handling. More logs. More meaningful messages. I would prefer distinction in error types in order to identify if the problem comes from the admin side or if there is a bug in the code, etc.
* More tests. Due to time restrictions, I've implemented only the result test and for the rest, I check the output's length.
* Make a single repo out of each microservice. Have different environments for prod, dev, and testing.

## Thank you, Moneyhub team, for the interesting task!
