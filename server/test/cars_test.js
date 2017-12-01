var chai = require('chai');
var chaiHttp = require('chai-http');
const mongoose = require('mongoose');
chai.use(chaiHttp);

const should = chai.should();

var server = require('../app');
var db = require('../models');
const Car = require('../models/mongooseCar');
const CarDealer = require('../models/mongooseCarDealer');

let passwordHash = require('password-hash');

describe('Files and Folders', () => {

  let token = '';
  let user_id = '';
  let dealer = '';
  let car_id = '';

  let car_type = 'Sedan';
  let car_model = 'Kijang';
  let car_make = 'Toyota';
  let car_description = 'Good Enough';
  let car_price = 20;
  let car_doorNumber = 4;
  let car_capacity = 4;

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
    };

    db.Admin.create(newUser)
      .then((user) => {
        newUser_id = user.id;
        user_id = user.id

        chai.request(server)
          .post('/authadmin/signin')
          .send({
            email: 'rudy@haha.com',
            password: 'haha',
          })
          .end((err, result) => {
            console.log('****** result.body=', result.body);
            token = result.body.token;

            CarDealer.create({
              name: 'Hertz',
              address: '333 Hertz st',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
              zipcode: '94110',
            }, (err, newCarDealer) => {
              dealer = newCarDealer;

              done();
            });            
          });
      });

  }); // end of beforeEach

  afterEach((done) => {
    db.Admin.destroy({where: {}})
      .then(() => {
        done();
      });
  });


  // user has signed in and use the token to access server API
  it('POST - /cars - admin create a new car listing', (done) => {
    chai.request(server)
      .post('/cars')
      .set('token', token)
      .send({
        type: car_type,
        make: car_make,
        model: car_model,
        dealer: mongoose.Types.ObjectId(dealer._id),
        description: car_description,
        price: car_price,
        doorNumber: car_doorNumber,
        capacity: car_capacity,
      })
      .end((err, result) => {
        console.log("*** POST cars", result.body);
        result.should.have.status(200);
        result.should.be.an('object');

        result.body.should.be.an('object');
        
        result.body.should.have.property('type');
        result.body.should.have.property('make');
        result.body.should.have.property('model');
        result.body.should.have.property('dealer');
        result.body.should.have.property('description');
        result.body.should.have.property('price');
        result.body.should.have.property('doorNumber');
        result.body.should.have.property('capacity');

        car_id = result.body._id;
        
        done();
      });
  });

  it('GET - /cars/id - should return one car', (done) => {
    
    chai.request(server)
      .get(`/cars/${car_id}`)
      .set('token', token)
      .end((err, result) => {
        console.log("*** get one car", result.body);
        result.should.have.status(200);
        result.should.be.an('object');
        result.body.should.be.an('object');
        result.body.type.should.equal(car_type);
        result.body.make.should.equal(car_make);
        result.body.model.should.equal(car_model);
        result.body.description.should.equal(car_description);
        result.body.price.should.equal(car_price);
        result.body.doorNumber.should.equal(car_doorNumber);
        result.body.capacity.should.equal(car_capacity);
        
        done();
      });
  });


  it('GET - /cars - should return car dealers', (done) => {
    
    chai.request(server)
      .get('/cars')
      .set('token', token)
      .end((err, result) => {
        console.log("*** get cars", result.body);
        result.should.have.status(200);
        result.should.be.an('object');
        result.body.should.be.an('array');

        done();
      });
  });


  it('GET - /cardealers - should return car dealers', (done) => {
    
    chai.request(server)
      .get('/cardealers')
      .set('token', token)
      .end((err, result) => {
        console.log("*** get files", result.body);
        result.should.have.status(200);
        result.should.be.an('object');
        result.body.should.be.an('array');

        done();
      });
  });

  it('GET - /cardealers/:id - should return one car dealer', (done) => {

    chai.request(server)
      .get(`/cardealers/${dealer._id}`)
      .set('token', token)
      .end((err, result) => {
        console.log("*** get files", result.body);
        result.should.have.status(200);
        result.should.be.an('object');
        result.body.should.be.an('object');

        done();
      });
  });

  // it('GET - /folders/root - should return one folder in the root folder', (done) => {
  //   chai.request(server)
  //     .get('/folders/root')
  //     .set('token', token)
  //     .end((err, result) => {
  //       console.log("*** get folders", result.body);
  //       result.should.have.status(200);
  //       result.should.be.an('object');
  //       result.body.should.be.an('array');
  //       result.body.length.should.equal(1);

  //       done();
  //     });
  // });

  // it('GET - /folders/root - folder information should match with the the folder that was created in the root folder', (done) => {
  //   chai.request(server)
  //     .get('/folders/root')
  //     .set('token', token)
  //     .end((err, result) => {
  //       console.log("*** get folders", result.body);
  //       result.should.have.status(200);
  //       result.should.be.an('object');
  //       result.body.should.be.an('array');

  //       result.body[0].name.should.equal(newDirName);
  //       result.body[0].path.should.equal(currentPath);
  //       result.body[0].full_path.should.equal(newDirPath);
  //       result.body[0].is_starred.should.equal(folder_is_starred);
  //       result.body[0].is_deleted.should.equal(folder_is_deleted);

  //       done();
  //     });
  // });

  // it('GET - /files/share - should return all files that are given share access by other user', (done) => {
  //   chai.request(server)
  //     .get('/files/share')
  //     .set('token', token)
  //     .end((err, result) => {
  //       console.log("*** get files share", result.body);
  //       result.should.have.status(200);
  //       result.should.be.an('object');
  //       result.body.should.be.an('array');
  //       result.body.length.should.equal(0);

  //       done();
  //     });
  // });

  // it('GET - /folders/share - should return all folders that are given share access by other user', (done) => {
  //   chai.request(server)
  //     .get('/folders/share')
  //     .set('token', token)
  //     .end((err, result) => {
  //       console.log("*** get folders share", result.body);
  //       result.should.have.status(200);
  //       result.should.be.an('object');
  //       result.body.should.be.an('array');
  //       result.body.length.should.equal(0);

  //       done();
  //     });
  // });



})
