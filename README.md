## Main Features

* Gives mongoose model GET, POST, PUT, and DELETE endpoints

## Install

```sh
npm install koa-router koa-mongoose-rest -S
```

## Usage

```javascript
routerApi(router, model, prefix, paramId);
```

router - Koa Router context

model - Mongoose model

prefix - Prefix the endpoint e.g. '/api'

paramId - Document identifer e.g. 'id' -> `/api/user/:id`, Defaults to '_id' -> `/api/user/:_id`

## Example

```javascript
const router = require('koa-router');
const routerApi = require('koa-mongoose-rest');

// Create Moongoose Schema
let schema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  created_at: Date
});

// Create Mongoose Model
let user = mongoose.model('user', schema);

// Create Router Endpoint
routerApi(router, user, '/api');

```

### GET

Endpoints

`/api/user`

`/api/user/:id`

Conditions

`/api/user?conditions={"email":"mrrobot@fsociety.com","name":"Elliot Alderson"}`

Limit

`/api/user?limit=10}`

Skip

`/api/user?skip=5}`

Populate

`/api/user?populate=skills}`

Sort

`/api/user?sort=-created_at}`

### POST

Endpoints

`/api/user`

### PUT

Endpoints

`/api/user`

`/api/user/:id`

Conditions

`/api/user?conditions={"email":"mrrobot@gmail.com","name":"Elliot Alderson"}`

Options

Any available mongoose update options can be appended to the url

### DELETE

Endpoints

`/api/user`

`/api/user/:id`