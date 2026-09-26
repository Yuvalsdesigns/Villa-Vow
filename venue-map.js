"use strict";
/* ---------------- VENUES MAP ----------------
   A real, zoomable map of every venue that has a location set (curated
   ones are seeded with approximate region coordinates in app-2.js; a
   custom venue gets one from the click-to-drop-a-pin picker in its own
   Add/Edit modal). Built on Leaflet + OpenStreetMap tiles: no API key,
   no billing account, nothing that can hit a quota or break from someone
   else's account, unlike the Google Maps key this was deliberately built
   to avoid.

   Two-way sync with the venue list:
   - List -> map (always on): whatever renderVenues() currently has in
     its filtered array (search/region/capacity/contacted/shortlisted)
     is exactly what gets pinned on the map, nothing more.
   - Map -> list (opt-in, via the "Only list venues visible on the map"
     checkbox): panning/zooming the map re-filters the list down to
     venues whose pin falls inside the current view. Off by default so
     the two directions never fight each other; turning it on is what
     lets you draw a rough circle with the map itself and have the list
     follow it, and turning it back off returns the list to normal.

   OpenStreetMap's own tiles already render nearby airports as a plane
   icon + label once you zoom in past roughly city/regional level, no
   extra work needed there, just zoom in on wherever you're looking.
   What tiles alone can't give you is an actual distance or route, so
   each curated venue also carries its nearest major airport's real
   coordinates below; the popup shows the straight-line distance to it
   (a quick, always-available estimate, computed locally, no API call)
   plus a "Get directions" link that opens a real driving route on
   Google Maps. That link is a plain URL, not the Maps JavaScript API,
   so it needs no key and can't hit anyone's quota or bill anyone. */

const VENUE_NEAREST_AIRPORT = {
  'tuscany': { code:'FLR', name:'Florence Airport', lat:43.8100, lng:11.2051 },
  'puglia': { code:'BRI', name:'Bari Karol Wojtyła Airport', lat:41.1389, lng:16.7606 },
  'provence': { code:'MRS', name:'Marseille Provence Airport', lat:43.4393, lng:5.2214 },
  'algarve': { code:'FAO', name:'Faro Airport', lat:37.0144, lng:-7.9659 },
  'dajas': { code:'OPO', name:'Porto Airport', lat:41.2481, lng:-8.6814 },
  'kotor': { code:'TIV', name:'Tivat Airport', lat:42.4047, lng:18.7233 },
  'stari-mlin': { code:'TIV', name:'Tivat Airport', lat:42.4047, lng:18.7233 },
  'huma-kotor': { code:'TIV', name:'Tivat Airport', lat:42.4047, lng:18.7233 },
  'lake-orta-laqua': { code:'MXP', name:'Milan Malpensa Airport', lat:45.6306, lng:8.7281 },
  'lake-iseo-catilina': { code:'BGY', name:'Milan Bergamo Airport', lat:45.6739, lng:9.7042 },
  'villa-helene': { code:'BGY', name:'Milan Bergamo Airport', lat:45.6739, lng:9.7042 },
  'lake-maggiore-royal': { code:'MXP', name:'Milan Malpensa Airport', lat:45.6306, lng:8.7281 },
  'villa-clodia': { code:'FCO', name:'Rome Fiumicino Airport', lat:41.8003, lng:12.2389 },
  'rocca-romana': { code:'FCO', name:'Rome Fiumicino Airport', lat:41.8003, lng:12.2389 },
  'podere-sant-antonio': { code:'FCO', name:'Rome Fiumicino Airport', lat:41.8003, lng:12.2389 },
  'poderaccio-bolsena': { code:'FCO', name:'Rome Fiumicino Airport', lat:41.8003, lng:12.2389 },
  'cilento-castello': { code:'NAP', name:'Naples Capodichino Airport', lat:40.8860, lng:14.2908 },
  'il-pilaccio': { code:'NAP', name:'Naples Capodichino Airport', lat:40.8860, lng:14.2908 },
  'umbria-monastero': { code:'PEG', name:"Perugia San Francesco d'Assisi Airport", lat:43.0959, lng:12.5133 },
  'villa-poropati': { code:'PUY', name:'Pula Airport', lat:44.8935, lng:13.9222 },
  'borgo-lapis': { code:'PUY', name:'Pula Airport', lat:44.8935, lng:13.9222 },
  'procida': { code:'NAP', name:'Naples Capodichino Airport', lat:40.8860, lng:14.2908 },
  'lake-ohrid': { code:'OHD', name:'Ohrid St. Paul the Apostle Airport', lat:41.1800, lng:20.7423 },
  'albanian-riviera': { code:'TIA', name:'Tirana International Airport', lat:41.4147, lng:19.7206 },
  'lake-bohinj': { code:'LJU', name:'Ljubljana Jože Pučnik Airport', lat:46.2237, lng:14.4576 },
  'la-darbia': { code:'MXP', name:'Milan Malpensa Airport', lat:45.6306, lng:8.7281 },
};

