(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add"],{

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

function addContact() {
  var form = document.getElementById('form-contact');
  var contactError = document.getElementById('form-contact-error');
  var data = new FormData(form);
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      var json = JSON.parse(request.responseText);

      if (request.status == 200) {
        contactError.style.display = 'none';
        photoInput.value = json.file;
      } else {
        contactError.textContent = json.error;
        contact.style.display = 'block';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldF9zb3VyY2VzL2pzL2FkZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyJdLCJuYW1lcyI6WyJhZGRQaG90byIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGhvdG9JbnB1dCIsInBob3RvRXJyb3IiLCJkYXRhIiwiRm9ybURhdGEiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwianNvbiIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1cyIsInN0eWxlIiwiZGlzcGxheSIsInZhbHVlIiwiZmlsZSIsInRleHRDb250ZW50IiwiZXJyb3IiLCJvcGVuIiwibWV0aG9kIiwiYWN0aW9uIiwic2VuZCIsImFkZENvbnRhY3QiLCJjb250YWN0RXJyb3IiLCJjb250YWN0IiwiYWRkTGluayIsImNvdW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImVsZW0iLCJxdWVyeVNlbGVjdG9yIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJtYXJrdXAiLCJuZXdMaW5rRWxlbSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJiZWZvcmUiLCJhZGRDb29rVHlwZSIsImNvdW50Q29va1R5cGUiLCJzZWxlY3RlZCIsInNlbGVjdGVkVmFsdWUiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsImNoaWxkIiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsU0FBU0EsUUFBVCxHQUFtQjtBQUdWLE1BQUlDLElBQUksR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLGtCQUF4QixDQUFYO0FBQ0EsTUFBSUMsVUFBVSxHQUFHRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBakI7QUFDQSxNQUFJRSxVQUFVLEdBQUdILFFBQVEsQ0FB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QUFPLENBQUMsMkhBQStDO0FBQzFGLHNCQUFzQixtQkFBTyxDQUFDLDZGQUFnQztBQUM5RCxpQkFBaUIsbUJBQU8sQ0FBQyw2RkFBZ0M7O0FBRXpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLCtDQUErQztBQUNsRCxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsWUFBWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoianMvYWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiBhZGRQaG90bygpe1xuXHRcblxuXHQgICAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tZmlsZS11cGxvYWQnKVxuXHQgICAgICAgIHZhciBwaG90b0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob3RvJylcblx0ICAgICAgICB2YXIgcGhvdG9FcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWQtZXJyb3InKVxuXHQgICAgXG5cdCAgICAgICAgdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcblx0ICAgICAgICBcblx0ICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cdCAgICAgICAgXG5cdCAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuXHQgICAgICAgIFx0IGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcblx0ICAgICAgICBcdFx0IFxuXHQgICAgICAgIFx0XHQgXG5cdCAgICAgICAgXHRcdCB2YXIganNvbiA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXHQgICAgICAgIFx0XHQgaWYocmVxdWVzdC5zdGF0dXMgPT0gMjAwKXtcblx0ICAgICAgICBcdFx0XHQgcGhvdG9FcnJvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHQgICAgICAgIFx0XHRcdCBwaG90b0lucHV0LnZhbHVlID0ganNvbi5maWxlO1xuXHQgICAgICAgIFx0XHQgfWVsc2V7XG5cdCAgICAgICAgXHRcdFx0IHBob3RvRXJyb3IudGV4dENvbnRlbnQgPSBqc29uLmVycm9yO1xuXHQgICAgICAgIFx0XHRcdCBcblx0ICAgICAgICBcdFx0XHQgcGhvdG9FcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0ICAgICAgICBcdFx0IH0gXG5cdCAgICAgICAgXHRcdCBcblx0ICAgICAgICBcdCB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIFxuXHQgICAgICAgIHJlcXVlc3Qub3Blbihmb3JtLm1ldGhvZCwgZm9ybS5hY3Rpb24pXG5cdCAgICAgICAgcmVxdWVzdC5zZW5kKGRhdGEpXG59XG5cblxuZnVuY3Rpb24gYWRkQ29udGFjdCgpe1xuXHRcblxuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tY29udGFjdCcpXG4gICAgdmFyIGNvbnRhY3RFcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWNvbnRhY3QtZXJyb3InKVxuXG4gICAgdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcbiAgICBcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIFx0IGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICBcdFx0IFxuICAgIFx0XHQgXG4gICAgXHRcdCB2YXIganNvbiA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgIFx0XHQgaWYocmVxdWVzdC5zdGF0dXMgPT0gMjAwKXtcbiAgICBcdFx0XHQgY29udGFjdEVycm9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgXHRcdFx0IHBob3RvSW5wdXQudmFsdWUgPSBqc29uLmZpbGU7XG4gICAgXHRcdCB9ZWxzZXtcbiAgICBcdFx0XHQgY29udGFjdEVycm9yLnRleHRDb250ZW50ID0ganNvbi5lcnJvcjtcbiAgICBcdFx0XHQgY29udGFjdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBcdFx0IH0gXG4gICAgXHRcdCBcbiAgICBcdCB9XG4gICAgfVxuICAgIFxuICAgIHJlcXVlc3Qub3Blbihmb3JtLm1ldGhvZCwgZm9ybS5hY3Rpb24pXG4gICAgcmVxdWVzdC5zZW5kKGRhdGEpXG59XG5cblxuZnVuY3Rpb24gYWRkTGluaygpe1xuXHQvLyBHZXQgdGhlIGVsZW1lbnRcblx0dmFyIGNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2xpbmtzIGlucHV0JykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbGlua3MgaW5wdXQnKS5sZW5ndGggOiAwOztcblx0dmFyIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGlua3MnKS5maXJzdEVsZW1lbnRDaGlsZFxuXHRcblx0dmFyIG1hcmt1cD0gYFxuXHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3dcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiY29sLXNtLTEwXCI+XG5cdFx0XHRcblx0XHRcdDxzZWxlY3QgaWQ9XCJleHRlcm5hbExpbmtzJHtjb3VudH0udHlwZVwiIG5hbWU9XCJleHRlcm5hbExpbmtzWyR7Y291bnR9XS50eXBlXCI+XG5cdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJEZWxpdmVyb29cIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+RGVsaXZlcm9vPC9vcHRpb24+XG5cdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJVYmVyIEVhdFwiPlViZXIgRWF0PC9vcHRpb24+XG5cdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJKdXN0LUVhdFwiPkp1c3QtRWF0PC9vcHRpb24+XG5cdFx0XHQ8L3NlbGVjdD5cblx0XHQ8L2Rpdj5cblxuXHRcdDxsYWJlbCBmb3I9XCJmdWxsTmFtZVwiIGNsYXNzPVwiY29sLXNtLTIgY29sLWZvcm0tbGFiZWxcIj5VcmwgPC9sYWJlbD5cblx0XHQ8ZGl2IGNsYXNzPVwiY29sLXNtLTEwXCI+XG5cdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZXh0ZXJuYWxMaW5rc1ske2NvdW50fV0udXJsXCIgaWQ9XCJleHRlcm5hbExpbmtzJHtjb3VudH0udXJsXCIgdmFsdWU9XCJcIj5cblx0XHQ8L2Rpdj5cblx0YDtcblxuXHR2YXIgbmV3TGlua0VsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0bmV3TGlua0VsZW0uaW5uZXJIVE1MPSBtYXJrdXA7XG5cdC8vIEluamVjdCBpdCBpbnRvIHRoZSBET01cblx0ZWxlbS5iZWZvcmUobmV3TGlua0VsZW0pO1xuXG59XG5cblxuZnVuY3Rpb24gYWRkQ29va1R5cGUoKXtcblx0Ly8gR2V0IHRoZSBlbGVtZW50XG5cdHZhciBjb3VudENvb2tUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2Nvb2tUeXBlcyBpbnB1dCcpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2Nvb2tUeXBlcyBpbnB1dCcpLmxlbmd0aCA6IDA7XG5cdFxuXHR2YXIgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb29rVHlwZXMnKTtcblx0dmFyIHNlbGVjdGVkPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybUNvb2tUeXBlJyk7XG5cdHZhciBzZWxlY3RlZFZhbHVlPXNlbGVjdGVkLm9wdGlvbnNbc2VsZWN0ZWQuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG5cdFxuXHR2YXIgbWFya3VwPSBgXG5cdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvb2tUeXBlc1ske2NvdW50Q29va1R5cGV9XS5uYW1lXCIgcmVhZG9ubHk9XCJcIiBpZD1cImNvb2tUeXBlcyR7Y291bnRDb29rVHlwZX0ubmFtZVwiIHZhbHVlPVwiJHtzZWxlY3RlZFZhbHVlfVwiPlxuXHRgO1xuXG5cdHZhciBuZXdMaW5rRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRuZXdMaW5rRWxlbS5pbm5lckhUTUw9IG1hcmt1cDtcblx0Ly8gSW5qZWN0IGl0IGludG8gdGhlIERPTVxuXHRcblx0dmFyIGNoaWxkID0gZWxlbS5hcHBlbmRDaGlsZChuZXdMaW5rRWxlbS5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbn0iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==