'use strict'

const Memcached = require('memcached');

function memcachedClient() {
  const client = new Memcached('localhost:11211', {
    retries: 10,
    retry: 10000,
    remove: true
  });

  return client;
}

module.exports = memcachedClient;
