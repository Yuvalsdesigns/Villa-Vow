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

function haversineKm(lat1, lng1, lat2, lng2){
  const R = 6371;
  const toRad = d=> d*Math.PI/180;
  const dLat = toRad(lat2-lat1), dLng = toRad(lng2-lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function googleMapsDirectionsUrl(fromLat, fromLng, toLat, toLng){
  return 'https://www.google.com/maps/dir/?api=1&origin='+fromLat+','+fromLng+'&destination='+toLat+','+toLng;
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

  const capacity = typeof extractVenueCapacity==='function' ? extractVenueCapacity(v) : null;
  const airport = VENUE_NEAREST_AIRPORT[v.id];
  const distanceKm = airport ? Math.round(haversineKm(v.lat, v.lng, airport.lat, airport.lng)) : null;

  const bullets = (typeof CUSTOM_VENUE_EXTRA_FIELDS!=='undefined' ? CUSTOM_VENUE_EXTRA_FIELDS : [])
    .filter(([key])=> (v[key]||'').trim())
    .map(([key,label])=> '<li><b>'+esc(label)+':</b> '+esc(v[key])+'</li>').join('');

  el.innerHTML =
    '<img src="'+esc(venuePhotoUrl(v))+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
    + '<div class="venue-map-popup-body">'
      + '<b>'+esc(v.name)+'</b>'
      + (v.region ? '<span class="venue-map-popup-line">'+esc(v.region)+'</span>' : '')
      + (v.address ? '<span class="venue-map-popup-line">'+esc(v.address)+'</span>' : '')
      + '<span class="venue-map-popup-line">'+esc(v.price||'')+(capacity!==null ? ' · ~'+capacity+' guests' : '')+'</span>'
      + (v.facts&&v.facts.length ? '<div class="venue-map-popup-facts">'+v.facts.map(f=>'<span class="fact">'+esc(f)+'</span>').join('')+'</div>' : '')
      + (bullets ? '<ul class="venue-contact-bullets">'+bullets+'</ul>' : '')
      + (airport ?
          '<span class="venue-map-popup-line">~'+distanceKm+' km from '+esc(airport.name)+' ('+esc(airport.code)+')</span>'
          + '<a class="venue-map-popup-link" href="'+esc(googleMapsDirectionsUrl(v.lat, v.lng, airport.lat, airport.lng))+'" target="_blank" rel="noopener">Get directions to '+esc(airport.code)+' ↗</a>'
        : '')
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
      marker.bindPopup(popupContent, { minWidth:230, maxWidth:260, maxHeight:280 });
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
