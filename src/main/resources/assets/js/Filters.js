import { and, or, comparison, eq, inList, } from "rsql-builder";
import autoComplete from '@tarekraafat/autocomplete.js/dist/js/autoComplete.min.js'
export default class Filters {

    selectBox;
    filters = {
        "cookTypes.name": [],
    }
    restaurantApp;

    constructor(restaurantApp) {




        this.restaurantApp = restaurantApp;
        const _self = this;


        new autoComplete({
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
        const orfilters = [];
        for (let [key, value] of Object.entries(this.filters)) {

        
            let filt;
            if (Array.isArray(value)) {
                if (value.length == 0) {
                	continue;
                }
                filt = comparison(key, inList(...value))
                
            } else {
               filt = comparison(key, eq(value))
            }
            
            
            if(key === "cookTypes.name"){
            	preparedfilters.push(filt);
            }else{
            	orfilters.push(filt);
            }

        }
        console.log(preparedfilters)
        console.log(orfilters)
        return (preparedfilters.length>0)?((orfilters.length>0)?and(...preparedfilters, or(...orfilters)):and(...preparedfilters)):or(...orfilters);
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


