"use strict";

const VENUES_PART_1 = [
  {
    "id": "tuscany",
    "name": "Tuscany",
    "region": "Florence & Chianti, Italy",
    "price": "€€€–€€€€",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "desc": "The most kosher-ready region in Europe for a wedding: dedicated kosher caterers and even a kosher winery operate here, and several villas have hosted full Orthodox weddings before.",
    "facts": [
      "Kosher kitchen: proven",
      "Chuppah: outdoor terraces & gardens",
      "Direct flights TLV & Paris → Florence/Pisa"
    ],
    "sources": [
      [
        "Villa Medicea di Lilliano wedding",
        "https://www.smashingtheglass.com/a-romantic-destination-jewish-wedding-at-villa-medicea-di-lilliano-tuscany-italy/"
      ],
      [
        "Kosher catering guide",
        "https://www.kosherculinarytravel.com/planning-a-luxury-kosher-destination-wedding-in-tuscany-the-complete-guide/"
      ]
    ],
    "image": "https://cdn0.matrimonio.com/vendor/6285/3_2/960/jpg/unnamed_2_16285-172018582288128.jpeg"
  },
  {
    "id": "puglia",
    "name": "Puglia",
    "region": "Valle d’Itria & the Adriatic coast, Italy",
    "price": "€€–€€€",
    "grad": [
      "#F2DFC0",
      "#C99A4E"
    ],
    "desc": "Whitewashed masserias (fortified farmhouses) that sleep 30–40+ guests on-site with a pool built in: the closest fit to a private \"everyone under one roof\" villa weekend, at a gentler price than Tuscany.",
    "facts": [
      "Masserias sleeping 30–40 guests",
      "Built-in pools for the day-after party",
      "Fewer direct flights: often via Rome/Milan"
    ],
    "sources": [
      [
        "Puglia wedding venues",
        "https://www.wedinspire.com/wedding-venues/puglia/"
      ],
      [
        "Large-group villas in Puglia",
        "https://www.onestopitaly.com/villas-by-size/villas-for-large-groups/villas-with-pool-sleeping-30-to-40-people/"
      ]
    ],
    "image": "https://d3emaq2p21aram.cloudfront.net/media/cache/report_image_flex/uploads/0_BLOG/2018/4-April/MasseriaPotenti/MasseriaPotenti-MangoRedStudios-013.jpg"
  },
  {
    "id": "provence",
    "name": "Provence",
    "region": "Luberon & the Var, South of France",
    "price": "€€€–€€€€",
    "grad": [
      "#D9CFEA",
      "#8C6CA8"
    ],
    "desc": "The easiest region for your French guests, and Paris-based kosher caterers travel here regularly. Bastides and domaines rent out privately, some sleeping 30+ guests across several houses on one estate.",
    "facts": [
      "Bastides sleeping 30+ across estate",
      "Kosher caterers travel from Paris",
      "Israel guests: connect via Nice, Marseille or Paris"
    ],
    "sources": [
      [
        "Jewish wedding in Provence",
        "https://www.smashingtheglass.com/jewish-wedding-in-provence/"
      ],
      [
        "Kosher/dietary planning in France",
        "https://www.frenchweddingstyle.com/planning-a-destination-wedding-in-france/dietary-requirements/"
      ]
    ],
    "image": "https://cdn0.mariages.net/vendor/7928/3_2/1280/jpg/clos-du-tuilier-valentine-kagenaar-2_3_167928-175829157884321.jpeg"
  },
  {
    "id": "algarve",
    "name": "The Algarve",
    "region": "Lagos & Praia da Luz, Portugal",
    "price": "€€–€€€",
    "grad": [
      "#CFE3ED",
      "#4A6C8C"
    ],
    "desc": "The most budget-friendly of the four, with a growing Jewish-wedding scene and villa collections built specifically for weddings on a private hillside. Kosher catering is possible but has fewer providers, so confirm early.",
    "facts": [
      "Best value of the four regions",
      "Villa collections built for weddings",
      "Kosher catering: fewer providers, book early"
    ],
    "sources": [
      [
        "Jewish destination wedding in Portugal",
        "https://elegantebymichellej.com/jewish-destination-wedding-in-portugal/"
      ],
      [
        "Algarve wedding villas",
        "https://www.casamontecristocollection.com/algarve-weddings/"
      ]
    ],
    "image": "https://www.algarveweddingsatelier.com/downloads/venues/4/galeria/mattlenaphotographyalgarveweddingphotography31.jpg"
  },
  {
    "id": "dajas",
    "name": "Dájas Douro Valley",
    "region": "São Lourenço do Douro, Portugal",
    "price": "TBD: inquire",
    "badge": "Your find",
    "grad": [
      "#C9DFC3",
      "#C99A4E"
    ],
    "desc": "The one you fell for. A small exclusive-villa property on the Douro river, not branded as a wedding venue but has hosted private weddings before: worth an email before you fall any harder. Sleeps a smaller group than the other four, so it suits a more intimate guest list.",
    "facts": [
      "On-site: 11 rooms now, growing to 17 in 2025",
      "Hosts weddings & private events, per past guests",
      "Kosher catering: unconfirmed: needs outreach",
      "Direct EL AL flight TLV↔Porto weekly; frequent Paris↔Porto flights"
    ],
    "sources": [
      [
        "Booking.com listing (your link)",
        "https://www.booking.com/hotel/pt/dajas-douro-valley-suites.html"
      ],
      [
        "Wedding rental listing",
        "https://www.casamentos.pt/quintas-para-casamentos/dajas-douro-valley-exclusive-villas--e112330"
      ],
      [
        "Guest review mentioning a full-resort wedding",
        "https://www.tripadvisor.com/ShowUserReviews-g1510701-d27952186-r1012947915-Dajas_Douro_Valley_Exclusive_Villas-Sao_Lourenco_do_Douro_Porto_District_Nort.html"
      ]
    ],
    "emailIndex": 7,
    "image": "https://images.squarespace-cdn.com/content/v1/671395e27373782978efabd4/41a258a5-6fc4-49e6-88db-7c2787a12558/W-P-Rebecca-Blake-0035.JPG"
  }
];

const VENUES_PART_2 = [
  {
    "id": "kotor",
    "name": "Bay of Kotor",
    "region": "Montenegro: Dobrota, Perast, Luštica & Kamenari",
    "price": "€€–€€€",
    "badge": "Hidden gem",
    "grad": [
      "#CFE3ED",
      "#4A6C8C"
    ],
    "image": "https://i.wfolio.com/x/39l3Od3I0TScO-C7ogYk09i9CruhLnn_/RzIRyqiHlyCs2ti9VQSAqG9OcA5KEMg6/DGGRlxnZHPxDv93h-E3ibDZhiLxh4KB8/M_EocYBeidc_VoCi4AWBbLF6fbvqe2OR/0Iq06Qby8t6Z_6jofn0OTKezJwM0ncmn/fKuwOTtxplU.jpg",
    "desc": "One of the strongest 'Lake Como feeling for less' candidates: dramatic mountains, deep blue water and stone villages. Search beyond Kotor itself.",
    "facts": [
      "Huge visual wow",
      "Villa + hotel cluster possible",
      "Tivat airport nearby",
      "Kosher + rabbi: verify before deposit"
    ],
    "sources": [
      [
        "Villa Nikčević wedding",
        "https://esbiweddings.com/real-weddings-events/villa-nikcevic-wedding-kotor-bay-yeva-myhajlo"
      ],
      [
        "Villa Stari Mlin",
        "https://www.villastarimlin.com/weddings"
      ],
      [
        "Kotor Bay wedding venues",
        "https://www.montenegromoments.com/events"
      ]
    ]
  },
  {
    "id": "stari-mlin",
    "name": "Villa Stari Mlin",
    "region": "Luštica Peninsula, Bay of Kotor, Montenegro",
    "price": "Known hire, inquire",
    "badge": "Small group",
    "grad": [
      "#CFE3ED",
      "#4A6C8C"
    ],
    "image": "https://images.squarespace-cdn.com/content/v1/62a716733b2f670eda0f4a71/f49fec49-d99e-4262-9d39-d03bb5804dc0/IMG_6781.png",
    "desc": "A restored 400-year-old olive mill with a private pool and sweeping Bay of Kotor views. It is intentionally intimate, so think of it as the couple / VIP villa rather than the whole guest solution.",
    "facts": [
      "Exclusive-use wedding venue",
      "Sleeps 10; wedding day up to 30",
      "Private pool + bay views",
      "Excellent couple / family base"
    ],
    "sources": [
      [
        "Official wedding page",
        "https://www.villastarimlin.com/weddings"
      ],
      [
        "2026 pricing page",
        "https://villasm-byro.squarespace.com/weddings-pricing"
      ]
    ]
  },
  {
    "id": "huma-kotor",
    "name": "Huma Kotor Bay",
    "region": "Dobrota, Bay of Kotor, Montenegro",
    "price": "€€€",
    "badge": "Hotel + villas",
    "grad": [
      "#DDE8EC",
      "#4A6C8C"
    ],
    "desc": "More hotel-like than a private estate, but interesting because it combines accommodation, waterfront ceremony spaces and a larger hospitality operation in one place.",
    "facts": [
      "Hotel + villas",
      "Waterfront ceremony options",
      "Full hotel privatization available",
      "Good logistics candidate"
    ],
    "sources": [
      [
        "Official weddings page",
        "https://www.humahotel.me/weddings/"
      ],
      [
        "Official events page",
        "https://www.humahotel.me/event-venue/"
      ]
    ],
    "image": "https://images.myguide-cdn.com/montenegro/companies/huma-kotor-bay/slider/huma-kotor-bay-1314285.jpg"
  },
  {
    "id": "lake-orta-laqua",
    "name": "Lake Orta / Laqua by the Lake",
    "region": "Pettenasco, Lake Orta, Piedmont, Italy",
    "price": "€€€",
    "badge": "Lake Como alternative",
    "grad": [
      "#DDE8EC",
      "#5F7F91"
    ],
    "image": "https://static.wixstatic.com/media/5a1aa1_cd48d7e5d0ff469ab68dc3d4a7b249df~mv2.jpg/v1/fill/w_980%2Ch_735%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/5a1aa1_cd48d7e5d0ff469ab68dc3d4a7b249df~mv2.jpg",
    "desc": "Lake Orta is exactly the kind of lesser-known Italian lake your friend was talking about. Laqua has 19 suites, an infinity pool and direct lake access, but its event capacity is intimate.",
    "facts": [
      "19 suites at Laqua",
      "Infinity pool + lake access",
      "Events up to 50",
      "Strong visual match to your brief"
    ],
    "sources": [
      [
        "Laqua by the Lake",
        "https://laquabythelake.it/en/home/events/"
      ],
      [
        "Lake Orta wedding venues",
        "https://www.matrimonio.com/ricevimento/lago-dorta"
      ]
    ]
  },
  {
    "id": "lake-iseo-catilina",
    "name": "La Catilina",
    "region": "Lake Iseo, Lombardy, Italy",
    "price": "€€–€€€",
    "badge": "High priority",
    "grad": [
      "#CFE3ED",
      "#4A6C8C"
    ],
    "desc": "Lake Iseo is one of the best 'Como but less obvious' searches. La Catilina is an old farmhouse among olive trees and vineyards with panoramic lake views and exclusive event-day use.",
    "facts": [
      "10+ hectares",
      "Lake + olive groves + vineyards",
      "Hall 150+ / gazebo 100+",
      "Exclusive-use event day",
      "35-40 min from Milan Bergamo (budget-airline hub)"
    ],
    "sources": [
      [
        "Official venue",
        "https://www.lacatilina.it/en/"
      ],
      [
        "Lake Iseo wedding comparison",
        "https://www.lacatilina.it/en/blog/lake-iseo-vs-lake-como-which-italian-lake-is-right-for-your-wedding/"
      ]
    ],
    "image": "https://www.lacatilina.it/sposi-giardino-vista-lago-iseo-franciacorta.webp"
  }
];


"use strict";

