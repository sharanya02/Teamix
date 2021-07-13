const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const assert = chai.assert
const app = require('../app')
const { describe, it } = require('mocha')
const faker = require('faker')

describe('# Teams Test Suite', function () {
  it('# Team Creation Test', async function () {
    const res1 = await chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: 'TESTING'
      })
    const res = await chai.request(app)
      .post('/api/v1/team/create')
      .set('Authorization', `Bearer ${res1.body.jwt}`)
      .send({
        teamName: faker.name.findName()
      })
    assert.equal(res.status, 201)
    assert.equal(res.body.message, 'Team Successfully Created')
    assert.exists(res.body.team)
    process.env.teamId = res.body.team.teamId
    process.env.jwt = res1.body.jwt
  })
  it('# Team Details Fetch', async function () {
    const res = await chai.request(app)
      .post('/api/v1/team/details/fetch')
      .set('Authorization', `Bearer ${process.env.jwt}`)
      .send({
        teamId: process.env.teamId
      })
    assert.equal(res.status, 200)
    assert.equal(res.body.message, 'Team details fetched successfully')
    assert.exists(res.body.team)
    assert.equal(res.body.team.teamId, process.env.teamId)
  })
  it('# Team Delete Test', async function () {
    const res = await chai.request(app)
      .post('/api/v1/team/delete')
      .set('Authorization', `Bearer ${process.env.jwt}`)
      .send({
        teamId: process.env.teamId
      })
    assert.equal(res.status, 201)
    assert.equal(res.body.message, 'Team deleted successfully')
  })
})
