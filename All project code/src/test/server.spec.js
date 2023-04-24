// Imports the index.js file to be tested.
const server = require('../index'); //TO-DO Make sure the path to your index.js is correctly added
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// describe('Server!', () => {
//   // Sample test case given to test / endpoint.
//   it('Returns the default welcome message (example test)', done => {
//     chai
//       .request(server)
//       .get('/welcome')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.status).to.equals('success');
//         assert.strictEqual(res.body.message, 'Welcome!');
//         done();
//       });
//   });
//
//   it('Accesses /home page', done => {
//     chai
//       .request(server)
//       .get('/home')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
//
//   // ===========================================================================
//   // TO-DO: Part A Login unit test case
//
//   //  Unnote when routes and database structure.
//   it('positive : /register', done => {
//     chai
//        .request(server)
//        .post('/register')
//        .send({email: 'name', password: 'password'})
//        .end((err, res) => {
//          expect(res).to.have.status(200);
//          expect(res.body.message).to.equals('Success');
//          done();
//        });
//   });
//   it('negative : /register', done => {
//     chai
//        .request(server)
//        .post('/register')
//        .send({email: 'nme', password: 'pass'})
//        .end((err, res) => {
//          //expect(res).to.have.status(400);
//          expect(res.body.message).to.equals('Password too short');
//          done();
//        });
//   });
//
//   //We are checking POST /add_user API by passing the user info in in incorrect manner (name cannot be an integer). This test case should pass and return a status 200 along with a "Invalid input" message.
// });
//
// describe('Login API', ()=> {
//   //
//     it('Positive : /login. Checking successful login', done => {
//       const user = {
//         email: 'name',
//         password: 'password'
//       };
//       chai
//           .request(server)
//           .post('/login')
//           .send(user)
//           .end((err, res) => {
//           expect(res).to.have.status(200);
//           // expect(res).to.redirectTo('/home');
//           done();
//           });
//       });
//
//       it('Negative: /login. Checking invalid credentials', (done) => {
//         chai.request(server)
//           .post('/login')
//           .send({email: "DNE", password: '' })
//           .end((err, res) => {
//             expect(res).to.have.status(403);
//             done();
//             //expect(res).to.have.redirect('/register');
//             //expect(res.body).to.have.property('message', 'Incorrect user or password');
//
//           });
//       });
//
// });
