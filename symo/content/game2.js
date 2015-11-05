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

condition.axiomList = [];

condition.axiomList.push({
        name: "and_or",
        axiom: ["if", "and", 1, 2, "or", 1, 2]
});

condition.axiomList.push({
        name: "syllog",
        axiom: ["if", "and", "if", 1, 2, "if", 2, 3, "if", 1, 3]
});

condition.equivalenceList = [];

condition.equivalenceList.push({
        name: "comm_and",
        rule: [["and", 1, 2], ["and", 2, 1]]
});

condition.equivalenceList.push({
        name: "if_or",
        rule: [["if", 1, 2], ["or", "not", 1, 2]]
});

function equals(array1, array2) {
    if (array1.length != array2.length)
        return false;
    
    for (var i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i])
            return false;
    }
    
    return true;
}

function getArity(funcName) {
    for (var i = 0; i < condition.predList.length; i++) {
        if (condition.predList[i].predName == funcName)
            return condition.predList[i].arity;
    }
    return 0;
}

function parseStatement(str) {
    var array = str.split(" ");
    for (var i = 0; i < array.length; i++) {
        if (!isNaN(array[i]))
            array[i] = parseInt(array[i]);
    }
    return array;
}

function toString(statement) {
    var str = "";
    
    for (var i = 0; i < statement.length; i++) {
        if (i > 0)
            str += " ";
        str += statement[i];
    }
    
    return str;
}

function getSubtree(statement, start) {
    var totalArity = 1;
    var subtree = [];
    for (var i = start; i < statement.length; i++) {
        totalArity--;
        totalArity += getArity(statement[i]);
        subtree.push(statement[i]);
        if (totalArity == 0)
            return subtree;
    }
    return [];
}

function splitStatement(array) {
    var arrays = [];
    while (array.length > 0) {
        var subtree = getSubtree(array, 0);
        arrays.push(subtree);
        array = array.slice(subtree.length);
    }
    return arrays;
}

function getArguments(subtree) {
    return splitStatement(subtree.slice(1));
}

function ponens(conditional, premise) {
    if (conditional[0] != "if")
        return false;
        
    var args = getArguments(conditional);
    if (!equals(args[0], premise))
        return false;
    
    return args[1];
}

function conjoin(statement1, statement2) {
    return ["and"].concat(statement1).concat(statement2);
}

function specify(schema, statements) {
    var newStatement = [];
    for (var i = 0; i < schema.length; i++) {
        if (!isNaN(schema[i])) {
            if (schema[i] > statements.length || schema[i] < 1)
                return false;
            newStatement = newStatement.concat(statements[schema[i] - 1]);
        }
        else {
            newStatement.push(schema[i]);
        }
    }
    return newStatement;
}

function rewrite(statement, index, equivalence) {
    var subtree = getSubtree(statement, index);
    var presub = statement.slice(0, index);
    var postsub = statement.slice(index + subtree.length);
    
    var mapping = [];
    var ind = 0;
    for (var i = 0; i < equivalence[0].length; i++) {
        if (isNaN(equivalence[0][i])) {
            if (subtree[ind] != equivalence[0][i])
                return false;
            ind++;
        }
        else {
            var prevMap = mapping[equivalence[0][i]];
            if (typeof(prevMap) == "undefined") {
                var newMap = getSubtree(subtree, ind);
                mapping[equivalence[0][i]] = newMap;
                ind += newMap.length;
            }
            else {
                var newMap = getSubtree(subtree, ind);
                if (!equals(newMap, prevMap))
                    return false;
                ind += prevMap.length;
            }
        }
    }
    
    var newSubtree = [];
    for (var i = 0; i < equivalence[1].length; i++) {
        if (isNaN(equivalence[1][i])) {
            newSubtree.push(equivalence[1][i]);
        }
        else {
            newSubtree = newSubtree.concat(mapping[equivalence[1][i]]);
        }
    }
    
    return presub.concat(newSubtree).concat(postsub);
}

allStatements = [];

function addStatement(statement) {
    allStatements.push(statement);
    document.getElementById("statementList").innerHTML += (allStatements.length + ". " + toString(statement) + "\n");
}

function executeCommand(cmdStr) {
    var cmd = parseStatement(cmdStr);
    
    if (cmd.length < 1)
        return false;
    
    switch (cmd[0]) {
    case "premise":
        addStatement(cmd.slice(1));
        return true;
    case "ponens":
        if (cmd.length < 3)
            return false;
        if (cmd[1] < 1 || allStatements.length < cmd[1])
            return false;
        if (cmd[2] < 1 || allStatements.length < cmd[2])
            return false;
        var res = ponens(allStatements[cmd[1]-1], allStatements[cmd[2]-1]);
        if (!res)
            return false;
        addStatement(res);
        return true;
    case "conjoin":
        if (cmd.length < 3)
            return false;
        if (cmd[1] < 1 || allStatements.length < cmd[1])
            return false;
        if (cmd[2] < 1 || allStatements.length < cmd[2])
            return false;
        addStatement(conjoin(allStatements[cmd[1]-1], allStatements[cmd[2]-1]));
        return true;
    case "specify":
        if (cmd.length < 3)
            return false;
        var name = cmd[1];
        var axiom = false;
        for (var i = 0; i < condition.axiomList.length; i++) {
            if (condition.axiomList[i].name == name)
                axiom = condition.axiomList[i].axiom;
        }
        if (!axiom)
            return false;
        var statements = splitStatement(cmd.slice(2));
        var res = specify(axiom, statements);
        if (!res)
            return false;
        addStatement(res);
        return true;
    case "rewrite":
        if (cmd.length < 4)
            return false;
        if (cmd[1] < 1 || allStatements.length < cmd[1])
            return false;
        var name = cmd[3];
        var rule = false;
        for (var i = 0; i < condition.equivalenceList.length; i++) {
            if (condition.equivalenceList[i].name == name)
                rule = condition.equivalenceList[i].rule;
        }
        if (!rule)
            return false;
        var res = rewrite(allStatements[cmd[1]-1], cmd[2], rule);
        if (!res)
            return false;
        addStatement(res);
        return true;
    default:
        return false;
    }
}