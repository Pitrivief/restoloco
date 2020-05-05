require('../scss/layout.scss');


import { and, comparison, eq, inList, } from "rsql-builder";
import autoComplete from '@tarekraafat/autocomplete.js/dist/js/autoComplete.min.js'

import App from "./App.js"


//**********************************************
// AUTOCOMPLETE to get user address
// Use controller route /map/geocode/?q=<Address> to get a list 
// When user pick an adddres set window.app.localisation (=> RestaurantApp.localisation)
//**********************************************

//autoComplete.js on typing event emitter
document.querySelector("#autoComplete").addEventListener("autoComplete", event => {
    //console.log(event);
});

// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
    data: {
        src: async () => {

            // Fetch External Data Source
            const query = document.querySelector("#autoComplete").value;
            if (query.length < 4) {
                document.querySelector('#autoComplete_wrapper .dropdown-content').classList.add('dropdown-hide');
                return [];
            }
            // Loading placeholder text
            document
                    .querySelector("#autoComplete")
                    .setAttribute("placeholder", "Loading...");
            const source = await fetch(
                    `/maps/geocode?q=${query}`
                    );
            const data = await source.json();

            document.querySelector('#autoComplete_wrapper .dropdown-content').classList.remove('dropdown-hide');
            // Post loading placeholder text
            document
                    .querySelector("#autoComplete")
                    .setAttribute("placeholder", "Saisissez une adresse");
            // Returns Fetched data
            return data;
        },
        key: ["label"],
        cache: false
    },

    placeHolder: "Saisissez une adresse",
    selector: "#autoComplete",
    threshold: 3,
    debounce: 300,
    searchEngine: (query, record) => {
        return record;
    },
    highlight: false,
    maxResults: 5,
    resultsList: {
        render: true,
        container: source => {
            source.setAttribute("id", "autoComplete_list");
            source.setAttribute("class", "dropdown-content dropdown-hide");
        },
        destination: document.querySelector("#autoComplete"),
        position: "afterend",
        element: "div"
    },
    resultItem: {
        content: (data, source) => {
            source.innerHTML = data.value.label;
            source.setAttribute("class", "selectItem");
        },
        element: "div"
    },
    noResults: () => {
        const result = document.createElement("li");
        result.setAttribute("class", "no_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = "No Results";
        document.querySelector("#autoComplete_list").appendChild(result);
    },
    onSelection: feedback => {
        console.log(feedback);
        const selection = feedback.selection.value;
        document.querySelector("#autoComplete").value = feedback.selection.match;
        document.querySelector('#autoComplete_wrapper .dropdown-content ').classList.add('dropdown-hide');
        window.app.setLocalisation(selection);
    }
});



window.onload = function () {

    /** ******************** */
    // Contact
    /** ******************** */
    (function () {
        // trim polyfill :
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function () {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function () {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call(document.querySelectorAll('input.input__field, textarea.input__field')).forEach(function (inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                inputEl.parentNode.classList.add('input--filled');
            }

            // events:
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });

        function onInputFocus(ev) {
            ev.target.parentNode.classList.add('input--filled');
        }

        function onInputBlur(ev) {
            if (ev.target.value.trim() === '') {
                ev.target.parentNode.classList.remove('input--filled');
            }
        }
        [].slice.call(document.querySelectorAll('.contact .veil,.contact .close')).forEach(function (closeEl) {
            closeEl.addEventListener("click", function () {
                this.closest('.contact').classList.remove("show");
                document.body.style.overflow = "visible";
            });

        });

        document.querySelector(".contact-link").addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector('.contact').classList.add("show");
            document.body.style.overflow = "hidden";
        })
        document.querySelector("#form-contact").addEventListener('submit', function (e) {
            e.preventDefault();
            const _this = this;
            const formData = new FormData(this);
            const XHR = new XMLHttpRequest();

            XHR.onreadystatechange = function () {
                if (XHR.readyState === 4) {


                    var json = JSON.parse(XHR.responseText);
                    if (XHR.status == 200) {
                        _this.classList.remove('success');
                        _this.classList.add('success');
                        window.setTimeout(function () {
                            _this.classList.remove('success');
                        }, 2000);

                        [].slice.call(document.querySelectorAll('.contact .input--filled')).forEach(function (el) {
                            el.classList.remove('input--filled');
                        });
                        [].slice.call(document.querySelectorAll('.contact input,.contact textarea')).forEach(function (input) {
                            input.classList.remove('visited');

                        });
                        _this.reset();

                    } else {
                        _this.classList.add('error');


                    }

                }
            }

            // Configurez la requête
            XHR.open(this.method, this.action);

            XHR.send(formData)
        });
        [].slice.call(document.querySelectorAll('.contact input,.contact textarea')).forEach(function (input) {
            input.addEventListener("focus", function () {
                this.classList.add('visited');
            });

        });

    })();


    window.app = new App();
}


