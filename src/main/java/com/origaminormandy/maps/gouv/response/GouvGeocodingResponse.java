package com.origaminormandy.maps.gouv.response;

import java.util.List;

import com.origaminormandy.maps.GeocodingAddress;

public class GouvGeocodingResponse {

	
	//{"type":"FeatureCollection","query":["28","rue","du","pays","dauge","14860","amfreville","france"],
		//"features":[{"id":"address.7978390967427760","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"point"},"text":"Rue Du Pays D'auge",
	//"place_name":"28 Rue Du Pays D'auge, 14860 Amfreville, France","center":[-0.226915,49.253953],
	//"geometry":{"type":"Point","coordinates":[-0.226915,49.253953]},"address":"28","context":[{"id":"postcode.12654631096508290","text":"14860"},
	//{"id":"place.8098765474124790","wikidata":"Q838323","text":"Amfreville"},{"id":"region.11516502332649420","short_code":"FR-14","wikidata":"Q3249","text":"Calvados"},{"id":"country.15996870960641660","short_code":"fr","wikidata":"Q142","text":"France"}]},{"id":"postcode.12654631096508290","type":"Feature","place_type":["postcode"],"relevance":0.6125,"properties":{},"text":"14860","place_name":"14860, Ranville, Calvados, France","bbox":[-0.295758,49.204878,-0.130788,49.26218],"center":[-0.29,49.21],"geometry":{"type":"Point","coordinates":[-0.29,49.21]},"context":[{"id":"place.12773255680409220","wikidata":"Q273427","text":"Ranville"},{"id":"region.11516502332649420","short_code":"FR-14","wikidata":"Q3249","text":"Calvados"},{"id":"country.15996870960641660","short_code":"fr","wikidata":"Q142","text":"France"}]},{"id":"address.6782390370199298","type":"Feature","place_type":["address"],"relevance":0.51,"properties":{"accuracy":"point"},"text":"Rue Du Pays D'auge","place_name":"28 Rue Du Pays D'auge, 27210 Beuzeville, France","center":[0.343852,49.339138],"geometry":{"type":"Point","coordinates":[0.343852,49.339138]},"address":"28","context":[{"id":"postcode.17166668721049690","text":"27210"},{"id":"place.3987279900924160","wikidata":"Q1011483","text":"Beuzeville"},{"id":"region.9512499640053770","short_code":"FR-27","wikidata":"Q3372","text":"Eure"},{"id":"country.15996870960641660","short_code":"fr","wikidata":"Q142","text":"France"}]},{"id":"address.1770247479","type":"Feature","place_type":["address"],"relevance":0.51,"properties":{"accuracy":"interpolated"},"text":"Rue Du Pays D'auge","place_name":"28 Rue Du Pays D'auge, 61370 Sainte-Gauburge-Sainte-Colombe, France","center":[0.432039,48.717318],"geometry":{"type":"Point","coordinates":[0.432039,48.717318],"interpolated":true},"address":"28","context":[{"id":"postcode.12740423608452130","text":"61370"},{"id":"place.18878013833909050","wikidata":"Q1410495","text":"Sainte-Gauburge-Sainte-Colombe"},{"id":"region.17789097622745380","short_code":"FR-61","wikidata":"Q12679","text":"Orne"},{"id":"country.15996870960641660","short_code":"fr","wikidata":"Q142","text":"France"}]},{"id":"address.4498499511874142","type":"Feature","place_type":["address"],"relevance":0.51,"properties":{"accuracy":"interpolated"},"text":"Rue De Pays D'auge","place_name":"28 Rue De Pays D'auge, 14370 Argences, France","matching_text":"Rue Du Pays D'auge","matching_place_name":"28 Rue Du Pays D'auge, 14370 Argences, France","center":[-0.169899,49.128908],"geometry":{"type":"Point","coordinates":[-0.169899,49.128908],"interpolated":true,"omitted":true},"address":"28","context":[{"id":"postcode.12750535243712490","text":"14370"},{"id":"place.11294769647618860","wikidata":"Q838585","text":"Argences"},{"id":"region.11516502332649420","short_code":"FR-14","wikidata":"Q3249","text":"Calvados"},{"id":"country.15996870960641660","short_code":"fr","wikidata":"Q142","text":"France"}]}],"attribution":"NOTICE: © 2020 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."}


	
	public String type;
	
	public List<Feature> features;
	

}