const VENUES_PART_3 = [
  {
    "id": "villa-helene",
    "name": "Villa Hélène",
    "region": "Lake Iseo, Lombardy, Italy",
    "price": "TBD",
    "badge": "Multi-day fit",
    "grad": [
      "#DDE8EC",
      "#6A8798"
    ],
    "desc": "This one is particularly aligned with your weekend idea. The estate explicitly welcomes multi-day celebrations and lets clients bring their own caterer, which is worth investigating for kosher catering. Like the rest of Lake Iseo, it's priced well below Lake Como or Garda for a comparable venue.",
    "facts": [
      "80 seated / 90 standing",
      "1–4 day events",
      "Bring-your-own catering allowed",
      "Exclusive estate",
      "35-40 min from Milan Bergamo (budget-airline hub)"
    ],
    "sources": [
      [
        "Official private events page",
        "https://villahelene.it/eventi-privati/"
      ]
    ],
    "image": "https://villahelene.it/wp-content/uploads/2026/06/image-placeholder-the-estate-at-golden-hour-scaled.jpg"
  },
  {
    "id": "lake-maggiore-royal",
    "name": "Royal Villa 4",
    "region": "Lake Maggiore, Stresa, Italy",
    "price": "€€€",
    "badge": "Lake alternative",
    "grad": [
      "#DDE8EC",
      "#6A8798"
    ],
    "desc": "A classic grand-lake alternative with historic architecture and a terrace. It can host up to around 100 guests, with limited on-site rooms, so it is more of a venue + nearby accommodation model.",
    "facts": [
      "Up to 100 guests",
      "Historic villa + lake views",
      "Some on-site rooms",
      "Stresa accommodation ecosystem"
    ],
    "sources": [
      [
        "Lake Maggiore wedding venue",
        "https://www.lakemaggioreweddings.it/villa-royal-4"
      ]
    ]
  },
  {
    "id": "villa-clodia",
    "name": "Villa Clodia / Lake Bracciano",
    "region": "Manziana, Lake Bracciano, near Rome, Italy",
    "price": "€€€",
    "badge": "Lake + Rome",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "desc": "A Lake Bracciano search zone with historic villas, pool settings and easy access to Rome. Villa Clodia is one strong lead; Tenuta Il Possesso is another property to compare.",
    "facts": [
      "Lake + pool wedding options",
      "Large event capacity available",
      "Indoor backup options",
      "Easy Rome access"
    ],
    "sources": [
      [
        "Villa Clodia official weddings",
        "https://www.villaclodia.com/en/matrimonio-a-villa-clodia"
      ],
      [
        "Tenuta Il Possesso",
        "https://www.ilpossesso.it/"
      ]
    ],
    "image": "https://cdn0.matrimonio.com/vendor/2385/3_2/960/jpg/527ca1dc-7dfc-4849-a405-57600c7193f8_2_12385-176312855525417.jpeg"
  },
  {
    "id": "rocca-romana",
    "name": "Residenza di Rocca Romana",
    "region": "Lake Bracciano, Italy",
    "price": "€€",
    "badge": "Weekend fit",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "desc": "This is one of the most on-brief discoveries: a small private village with cottages and apartments, a pool, and a site that explicitly describes the day-after pool party concept.",
    "facts": [
      "Small village feel",
      "Cottages + apartments",
      "Pool",
      "Guests can stay and continue partying next day"
    ],
    "sources": [
      [
        "Official site",
        "https://www.roccaromana.com/?lang=en"
      ]
    ],
    "image": "https://cdn0.hitched.co.uk/vendor/4129/3_2/1280/jpg/05-2-148126-163794824571319_4_2250-167100456773282.jpeg"
  },
  {
    "id": "podere-sant-antonio",
    "name": "Podere Sant'Antonio",
    "region": "Lake Bolsena, Lazio, Italy",
    "price": "€€",
    "badge": "Secret Italy",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "desc": "Lake Bolsena is a true hidden-gem destination. Podere Sant'Antonio is a large farm estate with pool, gardens and substantial event capacity, worth investigating as a whole-property wedding setting.",
    "facts": [
      "35 hectares",
      "Pool + gardens",
      "Up to 200 outdoors",
      "Overnight accommodation possible"
    ],
    "sources": [
      [
        "Venue listing",
        "https://www.matrimonio.com/location-matrimoni/podere-santantonio--e293744"
      ],
      [
        "Lake Bolsena hotels",
        "https://www.bolsena.com/en/hotels/"
      ]
    ],
    "image": "https://cdn0.hitched.co.uk/vendor/2673/3_2/320/jpg/matrimonio-1-1_4_382673-174802135767473.jpeg"
  }
];

const VENUES_PART_4 = [
  {
    "id": "poderaccio-bolsena",
    "name": "Il Poderaccio Agri-Relais",
    "region": "Lake Bolsena, Lazio, Italy",
    "price": "€€",
    "badge": "Weekend fit",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "desc": "An agrirelais built around weddings in nature, with apartments for friends and family, a pool and lake-view spaces. Very aligned with a relaxed wedding weekend.",
    "facts": [
      "Apartments for guests",
      "Pool",
      "Lake-view pergola for 60",
      "Outdoor party potential"
    ],
    "sources": [
      [
        "Official weddings page",
        "https://www.poderacciobolsena.it/en/weddings/"
      ]
    ],
    "image": "https://www.poderacciobolsena.it/wp-content/uploads/sites/102/2024/02/alvaro-cvg-mW8IZdX7n8E-unsplash.jpg"
  },
  {
    "id": "cilento-castello",
    "name": "Castello di Rocca Cilento",
    "region": "Cilento, Campania, Italy",
    "price": "€€–€€€",
    "badge": "Secret Italy",
    "grad": [
      "#E4D4C8",
      "#8A6B59"
    ],
    "desc": "A boutique castle hotel in the Cilento hills. This is the kind of place to investigate when you want Italian drama without paying Amalfi Coast prices.",
    "facts": [
      "Boutique hotel inside castle",
      "Wedding + events venue",
      "Cilento mountain / sea region",
      "Potential guest stay"
    ],
    "sources": [
      [
        "Official venue",
        "https://castellodiroccacilento.it/en/"
      ]
    ],
    "image": "https://cdn0.matrimonio.com/vendor/3566/3_2/960/jpg/martinatonioelle-0028_2_273566-175803327382313.jpeg"
  },
  {
    "id": "il-pilaccio",
    "name": "Il Pilaccio nel Cilento",
    "region": "Perdifumo, Cilento, Italy",
    "price": "€€",
    "badge": "Pool + sea",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "image": "https://cdn0.matrimonio.com/vendor/5176/original/1280/jpg/tramonto_2_35176-171994256032286.webp",
    "desc": "A poolside wedding setting with greenery and distant sea views. A good example of the lesser-known southern Italian estate category we should keep searching.",
    "facts": [
      "Poolside ceremonies / receptions",
      "Garden setting",
      "Sea + hill views",
      "Good value-hunt candidate"
    ],
    "sources": [
      [
        "Venue profile",
        "https://www.matrimonio.com/location-matrimoni/tenuta-il-pilaccio-nel-cilento--e35176"
      ]
    ]
  },
  {
    "id": "umbria-monastero",
    "name": "Monastero Santa Margherita",
    "region": "Umbria, Italy",
    "price": "€€–€€€",
    "badge": "Tuscany alternative",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "image": "https://cdn0.hitched.co.uk/vendor/3162/3_2/1280/jpg/andresofia1021_4_293162-172615153412482.webp",
    "desc": "Historic stone monastery, pool and countryside. Umbria is a major 'Tuscany but quieter' search zone, and this shows the exact visual direction.",
    "facts": [
      "Historic stone estate",
      "Pool",
      "Outdoor dinner potential",
      "Strong private-weekend aesthetic"
    ],
    "sources": [
      [
        "Venue profile",
        "https://www.hitched.co.uk/wedding-venues/monastero-santa-margherita_293162.htm"
      ]
    ]
  },
  {
    "id": "villa-poropati",
    "name": "Villa Poropati",
    "region": "Grožnjan / Istria, Croatia",
    "price": "€€",
    "badge": "Adriatic alternative",
    "grad": [
      "#DDE8EC",
      "#5E806B"
    ],
    "desc": "A villa in inland Istria with accommodation, a huge pool terrace and garden capacity up to 100. The Italian-looking countryside + Adriatic proximity is exactly why Istria belongs here.",
    "facts": [
      "Accommodation for guests",
      "400 m² pool terrace",
      "Garden up to 100",
      "Transfers available"
    ],
    "sources": [
      [
        "Istria tourism wedding profile",
        "https://www.istra.hr/en/information/weddings/services/2995"
      ]
    ],
    "image": "https://villa-poropati.com/wp-content/uploads/2020/07/Flammeum-Eva_Oliver21-2048x1366-1-915x610.jpg"
  }
];


"use strict";

const VENUES_PART_5 = [
  {
    "id": "borgo-lapis",
    "name": "Borgo Lapis",
    "region": "Fabci / Višnjan, Istria, Croatia",
    "price": "€€–€€€",
    "badge": "Private hamlet feel",
    "grad": [
      "#C9DFC3",
      "#7FA07A"
    ],
    "image": "https://images.squarespace-cdn.com/content/v1/695fd065250af7400437e099/1772017851995-3LUI4QZ2LSV7BKIWQKRK/Serendipity%2BWeddings%2B-%2BCroatia%2BWedding%2BVenues%2B-%2BBorgo%2BLapis2.jpg",
    "desc": "A restored stone hamlet surrounded by vineyards and gardens with a curved pool. Very strong for the private, discovered-somewhere-special feeling.",
    "facts": [
      "20,000 m² private setting",
      "Stone hamlet aesthetic",
      "Infinity pool",
      "Up to 30 for intimate package"
    ],
    "sources": [
      [
        "Venue profile",
        "https://www.serendipity-weddings.com/croatia/borgo-lapis"
      ]
    ]
  },
  {
    "id": "procida",
    "name": "Procida",
    "region": "Bay of Naples, Italy",
    "price": "€€",
    "badge": "Island wild card",
    "grad": [
      "#DDE8EC",
      "#4A6C8C"
    ],
    "image": "https://cdn0.matrimonio.com/vendor/4816/3_2/960/jpg/sarracino-matrimonio-procida-29_2_194816-176371682612880.jpeg",
    "desc": "Tiny, colorful and much less obvious than Capri. Worth exploring for a small destination wedding, although island logistics and kosher supply chain need extra scrutiny.",
    "facts": [
      "Small-island atmosphere",
      "Sea-view ceremony potential",
      "Accommodation spread across island",
      "Logistics wildcard"
    ],
    "sources": [
      [
        "Procida wedding inspiration",
        "https://www.matrimonio.com/wedding-planner/osarracino-procida--e194816"
      ]
    ]
  },
  {
    "id": "lake-ohrid",
    "name": "Lake Ohrid",
    "region": "Ohrid & Struga, North Macedonia",
    "price": "€",
    "badge": "Wild card",
    "grad": [
      "#CFE3ED",
      "#4A6C8C"
    ],
    "desc": "A dramatic mountain lake with a real local wedding industry and hotels that can be bought out. It is a genuine budget wildcard, but Jewish logistics need serious verification.",
    "facts": [
      "Lake + mountain backdrop",
      "Hotel buyout possible",
      "Local wedding planners",
      "Kosher + rabbi: major question mark"
    ],
    "sources": [
      [
        "City Palace weddings",
        "https://www.citypalacehotel.mk/en/weddings"
      ],
      [
        "Ohrid wedding planner",
        "https://weddingplannerohrid.com/"
      ]
    ],
    "image": "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/323007841.jpg?k=1f13d0b193ac70bd13b241ce839c75daf565f4a5e70d6adc0e5e538b1fe1f889&o="
  },
  {
    "id": "albanian-riviera",
    "name": "Albanian Riviera",
    "region": "Himarë, Dhërmi & southern coast, Albania",
    "price": "€",
    "badge": "Wild card",
    "grad": [
      "#CFE3ED",
      "#4A6C8C"
    ],
    "image": "https://images.trvl-media.com/hotels/32000000/31790000/31787400/31787358/b42b2616_z.jpg",
    "desc": "Turquoise water, mountains and stone villas at a lower-profile price point. Very promising visually, but the kosher/rabbi/vendor ecosystem is the part we would have to build from scratch.",
    "facts": [
      "Sea + mountain scenery",
      "Villa / boutique hotel options",
      "Potentially strong value",
      "Kosher logistics: unverified"
    ],
    "sources": [
      [
        "Himarë villa examples",
        "https://privatevillas.guide/himare/"
      ]
    ]
  },
  {
    "id": "lake-bohinj",
    "name": "Lake Bohinj",
    "region": "Slovenia",
    "price": "€€",
    "badge": "Lake wild card",
    "grad": [
      "#DDE8EC",
      "#5E806B"
    ],
    "image": "https://bolenbliss.com/storage/blog/content/2026/01/where-to-get-married-in-slovenia-lake-bohinj-1024x683.jpg",
    "desc": "If you love Lake Como for the mountains + water rather than the Italian architecture, Bohinj deserves a look. Much quieter and visually extraordinary.",
    "facts": [
      "Mountain lake",
      "Quiet / nature-led",
      "Bled alternative",
      "Kosher logistics: verify"
    ],
    "sources": [
      [
        "Lake Bohinj wedding inspiration",
        "https://bolenbliss.com/2026/02/10/weddings-in-slovenia"
      ]
    ]
  },
  {
    "id": "la-darbia",
    "name": "La Darbia",
    "region": "Ameno / Vacciaghetto, Lake Orta, Piedmont, Italy",
    "price": "TBD: inquire",
    "badge": "Full-property buyout",
    "image": "https://ladarbia.com/wp-content/uploads/2024/11/homepage-ladarbia.webp",
    "grad": [
      "#DCE8E2",
      "#4A6C7A"
    ],
    "desc": "A 20-suite boutique resort on the hillside above Orta San Giulio, built by two local architect brothers, with kitchen gardens, a working vineyard and a heated saltwater pool. Can be booked as a full exclusive buyout for a wedding, no other hotel guests around, but Lake Orta's own kosher/rabbi ecosystem still needs verifying, same as the rest of this list.",
    "facts": [
      "20 apartment-style suites, full-buyout weddings",
      "View of Lake Orta, Isola San Giulio & Monte Rosa",
      "Heated saltwater pool + yoga deck",
      "On-site restaurant, vineyard & kitchen gardens"
    ],
    "sources": [
      [
        "Official site",
        "https://ladarbia.com/lago-d-orta/"
      ]
    ]
  }
];

const VENUES = [...VENUES_PART_1,...VENUES_PART_2,...VENUES_PART_3,...VENUES_PART_4,...VENUES_PART_5];

/* There's no structured guest-capacity field on these venue entries, only
   free-text desc/facts written as prose ("wedding day up to 30", "Masserias
   sleeping 30-40 guests", "Large event capacity available" with no number
   at all). This pulls out a best-effort number rather than adding one, in
   the same spirit as the page's existing "verification item" disclaimer
   for kosher/chuppah/pricing: prefers phrasing that's actually about event
   capacity ("wedding day", "capacity") over sleeping/accommodation counts,
   which describe a different thing, and returns null (not zero) when
   nothing usable is there so those venues aren't wrongly filtered out. */
