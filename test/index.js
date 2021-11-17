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
            email: 'six@gmail.com',
            password: '1111',
        })
        .expect(200)
        .end((err, res) => {
            expect(res.body.message).to.equal('User logged in successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            done()
        })
    })

    it('add-books', (done) => {
        //let token = res.body.token
        request(app)
        .post('/api/users/login')
        .send({
            email: 'six@gmail.com',
            password: '1111',
        })
        .end((err, res) => {
            let accessToken = res.body.data.token
            
        .set('Authorization', 'JWT' + accessToken)
        .end((err, res)=> {
            expect(res.body.message).to.equal('Books added successfully')
            expect(res.body.code).to.equal(201)
            expect(res.body.status).to.equal('success')
            expect(res.body.data).to.be.an('object')
            done()
            })
        })
    })
 
    
})