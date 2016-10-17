/**
 * New node file
 */

exports.calculate = function(req, res) {
	// These two variables come from the form on
	// the views/login.hbs page
	var firstOperand = req.param("firstOperand");
	var secondOperand = req.param("secondOperand");
	var operation = req.param("operation");
	var json_responses;
	var result;
	console.log(firstOperand);
	console.log(secondOperand);
	console.log(operation);
	if (operation == '+') {
		result = firstOperand + secondOperand;
	} else if (operation == '-') {
		result = firstOperand - secondOperand;
	} else if (operation == '*') {
		result = firstOperand * secondOperand;
	} else {
		result = firstOperand / secondOperand;
	}
	json_responses = {
		"result" : result
	};
	res.send(json_responses);

};
