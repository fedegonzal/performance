// Agregamos algunos métodos al objeto estandar String

String.prototype.capitalize = function() {
    word = this.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
};

String.prototype.toProperCase = function () {
	word = this.toLowerCase();
    return word.replace(/\w\S*/g, function(word) {

		if(skipProperCase.indexOf(word) == -1) {
	    	return word.capitalize();
	    }
	    else {
	    	return word;
	    }
    });
};




// Close para modal
$("#container").on("click", ".modal, .modal-backdrop", function(event) {
	event.preventDefault();
	$("#container .modal").hide();
	$("#container .modal-backdrop").hide();
});

