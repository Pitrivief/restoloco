import L from "leaflet"
require('../scss/layout.scss');



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
 
function initFilters(){
    
    document.querySelector('.cook-select').addEventListener('change', function(){
        
        var selection = this.options[this.selectedIndex];
        var text = selection.text
        var value = selection.value
        var element = document.createElement('div');
        element.innerHTML = `<span>${selection.text}</span><span>&#10005;</span>`;
        element.classList.add("selected-cook-type")
        document.querySelector('.cook-result').appendChild(element)
        this.removeChild(this.options[this.selectedIndex]);
       
        this.options[0].setAttribute("selected","selected")
        this.value = this.options[0].value;
        
    });
}


window.onload = function(){

    window.addEventListener("resize", resizeDecor);
    window.addEventListener("scroll", function(){
    testMenu();
    });

    var map = L.map('restaurant-map-inner').setView([49.1811,-0.3712], 14);


    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        scrollWheelZoom: false,
        maxZoom: 19
    }).addTo(map);
    
    map.on('click', () => { map.scrollWheelZoom.enable(); removeSelectedMarker()});
    map.on('mouseout', () => { map.scrollWheelZoom.disable();});
    
    
    [].slice.call( document.querySelectorAll( '.menu-item' ) ).forEach( function( menuItem ) {
        menuItem.addEventListener('click',function(e){
            e.preventDefault();
            scrollTo(document.querySelector(menuItem.getAttribute("href")));
        })
    });

    [].slice.call( document.querySelectorAll( '.restaurant-item' ) ).forEach( function( restaurantItem ) {
        if(restaurantItem.querySelector(".restaurant-seemap") !== null){
            var lat = restaurantItem.querySelector(".restaurant-seemap").getAttribute('data-lat');
            var lng = restaurantItem.querySelector(".restaurant-seemap").getAttribute('data-lng');
            if(lat !== null && lng !== null){
                restaurantItem
                var popup = L.popup({maxWidth:350,minwidth:350})
                .setContent(restaurantItem.outerHTML)
                var marker = L.marker([lat, lng],{icon:markerIcon});
                marker.addTo(map).bindPopup(popup);
                marker.off('click');
                marker.on('click',function(){
                    setSelectedMarker(marker)
                })
                
            }
            restaurantItem.querySelector(".restaurant-seemap").addEventListener( 'click', function(e){
                e.preventDefault();
                scrollTo(document.querySelector('#restaurant-map'))
                setSelectedMarker(marker)
                
            } );
            
        } 
        
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

    initFilters()
    resizeDecor()
    testMenu()
}