function extractVenueCapacity(v){
  const text=[v.desc,...(v.facts||[])].join(' ');
  return guessGuestCountNumber(text);
}
function allVenuesList(){ return VENUES.concat(state.customVenues||[]); }
function renderVenueFilters(){
  const regionSel=document.getElementById('venueRegionFilter');
  if(!regionSel) return;
  const regions=[...new Set(allVenuesList().map(v=>(v.region||'').split(',')[0]).filter(Boolean))].sort();
  regionSel.innerHTML='<option value="">All regions</option>'+regions.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('');
}
function renderVenues(){
  const grid = document.getElementById('venueGrid'); if(!grid) return;
  const q=(document.getElementById('venueSearch')?.value||'').trim().toLowerCase();
  const region=(document.getElementById('venueRegionFilter')?.value||'').toLowerCase();
  const minGuests=parseInt(document.getElementById('venueCapacityFilter')?.value||'',10);
  const contactedFilter=document.getElementById('venueContactedFilter')?.value||'';
  const shortlistedFilter=document.getElementById('venueShortlistedFilter')?.value||'';
  grid.innerHTML='';
  const filtered=allVenuesList().filter(v=>{
    const hay=[v.name,v.region,v.desc,...(v.facts||[])].join(' ').toLowerCase();
    const capacity=extractVenueCapacity(v);
    const shortlisted=!!(state.venues[v.id]||{}).favorited;
    const contacted=!!(state.venues[v.id]||{}).contacted;
    return (!q || hay.includes(q)) && (!region || (v.region||'').toLowerCase().startsWith(region))
      && (!minGuests || capacity===null || capacity>=minGuests)
      && (!contactedFilter || (contactedFilter==='contacted' ? contacted : !contacted))
      && (!shortlistedFilter || (shortlistedFilter==='shortlisted' ? shortlisted : !shortlisted));
  });
  if(!filtered.length){
    grid.innerHTML='<div class="empty-board" style="grid-column:1/-1;">No matches yet. Try a broader search.</div>';
    return;
  }
  filtered.forEach(v=>{
    const fav = state.venues[v.id]||{};
    const capacity=extractVenueCapacity(v);
    const linkedReply = state.venueContacts.find(c=>c.venueId===v.id);
    const card = document.createElement('div'); card.className='venue-card';
    const venuePhoto = v.image || STYLE_PHOTOS[{
      'tuscany':'venueTuscany','puglia':'venuePuglia','provence':'venueProvence','algarve':'venueAlgarve','dajas':'venueDouro',
      'kotor':'venueAdriatic','villa-stari-mlin':'venueAdriatic','huma-kotor':'venueAdriatic','lake-orta':'venueLake','lake-iseo':'venueLake','villa-helene':'venueLake','royal-villa-4':'venueLake','lake-bracciano':'venueLake','rocca-romana':'venueLake','lake-bolsena':'venueLake','poderaccio-bolsena':'venueLake','cilento-castello':'venueSouthItaly','il-pilaccio':'venueSouthItaly','umbria-monastero':'venueUmbria','villa-poropati':'venueIstria','borgo-lapis':'venueIstria','procida':'venueProcida','lake-ohrid':'venueLake','albanian-riviera':'venueAdriatic','lake-bohinj':'venueAdriatic'
    }[v.id] || 'venueLake'];
    const heroClass='venue-hero has-image';
    const heroStyle='';
    card.innerHTML = '<div class="'+heroClass+'" style="'+heroStyle+'">'
      + '<img class="venue-hero-img" src="'+esc(venuePhoto)+'" alt="'+esc(v.name)+' wedding venue" loading="lazy" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'image-failed\')">'
      + '<span class="venue-image-label"></span>'
      + '<span class="price">'+esc(v.price)+'</span>'
      + (v.badge? '<span class="price" style="margin-left:6px;background:rgba(0,0,0,.4)">'+esc(v.badge)+'</span>' : '')
      + (v.isCustom ? '<button class="icon-btn edit-custom-venue" title="Edit this venue" style="position:absolute;top:8px;right:38px;">'+svg(ICON.pencil)+'</button><button class="icon-btn del-custom-venue" title="Delete this venue" style="position:absolute;top:8px;right:8px;">'+svg(ICON.trash)+'</button>' : '')
      + '</div>'
      + '<div class="venue-body">'
      + '<div><h3>'+esc(v.name)+'</h3>'+(v.region ? '<div class="region">'+esc(v.region)+'</div>' : '')+'</div>'
      + (linkedReply && linkedReply.decision ? '<span class="decision-badge '+linkedReply.decision+'">'+(linkedReply.decision==='explore'?'Explore more':'Not a fit')+'</span>' : '')
      + '<p>'+esc(v.desc)+'</p>'
      + '<div class="venue-facts">'+(capacity!==null?'<span class="fact fact-capacity">~'+capacity+' guests</span>':'')+(v.facts||[]).map(f=>'<span class="fact">'+esc(f)+'</span>').join('')+'</div>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;">'+(v.sources||[]).map(s=>{const label=Array.isArray(s)?s[0]:s.label;const url=Array.isArray(s)?s[1]:s.url;return '<a class="src-link" target="_blank" rel="noopener" href="'+esc(url)+'">'+esc(label)+' ↗</a>';}).join('')+'</div>'
      + (v.isCustom ? (()=>{
          const bullets = CUSTOM_VENUE_EXTRA_FIELDS.filter(([key])=> (v[key]||'').trim()).map(([key,label])=> '<li><b>'+esc(label)+':</b> '+esc(v[key])+'</li>').join('');
          return bullets ? '<ul class="venue-contact-bullets">'+bullets+'</ul>' : '';
        })() : '')
      + (v.isCustom && v.brochureNotes ? '<p class="venue-contact-notes"><b>Notes:</b> '+esc(v.brochureNotes)+'</p>' : '')
      + '<div class="venue-image-credit">'+(v.image ? 'Venue / wedding source image' : 'Destination visual reference, verify the exact property photo before publishing')+'</div>'
      + '<div class="venue-note"><textarea placeholder="Notes on '+esc(v.name)+'…">'+esc(fav.note||'')+'</textarea></div>'
      + '<div class="venue-foot"><button class="heart'+(fav.favorited?' on':'')+'">'+svg(ICON.heart)+'</button><span style="font-size:11.5px;color:var(--ink-faint)">'+(fav.favorited?'Shortlisted':'Tap to shortlist')+'</span>'
      + '<button class="btn small ghost contacted-toggle'+(fav.contacted?' active':'')+'">'+svg(ICON.check2)+'<span>'+(fav.contacted?'Contacted':'Mark contacted')+'</span></button>'
      + (linkedReply ? '<button class="btn small link-btn reply-link">View reply →</button>' : '<button class="btn small ghost log-reply-link">+ Log a reply</button>')
      + '<button class="btn small ghost ask-venue" style="margin-left:auto;">Ask planner about this</button></div>'
      + '</div>';
    card.querySelector('.heart').addEventListener('click', ()=> setVenueFav(v.id, {favorited: !fav.favorited, note: fav.note||''}));
    card.querySelector('textarea').addEventListener('change', e=> setVenueFav(v.id, {favorited: !!fav.favorited, note: e.target.value}));
    card.querySelector('.contacted-toggle').addEventListener('click', ()=> setVenueFav(v.id, {contacted: !fav.contacted}));
    const replyBtn = card.querySelector('.reply-link');
    if(replyBtn) replyBtn.addEventListener('click', ()=> jumpToVenueReply(linkedReply.id));
    const logReplyBtn = card.querySelector('.log-reply-link');
    if(logReplyBtn) logReplyBtn.addEventListener('click', ()=> openVenueContactModal(null, v));
    card.querySelector('.ask-venue').addEventListener('click', ()=> askPlannerAbout('What should we know about planning a kosher, chuppah wedding in '+v.name+' ('+v.region+') specifically? We are considering it for our shortlist.'));
    if(v.isCustom){
      card.querySelector('.edit-custom-venue').addEventListener('click', ()=> openCustomVenueModal(v));
      card.querySelector('.del-custom-venue').addEventListener('click', ()=>{
        confirmAction('Delete "'+v.name+'" from your venues list?', ()=>{
          if(dbReady) db.collection('customVenues').doc(v.id).delete().catch(err=> console.error(err));
          else { state.customVenues = state.customVenues.filter(x=>x.id!==v.id); renderVenueFilters(); renderVenues(); }
        });
      });
    }
    grid.appendChild(card);
  });
}
renderVenueFilters();
['venueSearch','venueRegionFilter','venueCapacityFilter','venueContactedFilter','venueShortlistedFilter'].forEach(id=>document.getElementById(id)?.addEventListener('input',renderVenues));
function setVenueFav(id, data){
  state.venues[id] = Object.assign({}, state.venues[id], data);
  if(dbReady) db.collection('venueFavorites').doc(id).set(state.venues[id]);
  else renderVenues();
}

/* ---------------- CUSTOM VENUES (added by the couple) ---------------- */
/* Same shape as VENUE_CONTACT_FIELDS below, minus max guests/price, which
   already have their own dedicated Guest capacity/Price fields on a
   venue. Extracted straight out of a PDF or fetched link, not just
   dumped there as a wall of raw text. */
const CUSTOM_VENUE_EXTRA_FIELDS = [
  ['availability', 'Availability', 'e.g. Confirmed available, needs 50% deposit to hold'],
  ['accommodations', 'Accommodations (on-site + nearby)', 'e.g. 12 suites included, hotel block nearby for the rest'],
  ['ceremonySpace', 'Ceremony space + rain backup', 'e.g. Terrace ceremony, indoor barn as backup'],
  ['kosherCatering', 'Outside kosher catering allowed?', 'e.g. Yes, kitchen access confirmed'],
  ['partyMusicPolicy', 'Partying & music policy', 'e.g. Music until midnight, outdoor speakers ok'],
  ['dayAfterAmenities', 'Day-after amenities', 'e.g. Pool and gardens open to guests the next day'],
  ['depositPolicy', 'Deposit / cancellation policy', 'e.g. 30% deposit, refundable until 60 days out'],
];
let editingCustomVenueId = null;
function ensureCustomVenueModal(){
  let m = document.getElementById('customVenueModal');
  if(m) return m;
  m = document.createElement('div'); m.id='customVenueModal'; m.className='modal-backdrop';
  m.innerHTML = '<div class="modal">'
    + '<button class="close-x" id="cvModalClose">'+svg(ICON.x)+'</button>'
    + '<h3 id="cvModalTitle">Add a venue</h3>'
    + '<label class="field">Venue name<input type="text" id="cvName" placeholder="e.g. Villa Something"></label>'
    + '<label class="field">Region / location (optional)<input type="text" id="cvRegion" placeholder="e.g. Lake Como, Italy, leave blank if unsure"></label>'
    + '<label class="field">Price<input type="text" id="cvPrice" placeholder="e.g. €€€ or TBD: inquire"></label>'
    + '<label class="field">Guest capacity (optional)<input type="number" min="0" id="cvCapacity" placeholder="e.g. 80"></label>'
    + '<label class="field">Description<textarea id="cvDesc" rows="3" placeholder="What makes this one worth considering?"></textarea></label>'
    + '<label class="field">Venue website (optional)<input type="url" id="cvWebsite" placeholder="https://…"></label>'
    + '<label class="field">Photo URL<input type="url" id="cvImage" placeholder="Paste a direct picture link, or fetch one from the website above"></label>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;">'
      + '<button class="btn small ghost" id="cvFetchPhoto" type="button">Fetch photo from website</button>'
      + '<button class="btn small ghost" id="cvFetchText" type="button">Fetch details from website</button>'
      + '<button class="btn small ghost" id="cvPdfBtn" type="button">Attach a PDF brochure</button>'
    + '</div>'
    + '<input type="file" id="cvPdfInput" accept="application/pdf" style="display:none;">'
    + '<p id="cvExtractStatus" style="display:none;font-size:12px;color:var(--ink-soft);"></p>'
    + '<div id="cvPreviewWrap" style="display:none;"><img id="cvPreview" style="width:100%;border-radius:8px;max-height:180px;object-fit:cover;"></div>'
    + CUSTOM_VENUE_EXTRA_FIELDS.map(([key,label,placeholder])=> '<label class="field">'+esc(label)+'<input type="text" id="cv_'+key+'" placeholder="'+esc(placeholder)+'"></label>').join('')
    + '<label class="field">Your own notes (optional)<textarea id="cvBrochureNotes" rows="2" placeholder="Anything else worth remembering that isn\'t captured above"></textarea></label>'
    + '<p class="warn" id="cvWarn" style="display:none;"></p>'
    + '<div class="modal-foot"><button class="btn danger-outline" id="cvDelete" style="display:none;margin-right:auto;">Delete</button><button class="btn" id="cvCancel">Cancel</button><button class="btn primary" id="cvSave">Save</button></div>'
    + '</div>';
  document.body.appendChild(m);
  const close = ()=> m.classList.remove('open');
  m.querySelector('#cvModalClose').addEventListener('click', close);
  m.addEventListener('click', e=>{ if(e.target===m) close(); });
  m.querySelector('#cvCancel').addEventListener('click', close);
  m.querySelector('#cvImage').addEventListener('input', updateCustomVenuePreview);
  m.querySelector('#cvFetchPhoto').addEventListener('click', fetchCustomVenuePhoto);
  m.querySelector('#cvFetchText').addEventListener('click', fetchCustomVenueText);
  m.querySelector('#cvPdfBtn').addEventListener('click', ()=> m.querySelector('#cvPdfInput').click());
  m.querySelector('#cvPdfInput').addEventListener('change', ()=>{ const f=m.querySelector('#cvPdfInput').files[0]; if(f) handleCustomVenuePdf(f); });
  m.querySelector('#cvSave').addEventListener('click', saveCustomVenue);
  m.querySelector('#cvDelete').addEventListener('click', ()=>{
    if(!editingCustomVenueId) return;
    const id = editingCustomVenueId;
    confirmAction('Delete this venue?', ()=>{
      if(dbReady) db.collection('customVenues').doc(id).delete().catch(err=> console.error(err));
      else { state.customVenues = state.customVenues.filter(x=>x.id!==id); renderVenueFilters(); renderVenues(); }
      close();
    });
  });
  return m;
}
function updateCustomVenuePreview(){
  const m = document.getElementById('customVenueModal');
  const url = m.querySelector('#cvImage').value.trim();
  const wrap = m.querySelector('#cvPreviewWrap');
  if(url){ m.querySelector('#cvPreview').src = url; wrap.style.display='block'; }
  else wrap.style.display='none';
}
/* Reuses the same Worker og:image lookup already built for Wedding d.i.y
   link previews (fetchLinkPreviewThumbnail, defined in app-3.js), rather
   than a second copy of the same fetch logic. Falls back to telling the
   user to paste a direct picture link instead if the page has no usable
   preview image, or the fetch itself fails. */
