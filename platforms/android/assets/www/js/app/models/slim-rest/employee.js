define(function(require) {

    "use strict";

    var $ = require('jquery'),
            Backbone = require('backbone'),
            
    Employee = Backbone.Model.extend({
        //urlRoot: "http://blackbox-rest.gopagoda.com/index.php/employees",
        urlRoot: "/blackbox-rest/app-rest/employees",
        
    initialize: function() {
            this.reports = new EmployeeCollection();
            this.reports.url = this.urlRoot + "/" + this.id + "/reports";
        }

    }),
    
    EmployeeCollection = Backbone.Collection.extend({
        model: Employee,
        url: "/blackbox-rest/app-rest/employees"
        //url: "http://blackbox-rest.gopagoda.com/index.php/employees"
    });

    return {
        Employee: Employee,
        EmployeeCollection: EmployeeCollection
    };

});

