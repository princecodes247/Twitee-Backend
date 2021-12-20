import assert from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import { type } from "os";
import app from "../app.js"
chai.use(chaiHttp);
chai.should();

describe("Public Routes", () => {
  describe("GET /", () => {
      // Test Default page route
      it("Default page", (done) => {
           chai.request(app)
               .get('/')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('string');
                   done();
                });
       });        
      //  Test to get users record
      it("/users", (done) => {
           chai.request(app)
               .get(`/users`)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('array');
                   done();
                });
       });
         //  Test to signup as a user 
      it("/register", (done) => {
        chai.request(app)
            .post(`/register`)
            .type('form')
            .send({
              '_method': "put",
              'firstName': "John",
              'lastName': "Doe",
              'email': "Johndoe@gmail.com",
              'pass': "John",
              'confirmPass': "John",
              'phone': "09011308292",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('string');
                done();
             });
    });
    // Test to access user dashboard page
    it("/dashboard", (done) => {
      chai.request(app)
          .post(`/dashboard`)
          .auth('123', '123')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('string');
              done();
           });
  });

//  REMAINING TESTS
//  -- Test User login
//  -- Test User delete
//  -- Test Admin login
//  -- Test all routes
//  -- Test User login
//  -- Test User login



      //  Get a single user record
    //    it("/users/:username", (done) => {
    //     const id = 1;
    //     chai.request(app)
    //         .get(`/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             done();
    //          });
    // });
       
      // // Test to get single user record
      // it("should not get a single user record", (done) => {
      //      const id = 5;
      //      chai.request(app)
      //          .get(`/${id}`)
      //          .end((err, res) => {
      //              res.should.have.status(404);
      //              done();
      //           });
      //  });
  });
});