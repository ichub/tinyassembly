(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Register = function () {
    function Register() {
        _classCallCheck(this, Register);

        this._value = 0;
    }

    _createClass(Register, [{
        key: "incrementAndReturn",
        value: function incrementAndReturn() {
            this._value += 1;
            this.ensureOverflow();
            return this._value;
        }
    }, {
        key: "ensureOverflow",
        value: function ensureOverflow() {
            this._value = Math.abs(this._value) % (Register.maxValue + 1);
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        }
    }], [{
        key: "maxValue",
        get: function get() {
            return Math.pow(2, 16) - 1;
        }
    }]);

    return Register;
}();

exports.Register = Register;
},{}]},{},[1])