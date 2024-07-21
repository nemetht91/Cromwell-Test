# Project Title

Test Project for Junior Full Stack Deceloper Role at Cromwell.

## Description

A simple Node.js and React.js application for user login and registration process.

## Getting Started

### Installing

1. Clone the repo
   - git clone https://github.com/nemetht91/Cromwell-Test
2. Install NPM packages
   - npm install
3. Create a PostgreSQL database
   - run db/user_table_script.sql script in PgAdmin
4. Create .env file in the project folder and add the following variables:
   - PG_USER: database user
   - PG_HOST: database host
   - PG_DATABASE: database name
   - PG_PASSWORD: database password
   - PG_PORT: database port
   - PG_SSL: SSL connection - true/false
6. Create .env file in the client folder add the following variable:
   - REACT_APP_API_SERVER_URL: your server's url example: "http://localhost:5000"

### Executing program

1. Start server:
  - open terminal and navigate to source folder
  - npm start
2. Start client:
  - open a new terminale and navigate to client folder
  - npm start

## Authors

Contributors names and contact info

ex. Tamas Nemeth
ex. (https://twitter.com/dompizzie)](https://www.tnemeth.co.uk/)

## Version History

* 0.1
    * Initial Release
