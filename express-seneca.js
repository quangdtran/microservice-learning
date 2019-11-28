const seneca = require('seneca')();
const web = require('seneca-web');
const express = require('express');
const app = express();

const routes = [
  {
    prefix: '/my-api',
    pin: 'role:api,cmd:*',
    map: {
      bazinga: {
        GET: true,
      },
    },
  },
];

let config = {
  context: app,
  routes: routes,
  adapter: require('seneca-web-adapter-express'),
};

seneca.add('role:api,cmd:bazinga', function (args, done) {
  done(null, { bar: "Bazinga!" });
});
seneca.use(web, config);

seneca.quiet().act('role:web', {
  use: {
    prefix: '/my-api',
    pin: { role: 'api', cmd: '*' },
    map: {
      bazinga: { GET: true }
    }
  }
})

app.listen(3000);