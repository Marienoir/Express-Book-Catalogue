const {expect} = require('chai')
const request = require('supertest')

const uuid = require('uuid')
const app = require('../src/index')


describe("books", () =>{
    it('baseroute', (done)=>{
        request(app)
        .get('/')
        .expect(200)
        .end((err,res)=>{
            expect(res.body.message).to.equal('Welcome to Blog')
            expect(res.body.code).to.equal(200)
            done()
        })
    })
    it('register', (done) => {
        request(app)
        .post('/api/users/signup')
        .send({
            first_name: 'Michael',
            last_name: 'Scofield',
            email: `mike.${uuid.v1()}@mail.com`,
            password: '123456',
            role: 'admin'
        })
        .expect(201)
        .end((err, res) => {
            expect(res.body.message).to.equal('User added successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('email')
            expect(res.body.data).to.have.property('first_name')
            expect(res.body.data).to.have.property('last_name')
            expect(res.body.data).to.have.property('password')
            expect(res.body.data).to.have.property('role')
            done()
        })
    })
   
    it('login', (done) => {
        request(app)
        .post('/api/users/login')
        .send({
            email: "mily@gmail.com",
            password: "12345",
        })
        .expect(200)
        .end((err, res) => {
            token = res.body.data.token
            expect(res.body.message).to.equal('User logged in successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            done()
        })
    })

    it('add-books', (done) => {
        request(app)
        .post('/api/admin/add-books')
        .set('x-access-token', `${token}`)
        .send({
            title: "test",
            author: "tester"
        })
        .end((err, res)=> {
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.message).to.equal('Books added successfully')
            expect(res.body.data).to.be.an('object')
            done()
        })
    })

    it('view-books', (done) => {
        request(app)
        .get('/api/users/view-books')
        .set('x-access-token', `${token}`)
        .end((err, res)=> {
            expect(res.body.code).to.equal(200)
            expect(res.body.status).to.equal('success')
            expect(res.body.message).to.equal('All Books fetched successfully')
            expect(res.body.data).to.be.an('array')
            done()
        })
    })
    it('remove-books', (done) => {
        request(app)
        .delete(`/api/users/remove/1`)
        .set('x-access-token', `${token}`)
        .end((err, res)=> {
            expect(res.body.status).to.equal('success')
            expect(res.body.message).to.equal(`Book deleted successfully`)
            done()
        })
    })

    it('update-books', (done) => {
        request(app)
        .put(`/api/admin/update/3`)
        .set('x-access-token', `${token}`)
        .send({
            "title": "updated Book",
            "author": "Updated Author"
        })
        .end((err, res)=> {
            expect(res.body.status).to.equal('success')
            expect(res.body.message).to.equal(`Book updated successfully`)
            expect(res.body.data).to.be.an('object')
            done()
        })
    })
    
})