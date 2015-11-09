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

condition.predList.push({
		predName: "T",
		color: "cccccc",
        evaluation: function (stack) {
            stack.push(1);
        },
		arity: 0,
		image: "T.png"
});

condition.predList.push({
		predName: "F",
		color: "333333",
        evaluation: function (stack) {
            stack.push(0);
        },
		arity: 0,
		image: "F.png"
});

condition.axiomList = [];

condition.axiomList.push({
        name: "noncont",
        axiom: ["not", "and", 1, "not", 1]
});

condition.axiomList.push({
        name: "excl_mid",
        axiom: ["or", 1, "not", 1]
});

condition.axiomList.push({
        name: "and_or",
        axiom: ["if", "and", 1, 2, "or", 1, 2]
});

condition.axiomList.push({
        name: "syllog",
        axiom: ["if", "and", "if", 1, 2, "if", 2, 3, "if", 1, 3]
});

condition.axiomList.push({
        name: "if_conj",
        axiom: ["if", "and", "if", 1, 2, "if", 1, 3, "if", 1, "and", 2, 3]
});

condition.axiomList.push({
        name: "conj_simp",
        axiom: ["if", "and", 1, 2, 1]
});

condition.axiomList.push({
        name: "if_conj_simp",
        axiom: ["if", "if", 1, "and", 2, 3, "if", 1, 2]
});

condition.axiomList.push({
        name: "ponens",
        axiom: ["if", "and", "if", 1, 2, 1, 2]
});

condition.axiomList.push({
        name: "cases",
        axiom: ["if", "and", "if", 1, 3, "if", 2, 3, "if", "or", 1, 2, 3]
});

condition.axiomList.push({
        name: "true",
        axiom: ["T"]
});

condition.axiomList.push({
        name: "or_true",
        axiom: ["or", 1, "T"]
});

condition.equivalenceList = [];

condition.equivalenceList.push({
        name: "comm_and",
        rule: [["and", 1, 2], ["and", 2, 1]]
});

condition.equivalenceList.push({
        name: "assoc_and",
        rule: [["and", 1, "and", 2, 3], ["and", "and", 1, 2, 3]]
});

condition.equivalenceList.push({
        name: "assoc_and2",
        rule: [["and", "and", 1, 2, 3], ["and", 1, "and", 2, 3]]
});

condition.equivalenceList.push({
        name: "ident_and",
        rule: [["and", 1, "T"], [1]]
});

condition.equivalenceList.push({
        name: "ident_and2",
        rule: [[1], ["and", 1, "T"]]
});

condition.equivalenceList.push({
        name: "absorb_and",
        rule: [["and", 1, "F"], ["F"]]
});

condition.equivalenceList.push({
        name: "idemp_and",
        rule: [["and", 1, 1], [1]]
});

condition.equivalenceList.push({
        name: "idemp_and2",
        rule: [[1], ["and", 1, 1]]
});

condition.equivalenceList.push({
        name: "comm_or",
        rule: [["or", 1, 2], ["or", 2, 1]]
});

condition.equivalenceList.push({
        name: "assoc_or",
        rule: [["or", 1, "or", 2, 3], ["or", "or", 1, 2, 3]]
});

condition.equivalenceList.push({
        name: "assoc_or2",
        rule: [["or", "or", 1, 2, 3], ["or", 1, "or", 2, 3]]
});

condition.equivalenceList.push({
        name: "ident_or",
        rule: [["or", 1, "F"], [1]]
});

condition.equivalenceList.push({
        name: "ident_or2",
        rule: [[1], ["or", 1, "F"]]
});

condition.equivalenceList.push({
        name: "absorb_or",
        rule: [["or", 1, "T"], ["T"]]
});

condition.equivalenceList.push({
        name: "idemp_or",
        rule: [["or", 1, 1], [1]]
});

condition.equivalenceList.push({
        name: "idemp_or2",
        rule: [[1], ["or", 1, 1]]
});

condition.equivalenceList.push({
        name: "dist_and_or",
        rule: [["and", 1, "or", 2, 3], ["or", "and", 1, 2, "and", 1, 3]]
});

condition.equivalenceList.push({
        name: "dist_and_or2",
        rule: [["or", "and", 1, 2, "and", 1, 3], ["and", 1, "or", 2, 3]]
});

condition.equivalenceList.push({
        name: "dist_or_and",
        rule: [["or", 1, "and", 2, 3], ["and", "or", 1, 2, "or", 1, 3]]
});

