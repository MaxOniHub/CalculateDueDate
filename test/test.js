var assert = require("assert")
var chai = require('chai');
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

var DueDateService = require('../services/DueDateService')
var DueDate = require('../models/DueDate')

// MODEL LEVEL
describe('Testing model level.', function(){
    it('Workig hours scenario. Should return `true`', function(){
       var model = new DueDate("2020-03-19 09:00 AM", 16);
       assert.equal(true, model.isWorkingHours());
     })

     it('Workig hours scenario. Should return `false`.', function(){
        var model = new DueDate("2020-03-19 10:00 PM", 16);
        assert.equal(false, model.isWorkingHours());
      })

      it('Holidays scenario. Should return `false` because 03/19 it\'s Thursday', function(){
         var model = new DueDate("2020-03-19 09:00 AM", 16);

         assert.equal(false, model.isHoliday());
       })

       it('Holidays scenario. should return `true` 03/21 because it\'s Saturday.', function(){
          var model = new DueDate("2020-03-21 09:00 AM", 16);

          assert.equal(true, model.isHoliday());
        })

})

 // SERVICE LEVEL
describe('Testing service level.', function(){
    it('Add hours scenario. Should return `true`', function(){
       var model = new DueDate("2020-03-17 02:12 PM", 16);
       var serive = new DueDateService

       assert.equal("03/19/2020 02:12 PM", serive.calculateDueDate(model));
     })

})


// wrong date format

// wrong turnaroundTime
