(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CPU = function () {
    function CPU(ram) {
        _classCallCheck(this, CPU);

        this._ram = ram;
    }

    _createClass(CPU, [{
        key: "step",
        value: function step() {
            var currentInstruction = this._registers.IP.value;
        }
    }, {
        key: "executeInstruction",
        value: function executeInstruction(instruction) {}
    }, {
        key: "registers",
        get: function get() {
            return this._registers;
        }
    }]);

    return CPU;
}();

exports.CPU = CPU;
console.log("it works!");
},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cpu_1 = require("./cpu");
var ram_1 = require("./ram");

var Computer = function () {
    function Computer() {
        _classCallCheck(this, Computer);

        this._ram = new ram_1.RAM();
        this._cpu = new cpu_1.CPU(this._ram);
    }

    _createClass(Computer, [{
        key: "cpu",
        get: function get() {
            return this._cpu;
        }
    }]);

    return Computer;
}();

exports.Computer = Computer;
},{"./cpu":1,"./ram":3}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RAM = function () {
    function RAM() {
        _classCallCheck(this, RAM);

        this._memory = Array.from(new Array(RAM.size), function () {
            return 0;
        });
    }

    _createClass(RAM, [{
        key: "memory",
        get: function get() {
            return this._memory;
        }
    }], [{
        key: "size",
        get: function get() {
            return Math.pow(2, 10);
        }
    }]);

    return RAM;
}();

exports.RAM = RAM;
},{}]},{},[2])