function fetchCustomVenuePhoto(){
  const m = document.getElementById('customVenueModal');
  const website = m.querySelector('#cvWebsite').value.trim();
  const warn = m.querySelector('#cvWarn'); warn.style.display='none';
  if(!website){ warn.textContent="Paste the venue's website link above first."; warn.style.display='block'; return; }
  const btn = m.querySelector('#cvFetchPhoto');
  btn.disabled = true; btn.textContent='Fetching…';
  fetchLinkPreviewThumbnail(website,
    (thumbUrl)=>{
      btn.disabled = false; btn.textContent='Fetch photo from website';
      m.querySelector('#cvImage').value = thumbUrl;
      updateCustomVenuePreview();
    },
    (err)=>{
      btn.disabled = false; btn.textContent='Fetch photo from website';
      warn.textContent = err+' You can still paste a direct picture link into the Photo URL field instead.';
      warn.style.display='block';
    }
  );
}
function setCustomVenueExtractStatus(msg, isError){
  const el = document.getElementById('customVenueModal')?.querySelector('#cvExtractStatus');
  if(!el) return;
  el.style.display = msg ? 'block' : 'none';
  el.style.color = isError ? 'var(--danger)' : 'var(--ink-soft)';
  el.textContent = msg || '';
}
/* Pulls the actual data points out of a PDF or fetched page (guest
   capacity, price, availability, accommodations, ceremony space, kosher
   catering, party/music policy, day-after amenities, deposit policy), the
   same way venue replies already do, rather than dumping the whole raw
   text somewhere to read later. Every field only fills in when still
   empty, so nothing typed by hand gets overwritten, and a second PDF/link
   can still fill in whatever the first one missed. Returns how many
   fields it actually filled, so the caller can tell "found the page but
   none of it matched anything" apart from a real success, two very
   different situations that used to show the same cheerful message. */
function applyGuessesToCustomVenue(text){
  const m = document.getElementById('customVenueModal');
  let filled = 0;
  const setIfEmpty = (id, val)=>{ if(!val) return; const el = m.querySelector('#'+id); if(el && !el.value.trim()){ el.value = val; filled++; } };
  const capacityEl = m.querySelector('#cvCapacity');
  if(!capacityEl.value.trim()){ const n = guessGuestCountNumber(text); if(n){ capacityEl.value = n; filled++; } }
  setIfEmpty('cvPrice', guessPriceFromText(text));
  /* Description isn't counted toward "filled": guessSummaryFromText just
     grabs the first sentence and near-always succeeds even on totally
     generic marketing copy, so counting it would mask the case where none
     of the actual factual fields (price, capacity, kosher, etc) matched
     anything, exactly the situation someone needs to be told about. */
  const descEl = m.querySelector('#cvDesc');
  if(!descEl.value.trim()){ const s = guessSummaryFromText(text); if(s) descEl.value = s; }
  setIfEmpty('cv_availability', guessAvailabilityFromText(text));
  setIfEmpty('cv_accommodations', guessAccommodationFromText(text));
  setIfEmpty('cv_ceremonySpace', guessCeremonyFromText(text));
  setIfEmpty('cv_kosherCatering', guessKosherFromText(text));
  setIfEmpty('cv_partyMusicPolicy', guessPartyMusicFromText(text));
  setIfEmpty('cv_dayAfterAmenities', guessDayAfterFromText(text));
  setIfEmpty('cv_depositPolicy', guessDepositFromText(text));
  return filled;
}
/* "Found the page/PDF fine but none of the keyword patterns matched
   anything in it" used to show the exact same cheerful "filled in what
   it could find" message as an actual success, with the raw text
   discarded either way, so there was no way to tell the two apart or see
   why. Now a zero-field result puts the full text into Brochure notes
   so nothing found is lost, and says plainly that nothing auto-matched. */
function reportCustomVenueExtraction(filled, text, sourceLabel){
  if(filled > 0){
    setCustomVenueExtractStatus('Filled in '+filled+' field'+(filled===1?'':'s')+' from the '+sourceLabel+', worth double-checking.');
    return;
  }
  const notesEl = document.getElementById('customVenueModal').querySelector('#cvBrochureNotes');
  if(!notesEl.value.trim()) notesEl.value = text;
  setCustomVenueExtractStatus("Read the "+sourceLabel+" fine, but none of its wording matched a field automatically. The full text is in “Your own notes” below so you can pull details from it by hand.", true);
}
async function handleCustomVenuePdf(file){
  setCustomVenueExtractStatus('Reading the PDF…');
  try{
    const {text, title} = await extractPdfText(file);
    if(!text){ setCustomVenueExtractStatus("Couldn't find any text in that PDF, it's likely a scanned/image-only brochure with no real text layer (common for a designed PDF), which this can't read text from. Fill the fields in manually instead.", true); return; }
    const nameEl = document.getElementById('customVenueModal').querySelector('#cvName');
    if(!nameEl.value.trim() && title) nameEl.value = title;
    const filled = applyGuessesToCustomVenue(text);
    reportCustomVenueExtraction(filled, text, 'PDF');
  }catch(err){
    console.error(err);
    setCustomVenueExtractStatus('Could not read that PDF: '+(err && err.message || err), true);
  }
}
/* Same Worker page-text lookup used by the venue-reply modal
   (fetchPageText, defined in app-3.js), reused here rather than a second
   copy of the same fetch logic. */
function fetchCustomVenueText(){
  const m = document.getElementById('customVenueModal');
  const website = m.querySelector('#cvWebsite').value.trim();
  if(!website){ setCustomVenueExtractStatus("Paste the venue's website link above first.", true); return; }
  const btn = m.querySelector('#cvFetchText');
  btn.disabled = true; btn.textContent='Fetching…';
  setCustomVenueExtractStatus('Fetching that page…');
  fetchPageText(website,
    (text, title)=>{
      btn.disabled = false; btn.textContent='Fetch details from website';
      const nameEl = m.querySelector('#cvName');
      if(!nameEl.value.trim()){ const guessed = guessNameFromTitle(title); if(guessed) nameEl.value = guessed; }
      const filled = applyGuessesToCustomVenue(text);
      reportCustomVenueExtraction(filled, text, 'page');
    },
    (err)=>{
      btn.disabled = false; btn.textContent='Fetch details from website';
      setCustomVenueExtractStatus(err, true);
    }
  );
}
function openCustomVenueModal(existing){
  editingCustomVenueId = existing ? existing.id : null;
  const m = ensureCustomVenueModal();
  m.querySelector('#cvModalTitle').textContent = existing ? 'Edit venue' : 'Add a venue';
  m.querySelector('#cvName').value = existing ? (existing.name||'') : '';
  m.querySelector('#cvRegion').value = existing ? (existing.region||'') : '';
  m.querySelector('#cvPrice').value = existing ? (existing.price||'') : '';
  m.querySelector('#cvCapacity').value = existing && existing.capacity ? existing.capacity : '';
  m.querySelector('#cvDesc').value = existing ? (existing.desc||'') : '';
  {
    const src0 = existing && existing.sources && existing.sources[0];
    m.querySelector('#cvWebsite').value = src0 ? (Array.isArray(src0) ? (src0[1]||'') : (src0.url||'')) : '';
  }
  m.querySelector('#cvImage').value = existing ? (existing.image||'') : '';
  CUSTOM_VENUE_EXTRA_FIELDS.forEach(([key])=>{ m.querySelector('#cv_'+key).value = existing ? (existing[key]||'') : ''; });
  m.querySelector('#cvBrochureNotes').value = existing ? (existing.brochureNotes||'') : '';
  m.querySelector('#cvPdfInput').value = '';
  setCustomVenueExtractStatus('');
  updateCustomVenuePreview();
  m.querySelector('#cvWarn').style.display='none';
  m.querySelector('#cvDelete').style.display = existing ? 'inline-flex' : 'none';
  m.classList.add('open');
}
function saveCustomVenue(){
  const m = document.getElementById('customVenueModal');
  const warn = m.querySelector('#cvWarn');
  const name = m.querySelector('#cvName').value.trim();
  const region = m.querySelector('#cvRegion').value.trim();
  if(!name){ warn.textContent='Give the venue a name.'; warn.style.display='block'; return; }
  const capacity = parseInt(m.querySelector('#cvCapacity').value,10);
  const hasCapacity = Number.isFinite(capacity) && capacity>0;
  const website = m.querySelector('#cvWebsite').value.trim();
  const data = {
    name, region,
    price: m.querySelector('#cvPrice').value.trim() || 'TBD: inquire',
    desc: m.querySelector('#cvDesc').value.trim(),
    image: m.querySelector('#cvImage').value.trim(),
    brochureNotes: m.querySelector('#cvBrochureNotes').value.trim(),
    capacity: hasCapacity ? capacity : null,
    facts: hasCapacity ? ['Wedding day up to '+capacity+' guests'] : [],
    sources: website ? [{label:'Venue website', url:website}] : [],
    badge: 'Your addition',
    grad: ['#DCE8E2','#4A6C7A'],
    isCustom: true,
  };
  CUSTOM_VENUE_EXTRA_FIELDS.forEach(([key])=>{ data[key] = m.querySelector('#cv_'+key).value.trim(); });
  warn.style.display='none';
  const saveBtn = m.querySelector('#cvSave');
  saveBtn.disabled = true; saveBtn.textContent='Saving…';
  // Cancel is deliberately never disabled: a hung write must not be able
  // to trap someone inside this modal with no way out.
  let settled = false;
  function saveSucceeded(){
    if(settled) return; settled = true;
    saveBtn.disabled=false; saveBtn.textContent='Save';
    m.classList.remove('open');
  }
  function saveFailed(err){
    if(settled) return; settled = true;
    console.error(err);
    saveBtn.disabled=false; saveBtn.textContent='Save';
    warn.textContent = 'Could not save: '+(err && err.message ? err.message : 'unknown error')+'. The venue was NOT saved here, try again, or check your connection.';
    warn.style.display='block';
  }
  // A write to a Firestore instance with no real network path (offline,
  // blocked, stale connection) can sit forever without ever resolving OR
  // rejecting, which is what left the button stuck on "Saving..." with no
  // way out. Race it against a timeout so it always settles one way or
  // the other.
  function withTimeout(promise){
    return Promise.race([
      promise,
      new Promise((_,reject)=> setTimeout(()=> reject(new Error('timed out after 8s, check your internet connection')), 8000))
    ]);
  }
  // Everything below is wrapped in a try/catch on purpose: any SYNCHRONOUS
  // throw here (not a rejected promise, an actual thrown exception, e.g.
  // from a broken Firebase SDK call) would otherwise happen right after
  // the button was set to "Saving...", be uncaught, and freeze the button
  // in that state forever, with nothing to catch it and nothing logged
  // anywhere visible. That exact class of bug is what this whole function
  // exists to prevent, so it must not be possible anywhere in this path.
  try{
    // dbReady only ever gets set once, at page load, and never gets reset.
    // If your sign-in session has since expired or dropped (a tab left
    // open for hours/days), dbReady still reports true while the real
    // connection underneath it is dead, which is exactly what leaves a
    // write hanging. Check the actual live auth state right before
    // attempting the write, instead of trusting that stale flag.
    const signedOutButFlaggedReady = dbReady && window.firebase && firebase.auth && !firebase.auth().currentUser;
    if(signedOutButFlaggedReady){
      saveFailed(new Error("you're signed out, sign in again (top-right corner) and retry"));
      return;
    }
    if(editingCustomVenueId){
      const id = editingCustomVenueId;
      if(dbReady){
        withTimeout(db.collection('customVenues').doc(id).update(data)).then(saveSucceeded).catch(saveFailed);
      } else {
        const existing = state.customVenues.find(x=>x.id===id); if(existing) Object.assign(existing, data);
        renderVenueFilters(); renderVenues(); saveSucceeded();
      }
    } else {
      data.createdAt = Date.now();
      if(dbReady){
        withTimeout(db.collection('customVenues').add(data)).then(saveSucceeded).catch(saveFailed);
      } else {
        localAdd(state.customVenues, data); renderVenueFilters(); renderVenues(); saveSucceeded();
      }
    }
  }catch(err){
    saveFailed(err);
  }
}
document.getElementById('addCustomVenueBtn')?.addEventListener('click', ()=> openCustomVenueModal(null));


"use strict";

