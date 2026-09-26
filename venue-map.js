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

/* A pick-list of major European/Mediterranean airports: the "Nearest
   airport" field on any venue (curated or custom) picks from this same
   list, so there's exactly one source of truth for an airport's
   coordinates and details, not two copies that could drift apart.
   Covers the countries this app's own curated destinations already span,
   plus other common ones a venue you add yourself might be near. Not
   exhaustive: the field also accepts any free-typed name that isn't in
   this list, just without a distance or directions link, since there'd
   be no coordinates to compute either from.

   `primary:false` marks the handful of airports that share a metro area
   with a clearly bigger sibling already in this list (e.g. Milan Linate
   and Bergamo next to Malpensa) so the map can call that one out as the
   main international gateway; every other entry is the only realistic
   option for its own city/region, so it's primary by default (the key is
   simply left off rather than set true on all ~60 of them). This is a
   judgment call only made where it's genuinely well known, not a formal
   domestic/international classification, since nearly every airport
   here does handle international flights at some level. */
const AIRPORTS = [
  {code:'FCO',name:'Rome Fiumicino Airport',city:'Rome, Italy',lat:41.8003,lng:12.2389},
  {code:'CIA',name:'Rome Ciampino Airport',city:'Rome, Italy',lat:41.7994,lng:12.5949,primary:false},
  {code:'MXP',name:'Milan Malpensa Airport',city:'Milan, Italy',lat:45.6306,lng:8.7281},
  {code:'LIN',name:'Milan Linate Airport',city:'Milan, Italy',lat:45.4451,lng:9.2767,primary:false},
  {code:'BGY',name:'Milan Bergamo Airport',city:'Milan, Italy',lat:45.6739,lng:9.7042,primary:false},
  {code:'VCE',name:'Venice Marco Polo Airport',city:'Venice, Italy',lat:45.5053,lng:12.3519},
  {code:'FLR',name:'Florence Airport',city:'Florence, Italy',lat:43.8100,lng:11.2051},
  {code:'PSA',name:'Pisa Airport',city:'Pisa / Tuscany, Italy',lat:43.6839,lng:10.3927},
  {code:'BLQ',name:'Bologna Airport',city:'Bologna, Italy',lat:44.5354,lng:11.2887},
  {code:'NAP',name:'Naples Capodichino Airport',city:'Naples, Italy',lat:40.8860,lng:14.2908},
  {code:'BRI',name:'Bari Karol Wojtyła Airport',city:'Bari, Italy',lat:41.1389,lng:16.7606},
  {code:'BDS',name:'Brindisi Airport',city:'Brindisi / Puglia, Italy',lat:40.6576,lng:17.9470,primary:false},
  {code:'CTA',name:'Catania Airport',city:'Catania, Italy',lat:37.4668,lng:15.0664},
  {code:'PMO',name:'Palermo Airport',city:'Palermo, Italy',lat:38.1760,lng:13.0910},
  {code:'VRN',name:'Verona Airport',city:'Verona, Italy',lat:45.3957,lng:10.8885},
  {code:'TRN',name:'Turin Airport',city:'Turin, Italy',lat:45.2008,lng:7.6497},
  {code:'GOA',name:'Genoa Airport',city:'Genoa, Italy',lat:44.4133,lng:8.8375},
  {code:'PEG',name:"Perugia San Francesco d'Assisi Airport",city:'Perugia / Umbria, Italy',lat:43.0959,lng:12.5133,primary:false},
  {code:'OLB',name:'Olbia Airport',city:'Olbia / North Sardinia, Italy',lat:40.8987,lng:9.5175},
  {code:'CAG',name:'Cagliari Airport',city:'Cagliari / South Sardinia, Italy',lat:39.2515,lng:9.0543},
  {code:'CDG',name:'Paris Charles de Gaulle Airport',city:'Paris, France',lat:49.0097,lng:2.5479},
  {code:'ORY',name:'Paris Orly Airport',city:'Paris, France',lat:48.7233,lng:2.3794,primary:false},
  {code:'NCE',name:"Nice Côte d'Azur Airport",city:'Nice, France',lat:43.6584,lng:7.2159},
  {code:'MRS',name:'Marseille Provence Airport',city:'Marseille, France',lat:43.4393,lng:5.2214},
  {code:'LYS',name:'Lyon Airport',city:'Lyon, France',lat:45.7256,lng:5.0811},
  {code:'TLS',name:'Toulouse Airport',city:'Toulouse, France',lat:43.6293,lng:1.3638},
  {code:'BOD',name:'Bordeaux Airport',city:'Bordeaux, France',lat:44.8283,lng:-0.7156},
  {code:'NTE',name:'Nantes Airport',city:'Nantes, France',lat:47.1532,lng:-1.6107},
  {code:'MPL',name:'Montpellier Airport',city:'Montpellier, France',lat:43.5762,lng:3.9630,primary:false},
  {code:'LIS',name:'Lisbon Airport',city:'Lisbon, Portugal',lat:38.7813,lng:-9.1359},
  {code:'OPO',name:'Porto Airport',city:'Porto, Portugal',lat:41.2481,lng:-8.6814},
  {code:'FAO',name:'Faro Airport',city:'Faro / Algarve, Portugal',lat:37.0144,lng:-7.9659},
  {code:'MAD',name:'Madrid Barajas Airport',city:'Madrid, Spain',lat:40.4936,lng:-3.5668},
  {code:'BCN',name:'Barcelona Airport',city:'Barcelona, Spain',lat:41.2974,lng:2.0833},
  {code:'AGP',name:'Málaga Airport',city:'Málaga, Spain',lat:36.6749,lng:-4.4991},
  {code:'PMI',name:'Palma de Mallorca Airport',city:'Mallorca, Spain',lat:39.5517,lng:2.7388},
  {code:'IBZ',name:'Ibiza Airport',city:'Ibiza, Spain',lat:38.8729,lng:1.3731},
  {code:'VLC',name:'Valencia Airport',city:'Valencia, Spain',lat:39.4893,lng:-0.4816},
  {code:'SVQ',name:'Seville Airport',city:'Seville, Spain',lat:37.4180,lng:-5.8931},
  {code:'ATH',name:'Athens Airport',city:'Athens, Greece',lat:37.9364,lng:23.9445},
  {code:'JTR',name:'Santorini Airport',city:'Santorini, Greece',lat:36.3992,lng:25.4793},
  {code:'JMK',name:'Mykonos Airport',city:'Mykonos, Greece',lat:37.4351,lng:25.3481},
  {code:'CHQ',name:'Chania Airport',city:'Chania / West Crete, Greece',lat:35.5317,lng:24.1497},
  {code:'HER',name:'Heraklion Airport',city:'Heraklion / East Crete, Greece',lat:35.3397,lng:25.1803},
  {code:'CFU',name:'Corfu Airport',city:'Corfu, Greece',lat:39.6019,lng:19.9117},
  {code:'RHO',name:'Rhodes Airport',city:'Rhodes, Greece',lat:36.4054,lng:28.0862},
  {code:'ZAG',name:'Zagreb Airport',city:'Zagreb, Croatia',lat:45.7429,lng:16.0688},
  {code:'SPU',name:'Split Airport',city:'Split, Croatia',lat:43.5389,lng:16.2980},
  {code:'DBV',name:'Dubrovnik Airport',city:'Dubrovnik, Croatia',lat:42.5614,lng:18.2682},
  {code:'PUY',name:'Pula Airport',city:'Pula / Istria, Croatia',lat:44.8935,lng:13.9222},
  {code:'ZAD',name:'Zadar Airport',city:'Zadar, Croatia',lat:44.1083,lng:15.3467},
  {code:'TGD',name:'Podgorica Airport',city:'Podgorica, Montenegro',lat:42.3594,lng:19.2519},
  {code:'TIV',name:'Tivat Airport',city:'Tivat / Bay of Kotor, Montenegro',lat:42.4047,lng:18.7233},
  {code:'LJU',name:'Ljubljana Airport',city:'Ljubljana, Slovenia',lat:46.2237,lng:14.4576},
  {code:'TIA',name:'Tirana International Airport',city:'Tirana, Albania',lat:41.4147,lng:19.7206},
  {code:'OHD',name:'Ohrid St. Paul the Apostle Airport',city:'Ohrid, North Macedonia',lat:41.1800,lng:20.7423},
  {code:'SKP',name:'Skopje Airport',city:'Skopje, North Macedonia',lat:41.9616,lng:21.6214},
  {code:'GVA',name:'Geneva Airport',city:'Geneva, Switzerland',lat:46.2381,lng:6.1090},
  {code:'ZRH',name:'Zurich Airport',city:'Zurich, Switzerland',lat:47.4647,lng:8.5492},
  {code:'VIE',name:'Vienna Airport',city:'Vienna, Austria',lat:48.1103,lng:16.5697},
  {code:'SZG',name:'Salzburg Airport',city:'Salzburg, Austria',lat:47.7933,lng:13.0043},
  {code:'MUC',name:'Munich Airport',city:'Munich, Germany',lat:48.3538,lng:11.7861},
  {code:'FRA',name:'Frankfurt Airport',city:'Frankfurt, Germany',lat:50.0379,lng:8.5622},
  {code:'BER',name:'Berlin Brandenburg Airport',city:'Berlin, Germany',lat:52.3667,lng:13.5033},
  {code:'MLA',name:'Malta International Airport',city:'Malta',lat:35.8575,lng:14.4775},
  {code:'LCA',name:'Larnaca Airport',city:'Larnaca, Cyprus',lat:34.8751,lng:33.6249},
  {code:'PFO',name:'Paphos Airport',city:'Paphos, Cyprus',lat:34.7180,lng:32.4857},
];
function airportLabel(a){ return a.name+' ('+a.code+')'; }
function findAirportByLabel(label){ return AIRPORTS.find(a=> airportLabel(a)===label); }
function airportByCode(code){ return AIRPORTS.find(a=> a.code===code); }

