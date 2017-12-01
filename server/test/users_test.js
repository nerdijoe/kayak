var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();

var server = require('../app');
var db = require('../models');
let passwordHash = require('password-hash');

describe('User', () => {

  let token = '';
  let user_id = '';

  beforeEach((done) => {
    var newUser = {
      firstname: 'Rudy',
      lastname: 'W',
      email: 'rudy@haha.com',
      password: passwordHash.generate('haha'),
      address: 'bro st',
      city: 'san jose',
      state: 'CA',
      zipcode: '95112',
      phone: '+1 222 222 2222',
      profileImage: 'profileImage',
      creditCardNum: '1234567890123456',
      creditCardFullName: 'Rudy W',
    };

    db.User.create(newUser)
      .then((user) => {
        newUser_id = user.id;
        user_id = user.id

        chai.request(server)
          .post('/auth/signin')
          .send({
            email: 'rudy@haha.com',
            password: 'haha',
          })
          .end((err, result) => {
            //console.log('****** result.body=', result.body);
            token = result.body.token;
            done();
          });


      });
  }); // end of beforeEach

  afterEach((done) => {
    db.User.destroy({where: {}})
      .then(() => {
        done();
      });
  });

  // user has signed in and use the token to access server API
  it('GET - /users/:id - should return one user', (done) => {
    chai.request(server)
      .get(`/users/${user_id}`)
      .end((err, result) => {
        //console.log("*** get one user", result.body);
        result.should.have.status(200);
        result.should.be.an('object');
        result.body.should.be.an('object');

        result.body.should.have.property('firstName');
        result.body.should.have.property('lastName');
        result.body.should.have.property('email');
        result.body.should.have.property('password');
        result.body.should.have.property('password');
        result.body.should.have.property('address');
        result.body.should.have.property('city');
        result.body.should.have.property('state');
        result.body.should.have.property('zipcode');
        result.body.should.have.property('phone');
        result.body.should.have.property('profileImage');
        result.body.should.have.property('creditCardNum');
        result.body.should.have.property('creditCardFullName');
        
        done();
      });
  });

});