const STYLE_PHOTOS = {
  dressA:'https://cdn.essensedesigns.com/uploads/2024/03/7897-01.jpg',
  dressMermaid:'https://www.estylecdn.com/manufcols/morilee/morilee-current/zoomalt/2121_0108.jpg',
  dressBall:'https://www.oliviabottega.com/cdn/shop/products/Copy-of-Classic-satin-ball-gown-Protea-OLIVIABOTTEGA-1622669976_f2ce7294-4593-4575-afba-117dbd10713e.jpg?v=1649487436&width=700',
  dressSheath:'https://www.hola.com/horizon/original_aspect_ratio/38c4717da006-rosa-clara-z.jpg',
  dressBoho:'https://www.kissprom.com/cdn/shop/files/a-line-long-sleeves-chiffon-wedding-dress-in-ivory_2.jpg?v=1779083839&width=700',
  dressTwopc:'https://cdn.shopify.com/s/files/1/0251/5215/9837/files/IMG-4963.jpg?v=1749196191',
  suitTux:'https://i.pinimg.com/1200x/f1/57/49/f15749e52b0fc9ef686a36dea1c90f04.jpg',
  suitLinen:'https://i.etsystatic.com/61416082/r/il/395a5b/7825575885/il_570xN.7825575885_te3j.jpg',
  suitJacket:'https://dunniotailor.com/sites/default/files/u614/beige-suit-wedding-combination-pants/09-beige-blazer-with-navy-dress-pants.png',
  suitGuayabera:'https://www.camasha.com/cdn/shop/articles/Diseno_sin_titulo_7_f54a5362-e849-415f-adb8-99bd45d4a595.jpg?crop=region&crop_height=674&crop_left=0&crop_top=62&crop_width=1200&v=1771365079&width=1225',
  flowerCascade:'https://carithers.imgix.net/images/itemVariation/Brides-White-Teardrop-2a-hdr-22080244249.jpg',
  flowerRound:'https://gomagcdn.ro/domains/reya.ro/files/files/buchet13-1555.jpg',
  flowerWild:'https://cdn0.hitched.co.uk/article/1807/original/1920/jpg/67081-wildflower-bouquet-pastel.jpeg',
  flowerTropical:'https://kahuluiflorist.com/cdn/shop/files/hawaiiangoddess1.jpg?v=1709167729',
  flowerDried:'https://minnablooms.co.uk/cdn/shop/files/66CE567A-9608-48A3-A918-8F96B19EDA25.jpg?v=1775216652',
  hairBun:'https://i.pinimg.com/736x/01/2d/1f/012d1f7f6f0cf6187498f64200c33a41.jpg',
  hairWaves:'https://ladyandthehair.com.au/wp-content/uploads/2025/07/old-hollywood-waves.jpg',
  hairBraid:'https://www.hairstyletryon.ai/assets/blog/from-festival-to-formal-20-braided-hairstyles-for-any-event/bride_with_romantic_fishtail_updo.jpg',
  hairHalf:'https://koala.sh/api/image/v2-yp6fj-rm5uk.jpg?dream=&height=1216&width=832',
  makeupGlam:'https://i.pinimg.com/originals/bc/93/e6/bc93e6fbcfbf9f10da15308886f59071.jpg',
  makeupNatural:'https://static.wixstatic.com/media/f21e1f_bd194e3e034d47d7a36ed52d7eb2fd9b~mv2.png/v1/fill/w_640%2Ch_654%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/f21e1f_bd194e3e034d47d7a36ed52d7eb2fd9b~mv2.png',
  makeupBronze:'https://www.yeahweddings.com/wp-content/uploads/2024/09/Glowy-Bronzed-Goddess-1024x1024.jpg',
  makeupBold:'https://media.portalcasamientos.com.ar/blog/maquillaje-novia-tendencias-dia-noche2.jpg',
  shoeBlock:'https://images.laceandfavour.com/_cache/_products/728x728/perfect-bridal-liberty-dyeable-ivory-satin-block-heel-ankle-strap-court-shoes-pair-model-2.jpg',
  shoePump:'https://www.bellabelleshoes.com/cdn/shop/files/BellaBelleDiana3InchWhiteSilkBridalPumps_cd2ac5ac-8cfa-4324-8e88-abd538f97494.jpg?v=1750164183',
  shoeSandal:'https://www.dimitrasworkshop.com/files/media/sandals/Fairy%20flats/IMG_E3346.jpg',
  shoeSneaker:'https://julescustomizedkicks.com/cdn/shop/files/0e2a2111-ff29-4af2-bec5-6799408912a4.jpg?v=1768671727',
  inviteLetterpress:'https://i.etsystatic.com/11733467/r/il/2fbca6/5749958983/il_1080xN.5749958983_qqr3.jpg',
  inviteMinimal:'https://cdn.utterlyprintable.com/products/chic-script-simplicity-wedding-invitation-a5-portrait_front_1.jpg',
  inviteWatercolor:'https://i.etsystatic.com/38467531/c/2000/2000/0/0/il/789980/5755569709/il_600x600.5755569709_i14x.jpg',
  inviteBilingual:'https://i.etsystatic.com/28610538/r/il/0cefa6/5224097237/il_fullxfull.5224097237_r4s5.jpg',
  venueTuscany:'https://cdn0.matrimonio.com/vendor/4259/3_2/1280/jpg/an209882_2_164259-167154925342839.jpeg',
  venueProvence:'https://cdn0.mariages.net/vendor/7854/3_2/1920/jpg/c-provence-bezmiar-archviz-domain-noe-entrance_3_287854-167455945932572.jpeg',
  venuePuglia:'https://d3emaq2p21aram.cloudfront.net/media/cache/report_image_flex/uploads/0_BLOG/2018/4-April/MasseriaPotenti/MasseriaPotenti-MangoRedStudios-013.jpg',
  venueAlgarve:'https://www.algarveweddingsatelier.com/downloads/venues/4/galeria/mattlenaphotographyalgarveweddingphotography31.jpg',
  musicDJ:'https://cdn0.weddingwire.com/vendor/430199/3_2/960/jpeg/vince_51_991034-165592269680782.jpeg',
  musicBand:'https://static.showit.co/1200/iAvDp_6ySESbV51IDe2Z5g/155667/luxury-wedding-houston-the-revaire-julie-wilhite-photography-18.jpg',
  musicAcoustic:'https://www.aureusboutique.com/cdn/shop/articles/How_to_Book_a_String_Quartet_for_Your_Wedding_f280cf7a-9e52-4a96-893a-e7337f6c70e0_1920x.jpg?v=1763542352',
  musicSilent:'https://images.squarespace-cdn.com/content/v1/667bbbf70f298939911dbcfa/f49f23ac-d1fd-4eb9-994f-f6cd022a997c/7.png',
  venueDouro:'https://images.squarespace-cdn.com/content/v1/671395e27373782978efabd4/41a258a5-6fc4-49e6-88db-7c2787a12558/W-P-Rebecca-Blake-0035.JPG',
  venueLake:'https://cdn0.matrimonio.com/vendor/7486/3_2/640/jpg/villa-decio-81_2_317486-172658740460112.jpeg',
  venueAdriatic:'https://bolenbliss.com/storage/blog/content/2026/01/where-to-get-married-in-slovenia-lake-bohinj-1024x683.jpg',
  venueSouthItaly:'https://www.wherewedding.co.uk/uploads/il-pilaccio-nel-cilento/galeria-il-pilaccio-nel-cilento-gdzie-wesele-2711.jpeg',
  venueUmbria:'https://cdn0.hitched.co.uk/vendor/2931/3_2/960/jpg/monastero-santa-margherita_293162-163656267696955.jpeg',
  venueIstria:'https://images.squarespace-cdn.com/content/v1/695fd065250af7400437e099/1772017851995-3LUI4QZ2LSV7BKIWQKRK/Serendipity%2BWeddings%2B-%2BCroatia%2BWedding%2BVenues%2B-%2BBorgo%2BLapis2.jpg',
  venueProcida:'https://cdn0.matrimonio.com/vendor/4816/3_2/960/jpg/sarracino-matrimonio-procida-29_2_194816-176371682612880.jpeg',

  secondMini:'https://www.oliviabottega.com/cdn/shop/files/373A2851_ff1e0993-4edc-446d-ace8-49d91d5b4505.jpg?v=1724101194&width=1024',
  secondSlip:'https://i.etsystatic.com/62002792/r/il/1768fe/7925049893/il_794xN.7925049893_mp2m.jpg',
  secondJumpsuit:'https://weddingwild.b-cdn.net/from-ceremony-to-after-party-the-best-bridal-jumpsuits/dancing-bride-jumpsuit-wedding-reception-7ym9e__w672.webp',
  secondSparkle:'https://assets-hvmag-com.s3-accelerate.amazonaws.com/2023/05/whvw_image002_2005507.jpg',
  secondShoes:'https://dolcevita.ca/cdn/shop/files/xbZHK_2000x2400_8c872fb3-875c-43a7-84df-35a1e08bb8d9.webp?v=1714662010',
};


const STYLE_SECTIONS = [
  {title:'Dress silhouettes', tint:'blush', items:[
    ['dressA','A-line','Fitted through the bodice, flares gently from the waist: flattering on the widest range of body types.'],
    ['dressMermaid','Mermaid / trumpet','Fitted to the knee then flares out: dramatic, best on a smooth indoor floor or a dance-floor moment.'],
    ['dressBall','Ballgown','Full, voluminous skirt: grand on a wide staircase or in a formal villa garden.'],
    ['dressSheath','Sheath / column','Straight and slim: modern, minimal, easiest for travel and a second "party" change.'],
    ['dressBoho','Bohemian / flowy','Light, flowing fabrics, often with movement in the skirt: suits an outdoor terrace or a barefoot pool day.'],
    ['dressTwopc','Two-piece separates','Crop top and skirt worn separately: practical for heat, easy to change into a shorter piece later.'],
  ]},
  {title:"Partner's attire", tint:'wine', items:[
    ['suitTux','Classic tuxedo','Formal and timeless: best for an indoor ceremony or a marble-floored reception room.'],
    ['suitLinen','Linen suit','Breathable and relaxed: the natural choice for a hot Mediterranean afternoon.'],
    ['suitJacket','Odd jacket & trousers','A jacket in one tone, trousers in another: a little less formal, easy to lighten for the party later.'],
    ['suitGuayabera','Open-collar guayabera','No jacket needed: worn untucked, built for heat, still sharp for a garden ceremony.'],
  ]},
  {title:'Flowers & bouquet styles', tint:'cypress', items:[
    ['flowerCascade','Cascading','Trails downward from the hand: formal and romantic, classic for a ballgown.'],
    ['flowerRound','Round classic','Tight, symmetric dome of blooms: timeless, photographs cleanly.'],
    ['flowerWild','Wildflower / loose','Loosely gathered, uneven: matches a Provence or Puglia countryside setting.'],
    ['flowerTropical','Tropical / greenery-led','Big leaves, architectural stems: modern, low on fragile petals in the heat.'],
    ['flowerDried','Dried / boho','Pampas, dried grasses, muted tones: travels well without wilting in transit.'],
  ]},
  {title:'Venue mood', tint:'coral', items:[
    ['venueTuscany','Tuscan rustic-elegant','Terracotta, cypress trees, stone archways, long shared tables under string lights.'],
    ['venueProvence','Provençal lavender-chic','Pale stone bastides, lavender fields, blue-grey shutters, soft and painterly.'],
    ['venuePuglia','Puglia coastal white','Whitewashed masseria walls, domed trulli roofs, sun-bleached and breezy.'],
    ['venueAlgarve','Algarve modern-boho','Clean modern villas, azulejo tile accents, ocean-blue palette, relaxed and bright.'],
  ]},
  {title:'Music & entertainment mood', tint:'butter', items:[
    ['musicDJ','DJ set, uplit', 'A DJ booth with colored uplighting: reliable, flexible, easiest to keep the dance floor full all night.'],
    ['musicBand','Live band', 'A full band for the reception: bigger sound and energy, best on a stage or open terrace with room to move.'],
    ['musicAcoustic','Strings by day, DJ by night', 'A string duo or guitarist for the ceremony and cocktail hour, switching to a DJ once the dancing starts.'],
    ['musicSilent','Silent disco / bonfire after-party', 'Headphones after midnight, or an acoustic bonfire wind-down: good for a villa with noise curfews or light sleepers next door.'],
  ]},
  {title:'Hair styles', tint:'brass', items:[
    ['hairBun','Sleek low bun','Polished and cool in the heat: pairs well with statement earrings.'],
    ['hairWaves','Soft waves, down','Romantic and relaxed: the easiest to touch up yourself after the ceremony.'],
    ['hairBraid','Braided updo','Textured and secure for a long dancing night, holds up well outdoors.'],
    ['hairHalf','Half-up with flowers','Down enough to feel undone, up enough to keep hair off your face in a breeze.'],
  ]},
  {title:'Makeup looks', tint:'lilac', items:[
    ['makeupGlam','Classic bridal glam','Full coverage, defined eye, built to photograph under any light, indoor or out.'],
    ['makeupNatural','Soft "no-makeup" makeup','Skin-forward, minimal color: reads effortless in bright outdoor sun.'],
    ['makeupBronze','Bronzed, sun-kissed','Warm, glowing finish that matches a tan and an outdoor Mediterranean setting.'],
    ['makeupBold','Bold eye or lip statement','One dramatic feature, kept simple everywhere else.'],
  ]},
  {title:'Shoes', tint:'cypress', items:[
    ['shoeBlock','Block heel','Stable on grass, gravel or cobblestone: the safest choice for a villa lawn or old-town streets.'],
    ['shoePump','Classic pump','Elegant for an indoor ceremony or a marble-floored reception room.'],
    ['shoeSandal','Flat sandal','For a barefoot-adjacent, outdoor terrace ceremony or the beach.'],
    ['shoeSneaker','Comfortable party pair','A second pair for the dance floor and, the next day, the pool party.'],
  ]},
  {title:'Invitation styles', tint:'blush', items:[
    ['inviteLetterpress','Classic letterpress','Pressed type on thick cotton paper: formal, timeless, holds up well as a keepsake.'],
    ['inviteMinimal','Minimalist modern','Clean type, lots of white space: easy to read at a glance across three languages.'],
    ['inviteWatercolor','Watercolor floral','A painted floral motif tying back to your bouquet and venue colors.'],
    ['inviteBilingual','Bilingual / trilingual card','Hebrew, French and the local language side by side: worth planning the layout early with your designer or printer.'],
  ]},
  {title:'Second Look / Reception Outfit', tint:'coral', items:[
    ['secondMini','Short bridal mini','Still unmistakably bridal in white or ivory, but lighter, shorter and much easier to dance in.'],
    ['secondSlip','Fluid satin slip','A soft white or ivory slip dress that keeps the wedding feeling while removing weight and structure.'],
    ['secondJumpsuit','White bridal jumpsuit / two-piece','A clean ivory tailoring option with room to move, especially good if you want trousers for the late-night party.'],
    ['secondSparkle','Tea-length bridal dress','A mid-calf white wedding look with less volume and no train, so you can move comfortably without losing the bridal silhouette.'],
    ['secondShoes','Comfortable bridal flats','White or ivory flats, low heels or elegant bridal sneakers for dancing without changing the overall wedding palette.']
  ]}
];


