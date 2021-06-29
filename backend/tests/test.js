const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const assert = chai.assert
const app = require('../app')
const { describe, it } = require('mocha')

describe('# Test Suite', function () {
  it('# Test description', async function () {
    const res = await chai.request(app)
      .get('/')
    assert.equal(res.body.user, 'none')
  })
})
