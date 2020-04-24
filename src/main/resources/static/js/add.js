(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add"],{

<<<<<<< HEAD
/***/ "./asset_sources/js/add.js":
/*!*********************************!*\
  !*** ./asset_sources/js/add.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");

function addPhoto() {
  var form = document.getElementById('form-file-upload');
  var photoInput = document.getElementById('photo');
  var photoError = document.getElementById('upload-error');
  var data = new FormData(form);
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      var json = JSON.parse(request.responseText);

      if (request.status == 200) {
        photoError.style.display = 'none';
        photoInput.value = json.file;
      } else {
        photoError.textContent = json.error;
        photoError.style.display = 'block';
      }
    }
  };

  request.open(form.method, form.action);
  request.send(data);
}

function addLink() {
  // Get the element
  var count = document.querySelectorAll('#links input') ? document.querySelectorAll('#links input').length : 0;
  ;
  var elem = document.querySelector('#links').firstElementChild;
  var markup = "\n\t<div class=\"form-group row\">\n\t\t<div class=\"col-sm-10\">\n\t\t\t\n\t\t\t<select id=\"externalLinks".concat(count, ".type\" name=\"externalLinks[").concat(count, "].type\">\n\t\t\t\t<option value=\"Deliveroo\" selected=\"selected\">Deliveroo</option>\n\t\t\t\t<option value=\"Uber Eat\">Uber Eat</option>\n\t\t\t\t<option value=\"Just-Eat\">Just-Eat</option>\n\t\t\t</select>\n\t\t</div>\n\n\t\t<label for=\"fullName\" class=\"col-sm-2 col-form-label\">Url </label>\n\t\t<div class=\"col-sm-10\">\n\t\t\t<input type=\"text\" name=\"externalLinks[").concat(count, "].url\" id=\"externalLinks").concat(count, ".url\" value=\"\">\n\t\t</div>\n\t");
  var newLinkElem = document.createElement('div');
  newLinkElem.innerHTML = markup; // Inject it into the DOM

  elem.before(newLinkElem);
}

function addCookType() {
  // Get the element
  var countCookType = document.querySelectorAll('#cookTypes input') ? document.querySelectorAll('#cookTypes input').length : 0;
  var elem = document.querySelector('#cookTypes');
  var selected = document.querySelector('#formCookType');
  var selectedValue = selected.options[selected.selectedIndex].value;
  var markup = "\n\t\t<input type=\"text\" name=\"cookTypes[".concat(countCookType, "].name\" readonly=\"\" id=\"cookTypes").concat(countCookType, ".name\" value=\"").concat(selectedValue, "\">\n\t");
  var newLinkElem = document.createElement('div');
  newLinkElem.innerHTML = markup; // Inject it into the DOM

  var child = elem.appendChild(newLinkElem.firstElementChild);
}

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.concat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.concat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ })

},[["./asset_sources/js/add.js","runtime","vendors~add~layout"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldF9zb3VyY2VzL2pzL2FkZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyJdLCJuYW1lcyI6WyJhZGRQaG90byIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGhvdG9JbnB1dCIsInBob3RvRXJyb3IiLCJkYXRhIiwiRm9ybURhdGEiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwianNvbiIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1cyIsInN0eWxlIiwiZGlzcGxheSIsInZhbHVlIiwiZmlsZSIsInRleHRDb250ZW50IiwiZXJyb3IiLCJvcGVuIiwibWV0aG9kIiwiYWN0aW9uIiwic2VuZCIsImFkZExpbmsiLCJjb3VudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJlbGVtIiwicXVlcnlTZWxlY3RvciIsImZpcnN0RWxlbWVudENoaWxkIiwibWFya3VwIiwibmV3TGlua0VsZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYmVmb3JlIiwiYWRkQ29va1R5cGUiLCJjb3VudENvb2tUeXBlIiwic2VsZWN0ZWQiLCJzZWxlY3RlZFZhbHVlIiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJjaGlsZCIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLFNBQVNBLFFBQVQsR0FBbUI7QUFHVixNQUFJQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixrQkFBeEIsQ0FBWDtBQUNBLE1BQUlDLFVBQVUsR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQWpCO0FBQ0EsTUFBSUUsVUFBVSxHQUFHSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBakI7QUFFQSxNQUFJRyxJ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L0MsZUFBZSxtQkFBTyxDQUFDLDZFQUF3QjtBQUMvQyxxQkFBcUIsbUJBQU8sQ0FBQyx5RkFBOEI7QUFDM0QseUJBQXlCLG1CQUFPLENBQUMsbUdBQW1DO0FBQ3BFLG1DQUFtQyxtQkFBTyxDQUFDLDJIQUErQztBQUMxRixzQkFBc0IsbUJBQU8sQ0FBQyw2RkFBZ0M7QUFDOUQsaUJBQWlCLG1CQUFPLENBQUMsNkZBQWdDOztBQUV6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRywrQ0FBK0M7QUFDbEQsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFlBQVk7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImpzL2FkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZnVuY3Rpb24gYWRkUGhvdG8oKXtcblx0XG5cblx0ICAgICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWZpbGUtdXBsb2FkJylcblx0ICAgICAgICB2YXIgcGhvdG9JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG90bycpXG5cdCAgICAgICAgdmFyIHBob3RvRXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBsb2FkLWVycm9yJylcblx0ICAgIFxuXHQgICAgICAgIHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pXG5cdCAgICAgICAgXG5cdCAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXHQgICAgICAgIFxuXHQgICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcblx0ICAgICAgICBcdCBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG5cdCAgICAgICAgXHRcdCBcblx0ICAgICAgICBcdFx0IFxuXHQgICAgICAgIFx0XHQgdmFyIGpzb24gPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcblx0ICAgICAgICBcdFx0IGlmKHJlcXVlc3Quc3RhdHVzID09IDIwMCl7XG5cdCAgICAgICAgXHRcdFx0IHBob3RvRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0ICAgICAgICBcdFx0XHQgcGhvdG9JbnB1dC52YWx1ZSA9IGpzb24uZmlsZTtcblx0ICAgICAgICBcdFx0IH1lbHNle1xuXHQgICAgICAgIFx0XHRcdCBwaG90b0Vycm9yLnRleHRDb250ZW50ID0ganNvbi5lcnJvcjtcblx0ICAgICAgICBcdFx0XHQgXG5cdCAgICAgICAgXHRcdFx0IHBob3RvRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdCAgICAgICAgXHRcdCB9IFxuXHQgICAgICAgIFx0XHQgXG5cdCAgICAgICAgXHQgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBcblx0ICAgICAgICByZXF1ZXN0Lm9wZW4oZm9ybS5tZXRob2QsIGZvcm0uYWN0aW9uKVxuXHQgICAgICAgIHJlcXVlc3Quc2VuZChkYXRhKVxufVxuXG5cbmZ1bmN0aW9uIGFkZExpbmsoKXtcblx0Ly8gR2V0IHRoZSBlbGVtZW50XG5cdHZhciBjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNsaW5rcyBpbnB1dCcpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2xpbmtzIGlucHV0JykubGVuZ3RoIDogMDs7XG5cdHZhciBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpbmtzJykuZmlyc3RFbGVtZW50Q2hpbGRcblx0XG5cdHZhciBtYXJrdXA9IGBcblx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcm93XCI+XG5cdFx0PGRpdiBjbGFzcz1cImNvbC1zbS0xMFwiPlxuXHRcdFx0XG5cdFx0XHQ8c2VsZWN0IGlkPVwiZXh0ZXJuYWxMaW5rcyR7Y291bnR9LnR5cGVcIiBuYW1lPVwiZXh0ZXJuYWxMaW5rc1ske2NvdW50fV0udHlwZVwiPlxuXHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiRGVsaXZlcm9vXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPkRlbGl2ZXJvbzwvb3B0aW9uPlxuXHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiVWJlciBFYXRcIj5VYmVyIEVhdDwvb3B0aW9uPlxuXHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiSnVzdC1FYXRcIj5KdXN0LUVhdDwvb3B0aW9uPlxuXHRcdFx0PC9zZWxlY3Q+XG5cdFx0PC9kaXY+XG5cblx0XHQ8bGFiZWwgZm9yPVwiZnVsbE5hbWVcIiBjbGFzcz1cImNvbC1zbS0yIGNvbC1mb3JtLWxhYmVsXCI+VXJsIDwvbGFiZWw+XG5cdFx0PGRpdiBjbGFzcz1cImNvbC1zbS0xMFwiPlxuXHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImV4dGVybmFsTGlua3NbJHtjb3VudH1dLnVybFwiIGlkPVwiZXh0ZXJuYWxMaW5rcyR7Y291bnR9LnVybFwiIHZhbHVlPVwiXCI+XG5cdFx0PC9kaXY+XG5cdGA7XG5cblx0dmFyIG5ld0xpbmtFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdG5ld0xpbmtFbGVtLmlubmVySFRNTD0gbWFya3VwO1xuXHQvLyBJbmplY3QgaXQgaW50byB0aGUgRE9NXG5cdGVsZW0uYmVmb3JlKG5ld0xpbmtFbGVtKTtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZENvb2tUeXBlKCl7XG5cdC8vIEdldCB0aGUgZWxlbWVudFxuXHR2YXIgY291bnRDb29rVHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb29rVHlwZXMgaW5wdXQnKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb29rVHlwZXMgaW5wdXQnKS5sZW5ndGggOiAwO1xuXHRcblx0dmFyIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29va1R5cGVzJyk7XG5cdHZhciBzZWxlY3RlZD0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm1Db29rVHlwZScpO1xuXHR2YXIgc2VsZWN0ZWRWYWx1ZT1zZWxlY3RlZC5vcHRpb25zW3NlbGVjdGVkLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuXHRcblx0dmFyIG1hcmt1cD0gYFxuXHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjb29rVHlwZXNbJHtjb3VudENvb2tUeXBlfV0ubmFtZVwiIHJlYWRvbmx5PVwiXCIgaWQ9XCJjb29rVHlwZXMke2NvdW50Q29va1R5cGV9Lm5hbWVcIiB2YWx1ZT1cIiR7c2VsZWN0ZWRWYWx1ZX1cIj5cblx0YDtcblxuXHR2YXIgbmV3TGlua0VsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bmV3TGlua0VsZW0uaW5uZXJIVE1MPSBtYXJrdXA7XG5cdC8vIEluamVjdCBpdCBpbnRvIHRoZSBET01cblx0XG5cdHZhciBjaGlsZCA9IGVsZW0uYXBwZW5kQ2hpbGQobmV3TGlua0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFID0gd2VsbEtub3duU3ltYm9sKCdpc0NvbmNhdFNwcmVhZGFibGUnKTtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gMHgxRkZGRkZGRkZGRkZGRjtcbnZhciBNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkJztcblxuLy8gV2UgY2FuJ3QgdXNlIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4vLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3OVxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgPSBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBhcnJheVtJU19DT05DQVRfU1BSRUFEQUJMRV0gPSBmYWxzZTtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCgpWzBdICE9PSBhcnJheTtcbn0pO1xuXG52YXIgU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnY29uY2F0Jyk7XG5cbnZhciBpc0NvbmNhdFNwcmVhZGFibGUgPSBmdW5jdGlvbiAoTykge1xuICBpZiAoIWlzT2JqZWN0KE8pKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzcHJlYWRhYmxlID0gT1tJU19DT05DQVRfU1BSRUFEQUJMRV07XG4gIHJldHVybiBzcHJlYWRhYmxlICE9PSB1bmRlZmluZWQgPyAhIXNwcmVhZGFibGUgOiBpc0FycmF5KE8pO1xufTtcblxudmFyIEZPUkNFRCA9ICFJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUIHx8ICFTUEVDSUVTX1NVUFBPUlQ7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29uY2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5jb25jYXRcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBpc0NvbmNhdFNwcmVhZGFibGUgYW5kIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgY29uY2F0OiBmdW5jdGlvbiBjb25jYXQoYXJnKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBBID0gYXJyYXlTcGVjaWVzQ3JlYXRlKE8sIDApO1xuICAgIHZhciBuID0gMDtcbiAgICB2YXIgaSwgaywgbGVuZ3RoLCBsZW4sIEU7XG4gICAgZm9yIChpID0gLTEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgRSA9IGkgPT09IC0xID8gTyA6IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmIChpc0NvbmNhdFNwcmVhZGFibGUoRSkpIHtcbiAgICAgICAgbGVuID0gdG9MZW5ndGgoRS5sZW5ndGgpO1xuICAgICAgICBpZiAobiArIGxlbiA+IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgbGVuOyBrKyssIG4rKykgaWYgKGsgaW4gRSkgY3JlYXRlUHJvcGVydHkoQSwgbiwgRVtrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobiA+PSBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkoQSwgbisrLCBFKTtcbiAgICAgIH1cbiAgICB9XG4gICAgQS5sZW5ndGggPSBuO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
=======
function addPhoto(){
	

	        var form = document.getElementById('form-file-upload')
	        var photoInput = document.getElementById('photo')
	        var photoError = document.getElementById('upload-error')
	    
	        var data = new FormData(form)
	        
	        var request = new XMLHttpRequest()
	        
	        request.onreadystatechange = function(){
	        	 if (request.readyState === 4) {
	        		 
	        		 
	        		 var json = JSON.parse(request.responseText);
	        		 if(request.status == 200){
	        			 photoError.style.display = 'none';
	        			 photoInput.value = json.file;
	        		 }else{
	        			 photoError.textContent = json.error;
	        			 
	        			 photoError.style.display = 'block';
	        		 } 
	        		 
	        	 }
	        }
	        
	        request.open(form.method, form.action)
	        request.send(data)
}


function addLink(){
	// Get the element
	var count = document.querySelectorAll('#links input') ? document.querySelectorAll('#links input').length : 0;;
	var elem = document.querySelector('#links').firstElementChild
	
	var markup= `
	<div class="form-group row">
		<div class="col-sm-10">
			
			<select id="externalLinks${count}.type" name="externalLinks[${count}].type">
				<option value="Deliveroo" selected="selected">Deliveroo</option>
				<option value="Uber Eat">Uber Eat</option>
				<option value="Just-Eat">Just-Eat</option>
			</select>
		</div>

		<label for="fullName" class="col-sm-2 col-form-label">Url </label>
		<div class="col-sm-10">
			<input type="text" name="externalLinks[${count}].url" id="externalLinks${count}.url" value="">
		</div>
	`;

	var newLinkElem = document.createElement('div');
	newLinkElem.innerHTML= markup;
	// Inject it into the DOM
	elem.before(newLinkElem);

}


function addCookType(){
	// Get the element
	var countCookType = document.querySelectorAll('#cookTypes input') ? document.querySelectorAll('#cookTypes input').length : 0;
	
	var elem = document.querySelector('#cookTypes');
	var selected= document.querySelector('#formCookType');
	var selectedValue=selected.options[selected.selectedIndex].value;
	
	var markup= `
		<input type="text" name="cookTypes[${countCookType}].name" readonly="" id="cookTypes${countCookType}.name" value="${selectedValue}">
	`;

	var newLinkElem = document.createElement('div');
	newLinkElem.innerHTML= markup;
	// Inject it into the DOM
	
	var child = elem.appendChild(newLinkElem.firstElementChild);

}
>>>>>>> 4688f0def2baa2da9d530c02b556aea421cee95a
