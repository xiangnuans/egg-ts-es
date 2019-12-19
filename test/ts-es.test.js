'use strict';

const mock = require('egg-mock');

describe('test/ts-es.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/ts-es-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, tsEs')
      .expect(200);
  });
});
