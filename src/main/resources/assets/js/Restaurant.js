export default class Restaurant {
    tag;
    filters = [];
    marker;
    isShown = true;
    lat;
    lng;
    template;
    isSelected = false;

    constructor(tag) {
        this.tag = tag
        const _self = this;
        var data_filters = JSON.parse(tag.getAttribute('data-filters'))
        if (Array.isArray(data_filters)) {
            this.filters.concat(data_filters)
        }

        /*tag.querySelector('.todays-opening .popup-trigger').addEventListener('click', function (e) {
            this.parentNode.querySelector('.restaurant-openings').classList.remove('dropdown-hide');
        });*/
        this.lat = tag.getAttribute('data-lat');
        this.lng = tag.getAttribute('data-lng');
        tag.querySelector('.see-more').addEventListener('click', function (e) {
            const restoExtra = _self.tag.querySelector('.restaurant-extra-infos');
            restoExtra.style.maxHeight = restoExtra.firstChild.offsetHeight;
            this.closest(".restaurant-item").classList.toggle('open');
        });
         

    }

    getTemplate() {
        
        return `<div class="restaurant-map-template">${this.tag.innerHTML}</div>`;
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

    onEnter(app, fn) {
        const _self = this;
         this.marker.on('mouseover',function(){
            _self.tag.scrollIntoView({behavior: "smooth", block: 'center'});
            _self.tag.classList.add('visited')
            this.setRadius(10);
            app[fn].call(app, _self, "markerEvent");
        });
        this.tag.addEventListener('mouseenter', function (e) {
                
            app[fn].call(app, _self, "vignetteEvent");

        });
    }

    onLeave(app, fn) {
        const _self = this;
        this.marker.on('mouseout',function(){
            _self.tag.classList.remove('visited')
            if(!_self.isSelected){
                this.setRadius(5);
            }
        });
        this.tag.addEventListener('mouseleave', function (e) {
            
            app[fn].call(app, _self)

        });
    }

    onClick(app, fn) {
        const _self = this;
        if (this.lat !== null && this.lng !== null) {

            this.marker.on('click', function (e) {
                _self.tag.scrollIntoView({behavior: "smooth", block: 'center'});
                app[fn].call(app, _self);

            })
            this.tag.addEventListener('click', function (e) {

                app[fn].call(app, _self);

            });
        }
    }
    
    select(){
        this.isSelected = true;
        this.tag.classList.add('selected')
    }
    
    deselect(){
        this.isSelected = false;
        this.tag.classList.remove('selected')
    }

    
}


