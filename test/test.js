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

     it('Workig hours scenario. Workday has just ended', function(){
        var model = new DueDate("2020-03-19 05:01 PM", 16);
        assert.equal(false, model.isWorkingHours());
      })


     it('Workig hours scenario. It\'s time to sleep, no work today.', function(){
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
    it('Add hours scenario. 3 hours to spend today, 8 hours to spend tomorrow and the rest work should be done till 02:12 PM of the next day (03/)',
    function(){
       var model = new DueDate("2020-03-17 02:12 PM", 16);
       var serive = new DueDateService

       assert.equal("03/19/2020 02:12 PM", serive.calculateDueDate(model));
     })

     it('Add hours scenario. The issue should be solved by the end of the day.', function(){
        var model = new DueDate("2020-03-17 11:00 AM", 5);
        var serive = new DueDateService

        assert.equal("03/17/2020 04:00 PM", serive.calculateDueDate(model));
      })

      it('Add hours scenario. The most part of work should be done today and spend 1 hour tomorrow morning.', function(){
         var model = new DueDate("2020-03-17 09:00 AM", 9);
         var serive = new DueDateService

         assert.equal("03/18/2020 10:00 AM", serive.calculateDueDate(model));
       })


       it('Add hours scenario.', function(){
          var model = new DueDate("2020-03-17 02:00 PM", 9);
          var serive = new DueDateService

          assert.equal("03/18/2020 03:00 PM", serive.calculateDueDate(model));
        })

        it('Add hours scenario. A few days if development ',
        function(){
           var model = new DueDate("2020-03-17 09:00 AM", 24);
           var serive = new DueDateService

           assert.equal("03/20/2020 09:00 AM", serive.calculateDueDate(model));
         })


         it('Add hours scenario. An issue was reported on Friday, Saturday and Sunday should be ignored. ',
         function(){
            var model = new DueDate("2020-03-20 04:00 PM", 2);
            var serive = new DueDateService

            assert.equal("03/23/2020 10:00 AM", serive.calculateDueDate(model));
          })

          it('Add hours scenario. Issue should be done by the end of the day',
          function(){
             var model = new DueDate("2020-03-20 02:00 PM", 3);
             var serive = new DueDateService

             assert.equal("03/20/2020 05:00 PM", serive.calculateDueDate(model));
           })

           //   it('Add hours scenario. One minute is left before end of the work day, but there is a small issue reported. Better to fix it tomorrow morning',
           //   function(){
             //    var model = new DueDate("2020-03-17 04:59 PM", 1);
             //    var serive = new DueDateService

           //      assert.equal("03/18/2020 10:59 AM", serive.calculateDueDate(model));
           //    })


})


// wrong date format

// wrong turnaroundTime