"use strict";
function renderStyleSections(){
  const wrap = document.getElementById('styleSections'); wrap.innerHTML='';
  const visualBox=document.createElement('div'); visualBox.className='style-visual-section';
  visualBox.innerHTML='<div class="style-head"><h3>Visual inspiration, the real-world version</h3><span style="font-size:12px;color:var(--ink-faint);">Pin anything that feels like you</span></div>';
  const vg=document.createElement('div'); vg.className='style-visual-grid';
  const visuals=[
    ['Dress / outdoor','A-line gown + countryside light','https://cdn.stillwhite.com/assets/e5/93/40/e59340860a3b11ee868f06fde254d401/1600x.jpg','dress'],
    ['Groom / Mediterranean','Soft linen, relaxed but polished','https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85','suit'],
    ['Flowers / wild','Loose, garden-grown colour','https://cdn0.hitched.co.uk/article/1807/original/1920/jpg/67081-wildflower-bouquet-pastel.jpeg','flowers'],
    ['Venue / Italy','Long dinner under lights','https://cdn0.matrimonio.com/vendor/4259/3_2/1280/jpg/an209882_2_164259-167154925342839.jpeg','venue'],
    ['Venue / Provence','Lavender + pool + stone','https://cdn0.mariages.net/vendor/7928/3_2/1280/jpg/clos-du-tuilier-valentine-kagenaar-2_3_167928-175829157884321.jpeg','venue'],
    ['Venue / lake','Lake view + ceremony','https://cdn0.matrimonio.com/vendor/7486/3_2/640/jpg/villa-decio-81_2_317486-172658740460112.jpeg','venue'],
    ['Destination / Douro','River + vineyards + long table','https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=85','venue'],
    ['Destination / Procida','Tiny island, sea-view ceremony','https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85','venue']
  ];
  const tagTint={dress:'wine',suit:'lilac',flowers:'cypress',venue:'coral',music:'butter',hair:'brass',makeup:'brass',stationery:'lilac'};
  visuals.forEach(([title,desc,img,tag])=>{
    const c=document.createElement('div'); c.className='style-visual-card';
    c.innerHTML='<img src="'+esc(img)+'" alt=""><div class="body"><div class="eyebrow tint-text-'+(tagTint[tag]||'cypress')+'">'+esc(title)+'</div><h4>'+esc(desc)+'</h4><button class="btn small">Pin this</button></div>';
    c.querySelector('button').addEventListener('click',()=>{
      const data={type:'photo',imageDataUrl:img,title:desc,tag,createdAt:Date.now()};
      if(dbReady) db.collection('pinboard').add(data); else {localAdd(state.pins,data);renderBoard();renderStart();}
      showTab('board');
    });
    vg.appendChild(c);
  });
  visualBox.appendChild(vg); wrap.appendChild(visualBox);
  STYLE_SECTIONS.forEach(sec=>{
    const box = document.createElement('div'); box.className='style-section';
    const head = document.createElement('div'); head.className='style-head';
    head.innerHTML = '<h3 class="tint-text-'+sec.tint+'">'+sec.title+'</h3>';
    const addBtn = document.createElement('button');
    addBtn.type='button'; addBtn.className='btn small add-style-category';
    addBtn.textContent='+ Add style';
    addBtn.addEventListener('click', ()=> openStyleModal(sec.title));
    head.appendChild(addBtn);
    box.appendChild(head);
    const grid = document.createElement('div'); grid.className='style-grid';
    sec.items.forEach(([key,label,desc,itemImg])=>{
      const card = document.createElement('div'); card.className='style-card';
      const photo = itemImg || STYLE_PHOTOS[key];
      const visual = photo?'<img class="style-img" src="'+esc(photo)+'" alt="'+esc(label)+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.textContent=\'Image unavailable: use Pinterest search\'"><div class="style-photo-source">Matching visual · '+esc(label)+'</div>':'<div class="style-icon tint-'+sec.tint+'">'+svg(ICON[key])+'</div>';
      card.innerHTML = visual+'<h5>'+label+'</h5><p>'+desc+'</p><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;"><button class="btn small pin-style">Pin this</button><button class="btn small ghost pinterest-style">Pinterest ↗</button></div>';
      card.querySelector('.pin-style').addEventListener('click', ()=> pinStyle(key,label,sec.title));
      card.querySelector('.pinterest-style').addEventListener('click', ()=> window.open('https://www.pinterest.com/search/pins/?q='+encodeURIComponent(label+' wedding inspiration'),'_blank','noopener'));
      grid.appendChild(card);
    });
    state.customStyles.filter(s=>normalizeCategory(s.category)===normalizeCategory(sec.title)).forEach(s=>{
      grid.appendChild(customStyleCard(s, sec.title));
    });
    box.appendChild(grid);
    wrap.appendChild(box);
  });
  // beauty timeline
  const beauty = document.createElement('div'); beauty.className='style-section';
  beauty.innerHTML = '<div class="style-head"><h3>Beauty countdown</h3></div>';
  const tl = document.createElement('div'); tl.className='beauty-timeline';
  [
    ['2–3 months out','Trial run','Book a hair and makeup trial: ideally at the venue, or somewhere with matching outdoor light. Also start any teeth whitening or skin treatments that need repeat sessions.'],
    ['4–6 weeks out','Facials begin','Start a monthly facial if your skin is new to them: never try a first facial in the final week.'],
    ['2 weeks out','Last facial','Final facial and any last teeth whitening: enough buffer for skin to settle before photos.'],
    ['1 week out','Tan test / gradual tan begins','If spray tanning, do a test session first. Gradual, build-it-yourself tan is safer than one dark session right before.'],
    ['2–3 days out','Nails, brows, final tan top-up','Gel manicure and brow shaping: fresh, but settled in by the day.'],
    ['Morning of','Hair, makeup, dressing','Build in real time for a destination attendant to steam the dress after travel and help with bustling.'],
  ].forEach(([when,h,p])=>{
    const row = document.createElement('div'); row.className='beauty-row';
    row.innerHTML = '<div class="when">'+when+'</div><div><h5>'+h+'</h5><p>'+p+'</p></div>';
    tl.appendChild(row);
  });
  beauty.appendChild(tl);
  wrap.appendChild(beauty);

  const note = document.createElement('div'); note.className='note-box';
  note.innerHTML = '<b>Stylist / dresser:</b> for a destination wedding, hire a local hair & makeup artist who has worked outdoors in the region before (ask venues or other real weddings there for names): they’ll know how their products hold up in that heat and humidity. Separately, consider a bridal attendant or dresser just for the day: dresses travel badly and almost always need steaming on arrival, and someone dedicated to bustling, buttons and touch-ups matters more at a villa than at a hotel with on-call staff.';
  wrap.appendChild(note);
}
function pinStyle(key,label,section){
  const photo = STYLE_PHOTOS[key];
  const data = photo ? {type:'photo', imageDataUrl:photo, title:label, note:section, tag:sectionTag(section), createdAt:Date.now()}
    : {type:'style', icon:key, title:label, note:section, tag:sectionTag(section), createdAt:Date.now()};
  if(dbReady) db.collection('pinboard').add(data);
  else { localAdd(state.pins,data); renderBoard(); renderStart(); }
  showTab('board');
}
function sectionTag(section){
  if(section.includes('Dress')) return 'dress';
  if(section.includes('attire')) return 'suit';
  if(section.includes('Flower')) return 'flowers';
  if(section.includes('Venue')) return 'venue';
  if(section.includes('Music')) return 'music';
  if(section.includes('Hair')) return 'hair';
  if(section.includes('Makeup')) return 'makeup';
  if(section.includes('Invitation')) return 'stationery';
  return 'other';
}

/* ---------------- CUSTOM STYLES (per-category "+ Add style") ---------------- */
function normalizeCategory(v){
  let x = String(v||'').trim().toLowerCase();
  if(x==='second look / party outfit') x='second look / reception outfit';
  return x;
}
function customStyleCard(s, sectionTitle){
  const card = document.createElement('div'); card.className='style-card';
  card.innerHTML = '<img class="style-img" src="'+esc(s.image||'')+'" alt="'+esc(s.name||'Custom style')+'">'
    + '<div class="style-photo-source">Your style</div><h5>'+esc(s.name||'Untitled')+'</h5><p>'+esc(s.description||'')+'</p>'
    + '<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;"><button class="btn small pin-custom">Pin this</button><button class="btn small ghost del-custom">Delete</button></div>';
  card.querySelector('.pin-custom').addEventListener('click', ()=>{
    const data = {type:'photo', imageDataUrl:s.image, title:s.name, note:s.description||'', tag:sectionTag(sectionTitle), createdAt:Date.now()};
    if(dbReady) db.collection('pinboard').add(data); else { localAdd(state.pins,data); renderBoard(); renderStart(); }
    showTab('board');
  });
  card.querySelector('.del-custom').addEventListener('click', ()=>{
    confirmAction('Are you sure you want to delete "'+(s.name||'this style')+'"?', ()=>{
      if(dbReady && s.id) db.collection('customStyles').doc(s.id).delete();
    });
  });
  return card;
}