condition.equivalenceList.push({
        name: "dist_or_and2",
        rule: [["and", "or", 1, 2, "or", 1, 3], ["or", 1, "and", 2, 3]]
});

condition.equivalenceList.push({
        name: "dbl_neg",
        rule: [["not", "not", 1], [1]]
});

condition.equivalenceList.push({
        name: "dbl_neg2",
        rule: [[1], ["not", "not", 1]]
});

condition.equivalenceList.push({
        name: "demorg_and",
        rule: [["and", "not", 1, "not", 2], ["not", "or", 1, 2]]
});

condition.equivalenceList.push({
        name: "demorg_and2",
        rule: [["not", "or", 1, 2], ["and", "not", 1, "not", 2]]
});

condition.equivalenceList.push({
        name: "demorg_or",
        rule: [["or", "not", 1, "not", 2], ["not", "and", 1, 2]]
});

condition.equivalenceList.push({
        name: "demorg_or2",
        rule: [["not", "and", 1, 2], ["or", "not", 1, "not", 2]]
});

condition.equivalenceList.push({
        name: "if_or",
        rule: [["if", 1, 2], ["or", "not", 1, 2]]
});

condition.equivalenceList.push({
        name: "or_if",
        rule: [["or", 1, 2], ["if", "not", 1, 2]]
});

condition.equivalenceList.push({
        name: "contrapos",
        rule: [["if", 1, 2], ["if", "not", 2, "not", 1]]
});

condition.equivalenceList.push({
        name: "contrapos2",
        rule: [["if", "not", 2, "not", 1], ["if", 1, 2]]
});

condition.equivalenceList.push({
        name: "ponens",
        rule: [["if", "T", 1], [1]]
});

condition.equivalenceList.push({
        name: "ponens2",
        rule: [[1], ["if", "T", 1]]
});

condition.equivalenceList.push({
        name: "contra",
        rule: [["if", 1, "F"], ["not", 1]]
});

condition.equivalenceList.push({
        name: "contra2",
        rule: [["not", 1], ["if", 1, "F"]]
});

condition.equivalenceList.push({
        name: "true_false",
        rule: [["T"], ["not", "F"]]
});

