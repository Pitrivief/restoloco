import L from "leaflet"
import { and, comparison, eq,  inList, } from "rsql-builder";
require('../scss/layout.scss');

var map;

var markerIcon = L.icon({
    iconUrl: '/images/marker.png',
    iconSize: [24, 32],
    iconAnchor: [12,32],
    popupAnchor: [0,-34]
});
var SelectedMarkerIcon = L.icon({
    iconUrl: '/images/marker2X.png',
    iconSize: [48, 64],
    iconAnchor: [24,64],
    popupAnchor: [0,-68]
});
var selectedMarker = null;



function resizeDecor(){
			
    var height = window.innerHeight/2;
    var width = window.innerWidth;
    var degres = Math.atan(height/width)/(Math.PI*2)*360;
    //console.log(degres)
    document.querySelector(".decor .dark-green").style.transform = "rotate(-"+degres+"deg)";

}

function testMenu(){
     //console.log(document.body.scrollTop)
     if((document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)){
        document.body.classList.add('scrolled');
    }
    else{
        document.body.classList.remove('scrolled');
    }
}

function scrollTo(element){
	element.scrollIntoView({ 
		  behavior: 'smooth' 
		});
}

function removeSelectedMarker(){
	if(selectedMarker != null){
		selectedMarker.setIcon(markerIcon)
		selectedMarker = null
	}
}

function setSelectedMarker(marker){
	
	removeSelectedMarker()
	marker.setIcon(SelectedMarkerIcon)
	selectedMarker = marker
	marker.openPopup()
	
}
 






class Restaurant{
    tag;
    filters = [];
    marker;
    isShown = true;
    
    constructor(tag){
        this.tag = tag
        var data_filters = JSON.parse(tag.getAttribute('data-filters'))
        if(Array.isArray(data_filters)){
            this.filters.concat(data_filters) 
        }
        
        
        if(tag.querySelector(".restaurant-seemap") !== null){
            var lat = tag.querySelector(".restaurant-seemap").getAttribute('data-lat');
            var lng = tag.querySelector(".restaurant-seemap").getAttribute('data-lng');
            if(lat !== null && lng !== null){ 
                
                var popup = L.popup({maxWidth:350,minwidth:350})
                .setContent(tag.outerHTML)
                this.marker = L.marker([lat, lng],{icon:markerIcon});
                this.marker.addTo(window.map).bindPopup(popup);
                this.marker.off('click');
                this.marker.on('click',function(){
                    setSelectedMarker(marker)
                })
                
            }
            tag.querySelector(".restaurant-seemap").addEventListener( 'click', function(e){
                e.preventDefault();
                scrollTo(document.querySelector('#restaurant-map'))
                setSelectedMarker(marker)
                 
            } );
        } 
    }
    getFilters(){
        return this.filters;
    }
    showHideByFilters(filters){
    
        let show = filters.length == 0;
        for(let i = 0; i < filters.length; i++){
            if(show){
                break;
            }
            var hasFilter = this.filters.indexOf(filters[i])>0;
            if(hasFilter){
                show = true;
            }
        }
        this.showHide(show)
    }
    showHide(show){
        if(this.isShown == show){
            return
        }
        this.isShown = show;
        this.tag.classList.toggle("d-none",!show);
       
       /* if(this.marker !== null){
            if(show){
                this.marker.addTo(window.map);
            }
            else{
                this.marker.remove();
            }
        }*/
    }
}

class Filters{
    
    selectBox;
    filters = {
        "cookTypes.name" : []
    }
    restaurantApp;

