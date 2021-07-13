const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const assert = chai.assert
const app = require('../app')
const { describe, it } = require('mocha')
const faker = require('faker')

describe('# Posts Test Suite', function () {
  it('# Post Creation Test', async function () {
    const res1 = await chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: 'TESTING'
      })
    const res2 = await chai.request(app)
      .post('/api/v1/team/create')
      .set('Authorization', `Bearer ${res1.body.jwt}`)
      .send({
        teamName: faker.name.findName()
      })
    process.env.teamId = res2.body.team.teamId
    process.env.jwt = res1.body.jwt
    const res = await chai.request(app)
      .post('/api/v1/post/create')
      .set('Authorization', `Bearer ${res1.body.jwt}`)
      .send({
        teamId: process.env.teamId,
        postContent: 'this is test post'
      })
    assert.equal(res.status, 201)
    assert.equal(res.body.message, 'Post Successfully Created')
    assert.exists(res.body.post)
    process.env.postId = res.body.post.postId
  })
  it('# Post Details Fetch Test', async function () {
    const res = await chai.request(app)
      .post('/api/v1/post/details/fetch')
      .set('Authorization', `Bearer ${process.env.jwt}`)
      .send({
        postId: process.env.postId
      })
    assert.equal(res.status, 200)
    assert.equal(res.body.message, 'Post details fetched successfully')
    assert.equal(res.body.post.postId, process.env.postId)
  })
  it('# Post Delete Test', async function () {
    const res = await chai.request(app)
      .post('/api/v1/post/delete')
      .set('Authorization', `Bearer ${process.env.jwt}`)
      .send({
        postId: process.env.postId
      })
    assert.equal(res.status, 201)
    assert.equal(res.body.message, 'Post Successfully Deleted')
  })
})
