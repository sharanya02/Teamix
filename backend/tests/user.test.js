const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const assert = chai.assert
const app = require('../app')
const { describe, it } = require('mocha')
const faker = require('faker')

describe('# User Test Suite', function () {
  it('# Signup Test', async function () {
    const res = await chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: 'TESTING'
      })
    assert.equal(res.status, 201)
    assert.equal(res.body.message, 'User Created')
    assert.exists(res.body.jwt)
    process.env.email = res.body.data.email
    process.env.jwt = res.body.jwt
  })
  it('# Login Test', async function () {
    const res = await chai.request(app)
      .post('/api/v1/user/login')
      .send({
        email: process.env.email,
        password: 'TESTING'
      })
    assert.equal(res.status, 200)
    assert.equal(res.body.message, 'User Logged In')
    assert.exists(res.body.data)
    assert.equal(res.body.data.email, process.env.email)
  })
  it('# User Details Fetch Test', async function () {
    const res = await chai.request(app)
      .post('/api/v1/user/details/fetch')
      .set('Authorization', `Bearer ${process.env.jwt}`)
    assert.equal(res.status, 200)
    assert.equal(res.body.message, 'User details fetched successfully')
    assert.exists(res.body.user)
    assert.equal(res.body.user.email, process.env.email)
  })
})
