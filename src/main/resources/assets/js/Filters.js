export default class Filters {

    selectBox;
    filters = {
        "cookTypes.name": [],
    }
    restaurantApp;

    constructor(restaurantApp) {




        this.restaurantApp = restaurantApp;
        const _self = this;




        [].slice.call(document.querySelectorAll("input[data-filter-boolean]")).forEach(function (input) {

            input.addEventListener("change", function () {
                if (input.checked) {
                    _self.filters[input.getAttribute("data-filter-boolean")] = 1;
                } else {
                    delete _self.filters[input.getAttribute("data-filter-boolean")]
                }

                _self.triggerFilterChanged()
            });

        })

        this.selectBox = document.querySelector(".select-box");
        var j, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */


        selElmnt = this.selectBox.querySelector("select");
        /*
         * For each element, create a new DIV that will act as the selected
         * item:
         */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = "Sélectionnez le type de cuisine.";// selElmnt.options[selElmnt.selectedIndex].innerHTML;
        this.selectBox.appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "dropdown-content dropdown-hide");
        for (j = 0; j < selElmnt.length; j++) {
            /*
             * For each option in the original select element, create a new DIV
             * that will act as an option item:
             */
            var c = this.createSelectItem(selElmnt.options[j].innerHTML, selElmnt.options[j].value);
            b.appendChild(c);
        }
        this.selectBox.appendChild(b);
        a.addEventListener("click", function (e) {
            /*
             * When the select box is clicked, close any other select boxes, and
             * open/close the current select box:
             */
            e.stopPropagation();
            //closeAllSelect(this);
            this.nextSibling.classList.toggle("dropdown-hide");
            this.classList.toggle("select-arrow-active");
        });


        function closeAllSelect(elmnt) {
            /*
             * A function that will close all select boxes in the document,
             * except the current select box:
             */

            if (elmnt.target.closest('.dropdown-wrapper') !== null) {
                return;
            }
            var x, y, i, arrNo = [];
            x = document.getElementsByClassName("dropdown-content");
            y = document.getElementsByClassName("select-selected");
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("dropdown-hide");
                }
            }
        }

        /*
         * If the user clicks anywhere outside the select box, then close all
         * select boxes:
         */
        document.addEventListener("click", closeAllSelect);
    }

    generateRSQL() {

        const preparedfilters = [];
        for (let [key, value] of Object.entries(this.filters)) {


            let filt;
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    preparedfilters.push(comparison(key, inList(...value)))
                }
            } else {
                preparedfilters.push(comparison(key, eq(value)))
            }

        }

        return and(...preparedfilters);
    }

    triggerFilterChanged() {
        this.restaurantApp.applyFilters(this.generateRSQL())
    }

    createSelectItem(text, value) {
        var _self = this;
        var c = document.createElement("DIV");
        c.classList.add('selectItem');
        c.setAttribute("data-value", value);
        c.innerHTML = text + "<div class='checkmark'></div>";
        c.addEventListener("click", function (e) {
            const value = this.getAttribute('data-value');
            if (this.classList.contains('selected')) {
                var index = _self.filters["cookTypes.name"].indexOf(value);
                if (index > -1) {
                    _self.filters["cookTypes.name"].splice(index, 1);
                }
            } else {
                _self.filters["cookTypes.name"].push(value)
            }
            this.classList.toggle('selected');
            _self.triggerFilterChanged();
        });
        return c;

    }
}