condition.equivalenceList.push({
        name: "true_false2",
        rule: [["F"], ["not", "T"]]
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

function getImage(funcName) {
    for (var i = 0; i < condition.predList.length; i++) {
        if (condition.predList[i].predName == funcName)
            return condition.predList[i].image;
    }
    return false;
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

function verify(statement, index, evidence) {
    var subtree = getSubtree(statement, index);
    var presub = statement.slice(0, index);
    var postsub = statement.slice(index + subtree.length);
    
    if (!equals(subtree, evidence))
        return false;
    
    return presub.concat(["T"]).concat(postsub);
}

function tautology(statement, index, evidence) {
    var subtree = getSubtree(statement, index);
    var presub = statement.slice(0, index);
    var postsub = statement.slice(index + subtree.length);
    
    if (!equals(subtree, ["T"]))
        return false;
    
    return presub.concat(evidence).concat(postsub);
}

allStatements = [];

function addStatement(cmd, statement) {
    allStatements.push(statement);
    document.getElementById("statementList").innerHTML += ("\t\t(" + cmd + ")\n" + allStatements.length + ". " + toString(statement) + "\n");
    
    $("#mainList").append("<div id=\"statement" + allStatements.length + "\"></div>");
    $("#statement" + allStatements.length).click(clickStatement);
    $("#statement" + allStatements.length).data("index", allStatements.length);
    addStatementImages($("#statement" + allStatements.length), statement, "statement" + allStatements.length, allStatements.length, 50, false);
    $("#mainList").append("<br /><br />");
    $("#mainList").scrollTop($("#mainList")[0].scrollHeight);
}

function executeCommand(cmdStr) {
    var cmd = parseStatement(cmdStr);
    
    if (cmd.length < 1)
        return false;
    
    switch (cmd[0]) {
    case "premise":
        addStatement(cmdStr, cmd.slice(1));
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
        addStatement(cmdStr, res);
        return true;
    case "conjoin":
        if (cmd.length < 3)
            return false;
        if (cmd[1] < 1 || allStatements.length < cmd[1])
            return false;
        if (cmd[2] < 1 || allStatements.length < cmd[2])
            return false;
        addStatement(cmdStr, conjoin(allStatements[cmd[1]-1], allStatements[cmd[2]-1]));
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
        addStatement(cmdStr, res);
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
        addStatement(cmdStr, res);
        return true;
    case "verify":
        if (cmd.length < 4)
            return false;
        if (cmd[1] < 1 || allStatements.length < cmd[1])
            return false;
        if (cmd[3] < 1 || allStatements.length < cmd[3])
            return false;
        var res = verify(allStatements[cmd[1]-1], cmd[2], allStatements[cmd[3]-1]);
        if (!res)
            return false;
        addStatement(cmdStr, res);
        return true;
    case "tautology":
        if (cmd.length < 4)
            return false;
        if (cmd[1] < 1 || allStatements.length < cmd[1])
            return false;
        if (cmd[3] < 1 || allStatements.length < cmd[3])
            return false;
        var res = tautology(allStatements[cmd[1]-1], cmd[2], allStatements[cmd[3]-1]);
        if (!res)
            return false;
        addStatement(cmdStr, res);
        return true;
    default:
        return false;
    }
}

function addStatementImages(dom, statement, prefix, statementIndex, size, useVar) {
    for (var i = 0; i < statement.length; i++) {
        var imgName;
        if (isNaN(statement[i]))
            imgName = getImage(statement[i]);
        else if (useVar)
            imgName = "var" + statement[i] + ".png";
        else
            imgName = "prim" + statement[i] + ".png";
        dom.append("<img src=\"" + imgName + "\" width=" + size + " height=" + size + " id=\"" + prefix + "_" + i + "\" />");
        $("#" + prefix + "_" + i).data("index", i);
        $("#" + prefix + "_" + i).data("statementIndex", statementIndex);
        $("#" + prefix + "_" + i).click(clickPiece);
    }
}

function selectStatement(dom) {
    dom.css("background-color","ccffff");
    dom.data("selected", true);
}

function deselectStatement(dom) {
    dom.css("background-color","");
    dom.data("selected", false);
}

function clearSelection() {
    for (var i = 0; i < window.selected.length; i++) {
        deselectStatement(window.selected[i]);
    }
    window.selected = [];
    if (typeof(window.selectedPiece) != "undefined")
        deselectStatement(window.selectedPiece);
    delete window.selectedPiece;
    if (typeof(window.selectedRule) != "undefined")
        deselectStatement(window.selectedRule);
    delete window.selectedRule;
}

function finishTool() {
    clearSelection();
    window.maxSelected = 0;
    window.selectPiece = false;
    window.tool = "none";
}

function clickStatement() {
    if ($(this).data("selected"))
        return;
    if (typeof(window.selected[0]) != "undefined" && window.selectPiece)
        return;
    if (window.maxSelected > 0) {
        if (typeof(window.selected[0]) != "undefined")
            deselectStatement(window.selected[0]);
        for (var i = 1; i < window.maxSelected; i++)
            window.selected[i-1] = window.selected[i];
        window.selected[window.maxSelected - 1] = $(this);
        selectStatement($(this));
    }
    
    checkToolComplete();
}

function clickPiece() {
    if ($(this).data("statementIndex") < 1)
        return;
    if (!window.selectPiece)
        return;
    if (window.maxSelected > 0 && typeof(window.selected[0]) == "undefined")
        return;
    if (typeof(window.selectedPiece) != "undefined")
        deselectStatement(window.selectedPiece);
    
    window.selectedPiece = $(this);
    selectStatement($(this));
    
    checkToolComplete();
}

function checkToolComplete() {
    switch (window.tool) {
    case "none":
        return true;
    case "ponens":
        if (typeof(window.selected[0]) != "undefined") {
            var st1, st2;
            st1 = allStatements[window.selected[0].data("index")-1];
            st2 = allStatements[window.selected[1].data("index")-1];
            var res = ponens(st1, st2);
            if (!res)
                res = ponens(st2, st1);
            if (!res)
                return false;
            addStatement("<tool>", res);
            finishTool();
            return true;
        }
        return false;
    case "conjoin":
        if (typeof(window.selected[0]) != "undefined") {
            var st1, st2;
            st1 = allStatements[window.selected[0].data("index")-1];
            st2 = allStatements[window.selected[1].data("index")-1];
            var res = conjoin(st1, st2);
            if (!res)
                return false;
            addStatement("<tool>", res);
            finishTool();
            return true;
        }
        return false;
    case "verify":
        if (typeof(window.selected[0]) != "undefined" && typeof(window.selectedPiece) != "undefined") {
            var st1, st2, pieceIndex;
            st1 = allStatements[window.selected[0].data("index")-1];
            st2 = allStatements[window.selectedPiece.data("statementIndex")-1];
            pieceIndex = window.selectedPiece.data("index");
            finishTool();
            var res = verify(st2, pieceIndex, st1);
            if (!res)
                return false;
            addStatement("<tool>", res);
            return true;
        }
        return false;
    case "tautology":
        if (typeof(window.selected[0]) != "undefined" && typeof(window.selectedPiece) != "undefined") {
            var st1, st2, pieceIndex;
            st1 = allStatements[window.selected[0].data("index")-1];
            st2 = allStatements[window.selectedPiece.data("statementIndex")-1];
            pieceIndex = window.selectedPiece.data("index");
            finishTool();
            var res = tautology(st2, pieceIndex, st1);
            if (!res)
                return false;
            addStatement("<tool>", res);
            return true;
        }
        return false;
    case "rewrite":
        if (typeof(window.selectedPiece) != "undefined" && typeof(window.selectedRule) != "undefined") {
            var st, pieceIndex;
            st = allStatements[window.selectedPiece.data("statementIndex")-1];
            pieceIndex = window.selectedPiece.data("index");
            var rule = false;
            for (var i = 0; i < condition.equivalenceList.length; i++) {
                if (condition.equivalenceList[i].name == window.selectedRule.data("rule"))
                    rule = condition.equivalenceList[i].rule;
            }
            if (!rule)
                return false;
            var res = rewrite(st, pieceIndex, rule);
            if (!res)
                return false;
            addStatement("<tool>", res);
            finishTool();
            return true;
        }
        return false;
    }
}

function clickRule() {
    if (window.tool != "none")
        finishTool();
    
    window.tool = "rewrite";
    window.maxSelected = 0;
    window.selectPiece = true;
    selectStatement($(this));
    window.selectedRule = $(this);
}

function clickAxiom() {
}

function setPonens() {
    if (window.tool != "none")
        finishTool();
    
    window.tool = "ponens";
    window.maxSelected = 2;
    window.selectPiece = false;
}

function setConjoin() {
    if (window.tool != "none")
        finishTool();
    
    window.tool = "conjoin";
    window.maxSelected = 2;
    window.selectPiece = false;
}

function setVerify() {
    if (window.tool != "none")
        finishTool();
    
    window.tool = "verify";
    window.maxSelected = 1;
    window.selectPiece = true;
}

function setTautology() {
    if (window.tool != "none")
        finishTool();
    
    window.tool = "tautology";
    window.maxSelected = 1;
    window.selectPiece = true;
}

function OnLoad() {
    window.selected = [];
    window.maxSelected = 0;
    window.selectPiece = false;
    window.tool = "none";
    
    for (var i = 0; i < condition.equivalenceList.length; i++) {
        var name = condition.equivalenceList[i].name;
        
        $("#rewriteRules").append("<div id=\"rr_" + name + "\"></div>");
        $("#rr_" + name).click(clickRule);
        $("#rr_" + name).data("rule", name);
        addStatementImages($("#rr_" + name), condition.equivalenceList[i].rule[0], "rr_" + name, -1, 25, true);
        $("#rr_" + name).append("<img src=\"arrow.png\" width=50 height=25 />");
        addStatementImages($("#rr_" + name), condition.equivalenceList[i].rule[1], "rr_" + name, -1, 25, true);
        $("#rewriteRules").append("<br />");
    }
    
    for (var i = 0; i < condition.axiomList.length; i++) {
        var name = condition.axiomList[i].name;
        
        $("#specifyAxioms").append("<div id=\"ax_" + name + "\"></div>");
        $("#ax_" + name).click(clickAxiom);
        $("#ax_" + name).data("axiom", name);
        addStatementImages($("#ax_" + name), condition.axiomList[i].axiom, "ax_" + name, -1, 25, true);
        $("#specifyAxioms").append("<br />");
    }
    
    $("#specifyAxioms").hide();
    $("#rewriteRules").hide();
    $("#debugConsole").hide();
}

function tabTools() {
    $("#otherTools").show();
    $("#specifyAxioms").hide();
    $("#rewriteRules").hide();
    $("#debugConsole").hide();
}

function tabAxioms() {
    $("#otherTools").hide();
    $("#specifyAxioms").show();
    $("#rewriteRules").hide();
    $("#debugConsole").hide();
}

function tabRules() {
    $("#otherTools").hide();
    $("#specifyAxioms").hide();
    $("#rewriteRules").show();
    $("#debugConsole").hide();
}

function tabDebug() {
    $("#otherTools").hide();
    $("#specifyAxioms").hide();
    $("#rewriteRules").hide();
    $("#debugConsole").show();
}

// Popup stuff
function overlay() {
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

