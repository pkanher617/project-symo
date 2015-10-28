function validateSolution(givenExp, solution, condition) {
    var maxPredicates = 0;
    for (var i = 0; i < givenExp.length; i++) {
        if (givenExp[i] > maxPredicates)
            maxPredicates = givenExp[i];
    }
    for (var i = 0; i < solution.length; i++) {
        if (solution[i] > maxPredicates)
            maxPredicates = solution[i];
    }
    for (var i = 0; i < (1 << maxPredicates); i++) {
        eval1 = evaluateExp(givenExp, i, condition);
        eval2 = evaluateExp(solution, i, condition);
        if (eval1 != eval2 || eval1 < 0)
            return false;
    }
    return true;
}

function evaluateExp(exp, input, condition) {
    var stack = [];
    for (var i = exp.length - 1; i >= 0; i--) {
        var current = exp[i];
        if (!isNaN(current)) {
            stack.push((input & (1 << (current - 1))) / (1 << (current - 1)));
        }
        else {
            pred = false;
            for (var j = 0; j < condition.predList.length; j++) {
                if (condition.predList[j].predName == current)
                    pred = condition.predList[j];
            }
            if (!pred)
                return -1;
                
            if (stack.length < pred.arity)
                return -1;
            
            pred.evaluation(stack);
        }
    }
    if (stack.length != 1)
        return -1;
    return stack[0];
}

// EVERYTHING BELOW THIS IS TEST CODE!

/*
var condition = {};
condition.predList = [];

condition.predList.push({
		predName: "and",
		color: "ff0000",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            var arg2 = stack[stack.length-2];
            stack.splice(stack.length-2, 2, arg1 && arg2);
        },
		arity: 2,
		image: "and.png"
});

condition.predList.push({
		predName: "or",
		color: "00ff00",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            var arg2 = stack[stack.length-2];
            stack.splice(stack.length-2, 2, arg1 || arg2);
        },
		arity: 2,
		image: "or.png"
});

condition.predList.push({
		predName: "if",
		color: "0000ff",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            var arg2 = stack[stack.length-2];
            stack.splice(stack.length-2, 2, (!arg1) || arg2);
        },
		arity: 2,
		image: "if.png"
});

condition.predList.push({
		predName: "not",
		color: "ffff00",
        evaluation: function (stack) {
            var arg1 = stack[stack.length-1];
            stack.splice(stack.length-1, 1, !arg1);
        },
		arity: 1,
		image: "not.png"
});

var givenExp = ["or", "and", 2, 3, "not", 1];
var solution = ["if", 1, "and", 2, 3];

alert(validateSolution(givenExp, solution, condition));*/