    constructor(restaurantApp){

        this.restaurantApp = restaurantApp
        this.selectBox =  document.querySelector(".select-box");
        var j, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */
        
        
        selElmnt = this.selectBox.querySelector("select");
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = "Sélectionnez un type de cuisine.";//selElmnt.options[selElmnt.selectedIndex].innerHTML;
        this.selectBox.appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 0; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            var c =  this.createSelectItem(selElmnt.options[j].innerHTML,selElmnt.options[j].value);
            b.appendChild(c);
        }
        this.selectBox.appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
        
    
        function closeAllSelect(elmnt) {
            /* A function that will close all select boxes in the document,
            except the current select box: */
            var x, y, i, arrNo = [];
            x = document.getElementsByClassName("select-items");
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
                x[i].classList.add("select-hide");
                }
            }
        }
    
        /* If the user clicks anywhere outside the select box,
        then close all select boxes: */
        document.addEventListener("click", closeAllSelect); 
    }

    generateRSQL(){

        const preparedfilters = []; 
        for (let [key, value] of Object.entries(this.filters)) {
            let filt;
            if(Array.isArray(value)){
                if(value.length>0){
                    preparedfilters.push(comparison(key, inList(...value)))
                }
            }else{
                preparedfilters.push(comparison(key, eq(value)))
            }
            
          }

          return and(...preparedfilters);
    }

    triggerFilterChanged(){
        this.restaurantApp.applyFilters(this.generateRSQL())
    }

    createSelectItem(text,value){
       
        var c = document.createElement("DIV");
        const _self = this;
        c.setAttribute("data-value",value)
        c.innerHTML = text;
        c.addEventListener("click", function(e) {
            var _this = this;
            var element = document.createElement('div');
            element.innerHTML = `<span>${_this.textContent}</span>`;
            element.classList.add("selected-cook-type")
            element.setAttribute("data-value",_this.getAttribute('data-value'));
            _self.filters["cookTypes.name"].push(_this.getAttribute('data-value'))
            element.setAttribute("data-description",_this.textContent);
            var closeIcon = document.createElement('span');
            closeIcon.innerHTML = '&#10005;'
            closeIcon.addEventListener('click',function(){
                var element = this.parentNode;
                var text = element.getAttribute('data-description');
                var value = element.getAttribute('data-value');

                var index = _self.filters["cookTypes.name"].indexOf(value);
                if (index > -1) {
                    _self.filters["cookTypes.name"].splice(index, 1);
                }
                var selectItem = _self.createSelectItem(text,value);
                
                _self.selectBox.querySelector('.select-items').appendChild(selectItem)
                
                element.parentNode.removeChild(element);
                _self.triggerFilterChanged()
            })
            element.appendChild(closeIcon);
            document.querySelector('.cook-result').appendChild(element);
            this.parentNode.removeChild(this);
            _self.triggerFilterChanged()
           
        });
        return c;
        
    }
}

class RestaurantApp{
    restaurants = [];
    filters = new Filters(this);
    limit = 10;
    page = 0;

    constructor(){
        this.reload();
    }

    reload(){
        this.restaurants = [];
        const _self = this;
        [].slice.call( document.querySelectorAll( '.restaurant-item' ) ).forEach( function( restaurantItem ) {
            const restaurant = new Restaurant(restaurantItem)
            _self.restaurants.push(restaurant);
        })
    }

    buildGrid(restaurants){
        const restaurantWrapper = document.createElement('div');
        restaurantWrapper.innerHTML = restaurants;
        document.querySelector('.restaurant-list').innerHTML = restaurantWrapper.querySelector('.restaurant-list').innerHTML;
        this.reload();
    }

    applyFilters(filters){
        
        const queryData = {
            "filter" : filters,
            "page"   : this.page,
            "limit"  : this.limit
        }
        const queryString = Object.keys(queryData).map(key => key + '=' + queryData[key]).join('&');
        console.log(queryString);
        
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

            // Code that should run regardless of the request status
            console.log('This always runs...');
        };

        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        xhr.open('GET', '/restaurant?'+queryString);
        xhr.send();

    
    }
}


window.onload = function(){

    window.addEventListener("resize", resizeDecor);
    window.addEventListener("scroll", function(){
        testMenu();
    });

    window.map = L.map('restaurant-map-inner').setView([49.1811,-0.3712], 14);
    

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        scrollWheelZoom: false,
        maxZoom: 19
    }).addTo(window.map);
    
    window.map.on('click', () => { map.scrollWheelZoom.enable(); removeSelectedMarker()});
    window.map.on('mouseout', () => { map.scrollWheelZoom.disable();});
    
    
    [].slice.call( document.querySelectorAll( '.menu-item' ) ).forEach( function( menuItem ) {
        menuItem.addEventListener('click',function(e){
            e.preventDefault();
            scrollTo(document.querySelector(menuItem.getAttribute("href")));
        })
    });

    


    /***********************/
    // Contact
    /***********************/ 
    (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call( document.querySelectorAll( 'input.input__field, textarea.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                inputEl.parentNode.classList.add('input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', onInputFocus );
            inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
            ev.target.parentNode.classList.add('input--filled' );
        }

        function onInputBlur( ev ) {
            if( ev.target.value.trim() === '' ) {
                ev.target.parentNode.classList.remove('input--filled' );
            }
        }
    })();   

    new RestaurantApp();
    resizeDecor()
    testMenu()
}


