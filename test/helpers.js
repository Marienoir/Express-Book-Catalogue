// // const loginUser = async () => {
// //    const res= await request(app)
// //     .post('/api/users/register')
// //     .send({
// //         email: 'six@gmail.com',
// //         password: '1111',
// //     });

// //     console.log(res)
// // };
// // module.exports = loginUser

// const {expect} = require('chai')
// const request = require('supertest')

// const uuid = require('uuid')
// const app = require('../src/index')

// const loginUser = async('add-books', (done) => {
//     request(app)
//     .post('/api/users/login')
//     .send({
//         email: 'six@gmail.com',
//         password: '1111',
//     })
//     .end((err, res)=> {
//         console.log(res.body.data.token)
//         expect(res.body.code).to.equal(201)
//         expect(res.body.status).to.equal('success')
//         expect(res.body.data).to.be.an('object')
//         done()
//     })
// })
// module.exports = loginUser