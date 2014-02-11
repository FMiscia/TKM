var D = (function($){
	
	var my = {};

	my.urlRoot = "http://blackbox-rest.gopagoda.com/app-rest";

	my.post = function(what,argument,callback){
		$.post(my.urlRoot+what,argument,callback);
	}

	my.get = function(what,callback){
		$.get(my.urlRoot+what,callback);
	}

	return my;

}(jQuery))