import L from "leaflet"
import { and, comparison, eq, inList, } from "rsql-builder";
import autoComplete from '@tarekraafat/autocomplete.js/dist/js/autoComplete.min.js'
        require('../scss/layout.scss');

var map;

var markerIcon = L.icon({
    iconUrl: '/images/marker.png',
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -34]
});
var SelectedMarkerIcon = L.icon({
    iconUrl: '/images/marker2X.png',
    iconSize: [48, 64],
    iconAnchor: [24, 64],
    popupAnchor: [0, -68]
});
var selectedMarker = null;

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
            if(query.length <4){
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


function removeSelectedMarker() {
    if (selectedMarker != null) {
        selectedMarker.setIcon(markerIcon)
        selectedMarker = null
    }
}

function setSelectedMarker(marker) {
    removeSelectedMarker()
    marker.setIcon(SelectedMarkerIcon)
    selectedMarker = marker;
    marker.openPopup()
}

class Restaurant {
    tag;
    filters = [];
    marker;
    isShown = true;

    constructor(tag) {
        this.tag = tag
        const _self = this;
        var data_filters = JSON.parse(tag.getAttribute('data-filters'))
        if (Array.isArray(data_filters)) {
            this.filters.concat(data_filters)
        }

        tag.querySelector('.todays-opening h4').addEventListener('click', function(e){
            this.parentNode.querySelector('.restaurant-openings').classList.remove('dropdown-hide');
        });
        if (tag.querySelector(".restaurant-seemap") !== null) {
            var lat = tag.querySelector(".restaurant-seemap").getAttribute('data-lat');
            var lng = tag.querySelector(".restaurant-seemap").getAttribute('data-lng');
            if (lat !== null && lng !== null) {

                var popup = L.popup({maxWidth: 350, minwidth: 350})
                        .setContent(tag.querySelector('.restaurant-name').textContent)
                this.marker = L.marker([lat, lng], {icon: markerIcon});
                this.marker.addTo(window.map).bindPopup(popup, {closeButton: false});
                this.marker.off('click');
                this.marker.on('click', function () {
                    setSelectedMarker(_self.marker)
                    var testElement = document.querySelector('.restaurant-list .restaurant-item.selected');
                    if(testElement){
                        testElement.classList.remove('selected')
                    }
                    
                    _self.tag.classList.add('selected');
                    _self.tag.scrollIntoView({behavior: "smooth", block: 'center'});
                })

            }
            tag.querySelector(".restaurant-seemap").addEventListener('click', function (e) {
                e.preventDefault();
                var testElement = document.querySelector('.restaurant-list .restaurant-item.selected');
                    if(testElement){
                        testElement.classList.remove('selected')
                    }
                    
                    _self.tag.classList.add('selected');
                setSelectedMarker(_self.marker)

            });
        }
    }
    getFilters() {
        return this.filters;
    }
    remove() {
        this.marker.remove();
    }
    showHideByFilters(filters) {

        let show = filters.length == 0;
        for (let i = 0; i < filters.length; i++) {
            if (show) {
                break;
            }
            var hasFilter = this.filters.indexOf(filters[i]) > 0;
            if (hasFilter) {
                show = true;
            }
        }
        this.showHide(show)
    }
    showHide(show) {
        if (this.isShown == show) {
            return
        }
        this.isShown = show;
        this.tag.classList.toggle("d-none", !show);

        /*
         * if(this.marker !== null){ if(show){ this.marker.addTo(window.map); }
         * else{ this.marker.remove(); } }
         */
    }
}

class Filters {

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
            if(this.classList.contains('selected')){
                 var index = _self.filters["cookTypes.name"].indexOf(value);
                if (index > -1) {
                    _self.filters["cookTypes.name"].splice(index, 1);
                }
            }else{
               _self.filters["cookTypes.name"].push(value) 
            }
            this.classList.toggle('selected');
            _self.triggerFilterChanged();
        });
        return c;

    }
}

class RestaurantApp {
    restaurants = [];
    filters = new Filters(this);
    limit = 10;
    page = 0;
    localisation = null;

    constructor() {
        this.reload();
        this.restoreLocalisationFromStorage();
        const _self = this;

    }

    reload() {
        this.restaurants.forEach(function (restaurant) {
            restaurant.remove();
        })
        this.restaurants = [];
        const _self = this;
        [].slice.call(document.querySelectorAll('.restaurant-item')).forEach(function (restaurantItem) {
            const restaurant = new Restaurant(restaurantItem)
            _self.restaurants.push(restaurant);
        })
    }

    buildGrid(restaurants) {
        const restaurantWrapper = document.createElement('div');
        restaurantWrapper.innerHTML = restaurants;
        document.querySelector('.restaurant-list').innerHTML = restaurantWrapper.querySelector('.restaurant-list').innerHTML;
        this.reload();
    }

    //Geocoding  address localisation => autocomplete input
    setLocalisation(localisation) {
        this.localisation = localisation;
        this.saveLocalisation(localisation);
        this.applyFilters(this.filters.generateRSQL());
    }

    //Geocoding  address localisation => autocomplete input
    saveLocalisation(localisation) {
        localStorage.setItem('localisation', JSON.stringify(localisation));
    }

    restoreLocalisationFromStorage() {
        console.log("restoreLocalisationFromStorage");
        const storeLocalisation = localStorage.getItem('localisation');
        if (storeLocalisation !== null)
            this.localisation = JSON.parse(storeLocalisation);
        //document.querySelector("#autoComplete").value = this.localisation.label;
    }

    applyFilters(filters) {

        const queryData = {
            
            "page": this.page,
            "limit": this.limit
        }
        if(Object.keys(filters).length> 0){
            queryData.filter = filters;
        }
        const filterQueryString = Object.keys(queryData).map(key => key + '=' + queryData[key]).join('&');
        var queryString;
        if (this.localisation != null) {
            const localisationQueryString = "localisation=" + this.localisation.label + "&lng=" + this.localisation.point.lng + "&lat=" + this.localisation.point.lat;
            queryString = localisationQueryString + "&" + filterQueryString;
        } else {
            queryString = filterQueryString;
        }


        var xhr = new XMLHttpRequest();
        const _self = this;
        // Setup our listener to process completed requests
        xhr.onload = function () {

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // What do when the request is successful
                _self.buildGrid(xhr.response);
            } else {
                // What do when the request fails
                console.log('The request failed!');
            }

        };

        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        xhr.open('GET', '/restaurant?' + queryString);
        xhr.send();


    }
}


window.onload = function () {



    window.map = L.map('restaurant-map-inner').setView([49.1811, -0.3712], 14);


    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        scrollWheelZoom: false,
        maxZoom: 19
    }).addTo(window.map);

    window.map.on('click', () => {
        window.map.scrollWheelZoom.enable();
        removeSelectedMarker()
    });
    window.map.on('mouseout', () => {
        window.map.scrollWheelZoom.disable();
    });


    [].slice.call(document.querySelectorAll('.menu-item')).forEach(function (menuItem) {
        menuItem.addEventListener('click', function (e) {
            e.preventDefault();
            scrollTo(document.querySelector(menuItem.getAttribute("href")));
        })
    });




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
    })();

    window.app = new RestaurantApp();
}


