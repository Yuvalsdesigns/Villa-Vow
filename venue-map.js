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
     follow it, and turning it back off returns the list to normal. */

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
    const existing = venueMapMarkers[v.id];
    if(existing){
      existing.setLatLng([v.lat, v.lng]);
    } else {
      const marker = L.marker([v.lat, v.lng]).addTo(map);
      // A permanent name label next to every pin, since with 20+ identical
      // default markers on the map there was otherwise no way to tell
      // which one was which without clicking each one in turn.
      marker.bindTooltip(esc(v.name), { permanent:true, direction:'top', offset:[0,-30], className:'venue-map-label' });
      marker.bindPopup('', { minWidth: 220 });
      marker.on('popupopen', ()=>{
        const popupEl = marker.getPopup().getElement();
        const btn = popupEl && popupEl.querySelector('.venue-map-popup-link');
        if(btn) btn.addEventListener('click', ()=> scrollToVenueCard(v.id));
      });
      venueMapMarkers[v.id] = marker;
    }
    venueMapMarkers[v.id].setTooltipContent(esc(v.name));
    venueMapMarkers[v.id].setPopupContent(
      '<div class="venue-map-popup">'
      + '<img src="'+esc(venuePhotoUrl(v))+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
      + '<div class="venue-map-popup-body">'
        + '<b>'+esc(v.name)+'</b>'
        + (v.region ? '<span class="venue-map-popup-region">'+esc(v.region)+'</span>' : '')
        + (v.price ? '<span class="venue-map-popup-price">'+esc(v.price)+'</span>' : '')
        + '<button type="button" class="venue-map-popup-link">View in list ↓</button>'
      + '</div>'
      + '</div>'
    );
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

function scrollToVenueCard(id){
  const card = document.querySelector('.venue-card[data-venue-id="'+id+'"]');
  if(!card) return;
  card.scrollIntoView({behavior:'smooth', block:'center'});
  card.classList.add('venue-card-pinged');
  setTimeout(()=> card.classList.remove('venue-card-pinged'), 1600);
}

/* Lazily creates the map the first time the Venues tab is actually shown
   (see showTab() in app-1.js), and re-measures it every time, since a map
   built while its container was display:none renders broken/blank tiles
   until told its size changed. */
function onVenuesTabShown(){
  const map = ensureVenueMap();
  if(!map) return;
  setTimeout(()=>{
    map.invalidateSize();
    if(typeof renderVenues==='function') renderVenues();
  }, 50);
}

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
