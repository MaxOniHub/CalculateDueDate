var assert = require("assert")
var DueDateService = require('../services/DueDateService')
var DueDate = require('../models/DueDate')

     describe('due date calc', function(){
         it('should return `test`', function(){
            var model = new DueDate("2019-03-19 02:00 PM", 16);

            var service = new DueDateService();

            var res = service.calculateDueDate(model)
            assert.equal("test",res);
}) })


describe('is working hours', function(){
    it('should return `true`', function(){
       var model = new DueDate("2019-03-19 09:00 AM", 16);

       assert.equal(true, model.isWorkingHours());
     })

     it('should return `false`', function(){
        var model = new DueDate("2019-03-19 10:00 PM", 16);

        assert.equal(false, model.isWorkingHours());
      })
})

// not working hours test