/* Each curated venue's nearest airport, by code, looked up against
   AIRPORTS above rather than duplicating its coordinates/city/primary
   details a second time here. */
const VENUE_NEAREST_AIRPORT_CODE = {
  'tuscany':'FLR', 'puglia':'BRI', 'provence':'MRS', 'algarve':'FAO', 'dajas':'OPO',
  'kotor':'TIV', 'stari-mlin':'TIV', 'huma-kotor':'TIV',
  'lake-orta-laqua':'MXP', 'lake-iseo-catilina':'BGY', 'villa-helene':'BGY', 'lake-maggiore-royal':'MXP',
  'villa-clodia':'FCO', 'rocca-romana':'FCO', 'podere-sant-antonio':'FCO', 'poderaccio-bolsena':'FCO',
  'cilento-castello':'NAP', 'il-pilaccio':'NAP', 'umbria-monastero':'PEG',
  'villa-poropati':'PUY', 'borgo-lapis':'PUY', 'procida':'NAP',
  'lake-ohrid':'OHD', 'albanian-riviera':'TIA', 'lake-bohinj':'LJU', 'la-darbia':'MXP',
};

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

/* A marker's own icon opening its bound popup on click is normal Leaflet
   behavior, but its permanent name-label tooltip is a separate DOM element
   layered on top of it, and relying on Leaflet's own "interactive tooltip"
   internals to also forward a label click into a marker 'click' event
   proved unreliable in practice. Wiring a plain, direct click listener onto
   the real rendered elements themselves (both the marker's icon and its
   tooltip's own element) sidesteps that entirely: no assumption about how
   Leaflet forwards or delegates the event internally, just "this real DOM
   node was clicked, open this popup". tooltipopen/add cover the marker's
   icon or tooltip not existing yet at the moment bindTooltip/bindPopup is
   called. */
