import L from"leaflet"
require('../scss/layout.scss');


function resizeDecor(e){
			
    var height = window.innerHeight/2;
    var width = window.innerWidth;
    var degres = Math.atan(height/width)/(Math.PI*2)*360;
    //console.log(degres)
    document.querySelector(".decor .dark-green").style.transform = "rotate(-"+degres+"deg)";
    

}
window.addEventListener("resize", resizeDecor);
window.addEventListener("scroll", function(e){
    //console.log(document.body.scrollTop)
    if((document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)){
        document.body.classList.add('scrolled');
    }
    else{
        document.body.classList.remove('scrolled');
    }
});
resizeDecor()

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

var map = L.map('restaurant-map').setView([49.1811,-0.3712], 14);


L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    scrollWheelZoom: false,
    maxZoom: 19
}).addTo(map);

map.on('click', () => { map.scrollWheelZoom.enable();});
map.on('mouseout', () => { map.scrollWheelZoom.disable();});


[].slice.call( document.querySelectorAll( '.restaurant-item' ) ).forEach( function( restaurantItem ) {
    var lat = restaurantItem.querySelector(".restaurant-seemap").getAttribute('data-lat');
    var lng = restaurantItem.querySelector(".restaurant-seemap").getAttribute('data-lng');
    if(lat !== null && lng !== null){
        restaurantItem
        var popup = L.popup({maxWidth:350,minwidth:350})
        .setContent(restaurantItem.outerHTML)
        
        L.marker([lat, lng]).addTo(map).bindPopup(popup);
        
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