Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var createObject = function (o) {
  function F() {}
  F.prototype = o;
  return new F();
};

var TopicLibrary = function () {
	this.topicLibrary = {};
};

TopicLibrary.prototype.addTopic = function(topicName, topic) {
	if(!(topicName in this.topicLibrary)) {
		this.topicLibrary[topicName] = topic;
	}
	return;
};

TopicLibrary.prototype.getTopic = function(topicName) {
	if(topicName in this.topicLibrary) {
		return this.topicLibrary[topicName];
	}
	return null;
};

var Topic = function (name) {
	var that = createObject(Topic.prototype);
	that.topicName = name;
	that.statementSet = {};
	that.implicationSet= {};

	that.addStatement = function (statement) {
		var currStatements = Object.size(that.statementSet);
		var statementKey = "S" + (currStatements + 1);
		that.statementSet[statementKey] = statement;
		return;
	};

	that.getStatement = function (sKey) {
		if(sKey in that.statementSet) {
			return that.statementSet[sKey];
		}
		return null;
	};

	that.addImplication = function (imp) {
		var currImps = Object.size(that.implicationSet);
		var impKey = "I" + (currImps + 1);
		that.implicationSet[impKey] = imp;
		return;
	};

	that.getImplication = function (iKey) {
		if(iKey in that.implicationSet) {
			return that.implicationSet[iKey];
		}
		return null;
	};

	function getRandomStatement() {
		var currStatements = Object.size(that.statementSet);
		var randomIndex = Math.floor(Math.random() * currStatements) + 1;
		return that.getStatement("S" + randomIndex);
	}

	function getRandomImplication () {
		var currImps = Object.size(that.implicationSet);
		var randomIndex = Math.floor(Math.random() * currImps) + 1;
		return that.getImplication("I" + randomIndex);
	}

	that.getNextTerm = function (given) {
		if(Object.size(given) < 1) {
			return getRandomStatement();
		} else {
			var chance = Math.random();
			if(chance < 0.5) {
				return getRandomStatement();
			} else {
				return getRandomImplication();
			}
		}
	};

	that.readStatementAndImplicationSetFromFile = function (filename) {
		
	};

	return that;
};

var Implication = function (topic, ant, cons, setAntBool, setConsBool) {
	var that = createObject(Implication.prototype);
	that.topic = topic;
	that.ant = ant;
	that.cons = cons;
	that.antBool = setAntBool;
	that.consBool = setConsBool;
	return that;
};

Implication.prototype.getAntecedentStatement = function() {
	return this.topic.getStatement(this.ant);
};

Implication.prototype.getConsequentStatement = function() {
	return this.topic.getStatement(this.cons);
};

Implication.prototype.toString = function() {
	return this.getAntecedentStatement() + " -> " + this.getConsequentStatement();
};

var tLib = new TopicLibrary();
var topic1 = new Topic("test topic");
var topic2 = new Topic("test topic 2");

topic1.addStatement("Statement 1");
topic1.addStatement("Statement 2");
topic1.addStatement("Statement 3");

topic2.addStatement("Statement 4");
topic2.addStatement("Statement 5");
topic2.addStatement("Statement 6");

var i1 = new Implication(topic1, "S1", "S2", true, true);
var i2 = new Implication(topic1, "S2", "S3", true, false);
var i3 = new Implication(topic2, "S4", "S5", false, true);
var i4 = new Implication(topic2, "S5", "S6", false, false);

topic1.addImplication(i1);
topic1.addImplication(i2);
topic2.addImplication(i3);
topic2.addImplication(i4);

tLib.addTopic("T1", topic1);
tLib.addTopic("T2", topic2);

var given = {'S1' : "Statement 1"};

var nextTerm = topic1.getNextTerm(given);
if((typeof nextTerm) == "object") {
	console.log(nextTerm.toString());
} else {
	console.log(nextTerm);
}