/* A broader pick-list of major European/Mediterranean airports, for the
   "Nearest airport" field on a custom venue (VENUE_NEAREST_AIRPORT above
   only covers the 26 curated ones). Covers the countries this app's own
   curated destinations already span, plus other common ones a venue you
   add yourself might be near. Not exhaustive: the field also accepts any
   free-typed name that isn't in this list, just without a distance or
   directions link, since there'd be no coordinates to compute either
   from. */
const AIRPORTS = [
  {code:'FCO',name:'Rome Fiumicino Airport',lat:41.8003,lng:12.2389},
  {code:'CIA',name:'Rome Ciampino Airport',lat:41.7994,lng:12.5949},
  {code:'MXP',name:'Milan Malpensa Airport',lat:45.6306,lng:8.7281},
  {code:'LIN',name:'Milan Linate Airport',lat:45.4451,lng:9.2767},
  {code:'BGY',name:'Milan Bergamo Airport',lat:45.6739,lng:9.7042},
  {code:'VCE',name:'Venice Marco Polo Airport',lat:45.5053,lng:12.3519},
  {code:'FLR',name:'Florence Airport',lat:43.8100,lng:11.2051},
  {code:'PSA',name:'Pisa Airport',lat:43.6839,lng:10.3927},
  {code:'BLQ',name:'Bologna Airport',lat:44.5354,lng:11.2887},
  {code:'NAP',name:'Naples Capodichino Airport',lat:40.8860,lng:14.2908},
  {code:'BRI',name:'Bari Karol Wojtyła Airport',lat:41.1389,lng:16.7606},
  {code:'BDS',name:'Brindisi Airport',lat:40.6576,lng:17.9470},
  {code:'CTA',name:'Catania Airport',lat:37.4668,lng:15.0664},
  {code:'PMO',name:'Palermo Airport',lat:38.1760,lng:13.0910},
  {code:'VRN',name:'Verona Airport',lat:45.3957,lng:10.8885},
  {code:'TRN',name:'Turin Airport',lat:45.2008,lng:7.6497},
  {code:'GOA',name:'Genoa Airport',lat:44.4133,lng:8.8375},
  {code:'PEG',name:"Perugia San Francesco d'Assisi Airport",lat:43.0959,lng:12.5133},
  {code:'OLB',name:'Olbia Airport',lat:40.8987,lng:9.5175},
  {code:'CAG',name:'Cagliari Airport',lat:39.2515,lng:9.0543},
  {code:'CDG',name:'Paris Charles de Gaulle Airport',lat:49.0097,lng:2.5479},
  {code:'ORY',name:'Paris Orly Airport',lat:48.7233,lng:2.3794},
  {code:'NCE',name:"Nice Côte d'Azur Airport",lat:43.6584,lng:7.2159},
  {code:'MRS',name:'Marseille Provence Airport',lat:43.4393,lng:5.2214},
  {code:'LYS',name:'Lyon Airport',lat:45.7256,lng:5.0811},
  {code:'TLS',name:'Toulouse Airport',lat:43.6293,lng:1.3638},
  {code:'BOD',name:'Bordeaux Airport',lat:44.8283,lng:-0.7156},
  {code:'NTE',name:'Nantes Airport',lat:47.1532,lng:-1.6107},
  {code:'MPL',name:'Montpellier Airport',lat:43.5762,lng:3.9630},
  {code:'LIS',name:'Lisbon Airport',lat:38.7813,lng:-9.1359},
  {code:'OPO',name:'Porto Airport',lat:41.2481,lng:-8.6814},
  {code:'FAO',name:'Faro Airport',lat:37.0144,lng:-7.9659},
  {code:'MAD',name:'Madrid Barajas Airport',lat:40.4936,lng:-3.5668},
  {code:'BCN',name:'Barcelona Airport',lat:41.2974,lng:2.0833},
  {code:'AGP',name:'Málaga Airport',lat:36.6749,lng:-4.4991},
  {code:'PMI',name:'Palma de Mallorca Airport',lat:39.5517,lng:2.7388},
  {code:'IBZ',name:'Ibiza Airport',lat:38.8729,lng:1.3731},
  {code:'VLC',name:'Valencia Airport',lat:39.4893,lng:-0.4816},
  {code:'SVQ',name:'Seville Airport',lat:37.4180,lng:-5.8931},
  {code:'ATH',name:'Athens Airport',lat:37.9364,lng:23.9445},
  {code:'JTR',name:'Santorini Airport',lat:36.3992,lng:25.4793},
  {code:'JMK',name:'Mykonos Airport',lat:37.4351,lng:25.3481},
  {code:'CHQ',name:'Chania Airport',lat:35.5317,lng:24.1497},
  {code:'HER',name:'Heraklion Airport',lat:35.3397,lng:25.1803},
  {code:'CFU',name:'Corfu Airport',lat:39.6019,lng:19.9117},
  {code:'RHO',name:'Rhodes Airport',lat:36.4054,lng:28.0862},
  {code:'ZAG',name:'Zagreb Airport',lat:45.7429,lng:16.0688},
  {code:'SPU',name:'Split Airport',lat:43.5389,lng:16.2980},
  {code:'DBV',name:'Dubrovnik Airport',lat:42.5614,lng:18.2682},
  {code:'PUY',name:'Pula Airport',lat:44.8935,lng:13.9222},
  {code:'ZAD',name:'Zadar Airport',lat:44.1083,lng:15.3467},
  {code:'TGD',name:'Podgorica Airport',lat:42.3594,lng:19.2519},
  {code:'TIV',name:'Tivat Airport',lat:42.4047,lng:18.7233},
  {code:'LJU',name:'Ljubljana Airport',lat:46.2237,lng:14.4576},
  {code:'TIA',name:'Tirana International Airport',lat:41.4147,lng:19.7206},
  {code:'OHD',name:'Ohrid St. Paul the Apostle Airport',lat:41.1800,lng:20.7423},
  {code:'SKP',name:'Skopje Airport',lat:41.9616,lng:21.6214},
  {code:'GVA',name:'Geneva Airport',lat:46.2381,lng:6.1090},
  {code:'ZRH',name:'Zurich Airport',lat:47.4647,lng:8.5492},
  {code:'VIE',name:'Vienna Airport',lat:48.1103,lng:16.5697},
  {code:'SZG',name:'Salzburg Airport',lat:47.7933,lng:13.0043},
  {code:'MUC',name:'Munich Airport',lat:48.3538,lng:11.7861},
  {code:'FRA',name:'Frankfurt Airport',lat:50.0379,lng:8.5622},
  {code:'BER',name:'Berlin Brandenburg Airport',lat:52.3667,lng:13.5033},
  {code:'MLA',name:'Malta International Airport',lat:35.8575,lng:14.4775},
  {code:'LCA',name:'Larnaca Airport',lat:34.8751,lng:33.6249},
  {code:'PFO',name:'Paphos Airport',lat:34.7180,lng:32.4857},
];
function airportLabel(a){ return a.name+' ('+a.code+')'; }
function findAirportByLabel(label){ return AIRPORTS.find(a=> airportLabel(a)===label); }