let pendingStyleImage='', activeStyleCategory='';
function ensureStyleModal(){
  let m = document.getElementById('styleModal');
  if(m) return m;
  m = document.createElement('div'); m.id='styleModal'; m.className='modal-backdrop';
  m.innerHTML = '<div class="modal">'
    + '<button class="close-x" id="styleModalClose">'+svg(ICON.x)+'</button>'
    + '<div class="eyebrow">Add to <span id="styleModalCategory"></span></div>'
    + '<h3>Add your own style</h3>'
    + '<div class="drop-zone" id="styleDropZone">Click to choose an image, or drag one here</div>'
    + '<input type="file" id="styleFileInput" accept="image/*" style="display:none;">'
    + '<div id="stylePreviewWrap" style="display:none;"><img id="stylePreview" style="width:100%;border-radius:8px;max-height:200px;object-fit:cover;"></div>'
    + '<label class="field">Style name<input type="text" id="styleName" placeholder="e.g. Square-neck silk A-line"></label>'
    + '<label class="field">Description<textarea id="styleDesc" placeholder="What you like about it, fabric, silhouette, styling notes…"></textarea></label>'
    + '<p class="warn" id="styleWarn" style="display:none;"></p>'
    + '<div class="modal-foot"><button class="btn" id="styleCancel">Cancel</button><button class="btn primary" id="styleSave" disabled>Add style</button></div>'
    + '</div>';
  document.body.appendChild(m);
  const close = ()=> m.classList.remove('open');
  m.querySelector('#styleModalClose').addEventListener('click', close);
  m.addEventListener('click', e=>{ if(e.target===m) close(); });
  m.querySelector('#styleCancel').addEventListener('click', close);
  const drop = m.querySelector('#styleDropZone'), file = m.querySelector('#styleFileInput');
  drop.addEventListener('click', ()=> file.click());
  file.addEventListener('change', ()=>{ if(file.files[0]) readStyleFile(file.files[0]); });
  ['dragover','dragleave','drop'].forEach(evt=>{
    drop.addEventListener(evt, e=>{
      e.preventDefault();
      drop.classList.toggle('drag', evt==='dragover');
      if(evt==='drop' && e.dataTransfer.files[0]) readStyleFile(e.dataTransfer.files[0]);
    });
  });
  m.querySelector('#styleSave').addEventListener('click', saveCustomStyle);
  return m;
}
function openStyleModal(category){
  activeStyleCategory = category;
  pendingStyleImage = '';
  const m = ensureStyleModal();
  m.querySelector('#styleModalCategory').textContent = category;
  m.querySelector('#styleName').value=''; m.querySelector('#styleDesc').value=''; m.querySelector('#styleFileInput').value='';
  m.querySelector('#stylePreviewWrap').style.display='none';
  m.querySelector('#styleSave').disabled = true;
  m.querySelector('#styleWarn').style.display='none';
  m.classList.add('open');
}
function readStyleFile(file){
  const m = document.getElementById('styleModal');
  const warn = m.querySelector('#styleWarn'); warn.style.display='none';
  if(!file || !/^image\//.test(file.type)){ warn.textContent='Please choose an image.'; warn.style.display='block'; return; }
  const reader = new FileReader();
  reader.onload = e=>{
    const img = new Image();
    img.onload = ()=>{
      const max = 1100, scale = Math.min(1, max/Math.max(img.width,img.height));
      const canvas = document.createElement('canvas'); canvas.width=Math.round(img.width*scale); canvas.height=Math.round(img.height*scale);
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      let q=.82, url=canvas.toDataURL('image/jpeg',q);
      while(url.length>420000 && q>.42){ q-=.1; url=canvas.toDataURL('image/jpeg',q); }
      if(url.length>500000){ warn.textContent='Image is too large. Try a smaller one.'; warn.style.display='block'; return; }
      pendingStyleImage = url;
      m.querySelector('#stylePreview').src = url;
      m.querySelector('#stylePreviewWrap').style.display='block';
      m.querySelector('#styleSave').disabled = false;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function saveCustomStyle(){
  const m = document.getElementById('styleModal');
  const name = m.querySelector('#styleName').value.trim();
  const desc = m.querySelector('#styleDesc').value.trim();
  const warn = m.querySelector('#styleWarn');
  if(!pendingStyleImage){ warn.textContent='Add an image first.'; warn.style.display='block'; return; }
  if(!name){ warn.textContent='Give the style a name.'; warn.style.display='block'; return; }
  if(!dbReady || !db){ warn.textContent='Shared sync is not connected yet: sign in to add a style.'; warn.style.display='block'; return; }
  m.querySelector('#styleSave').disabled = true;
  db.collection('customStyles').add({name, description:desc, category:activeStyleCategory, image:pendingStyleImage, createdAt:Date.now()})
    .then(()=> m.classList.remove('open'))
    .catch(err=>{ console.error(err); warn.textContent='Could not save style.'; warn.style.display='block'; m.querySelector('#styleSave').disabled = false; });
}

renderStyleSections();

/* ---------------- PDF / LINK TEXT EXTRACTION (shared by venue replies and custom venues) ---------------- */
let pdfjsWorkerConfigured = false;
function ensurePdfWorker(){
  if(pdfjsWorkerConfigured || typeof pdfjsLib==='undefined') return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';
  pdfjsWorkerConfigured = true;
}
/* Extracts plain text from an uploaded PDF entirely client-side via pdf.js,
   no server round-trip needed, so a brochure's own wording can feed the
   same keyword auto-fill already used for pasted email replies. Reads at
   most the first 12 pages, plenty for a brochure, to keep this fast. Also
   returns the PDF's own metadata title when it has one (most brochures
   exported from a design tool do), a much more reliable venue-name guess
   than trying to spot one in the extracted text itself. Text can come
   back empty for a scanned/image brochure with no real text layer at
   all, pdf.js can only read text that's actually stored as text, not
   OCR a picture of text, callers need to handle that case explicitly. */
async function extractPdfText(file){
  if(typeof pdfjsLib==='undefined') throw new Error('PDF reader did not load. Check your internet connection and try again.');
  ensurePdfWorker();
  const buf = await file.arrayBuffer();
  const doc = await pdfjsLib.getDocument({data: buf}).promise;
  let title = null;
  try{
    const meta = await doc.getMetadata();
    const infoTitle = meta && meta.info && meta.info.Title;
    if(infoTitle && infoTitle.trim() && !/^untitled$/i.test(infoTitle.trim())) title = infoTitle.trim();
  }catch(e){ /* metadata is optional, a missing/unreadable title just means no guess */ }
  const maxPages = Math.min(doc.numPages, 12);
  let text = '';
  for(let i=1;i<=maxPages;i++){
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(it=>it.str).join(' ') + '\n\n';
  }
  return { text: text.trim(), title };
}
/* These guesses are shared: venue replies scan pasted email text for them
   already, custom venues (and the curated list's own capacity chip, via
   extractVenueCapacity above) use the exact same patterns against a
   brochure PDF or a fetched webpage, no need for separate logic.
   guessGuestCountNumber is deliberately broad: real venue-website copy
   phrases a guest count many different ways ("sleeps 40", "capacity 120",
   "accommodates up to 60", "hosts 80 people", "for 45 pax"), a single
   narrow pattern like "N guests" alone was matching only description-style
   text and missing the actual number on a real page. */
function guessGuestCountNumber(text){
  let m=text.match(/wedding day up to (\d+)/i); if(m) return parseInt(m[1],10);
  m=text.match(/(?:event )?capacity (?:of |up to |: )?(\d+)/i); if(m) return parseInt(m[1],10);
  m=text.match(/(\d+)\s*[–-]\s*(\d+)\s*(?:guests|people|pax|persons)/i); if(m) return parseInt(m[2],10);
  m=text.match(/up to (\d+)\s*(?:guests|people|pax|persons)/i); if(m) return parseInt(m[1],10);
  m=text.match(/accommodat(?:es|ing)?\s*(?:up to\s*)?(\d+)/i); if(m) return parseInt(m[1],10);
  m=text.match(/hosts?\s*(?:up to\s*)?(\d+)\s*(?:guests|people)/i); if(m) return parseInt(m[1],10);
  m=text.match(/(?:max(?:imum)?\.?\s*(?:of\s*)?)(\d+)\s*(?:guests|people|pax|persons)?/i); if(m) return parseInt(m[1],10);
  m=text.match(/(\d+)\+?\s*(?:guests|people|pax|persons|personnes|invit[ée]s|convives)/i); if(m) return parseInt(m[1],10);
  m=text.match(/sleeping (\d+)/i); if(m) return parseInt(m[1],10);
  m=text.match(/sleeps?\s*(?:up to\s*)?(\d+)/i); if(m) return parseInt(m[1],10);
  return null;
}
function guessGuestCountFromText(text){
  const n = guessGuestCountNumber(text);
  return n ? n+' guests' : null;
}
/* Currency amounts show up as a symbol ("€3,500"), spelled out ("3.500
   eur"), or lead in with "from"/"starting at" on a listing page, so match
   all three shapes. Prefer an amount tagged "day"/"night" (an
   accommodation rate) over a bare amount, since a per-person catering
   price is usually mentioned separately and isn't what this field asks
   for. */
function guessPriceFromText(text){
  const CURRENCY_AMOUNT = '(?:[€$£]\\s?\\d[\\d,.]*|\\d[\\d,.]*\\s?(?:€|eur\\.?|euros?|usd|gbp)\\b)';
  const dayNight = text.match(new RegExp(CURRENCY_AMOUNT+'\\s*\\/?\\s*(?:per\\s*)?(?:day|night)\\b', 'i'));
  const fromPhrase = text.match(new RegExp('(?:from|starting (?:at|from))\\s*'+CURRENCY_AMOUNT, 'i'));
  const any = text.match(new RegExp(CURRENCY_AMOUNT, 'i'));
  const m = dayNight || fromPhrase || any;
  return m ? m[0] : null;
}
/* Best-effort first sentence, or a flat truncation if no clean sentence
   boundary shows up in that range. pdf.js doesn't preserve paragraph
   breaks within a page, so this can't rely on blank-line splitting the
   way a pasted, human-formatted email can. */
function guessSummaryFromText(text){
  const clean = text.replace(/\s+/g,' ').trim();
  const m = clean.match(/^.{40,500}?[.!?](?=\s|$)/);
  return m ? m[0].trim() : clean.slice(0,300);
}

/* ---------------- VENUES YOU'VE CONTACTED ---------------- */
const VENUE_CONTACT_FIELDS = [
  ['maxGuests', 'Max guests / sleeping capacity', 'e.g. 45 guests, 20 sleep on-site'],
  ['pricePerNight', 'Price (per night or full quote)', 'e.g. €3,500/night or €18,000 for 3 nights'],
  ['availability', 'Availability for your date', 'e.g. Confirmed available, needs 50% deposit to hold'],
  ['accommodations', 'Accommodations (on-site + nearby)', 'e.g. 12 suites included, hotel block nearby for the rest'],
  ['ceremonySpace', 'Ceremony space + rain backup', 'e.g. Terrace ceremony, indoor barn as backup'],
  ['kosherCatering', 'Outside kosher catering allowed?', 'e.g. Yes, kitchen access confirmed'],
  ['partyMusicPolicy', 'Partying & music policy', 'e.g. Music until midnight, outdoor speakers ok'],
  ['dayAfterAmenities', 'Day-after amenities', 'e.g. Pool and gardens open to guests the next day'],
  ['depositPolicy', 'Deposit / cancellation policy', 'e.g. 30% deposit, refundable until 60 days out'],
];
let pendingVenueContactThumb = '', editingVenueContactId = null, pendingVenueContactVenueId = '';
function ensureVenueContactModal(){
  let m = document.getElementById('venueContactModal');
  if(m) return m;
  m = document.createElement('div'); m.id='venueContactModal'; m.className='modal-backdrop';
  m.innerHTML = '<div class="modal">'
    + '<button class="close-x" id="vcModalClose">'+svg(ICON.x)+'</button>'
    + '<h3 id="vcModalTitle">Add a venue reply</h3>'
    + '<label class="field">Venue name<input type="text" id="vcName" placeholder="e.g. Dájas Douro Valley"></label>'
    + '<label class="field">Our decision<select id="vcDecision">'
      + '<option value="">No decision yet</option>'
      + '<option value="explore">Explore more</option>'
      + '<option value="not-fit">Not a fit</option>'
    + '</select></label>'
    + '<div class="drop-zone" id="vcDropZone">Click to choose a photo, or drag one here</div>'
    + '<input type="file" id="vcFileInput" accept="image/*" style="display:none;">'
    + '<div id="vcPreviewWrap" style="display:none;"><img id="vcPreview" style="width:100%;border-radius:8px;max-height:180px;object-fit:cover;"></div>'
    + VENUE_CONTACT_FIELDS.map(([key,label,placeholder])=> '<label class="field">'+esc(label)+'<input type="text" id="vc_'+key+'" placeholder="'+esc(placeholder)+'"></label>').join('')
    + '<label class="field">Brochure or listing link (optional)<input type="url" id="vcSourceLink" placeholder="https://…"></label>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;">'
      + '<button class="btn small ghost" id="vcFetchLinkText" type="button">Fetch text from this link</button>'
      + '<button class="btn small ghost" id="vcPdfBtn" type="button">Attach a PDF brochure</button>'
    + '</div>'
    + '<input type="file" id="vcPdfInput" accept="application/pdf" style="display:none;">'
    + '<p id="vcExtractStatus" style="display:none;font-size:12px;color:var(--ink-soft);"></p>'
    + '<label class="field">Their full reply (paste it here for reference)<textarea id="vcRawReply" rows="5" placeholder="Paste their email reply…"></textarea></label>'
    + '<button class="btn small ghost" id="vcAutoFill" type="button" style="align-self:flex-start;">Try auto-fill from this text</button>'
    + '<label class="field">Your notes<textarea id="vcNotes" rows="2" placeholder="Your own thoughts on this one"></textarea></label>'
    + '<p class="warn" id="vcWarn" style="display:none;"></p>'
    + '<div class="modal-foot"><button class="btn danger-outline" id="vcDelete" style="display:none;margin-right:auto;">Delete</button><button class="btn" id="vcCancel">Cancel</button><button class="btn primary" id="vcSave">Save</button></div>'
    + '</div>';
  document.body.appendChild(m);
  const close = ()=> m.classList.remove('open');
  m.querySelector('#vcModalClose').addEventListener('click', close);
  m.addEventListener('click', e=>{ if(e.target===m) close(); });
  m.querySelector('#vcCancel').addEventListener('click', close);
  const drop = m.querySelector('#vcDropZone'), file = m.querySelector('#vcFileInput');
  drop.addEventListener('click', ()=> file.click());
  file.addEventListener('change', ()=>{ if(file.files[0]) readVenueContactThumb(file.files[0]); });
  ['dragover','dragleave','drop'].forEach(evt=>{
    drop.addEventListener(evt, e=>{
      e.preventDefault();
      drop.classList.toggle('drag', evt==='dragover');
      if(evt==='drop' && e.dataTransfer.files[0]) readVenueContactThumb(e.dataTransfer.files[0]);
    });
  });
  m.querySelector('#vcSave').addEventListener('click', saveVenueContact);
  m.querySelector('#vcAutoFill').addEventListener('click', ()=> autoFillVenueContact());
  m.querySelector('#vcPdfBtn').addEventListener('click', ()=> m.querySelector('#vcPdfInput').click());
  m.querySelector('#vcPdfInput').addEventListener('change', ()=>{ const f=m.querySelector('#vcPdfInput').files[0]; if(f) handleVenueContactPdf(f); });
  m.querySelector('#vcFetchLinkText').addEventListener('click', fetchVenueContactLinkText);
  m.querySelector('#vcDelete').addEventListener('click', ()=>{
    if(!editingVenueContactId) return;
    const id = editingVenueContactId;
    confirmAction('Delete this venue reply?', ()=>{
      if(dbReady) db.collection('venueContacts').doc(id).delete().catch(err=> console.error(err));
      else { state.venueContacts = state.venueContacts.filter(x=>x.id!==id); renderVenueContacts(); }
      close();
    });
  });
  return m;
}
function openVenueContactModal(existing, prefillVenue){
  editingVenueContactId = existing ? existing.id : null;
  pendingVenueContactThumb = existing ? (existing.thumbnail||'') : '';
  pendingVenueContactVenueId = existing ? (existing.venueId||'') : (prefillVenue ? prefillVenue.id : '');
  const m = ensureVenueContactModal();
  m.querySelector('#vcModalTitle').textContent = existing ? 'Edit venue reply' : 'Add a venue reply';
  m.querySelector('#vcName').value = existing ? (existing.name||'') : (prefillVenue ? prefillVenue.name : '');
  m.querySelector('#vcDecision').value = existing ? (existing.decision||'') : '';
  VENUE_CONTACT_FIELDS.forEach(([key])=>{ m.querySelector('#vc_'+key).value = existing ? (existing[key]||'') : ''; });
  m.querySelector('#vcSourceLink').value = existing ? (existing.sourceLink||'') : '';
  m.querySelector('#vcRawReply').value = existing ? (existing.rawReply||'') : '';
  m.querySelector('#vcNotes').value = existing ? (existing.notes||'') : '';
  const previewWrap = m.querySelector('#vcPreviewWrap');
  if(pendingVenueContactThumb){ m.querySelector('#vcPreview').src = pendingVenueContactThumb; previewWrap.style.display='block'; }
  else previewWrap.style.display='none';
  m.querySelector('#vcFileInput').value='';
  m.querySelector('#vcPdfInput').value='';
  setVenueContactExtractStatus('');
  m.querySelector('#vcWarn').style.display='none';
  m.querySelector('#vcDelete').style.display = existing ? 'inline-flex' : 'none';
  m.classList.add('open');
}
/* [^.?!\n]*KEYWORD[^.?!\n]*[.?!]? grabs the clause around a keyword. The
   trailing punctuation is optional (not required) since bulleted lines in
   a pasted email, PDF or fetched page often end at a newline with no
   period. Shared by venue replies and custom venues, both pull the same
   kind of fact out of the same kind of source text. */
function guessAvailabilityFromText(text){
  const negativeAvail = /not available|fully booked|no longer available|already booked|indisponible|complet|plus disponible/i.test(text);
  const availSentence = text.match(/[^.?!\n]*(?:availab|disponib)[^.?!\n]*[.?!]?/i);
  if(negativeAvail) return (availSentence && availSentence[0].trim()) || 'Sounds not available, check their reply';
  return availSentence ? availSentence[0].trim() : null;
}
function guessKosherFromText(text){
  const m = text.match(/[^.?!\n]*(?:kosher|casher)[^.?!\n]*[.?!]?/i);
  return m ? m[0].trim() : null;
}
function guessCeremonyFromText(text){
  const m = text.match(/[^.?!\n]*(?:ceremony|chuppah|rain|indoor backup|c[ée]r[ée]monie|ext[ée]rieur)[^.?!\n]*[.?!]?/i);
  return m ? m[0].trim() : null;
}
function guessDepositFromText(text){
  const m = text.match(/[^.?!\n]*(?:deposit|cancellation|acompte|d[ée]p[ôo]t|arrhes|annulation)[^.?!\n]*[.?!]?/i);
  return m ? m[0].trim() : null;
}
/* "Accommodates" is ambiguous, it's used both for guest capacity
   ("accommodates 90 guests") and for on-site lodging ("accommodates
   overnight guests in 12 suites"), so specific lodging words are tried
   first; only falling back to the bare "accommodat-" root when the
   sentence isn't just a restatement of guest capacity. */
function guessAccommodationFromText(text){
  const lodging = text.match(/[^.?!\n]*(?:on-site (?:rooms?|suites?)|suites? (?:are |is )?included|sleeps?\s|en-suite|h[ée]bergement|chambre)[^.?!\n]*[.?!]?/i);
  if(lodging) return lodging[0].trim();
  const m = text.match(/[^.?!\n]*accommodat(?:es|ing|ion)?[^.?!\n]*[.?!]?/i);
  if(m && !/accommodat\w*\s+(?:up to\s*)?\d+\s*(?:guests|people|pax|persons)/i.test(m[0])) return m[0].trim();
  return null;
}
function guessPartyMusicFromText(text){
  const m = text.match(/[^.?!\n]*(?:music|noise|curfew|sound (?:system|limit)|until (?:midnight|1\s?am|2\s?am|11\s?pm|10\s?pm)|musique|bruit)[^.?!\n]*[.?!]?/i);
  return m ? m[0].trim() : null;
}
function guessDayAfterFromText(text){
  const m = text.match(/[^.?!\n]*(?:day.after|next day|pool day|brunch|lendemain|piscine)[^.?!\n]*[.?!]?/i);
  return m ? m[0].trim() : null;
}
/* Page <title> tags and PDF metadata titles are rarely a clean venue name
   on their own, real sites often chain a tagline and the brand name with
   a pipe or dash ("Luxury Resort on Lake Orta | La Darbia"). Taking the
   last segment favors the brand name in that common pattern; when there's
   no separator at all, the raw title is still a reasonable guess. */
function guessNameFromTitle(title){
  if(!title) return null;
  const parts = title.split(/\s*[|–-]\s*/).map(p=>p.trim()).filter(Boolean);
  const candidate = parts.length>1 ? parts[parts.length-1] : parts[0];
  return candidate ? candidate.slice(0,80) : null;
}
/* Best-effort keyword/regex guesses from the pasted reply, only fills fields
   that are still empty, always needs a human double-check. Pass silent=true
   when this runs automatically right after a PDF/link import, so it doesn't
   also pop the manual-button's confirmation alert. */
function autoFillVenueContact(silent){
  const m = document.getElementById('venueContactModal');
  const text = m.querySelector('#vcRawReply').value;
  if(!text.trim()){ if(!silent) alert('Paste their reply into the box above first, then try auto-fill.'); return 0; }
  let filled = 0;
  const setIfEmpty = (key, val)=>{ if(!val) return; const el = m.querySelector('#vc_'+key); if(el && !el.value.trim()){ el.value = val.trim(); filled++; } };

  /* Venue replies come in whatever language the venue does, French shows
     up often enough (guests, vendors) that these keyword checks match
     both languages rather than silently returning nothing on a French
     reply, like Villa Porta's did before this. */
  setIfEmpty('maxGuests', guessGuestCountFromText(text));
  setIfEmpty('pricePerNight', guessPriceFromText(text));
  setIfEmpty('availability', guessAvailabilityFromText(text));
  setIfEmpty('accommodations', guessAccommodationFromText(text));
  setIfEmpty('kosherCatering', guessKosherFromText(text));
  setIfEmpty('ceremonySpace', guessCeremonyFromText(text));
  setIfEmpty('partyMusicPolicy', guessPartyMusicFromText(text));
  setIfEmpty('dayAfterAmenities', guessDayAfterFromText(text));
  setIfEmpty('depositPolicy', guessDepositFromText(text));

  if(!silent){
    if(filled>0) alert('Filled in '+filled+' field'+(filled===1?'':'s')+' by scanning for keywords, this is just a rough guess so please check every field against their actual reply.');
    else alert("Scanned the text but none of it matched a field automatically. Their reply is still saved above, you'll need to fill the fields in by hand.");
  }
  return filled;
}
function setVenueContactExtractStatus(msg, isError){
  const el = document.getElementById('venueContactModal')?.querySelector('#vcExtractStatus');
  if(!el) return;
  el.style.display = msg ? 'block' : 'none';
  el.style.color = isError ? 'var(--danger)' : 'var(--ink-soft)';
  el.textContent = msg || '';
}
/* Reads the PDF entirely client-side, drops its text into the same "their
   full reply" box the auto-fill scan already reads, then runs that scan
   right away so a brochure updates the fields without an extra click. */
async function handleVenueContactPdf(file){
  const m = document.getElementById('venueContactModal');
  setVenueContactExtractStatus('Reading the PDF…');
  try{
    const {text, title} = await extractPdfText(file);
    if(!text){ setVenueContactExtractStatus("Couldn't find any text in that PDF, it's likely a scanned/image-only brochure with no real text layer (common for a designed PDF), which this can't read text from. Paste details in manually instead.", true); return; }
    const nameEl = m.querySelector('#vcName');
    if(!nameEl.value.trim() && title) nameEl.value = title;
    const existing = m.querySelector('#vcRawReply').value.trim();
    m.querySelector('#vcRawReply').value = existing ? existing+'\n\n'+text : text;
    const filled = autoFillVenueContact(true);
    setVenueContactExtractStatus(filled>0
      ? 'Filled in '+filled+' field'+(filled===1?'':'s')+' from the PDF, worth double-checking.'
      : "Pulled the PDF's text into “their full reply” above, but none of it matched a field automatically, worth reading it and filling those in by hand.");
  }catch(err){
    console.error(err);
    setVenueContactExtractStatus('Could not read that PDF: '+(err && err.message || err), true);
  }
}
/* Reuses the Worker's page-text lookup (resolvePageText, same idea as the
   og:image lookup already built for link previews) so a venue's own
   brochure/listing page can feed the auto-fill scan too, not just a PDF
   or pasted text. */
function fetchVenueContactLinkText(){
  const m = document.getElementById('venueContactModal');
  const url = m.querySelector('#vcSourceLink').value.trim();
  if(!url){ setVenueContactExtractStatus('Paste a link above first.', true); return; }
  const btn = m.querySelector('#vcFetchLinkText');
  btn.disabled = true; btn.textContent='Fetching…';
  setVenueContactExtractStatus('Fetching that page…');
  fetchPageText(url,
    (text, title)=>{
      btn.disabled = false; btn.textContent='Fetch text from this link';
      const nameEl = m.querySelector('#vcName');
      if(!nameEl.value.trim()){ const guessed = guessNameFromTitle(title); if(guessed) nameEl.value = guessed; }
      const existing = m.querySelector('#vcRawReply').value.trim();
      m.querySelector('#vcRawReply').value = existing ? existing+'\n\n'+text : text;
      const filled = autoFillVenueContact(true);
      setVenueContactExtractStatus(filled>0
        ? 'Filled in '+filled+' field'+(filled===1?'':'s')+' from the page, worth double-checking.'
        : "Pulled the page's text into “their full reply” above, but none of it matched a field automatically, worth reading it and filling those in by hand.");
    },
    (err)=>{
      btn.disabled = false; btn.textContent='Fetch text from this link';
      setVenueContactExtractStatus(err, true);
    }
  );
}
function readVenueContactThumb(file){
  const m = document.getElementById('venueContactModal');
  const warn = m.querySelector('#vcWarn'); warn.style.display='none';
  if(!file || !/^image\//.test(file.type)){ warn.textContent='Please choose an image.'; warn.style.display='block'; return; }
  const reader = new FileReader();
  reader.onload = e=>{
    const img = new Image();
    img.onload = ()=>{
      const max = 900, scale = Math.min(1, max/Math.max(img.width,img.height));
      const canvas = document.createElement('canvas'); canvas.width=Math.round(img.width*scale); canvas.height=Math.round(img.height*scale);
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      let q=.8, url=canvas.toDataURL('image/jpeg',q);
      while(url.length>350000 && q>.4){ q-=.1; url=canvas.toDataURL('image/jpeg',q); }
      pendingVenueContactThumb = url;
      m.querySelector('#vcPreview').src = url;
      m.querySelector('#vcPreviewWrap').style.display='block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
function saveVenueContact(){
  const m = document.getElementById('venueContactModal');
  const warn = m.querySelector('#vcWarn');
  const name = m.querySelector('#vcName').value.trim();
  if(!name){ warn.textContent='Give the venue a name.'; warn.style.display='block'; return; }
  const data = {name, thumbnail: pendingVenueContactThumb, venueId: pendingVenueContactVenueId, decision: m.querySelector('#vcDecision').value, sourceLink: m.querySelector('#vcSourceLink').value.trim(), rawReply: m.querySelector('#vcRawReply').value.trim(), notes: m.querySelector('#vcNotes').value.trim()};
  VENUE_CONTACT_FIELDS.forEach(([key])=>{ data[key] = m.querySelector('#vc_'+key).value.trim(); });
  if(editingVenueContactId){
    const id = editingVenueContactId;
    if(dbReady) db.collection('venueContacts').doc(id).update(data).catch(err=>{ console.error(err); warn.textContent='Could not save changes.'; warn.style.display='block'; });
    else { const existing = state.venueContacts.find(v=>v.id===id); if(existing) Object.assign(existing, data); renderVenueContacts(); renderVenues(); }
    m.classList.remove('open');
    jumpToVenueReply(id);
  } else {
    data.createdAt = Date.now();
    if(dbReady){
      db.collection('venueContacts').add(data).then(ref=> jumpToVenueReply(ref.id)).catch(err=>{ console.error(err); warn.textContent='Could not save this reply.'; warn.style.display='block'; });
    } else {
      const saved = localAdd(state.venueContacts, data);
      renderVenueContacts();
      renderVenues();
      jumpToVenueReply(saved.id);
    }
    m.classList.remove('open');
  }
}
document.getElementById('addVenueContactBtn').addEventListener('click', ()=> openVenueContactModal(null));
function renderVenueContacts(){
  const wrap = document.getElementById('venueContactsGrid'); if(!wrap) return;
  wrap.innerHTML='';
  if(!state.venueContacts.length){ wrap.innerHTML = '<p style="color:var(--ink-faint);font-size:13px;">No replies logged yet. When a venue answers you, click "+ Add a reply" and paste in the details.</p>'; return; }
  const decisionFilter = document.getElementById('vcDecisionFilter')?.value||'';
  const filtered = state.venueContacts.filter(v=> !decisionFilter || (v.decision||'')===(decisionFilter==='none'?'':decisionFilter));
  if(!filtered.length){ wrap.innerHTML = '<p style="color:var(--ink-faint);font-size:13px;">No replies match this filter.</p>'; return; }
  filtered.forEach(v=>{
    const decision = v.decision||'';
    const card = document.createElement('div'); card.className='card venue-contact-card decision-'+(decision||'none');
    card.dataset.contactId = v.id;
    const linkedVenue = v.venueId ? VENUES.find(x=>x.id===v.venueId) : null;
    const bullets = VENUE_CONTACT_FIELDS.filter(([key])=> (v[key]||'').trim()).map(([key,label])=> '<li><b>'+esc(label)+':</b> '+esc(v[key])+'</li>').join('');
    card.innerHTML =
      (v.thumbnail ? '<img src="'+esc(v.thumbnail)+'" class="venue-contact-thumb" alt="">' : '')
      + '<div class="venue-contact-body">'
      + '<h4>'+esc(v.name)+'</h4>'
      + '<select class="decision-select '+(decision||'none')+'">'
        + '<option value=""'+(!decision?' selected':'')+'>No decision yet</option>'
        + '<option value="explore"'+(decision==='explore'?' selected':'')+'>Explore more</option>'
        + '<option value="not-fit"'+(decision==='not-fit'?' selected':'')+'>Not a fit</option>'
      + '</select>'
      + (linkedVenue ? '<p class="venue-contact-backlink">Linked to "'+esc(linkedVenue.name)+'" on the Venues tab</p>' : '')
      + (bullets ? '<ul class="venue-contact-bullets">'+bullets+'</ul>' : '<p style="font-size:12.5px;color:var(--ink-faint);">No details filled in yet, click Edit to add some.</p>')
      + (v.notes ? '<p class="venue-contact-notes"><b>Notes:</b> '+esc(v.notes)+'</p>' : '')
      + (v.rawReply ? '<details class="venue-contact-raw"><summary>Show their full reply</summary><p>'+esc(v.rawReply)+'</p></details>' : '')
      + '<div class="diy-actions">'
      + '<button class="btn small ghost edit-vc">Edit</button>'
      + '<button class="btn small danger-outline del-vc">Delete</button>'
      + '</div></div>';
    card.querySelector('.decision-select').addEventListener('change', e=>{
      const val = e.target.value;
      e.target.className = 'decision-select '+(val||'none');
      card.className = 'card venue-contact-card decision-'+(val||'none');
      if(dbReady) db.collection('venueContacts').doc(v.id).update({decision: val}).catch(err=> console.error(err));
      else { v.decision = val; renderVenues(); }
    });
    card.querySelector('.edit-vc').addEventListener('click', ()=> openVenueContactModal(v));
    card.querySelector('.del-vc').addEventListener('click', ()=>{
      confirmAction('Delete this venue reply?', ()=>{
        if(dbReady) db.collection('venueContacts').doc(v.id).delete().catch(err=> console.error(err));
        else { state.venueContacts = state.venueContacts.filter(x=>x.id!==v.id); renderVenueContacts(); renderVenues(); }
      });
    });
    wrap.appendChild(card);
  });
}
renderVenueContacts();
document.getElementById('vcDecisionFilter')?.addEventListener('input', renderVenueContacts);
/* Jumps to the Replies tab and scrolls/highlights one specific reply card,
   used by the venue card's "View reply" button and right after saving a new
   reply, so logging one and then finding it again is a single click. */
function jumpToVenueReply(contactId){
  showTab('venuereplies');
  const filterEl = document.getElementById('vcDecisionFilter');
  if(filterEl && filterEl.value){ filterEl.value=''; renderVenueContacts(); }
  setTimeout(()=>{
    const card = document.querySelector('.venue-contact-card[data-contact-id="'+contactId+'"]');
    if(!card) return;
    card.scrollIntoView({behavior:'smooth', block:'center'});
    card.classList.add('highlight');
    setTimeout(()=> card.classList.remove('highlight'), 2200);
  }, 260);
}
