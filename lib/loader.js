'use strict';
const Elasticsearch = requrie('elasticsearch');
const path = require('path');
const assert = require('assert')

module.exports = app => {
  const config = app.config.tsEs;
  assert(config.host || config.hosts, '[egg-cool-es] \'host\' or \'hosts\' is required on config');

  app.coreLogger.info('[egg-ts-es] connection elasticsearch server');

  const client = new Elasticsearch.Client(config);

  Object.defineProperty(app, 'es', {
    value: client,
    writable: false,
    configurable: false,
  })

  app.beforeStart(function () {
    client.ping({
      requestTimeout: 30000,
    }, function (error) {
      if (error) {
        app.coreLogger.error('[egg-ts-es] elasticsearch cluster is down with error: ' + error);
      } else {
        app.coreLogger.info('[egg-ts-es] elasticsearch connects successfully');
        
      }
    });
    loadEsToApp(app);
  })
};

function loadEsToApp(app) {
  const { baseDir = 'esmodel'} = app.config;
  const dir = path.join(app.baseDir, 'app', baseDir);
  app.loader.loadToApp(dir, baseDir, {
    inject: app,
    caseStyle: 'lower'
  })
}
