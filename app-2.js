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
    "desc": "Whitewashed masserias (fortified farmhouses) that sleep 30–40+ guests on-site with a pool built in — the closest fit to a private \"everyone under one roof\" villa weekend, at a gentler price than Tuscany.",
    "facts": [
      "Masserias sleeping 30–40 guests",
      "Built-in pools for the day-after party",
      "Fewer direct flights — often via Rome/Milan"
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
    "price": "TBD — inquire",
    "badge": "Your find",
    "grad": [
      "#C9DFC3",
      "#C99A4E"
    ],
    "desc": "The one you fell for. A small exclusive-villa property on the Douro river, not branded as a wedding venue but has hosted private weddings before — worth an email before you fall any harder. Sleeps a smaller group than the other four, so it suits a more intimate guest list.",
    "facts": [
      "On-site: 11 rooms now, growing to 17 in 2025",
      "Hosts weddings & private events, per past guests",
      "Kosher catering: unconfirmed — needs outreach",
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
    "region": "Montenegro — Dobrota, Perast, Luštica & Kamenari",
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
      "Exclusive-use event day"
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
    "desc": "This one is particularly aligned with your weekend idea. The estate explicitly welcomes multi-day celebrations and lets clients bring their own caterer, which is worth investigating for kosher catering.",
    "facts": [
      "80 seated / 90 standing",
      "1–4 day events",
      "Bring-your-own catering allowed",
      "Exclusive estate"
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
  }
];

const VENUES = [...VENUES_PART_1,...VENUES_PART_2,...VENUES_PART_3,...VENUES_PART_4,...VENUES_PART_5];

function renderVenueFilters(){
  const regionSel=document.getElementById('venueRegionFilter');
  const tagSel=document.getElementById('venueTagFilter');
  if(!regionSel || !tagSel) return;
  const regions=[...new Set(VENUES.map(v=>v.region.split(',')[0]))].sort();
  const tags=[...new Set(VENUES.map(v=>v.badge).filter(Boolean))].sort();
  regionSel.innerHTML='<option value="">All regions</option>'+regions.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('');
  tagSel.innerHTML='<option value="">All tags</option>'+tags.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join('');
}
function renderVenues(){
  const grid = document.getElementById('venueGrid'); if(!grid) return;
  const q=(document.getElementById('venueSearch')?.value||'').trim().toLowerCase();
  const region=(document.getElementById('venueRegionFilter')?.value||'').toLowerCase();
  const tag=(document.getElementById('venueTagFilter')?.value||'').toLowerCase();
  grid.innerHTML='';
  const filtered=VENUES.filter(v=>{
    const hay=[v.name,v.region,v.desc,...(v.facts||[])].join(' ').toLowerCase();
    return (!q || hay.includes(q)) && (!region || v.region.toLowerCase().startsWith(region)) && (!tag || (v.badge||'').toLowerCase()===tag);
  });
  if(!filtered.length){
    grid.innerHTML='<div class="empty-board" style="grid-column:1/-1;">No matches yet. Try a broader search.</div>';
    return;
  }
  filtered.forEach(v=>{
    const fav = state.venues[v.id]||{};
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
      + '</div>'
      + '<div class="venue-body">'
      + '<div><h3>'+esc(v.name)+'</h3><div class="region">'+esc(v.region)+'</div></div>'
      + '<p>'+esc(v.desc)+'</p>'
      + '<div class="venue-facts">'+(v.facts||[]).map(f=>'<span class="fact">'+esc(f)+'</span>').join('')+'</div>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;">'+(v.sources||[]).map(s=>'<a class="src-link" target="_blank" rel="noopener" href="'+esc(s[1])+'">'+esc(s[0])+' ↗</a>').join('')+'</div>'
      + '<div class="venue-image-credit">'+(v.image ? 'Venue / wedding source image' : 'Destination visual reference, verify the exact property photo before publishing')+'</div>'
      + '<div class="venue-note"><textarea placeholder="Notes on '+esc(v.name)+'…">'+esc(fav.note||'')+'</textarea></div>'
      + '<div class="venue-foot"><button class="heart'+(fav.favorited?' on':'')+'">'+svg(ICON.heart)+'</button><span style="font-size:11.5px;color:var(--ink-faint)">'+(fav.favorited?'Shortlisted':'Tap to shortlist')+'</span><button class="btn small ghost ask-venue" style="margin-left:auto;">Ask planner about this</button></div>'
      + '</div>';
    card.querySelector('.heart').addEventListener('click', ()=> setVenueFav(v.id, {favorited: !fav.favorited, note: fav.note||''}));
    card.querySelector('textarea').addEventListener('change', e=> setVenueFav(v.id, {favorited: !!fav.favorited, note: e.target.value}));
    card.querySelector('.ask-venue').addEventListener('click', ()=> askPlannerAbout('What should we know about planning a kosher, chuppah wedding in '+v.name+' ('+v.region+') specifically? We are considering it for our shortlist.'));
    grid.appendChild(card);
  });
}
renderVenueFilters();
['venueSearch','venueRegionFilter','venueTagFilter'].forEach(id=>document.getElementById(id)?.addEventListener('input',renderVenues));
function setVenueFav(id, data){
  state.venues[id] = Object.assign({}, state.venues[id], data);
  if(dbReady) db.collection('venueFavorites').doc(id).set(state.venues[id]);
  else renderVenues();
}


"use strict";

const STYLE_PHOTOS = {
  dressA:'https://cdn.essensedesigns.com/uploads/2024/03/7897-01.jpg',
  dressMermaid:'https://www.estylecdn.com/manufcols/morilee/morilee-current/zoomalt/2121_0108.jpg',
  dressBall:'https://www.oliviabottega.com/cdn/shop/products/Copy-of-Classic-satin-ball-gown-Protea-OLIVIABOTTEGA-1622669976_f2ce7294-4593-4575-afba-117dbd10713e.jpg?v=1649487436&width=700',
  dressSheath:'https://www.hola.com/horizon/original_aspect_ratio/38c4717da006-rosa-clara-z.jpg',
  dressBoho:'https://www.kissprom.com/cdn/shop/files/a-line-long-sleeves-chiffon-wedding-dress-in-ivory_2.jpg?v=1779083839&width=700',
  dressTwopc:'https://cdn.shopify.com/s/files/1/0251/5215/9837/files/IMG-4963.jpg?v=1749196191',
  suitTux:'images/style-classic-tuxedo.svg',
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
  secondShoes:'images/style-bridal-flats.svg',
};

/* Live Pinterest pin embeds for cards where a photo isn't enough — real pins the couple picked.
   Embedded via Pinterest's own iframe (assets.pinterest.com/ext/embed.html), not the pinit.js
   blockquote widget — the widget script depends on third-party JS that ad blockers and tracking
   prevention commonly block, where a direct iframe just loads. */
const STYLE_PIN_IDS = {
  suitTux: '2392606048308030',
  secondShoes: '230879918390807624',
};
/* native width/height of each pin's embed, so the container can hold the right aspect ratio */
const STYLE_PIN_ASPECT = {
  suitTux: '345/558',
  secondShoes: '236/384',
};
function stylePinUrl(key){ return STYLE_PIN_IDS[key] ? 'https://www.pinterest.com/pin/'+STYLE_PIN_IDS[key]+'/' : null; }
function stylePinEmbed(key){ return STYLE_PIN_IDS[key] ? '<iframe src="https://assets.pinterest.com/ext/embed.html?id='+STYLE_PIN_IDS[key]+'" scrolling="no" frameborder="0" loading="lazy" style="width:100%;height:100%;border:0;display:block;"></iframe>' : null; }

const STYLE_SECTIONS = [
  {title:'Dress silhouettes', tint:'wine', items:[
    ['dressA','A-line','Fitted through the bodice, flares gently from the waist — flattering on the widest range of body types.'],
    ['dressMermaid','Mermaid / trumpet','Fitted to the knee then flares out — dramatic, best on a smooth indoor floor or a dance-floor moment.'],
    ['dressBall','Ballgown','Full, voluminous skirt — grand on a wide staircase or in a formal villa garden.'],
    ['dressSheath','Sheath / column','Straight and slim — modern, minimal, easiest for travel and a second "party" change.'],
    ['dressBoho','Bohemian / flowy','Light, flowing fabrics, often with movement in the skirt — suits an outdoor terrace or a barefoot pool day.'],
    ['dressTwopc','Two-piece separates','Crop top and skirt worn separately — practical for heat, easy to change into a shorter piece later.'],
  ]},
  {title:"Partner's attire", tint:'cypress', items:[
    ['suitTux','Classic tuxedo','Formal and timeless — best for an indoor ceremony or a marble-floored reception room.'],
    ['suitLinen','Linen suit','Breathable and relaxed — the natural choice for a hot Mediterranean afternoon.'],
    ['suitJacket','Odd jacket & trousers','A jacket in one tone, trousers in another — a little less formal, easy to lighten for the party later.'],
    ['suitGuayabera','Open-collar guayabera','No jacket needed — worn untucked, built for heat, still sharp for a garden ceremony.'],
  ]},
  {title:'Flowers & bouquet styles', tint:'cypress', items:[
    ['flowerCascade','Cascading','Trails downward from the hand — formal and romantic, classic for a ballgown.'],
    ['flowerRound','Round classic','Tight, symmetric dome of blooms — timeless, photographs cleanly.'],
    ['flowerWild','Wildflower / loose','Loosely gathered, uneven — matches a Provence or Puglia countryside setting.'],
    ['flowerTropical','Tropical / greenery-led','Big leaves, architectural stems — modern, low on fragile petals in the heat.'],
    ['flowerDried','Dried / boho','Pampas, dried grasses, muted tones — travels well without wilting in transit.'],
  ]},
  {title:'Venue mood', tint:'brass', items:[
    ['venueTuscany','Tuscan rustic-elegant','Terracotta, cypress trees, stone archways, long shared tables under string lights.'],
    ['venueProvence','Provençal lavender-chic','Pale stone bastides, lavender fields, blue-grey shutters, soft and painterly.'],
    ['venuePuglia','Puglia coastal white','Whitewashed masseria walls, domed trulli roofs, sun-bleached and breezy.'],
    ['venueAlgarve','Algarve modern-boho','Clean modern villas, azulejo tile accents, ocean-blue palette, relaxed and bright.'],
  ]},
  {title:'Music & entertainment mood', tint:'cypress', items:[
    ['musicDJ','DJ set, uplit', 'A DJ booth with colored uplighting — reliable, flexible, easiest to keep the dance floor full all night.'],
    ['musicBand','Live band', 'A full band for the reception — bigger sound and energy, best on a stage or open terrace with room to move.'],
    ['musicAcoustic','Strings by day, DJ by night', 'A string duo or guitarist for the ceremony and cocktail hour, switching to a DJ once the dancing starts.'],
    ['musicSilent','Silent disco / bonfire after-party', 'Headphones after midnight, or an acoustic bonfire wind-down — good for a villa with noise curfews or light sleepers next door.'],
  ]},
  {title:'Hair styles', tint:'wine', items:[
    ['hairBun','Sleek low bun','Polished and cool in the heat — pairs well with statement earrings.'],
    ['hairWaves','Soft waves, down','Romantic and relaxed — the easiest to touch up yourself after the ceremony.'],
    ['hairBraid','Braided updo','Textured and secure for a long dancing night, holds up well outdoors.'],
    ['hairHalf','Half-up with flowers','Down enough to feel undone, up enough to keep hair off your face in a breeze.'],
  ]},
  {title:'Makeup looks', tint:'brass', items:[
    ['makeupGlam','Classic bridal glam','Full coverage, defined eye, built to photograph under any light, indoor or out.'],
    ['makeupNatural','Soft "no-makeup" makeup','Skin-forward, minimal color — reads effortless in bright outdoor sun.'],
    ['makeupBronze','Bronzed, sun-kissed','Warm, glowing finish that matches a tan and an outdoor Mediterranean setting.'],
    ['makeupBold','Bold eye or lip statement','One dramatic feature, kept simple everywhere else.'],
  ]},
  {title:'Shoes', tint:'cypress', items:[
    ['shoeBlock','Block heel','Stable on grass, gravel or cobblestone — the safest choice for a villa lawn or old-town streets.'],
    ['shoePump','Classic pump','Elegant for an indoor ceremony or a marble-floored reception room.'],
    ['shoeSandal','Flat sandal','For a barefoot-adjacent, outdoor terrace ceremony or the beach.'],
    ['shoeSneaker','Comfortable party pair','A second pair for the dance floor and, the next day, the pool party.'],
  ]},
  {title:'Invitation styles', tint:'brass', items:[
    ['inviteLetterpress','Classic letterpress','Pressed type on thick cotton paper — formal, timeless, holds up well as a keepsake.'],
    ['inviteMinimal','Minimalist modern','Clean type, lots of white space — easy to read at a glance across three languages.'],
    ['inviteWatercolor','Watercolor floral','A painted floral motif tying back to your bouquet and venue colors.'],
    ['inviteBilingual','Bilingual / trilingual card','Hebrew, French and the local language side by side — worth planning the layout early with your designer or printer.'],
  ]},
  {title:'Second Look / Reception Outfit', tint:'blush', items:[
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
  visuals.forEach(([title,desc,img,tag])=>{
    const c=document.createElement('div'); c.className='style-visual-card';
    c.innerHTML='<img src="'+esc(img)+'" alt=""><div class="body"><div class="eyebrow">'+esc(title)+'</div><h4>'+esc(desc)+'</h4><button class="btn small">Pin this</button></div>';
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
    head.innerHTML = '<h3>'+sec.title+'</h3>';
    const addBtn = document.createElement('button');
    addBtn.type='button'; addBtn.className='btn small add-style-category';
    addBtn.textContent='+ Add style';
    addBtn.addEventListener('click', ()=> openStyleModal(sec.title));
    head.appendChild(addBtn);
    box.appendChild(head);
    const grid = document.createElement('div'); grid.className='style-grid';
    sec.items.forEach(([key,label,desc,itemImg])=>{
      const card = document.createElement('div'); card.className='style-card';
      const pinUrl = stylePinUrl(key);
      const pinEmbed = stylePinEmbed(key);
      const photo = itemImg || STYLE_PHOTOS[key];
      const visual = pinEmbed
        ? '<div class="style-pin-embed" style="aspect-ratio:'+(STYLE_PIN_ASPECT[key]||'1/1')+';">'+pinEmbed+'</div>'
        : (photo?'<img class="style-img" src="'+esc(photo)+'" alt="'+esc(label)+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.textContent=\'Image unavailable — use Pinterest search\'"><div class="style-photo-source">Matching visual · '+esc(label)+'</div>':'<div class="style-icon tint-'+sec.tint+'">'+svg(ICON[key])+'</div>');
      card.innerHTML = visual+'<h5>'+label+'</h5><p>'+desc+'</p><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;"><button class="btn small pin-style">Pin this</button><button class="btn small ghost pinterest-style">Pinterest ↗</button></div>';
      card.querySelector('.pin-style').addEventListener('click', ()=> pinStyle(key,label,sec.title));
      card.querySelector('.pinterest-style').addEventListener('click', ()=> window.open(pinUrl || ('https://www.pinterest.com/search/pins/?q='+encodeURIComponent(label+' wedding inspiration')),'_blank','noopener'));
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
    ['2–3 months out','Trial run','Book a hair and makeup trial — ideally at the venue, or somewhere with matching outdoor light. Also start any teeth whitening or skin treatments that need repeat sessions.'],
    ['4–6 weeks out','Facials begin','Start a monthly facial if your skin is new to them — never try a first facial in the final week.'],
    ['2 weeks out','Last facial','Final facial and any last teeth whitening — enough buffer for skin to settle before photos.'],
    ['1 week out','Tan test / gradual tan begins','If spray tanning, do a test session first. Gradual, build-it-yourself tan is safer than one dark session right before.'],
    ['2–3 days out','Nails, brows, final tan top-up','Gel manicure and brow shaping — fresh, but settled in by the day.'],
    ['Morning of','Hair, makeup, dressing','Build in real time for a destination attendant to steam the dress after travel and help with bustling.'],
  ].forEach(([when,h,p])=>{
    const row = document.createElement('div'); row.className='beauty-row';
    row.innerHTML = '<div class="when">'+when+'</div><div><h5>'+h+'</h5><p>'+p+'</p></div>';
    tl.appendChild(row);
  });
  beauty.appendChild(tl);
  wrap.appendChild(beauty);

  const note = document.createElement('div'); note.className='note-box';
  note.innerHTML = '<b>Stylist / dresser:</b> for a destination wedding, hire a local hair & makeup artist who has worked outdoors in the region before (ask venues or other real weddings there for names) — they’ll know how their products hold up in that heat and humidity. Separately, consider a bridal attendant or dresser just for the day: dresses travel badly and almost always need steaming on arrival, and someone dedicated to bustling, buttons and touch-ups matters more at a villa than at a hotel with on-call staff.';
  wrap.appendChild(note);
}
function pinStyle(key,label,section){
  const pinUrl = stylePinUrl(key);
  const photo = STYLE_PHOTOS[key];
  const data = pinUrl ? {type:'pinterest', url:pinUrl, title:label, note:section, tag:sectionTag(section), createdAt:Date.now()}
    : photo ? {type:'photo', imageDataUrl:photo, title:label, note:section, tag:sectionTag(section), createdAt:Date.now()}
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
    if(!confirm('Delete this style?')) return;
    if(dbReady && s.id) db.collection('customStyles').doc(s.id).delete();
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
  if(!dbReady || !db){ warn.textContent='Shared sync is not connected yet — sign in to add a style.'; warn.style.display='block'; return; }
  m.querySelector('#styleSave').disabled = true;
  db.collection('customStyles').add({name, description:desc, category:activeStyleCategory, image:pendingStyleImage, createdAt:Date.now()})
    .then(()=> m.classList.remove('open'))
    .catch(err=>{ console.error(err); warn.textContent='Could not save style.'; warn.style.display='block'; m.querySelector('#styleSave').disabled = false; });
}

renderStyleSections();
