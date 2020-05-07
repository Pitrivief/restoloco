import Map from "./Map.js"
import Restaurant from "./Restaurant.js"
import Filters from "./Filters.js"

export default class App {
    restaurants = [];
    filters = new Filters(this);
    limit = 20;
    page = 0;
    localisation = null;
    selectedRestaurant = null;
    map;
    restaurantTemplate;
    restaurantPanel

    constructor() {

        this.map = new Map();
        this.map.onClick(this, 'mapClick')
        this.restaurantPanel = document.querySelector('.map-restaurant-detail');
        this.reload();
        this.restoreLocalisationFromStorage();

    }

    reload() {
        this.restaurants.forEach(function (restaurant) {
            restaurant.remove();
        })
        this.restaurants = [];
        const _self = this;
        [].slice.call(document.querySelectorAll('.restaurant-item')).forEach(function (restaurantItem) {

            _self.restaurants.push(_self.buildRestaurant(restaurantItem));
        });
        
        [].slice.call(document.querySelectorAll(".pagination .page-link")).forEach(function (page) {
                page.addEventListener("click",function(e){
                    e.preventDefault();
                    _self.page = page.getAttribute('data-page');
                    _self.applyFilters();
                })
                
        });
    
    }

    buildRestaurant(restaurantItem) {
        const restaurant = new Restaurant(restaurantItem);
        
        restaurant.marker = this.map.addMarker([restaurant.lat, restaurant.lng]);
        restaurant.onEnter(this, 'enterRestaurant');
        restaurant.onLeave(this, 'leaveRestaurant');
        restaurant.onClick(this, 'selectRestaurant');
        return restaurant;
    }
    
    mapClick(){
        this.removeSeletedRestaurant()
        this.hideRestaurant();
    }

    enterRestaurant(restaurant, from) {

        if(from == "vignetteEvent"){
            this.map.setSelectedMarker(restaurant.marker);
            this.fillRestaurantTemplate(restaurant.getTemplate());
        }
        
    }

    leaveRestaurant(restaurant) {

        if(this.selectedRestaurant){
            if(this.selectedRestaurant != restaurant){
                
                this.fillRestaurantTemplate(this.selectedRestaurant.getTemplate());
                this.map.setSelectedMarker(this.selectedRestaurant.marker);
            }
            
        }
        else{
            this.hideRestaurant()
        }
        

    }

    selectRestaurant(restaurant) {
        
        if (restaurant) {
            if(restaurant.isSelected){
                restaurant.deselect()
                this.selectedRestaurant = null;
                this.hideRestaurant()
                
            }
            else{
                this.removeSeletedRestaurant()
                restaurant.select()
                this.selectedRestaurant = restaurant;
                this.fillRestaurantTemplate(restaurant.getTemplate());
                this.map.setSelectedMarker(restaurant.marker);
            }
                
        } else {
            
            this.removeSeletedRestaurant()
            this.hideRestaurant();
        }
    }
    
    removeSeletedRestaurant(){
        if(this.selectedRestaurant){
            this.selectedRestaurant.deselect();
            this.selectedRestaurant = null;
        }
    }

    fillRestaurantTemplate(template) {
        this.restaurantPanel.innerHTML = template;
        this.restaurantPanel.style.visibility= "hidden";
        this.restaurantPanel.style.display = "block";
        const testHeight = this.restaurantPanel.querySelector('.right-infos').offsetHeight+20;
        if( testHeight > this.restaurantPanel.offsetHeight){
            this.restaurantPanel.style.height = (testHeight)+'px';
        }
        this.restaurantPanel.style.visibility= "visible";
        
        
       
        
    }

    hideRestaurant() {
        this.map.setSelectedMarker(null);
        this.restaurantPanel.style.display = "none";
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
        this.applyFilters();
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
            "size": this.limit
        }
        if (Object.keys(this.filters.generateRSQL()).length > 0) {
            queryData.filter = this.filters.generateRSQL();
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


