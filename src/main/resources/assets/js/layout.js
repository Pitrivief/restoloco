require('../scss/layout.scss');

import App from "./App.js"
require('./GDPR-cookies.js')


window.orejimeConfig = orejimeConfig;
window.onload = function () {

    /** ******************** */
    // Contact
    /** ******************** */
    (function () {
    	
    	
    	Orejime.init(orejimeConfig);
    	
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


