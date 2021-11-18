const {expect} = require('chai')
const request = require('supertest')

const uuid = require('uuid')
const app = require('../src/index')
const  loginUser = require('./helpers')

const email= 'six@gmail.com'
const password= '1111'

describe("books", () =>{
    it.skip('baseroute', (done)=>{
        request(app)
        .get('/')
        .expect(200)
        .end((err,res)=>{
            expect(res.body.message).to.equal('Welcome to Blog')
            expect(res.body.code).to.equal(200)
            done()
        })
    })
    it.skip('register', (done) => {
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
   
    it.skip('login', (done) => {
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

    it('login', (done) => {
        request(app)
        .post('/api/users/login')
        .send({
            email: 'six@gmail.com',
            password: '1111',
        })
        it('add-books', (done) => {
            request(app)
            .post('/api/admin/add-books')
            .send({
                title: "test",
                author: "tester"
            })
            .set(
                'Authorization',
                `Bearer ${res.body.token}`
            )
            .end((err, res)=> {
                console.log(res.body.data.token)
                expect(res.body.code).to.equal(201)
                expect(res.body.status).to.equal('success')
                expect(res.body.data).to.be.an('object')
                done()
            })
        }
       
        )
        
    })
    // it(`add-books`, async (res) => {
    //     await loginUser()
    //     request(app)
    //         .post('/api/admin/add-books')
    //         .send({
    //             title: "test",
    //             author: "tester"
    //         })
    //         .set(
    //             'Authorization',
    //             `Bearer ${res.body.token}`,
    //         )
    //         .expect(200)
          
    // });
    
})