function haversineKm(lat1, lng1, lat2, lng2){
  const R = 6371;
  const toRad = d=> d*Math.PI/180;
  const dLat = toRad(lat2-lat1), dLng = toRad(lng2-lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function googleMapsDirectionsUrl(originParam, destinationParam){
  return 'https://www.google.com/maps/dir/?api=1&origin='+originParam+'&destination='+destinationParam;
}
/* The destination needs to actually resolve to the venue, not just its
   approximate marker coordinates: a curated venue's lat/lng is a
   region-level estimate (the middle of the nearest town, roughly), so
   asking Google to reverse-geocode that raw point landed on whatever
   random address or business happened to sit there instead of the venue
   itself. Its real address (once set) or at least its name plus region
   gives Google actual text to geocode, which resolves correctly; only
   falls back to the raw coordinates when neither is available. */
function directionsDestinationQuery(v){
  if(v.address) return v.name+', '+v.address;
  if(v.region) return v.name+', '+v.region;
  return v.lat+','+v.lng;
}

let venueMap = null;
let venueMapMarkers = {}; // id -> L.Marker
let venueMapBoundsFilterActive = false;
let venueMapCurrentBounds = null;
let venueMapEverFitted = false;

function ensureVenueMap(){
  if(venueMap) return venueMap;
  const el = document.getElementById('venueMap');
  if(!el || typeof L==='undefined') return null;
  venueMap = L.map(el).setView([44, 14], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(venueMap);
  venueMap.on('moveend', ()=>{
    if(!venueMapBoundsFilterActive) return;
    venueMapCurrentBounds = venueMap.getBounds();
    if(typeof renderVenues==='function') renderVenues();
  });
  return venueMap;
}

/* A real DOM node built once per marker (not a raw HTML string rebuilt on
   every popup open), so the "View in list" click handler is attached
   exactly once and never stacks duplicate handlers from reopening the
   same popup more than once. */
function buildVenuePopupContent(v){
  const el = document.createElement('div');
  el.className = 'venue-map-popup';

  // Curated venues get their airport from the hand-picked table above; a
  // custom venue carries its own (picked from the Add/Edit modal's
  // "Nearest airport" field), which also lets a curated venue's assignment
  // be corrected, or explicitly cleared (an own nearestAirport key set to
  // null, hence the hasOwnProperty check rather than v.nearestAirport ||
  // the table, which could never let a clear actually take effect).
  const airport = v.hasOwnProperty('nearestAirport') ? v.nearestAirport : VENUE_NEAREST_AIRPORT[v.id];
  const airportHasCoords = airport && typeof airport.lat==='number' && typeof airport.lng==='number';
  const distanceKm = airportHasCoords ? Math.round(haversineKm(v.lat, v.lng, airport.lat, airport.lng)) : null;
  const locationLine = v.address || v.region || '';

  // Kept deliberately short: name, location, picture, the airport
  // distance/directions, and a link back to the full card, everything
  // else (price, guest count, logistics details) is already one click
  // away in the list, and stuffing it all in here is what made the box
  // too tall for a compact map with no way to scroll and see the rest.
  el.innerHTML =
    '<img src="'+esc(venuePhotoUrl(v))+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
    + '<div class="venue-map-popup-body">'
      + '<b>'+esc(v.name)+'</b>'
      + (locationLine ? '<span class="venue-map-popup-line">'+esc(locationLine)+'</span>' : '')
      + (airportHasCoords ?
          '<span class="venue-map-popup-line">~'+distanceKm+' km from '+esc(airport.name)+(airport.code?' ('+esc(airport.code)+')':'')+'</span>'
          + '<a class="venue-map-popup-link" href="'+esc(googleMapsDirectionsUrl(airport.lat+','+airport.lng, encodeURIComponent(directionsDestinationQuery(v))))+'" target="_blank" rel="noopener">Get directions from '+esc(airport.code||airport.name)+' ↗</a>'
        : (airport && airport.name ? '<span class="venue-map-popup-line">Nearest airport: '+esc(airport.name)+'</span>' : ''))
      + '<button type="button" class="venue-map-popup-link venue-map-popup-view-list">View in list ↓</button>'
    + '</div>';

  el.querySelector('.venue-map-popup-view-list').addEventListener('click', e=>{
    e.preventDefault();
    e.stopPropagation();
    scrollToVenueCard(v.id);
  });
  return el;
}

/* Called from renderVenues() with exactly the array it's about to draw as
   cards, so the map's pins are always a mirror of the list, in bounds-
   filter mode as much as in the ordinary search/region/etc. filters. */
function updateVenueMapMarkers(filteredVenues){
  const map = ensureVenueMap();
  if(!map) return;
  const located = filteredVenues.filter(v=> typeof v.lat==='number' && typeof v.lng==='number');
  const locatedIds = new Set(located.map(v=>v.id));

  Object.keys(venueMapMarkers).forEach(id=>{
    if(!locatedIds.has(id)){ venueMapMarkers[id].remove(); delete venueMapMarkers[id]; }
  });

  located.forEach(v=>{
    const popupContent = buildVenuePopupContent(v);
    const existing = venueMapMarkers[v.id];
    if(existing){
      existing.setLatLng([v.lat, v.lng]);
      existing.setTooltipContent(esc(v.name));
      existing.setPopupContent(popupContent);
    } else {
      const marker = L.marker([v.lat, v.lng]).addTo(map);
      // A permanent name label next to every pin, since with 20+ identical
      // default markers on the map there was otherwise no way to tell
      // which one was which without clicking each one in turn.
      marker.bindTooltip(esc(v.name), { permanent:true, direction:'top', offset:[0,-30], className:'venue-map-label' });
      marker.bindPopup(popupContent, { minWidth:190, maxWidth:220, maxHeight:220, autoPanPadding:[20,20] });
      venueMapMarkers[v.id] = marker;
    }
  });

  // Auto-fit to whatever the list is showing, but only when the map itself
  // isn't the thing currently doing the filtering, panning to "helpfully"
  // refit while the user is mid-drag is exactly the fight this avoids.
  if(!venueMapBoundsFilterActive && located.length){
    const bounds = L.latLngBounds(located.map(v=>[v.lat, v.lng]));
    map.fitBounds(bounds, { padding:[30,30], maxZoom: venueMapEverFitted ? map.getZoom() : 11 });
    venueMapEverFitted = true;
  }
}

/* The other direction: renderVenues() calls this as one more filter
   predicate, alongside search/region/capacity/contacted/shortlisted. */
function venueMapBoundsFilterPasses(v){
  if(!venueMapBoundsFilterActive) return true;
  if(typeof v.lat!=='number' || typeof v.lng!=='number') return false;
  if(!venueMapCurrentBounds) return true;
  return venueMapCurrentBounds.contains([v.lat, v.lng]);
}

/* "Redirect to the venue in the list" needs the card to actually be in the
   DOM first. If some other filter (search text, a region, the map's own
   bounds-filter toggle) is currently hiding it, clear those first rather
   than silently doing nothing, or scrolling to wherever the page happened
   to already be, which is what looked like "jumps to the top". */
function scrollToVenueCard(id){
  let card = document.querySelector('.venue-card[data-venue-id="'+id+'"]');
  if(!card){
    ['venueSearch','venueRegionFilter','venueCapacityFilter','venueContactedFilter','venueShortlistedFilter'].forEach(elId=>{
      const el = document.getElementById(elId); if(el) el.value = '';
    });
    if(venueMapBoundsFilterActive){
      venueMapBoundsFilterActive = false;
      const toggle = document.getElementById('venueMapBoundsFilter'); if(toggle) toggle.checked = false;
      venueMapCurrentBounds = null;
    }
    if(typeof renderVenues==='function') renderVenues();
    card = document.querySelector('.venue-card[data-venue-id="'+id+'"]');
  }
  if(!card) return;
  card.scrollIntoView({behavior:'smooth', block:'center'});
  card.classList.add('venue-card-pinged');
  setTimeout(()=> card.classList.remove('venue-card-pinged'), 1600);
}

/* Lazily creates the map, retrying until Leaflet has actually finished
   loading rather than giving up silently: if the Venues tab happens to
   already be the active one on page load (very likely for anyone who
   checks it often, since the last-open tab is remembered), this can run
   before the Leaflet <script> tag has even finished downloading, and
   with no further tab switch to re-trigger it, the map would otherwise
   never get built or re-synced, e.g. a newly-pinned venue silently never
   showing up for someone who lands straight back on this tab. */
function onVenuesTabShown(){
  if(typeof L==='undefined'){ setTimeout(onVenuesTabShown, 150); return; }
  const map = ensureVenueMap();
  if(!map) return;
  setTimeout(()=>{
    map.invalidateSize();
    if(typeof renderVenues==='function') renderVenues();
  }, 50);
}
// Covers the "venues tab already active on page load" case; the showTab()
// hook in app-1.js covers switching to it later.
onVenuesTabShown();

document.getElementById('venueMapBoundsFilter')?.addEventListener('change', e=>{
  venueMapBoundsFilterActive = e.target.checked;
  if(venueMapBoundsFilterActive && venueMap){
    venueMapCurrentBounds = venueMap.getBounds();
  } else {
    venueMapCurrentBounds = null;
    venueMapEverFitted = false; // let the map re-fit to the full list again
  }
  if(typeof renderVenues==='function') renderVenues();
});
