import L from "leaflet"

export default class Map {

    tag;
    Leaflet = window.L;
    selectedMarker;

    markerIcon = window.L.icon({
        iconUrl: '/images/marker.png',
        iconSize: [24, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -34]
    });

    SelectedMarkerIcon = window.L.icon({
        iconUrl: '/images/marker2X.png',
        iconSize: [48, 64],
        iconAnchor: [24, 64],
        popupAnchor: [0, -68]
    });

    constructor() {
        const _self = this;
        this.tag = window.L.map('restaurant-map-inner').setView([49.1811, -0.3712], 14);

        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            scrollWheelZoom: false,
            maxZoom: 19
        }).addTo(this.tag);

        
        this.tag.on('mouseout', () => {
            _self.tag.scrollWheelZoom.disable();
        });
    }
    
    onClick(app, fn){
        this.tag.on('click', (e) => {
            app[fn].call(app);
        });
    }

    addMarker(latLng) {
        const marker = this.Leaflet.circleMarker(latLng, { radius: 5, weight:2, color: "#808080",fill:true,fillColor: "#ffffff",fillOpacity:"1",bubblingMouseEvents: false});
        marker.addTo(this.tag)
        marker.off('click');
        return marker;
    }

    setSelectedMarker(marker) {
        this.removeSelectedMarker()
        if (marker) {
            this.selectedMarker = marker;
            this.selectedMarker.setRadius(10)
            var pixelPosition = this.tag.latLngToContainerPoint(marker.getLatLng());
            var offset = this.tag.getContainer().offsetHeight / 4;
            pixelPosition.y += (offset + 15);
            var centerPosition = this.tag.containerPointToLatLng(pixelPosition)
            this.tag.setView(centerPosition);
            this.selectedMarker.bringToFront();
        }

    }

    removeSelectedMarker() {
        if (this.selectedMarker != null) {
            this.selectedMarker.setRadius(5);
            this.selectedMarker = null;
            
        }
    }

}



