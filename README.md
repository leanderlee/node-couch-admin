# Couch Admin

A library to manage users for CouchDB.


## Getting started

You will need:

- CouchDB URL (running locally or on a server)
- CouchDB admin username/password (optional: but without it security is moot)
- Node & NPM

Simply go to terminal and type:

```bash
npm install couch-admin
```

Feel free to look at examples below to see how easy it is to use this library!

## Basic usage

```js
var couchAdmin = require('couch-admin')('http://localhost:5984', 'admin', 'mysecretpassword');
```

## API

Unless otherwise specified, `cb` is a callback that contains errors in its first parameter, and 
response as its second. The response comes from CouchDB, and varies depending on the call. Feel
free to learn more about these calls at the resources linked below.

### User controls

#### couchAdmin.verifyUser(username, password, cb)
#### couchAdmin.addUser(username, password, cb)
#### couchAdmin.changePass(username, password, cb)
#### couchAdmin.removeUser(username, cb)

## Grant permissions to databases

#### couchAdmin.grantMembership(username, database, cb)
#### couchAdmin.grantAdmin(username, database, cb)
#### couchAdmin.revokeMembership(username, cb)
#### couchAdmin.revokeAdmin(username, cb)

