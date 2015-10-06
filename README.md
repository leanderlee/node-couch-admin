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

#### verifyUser(username, password, cb)
Verifies that the username/password combination is valid.

#### addUser(username, password, cb)
Adds a user with the given username and password.

#### changePass(username, password, cb)
Edits the username to have a new password.

#### removeUser(username, cb)
Removes the user with the given username.

## Grant permissions to databases

#### grantMembership(username, database, cb)
Adds username as a member of the database. Members will have read/write access to the data in the database, but cannot change the design docs.

#### grantAdmin(username, database, cb)
Adds username as an admin of the database. Admins will have read/write access to the data in the database, and also be able to add, edit and remove design docs.

#### revokeMembership(username, cb)
Removes username as a member of the database.

#### revokeAdmin(username, cb)
Removes username as an admin of the database.


## Contributing & Bugs
Feel free to file an issue if you notice there are problems, and submit pull requests to contribute to this simple little library!