function wireMarkerOpensPopup(marker){
  function attach(el){
    if(!el || el.__vvPopupClickWired) return;
    el.__vvPopupClickWired = true;
    el.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      marker.openPopup();
    });
  }
  attach(marker.getElement && marker.getElement());
  const tooltip = marker.getTooltip && marker.getTooltip();
  attach(tooltip && tooltip.getElement && tooltip.getElement());
  marker.on('tooltipopen', function(){
    const tt = marker.getTooltip && marker.getTooltip();
    attach(tt && tt.getElement && tt.getElement());
  });
  marker.on('add', function(){ attach(marker.getElement && marker.getElement()); });
}

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
  // Belt-and-suspenders: whatever a click anywhere on the map resolves to
  // (a marker, its label, or bare map background), it should never fall
  // through to a native browser default action like a page jump.
  venueMap.on('click', e=>{
    if(e.originalEvent && typeof e.originalEvent.preventDefault==='function') e.originalEvent.preventDefault();
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
  const airport = v.hasOwnProperty('nearestAirport') ? v.nearestAirport : airportByCode(VENUE_NEAREST_AIRPORT_CODE[v.id]);
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

/* renderVenues() runs once per Firestore collection that happens to
   touch the venues view (venueContacts, venueFavorites, customVenues,
   venueOverrides, ...), each syncing independently, so a fresh page load
   can fire it several times in a tight burst as each one's first
   snapshot arrives, rather than once. Rebuilding and re-fitting the map
   on every single one of those (tearing down and rebuilding a marker's
   popup DOM repeatedly, right as someone might be trying to click it,
   plus panning the view mid-burst) is exactly the kind of churn that
   makes the map feel like it takes forever to settle down after a
   refresh, and made a click that landed mid-rebuild behave strangely.
   Coalescing rapid calls into one, on the next animation frame, using
   whichever filtered list was passed last, fixes both: far less DOM
   churn, and a click only ever lands on a marker that isn't mid-rebuild. */
let venueMapPendingFiltered = null, venueMapUpdateScheduled = false;
function updateVenueMapMarkers(filteredVenues){
  venueMapPendingFiltered = filteredVenues;
  if(venueMapUpdateScheduled) return;
  venueMapUpdateScheduled = true;
  requestAnimationFrame(()=>{
    venueMapUpdateScheduled = false;
    applyVenueMapMarkers(venueMapPendingFiltered);
  });
}
/* A venue's own fields relevant to its marker, so a render triggered by
   an unrelated collection (say, a budget change firing renderVenues()
   indirectly through some other path) doesn't tear down and rebuild
   every single popup/tooltip when nothing about the venues themselves
   actually changed. */
function venueMapSignature(v){
  const airport = v.hasOwnProperty('nearestAirport') ? v.nearestAirport : airportByCode(VENUE_NEAREST_AIRPORT_CODE[v.id]);
  return JSON.stringify([v.name, v.region, v.address, v.lat, v.lng, airport && airport.code, airport && airport.name]);
}
let venueMapSignatures = {};
function applyVenueMapMarkers(filteredVenues){
  const map = ensureVenueMap();
  if(!map) return;
  const located = filteredVenues.filter(v=> typeof v.lat==='number' && typeof v.lng==='number');
  const locatedIds = new Set(located.map(v=>v.id));

  Object.keys(venueMapMarkers).forEach(id=>{
    if(!locatedIds.has(id)){ venueMapMarkers[id].remove(); delete venueMapMarkers[id]; delete venueMapSignatures[id]; }
  });

  located.forEach(v=>{
    const existing = venueMapMarkers[v.id];
    const signature = venueMapSignature(v);
    const unchanged = existing && venueMapSignatures[v.id]===signature;
    if(existing){
      existing.setLatLng([v.lat, v.lng]);
      if(!unchanged){
        existing.setTooltipContent(esc(v.name));
        existing.setPopupContent(buildVenuePopupContent(v));
      }
    } else {
      const popupContent = buildVenuePopupContent(v);
      const marker = L.marker([v.lat, v.lng]).addTo(map);
      // A permanent name label next to every pin, since with 20+ identical
      // default markers on the map there was otherwise no way to tell
      // which one was which without clicking each one in turn. Leaflet
      // tooltips are non-interactive by default (clicks pass straight
      // through to the bare map underneath, doing nothing useful), so the
      // label looked clickable but wasn't; interactive:true plus an
      // explicit click handler makes clicking the name open the same
      // popup as clicking the pin itself, not just the icon.
      marker.bindTooltip(esc(v.name), { permanent:true, direction:'top', offset:[0,-30], className:'venue-map-label', interactive:true });
      marker.bindPopup(popupContent, { minWidth:190, maxWidth:220, maxHeight:220, autoPanPadding:[20,20] });
      wireMarkerOpensPopup(marker);
      venueMapMarkers[v.id] = marker;
    }
    venueMapSignatures[v.id] = signature;
  });

  // Auto-fit to whatever the list is showing, but only when the map itself
  // isn't the thing currently doing the filtering, panning to "helpfully"
  // refit while the user is mid-drag is exactly the fight this avoids.
  if(!venueMapBoundsFilterActive && located.length){
    const bounds = L.latLngBounds(located.map(v=>[v.lat, v.lng]));
    map.fitBounds(bounds, { padding:[30,30], maxZoom: venueMapEverFitted ? map.getZoom() : 11 });
    venueMapEverFitted = true;
  }

  updateAirportMarkers(located);
}

let venueMapAirportMarkers = {}; // airport code (or name, if code-less) -> L.Marker
/* A plain emoji glyph rather than a hand-drawn SVG path: guaranteed to
   render as a clearly recognizable airplane on every device's own emoji
   font, with none of the risk of a custom path looking wrong without a
   way to preview it first. */
function airportDivIcon(){
  return L.divIcon({
    html: '<div class="venue-map-airport-icon">✈️</div>',
    className: 'venue-map-airport-icon-wrap',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}
function buildAirportPopupContent(airport){
  const el = document.createElement('div');
  el.className = 'venue-map-popup';
  el.innerHTML =
    '<div class="venue-map-popup-body">'
    + '<b>'+esc(airport.name)+(airport.code ? ' ('+esc(airport.code)+')' : '')+'</b>'
    + (airport.city ? '<span class="venue-map-popup-line">'+esc(airport.city)+'</span>' : '')
    + '<span class="venue-map-popup-line">'+(airport.primary===false ? 'Secondary airport for this area' : 'Main airport for this area')+'</span>'
    + '</div>';
  return el;
}
/* Only the airports actually relevant to whichever venues are currently
   shown, not the full ~65-airport list, since a plane icon for every one
   of them at once would be its own kind of clutter and most would be
   nowhere near what's actually on screen. This is what gives an at-a-
   glance sense of how far each venue's airport really is: a venue's own
   popup already has the exact distance, but seeing both pins together on
   the same map is the more immediate, visual version of that. */
function updateAirportMarkers(locatedVenues){
  const map = ensureVenueMap();
  if(!map) return;
  const relevant = new Map();
  locatedVenues.forEach(v=>{
    const airport = v.hasOwnProperty('nearestAirport') ? v.nearestAirport : airportByCode(VENUE_NEAREST_AIRPORT_CODE[v.id]);
    if(airport && typeof airport.lat==='number' && typeof airport.lng==='number'){
      relevant.set(airport.code || airport.name, airport);
    }
  });

  Object.keys(venueMapAirportMarkers).forEach(key=>{
    if(!relevant.has(key)){ venueMapAirportMarkers[key].remove(); delete venueMapAirportMarkers[key]; }
  });

  relevant.forEach((airport, key)=>{
    if(venueMapAirportMarkers[key]) return; // airport details never change under a stable key, nothing to update
    const marker = L.marker([airport.lat, airport.lng], { icon: airportDivIcon() }).addTo(map);
    marker.bindTooltip(esc(airport.code || airport.name), { permanent:true, direction:'top', offset:[0,-16], className:'venue-map-label venue-map-airport-label', interactive:true });
    marker.bindPopup(buildAirportPopupContent(airport), { minWidth:170, maxWidth:210, maxHeight:160 });
    wireMarkerOpensPopup(marker);
    venueMapAirportMarkers[key] = marker;
  });
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
