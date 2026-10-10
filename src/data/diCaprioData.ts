import { VIPPass, ArchiveItem, FilmItem, AwardItem, PhotoArchiveItem } from '../types';

export const VIP_PASSES: VIPPass[] = [
  {
    id: 'pass-silver',
    tier: 'Silver',
    title: 'Silver Red Carpet Pass',
    price: 2500,
    badge: 'Limited Access',
    colorScheme: {
      accent: '#C0C0C0',
      border: 'border-slate-300/60',
      glow: 'rgba(215, 220, 230, 0.4)',
      badgeBg: 'bg-slate-800/90 text-slate-100 border border-slate-300/60',
      gradient: 'from-slate-300/30 via-slate-500/15 to-transparent'
    },
    features: [
      'Official Red Carpet Fan Zone accreditation',
      'Exclusive Q&A auditorium reserved seating',
      'Archival 4K professional photo opportunity',
      'Silver embossed certificate of authenticity',
      'Collector edition commemorative brochure'
    ],
    exclusiveBonus: 'Commemorative brushed silver engraved card with pass ID',
    availability: '18 Passes Remaining',
    image: '/src/assets/images/silver_vip_card_mockup_1791627207869.jpg',
    backImage: '/src/assets/images/card_back_details_1791627230842.jpg'
  },
  {
    id: 'pass-gold',
    tier: 'Gold',
    title: 'Gold Gala & Reception Pass',
    price: 6500,
    badge: 'Most Popular',
    colorScheme: {
      accent: '#D4AF37',
      border: 'border-amber-400/70',
      glow: 'rgba(212, 175, 55, 0.45)',
      badgeBg: 'bg-amber-950/90 text-amber-200 border border-amber-400/70',
      gradient: 'from-amber-500/30 via-amber-700/15 to-transparent'
    },
    features: [
      'VIP Premiere orchestra seating alongside crew',
      'Private pre-gala champagne reception with Leo',
      'One-on-one formal photo op & personal greeting',
      'Hardcover Leonardo DiCaprio monograph signed in person',
      'Access to private VIP hospitality sanctuary'
    ],
    exclusiveBonus: 'Hand-signed 24k brushed gold engraved card with pass ID',
    availability: '7 Passes Remaining',
    image: '/src/assets/images/gold_vip_card_mockup_1791627196554.jpg',
    backImage: '/src/assets/images/card_back_details_1791627230842.jpg'
  },
  {
    id: 'pass-platinum',
    tier: 'Platinum',
    title: 'Platinum Imperial Table Pass',
    price: 15000,
    badge: 'Ultra Exclusive',
    colorScheme: {
      accent: '#E5E4E2',
      border: 'border-cyan-200/60',
      glow: 'rgba(229, 228, 226, 0.55)',
      badgeBg: 'bg-slate-900/90 text-cyan-200 border border-cyan-300/70',
      gradient: 'from-cyan-300/30 via-blue-900/20 to-transparent'
    },
    features: [
      'Seat at Leonardo DiCaprio’s intimate private banquet table',
      'Executive briefing with Leo on Earth Alliance conservation projects',
      'Bespoke 24k solid gold plated personalized invitation card',
      'Personalized dedicated autograph and portrait session',
      'Backstage green-room escort with private concierge'
    ],
    exclusiveBonus: 'Numbered bronze miniature Oscar tribute & Earth Alliance benefactor medallion',
    availability: 'Only 3 Passes Available',
    image: '/src/assets/images/leo_meet_greet_vip_1791625400061.jpg',
    backImage: '/src/assets/images/card_back_details_1791627230842.jpg'
  }
];

export const OPEN_SOCIAL_HANDLES = [
  {
    platform: 'Instagram',
    handle: '@leonardodicaprio',
    displayName: 'Leonardo DiCaprio',
    url: 'https://www.instagram.com/leonardodicaprio?stkn=MXJlMTM1ZmFsczNtbw==',
    followers: '61.8M Followers',
    status: 'Verified Official',
    accentColor: '#E1306C',
    gradient: 'from-pink-500/25 via-purple-600/20 to-amber-500/15',
    description: 'Documentaries, climate crisis action, and archival cinema'
  },
  {
    platform: 'Facebook',
    handle: 'Leonardo DiCaprio Official',
    displayName: 'Leonardo DiCaprio',
    url: 'https://www.facebook.com/share/1CNbFN6kjs/',
    followers: '22M+ Community',
    status: 'Verified Page',
    accentColor: '#1877F2',
    gradient: 'from-blue-600/25 via-indigo-600/20 to-cyan-500/15',
    description: 'Earth Alliance, biodiversity alerts, and film announcements'
  },
  {
    platform: 'Telegram',
    handle: '@leonardodicap1974',
    displayName: 'Leonardo DiCaprio VIP',
    url: 'https://t.me/leonardodicap1974',
    followers: 'VIP Channel',
    status: 'Direct Channel',
    accentColor: '#0088CC',
    gradient: 'from-sky-400/25 via-cyan-600/20 to-blue-600/15',
    description: 'Exclusive gala dispatches, private alerts, and invitations'
  }
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-script-inception',
    title: "Original Signed 'Inception' Shooting Script",
    category: 'Film Memorabilia',
    price: 12000,
    year: '2010',
    isSoldOut: true,
    edition: '1 of 1 Certified Archival Piece',
    description: "Director Christopher Nolan's personal production draft, annotated and signed by Leonardo DiCaprio on page 47 with Cobb's spinning totem sketch.",
    provenance: 'Acquired directly from Syncopy Studios archive for charity auction.',
    imageFallbackGradient: 'from-amber-900/40 via-stone-900 to-black'
  },
  {
    id: 'arch-tuxedo-cannes',
    title: 'Bespoke Armani Tuxedo — Cannes 2019',
    category: 'Wardrobe Artifact',
    price: 38500,
    year: '2019',
    isSoldOut: true,
    edition: 'Museum Archive Piece',
    description: "Custom midnight navy wool and satin tuxedo worn by DiCaprio during the historic world premiere of 'Once Upon a Time in Hollywood'.",
    provenance: 'Giorgio Armani Private Atelier Archive, tagged & certified.',
    imageFallbackGradient: 'from-blue-950/40 via-stone-900 to-black'
  },
  {
    id: 'arch-jacket-revenant',
    title: "Limited 'The Revenant' Bear Claw Leather Jacket",
    category: 'Apparel Collector',
    price: 4200,
    year: '2016',
    isSoldOut: true,
    edition: 'Edition of 50 Worldwide',
    description: "Heavy distressed shearling leather coat inspired by Hugh Glass, featuring an oxidized silver bear claw zipper pull and inner silk map lining.",
    provenance: 'Regency Enterprises crew wrap edition.',
    imageFallbackGradient: 'from-emerald-950/40 via-stone-900 to-black'
  },
  {
    id: 'arch-wolf-notes',
    title: "Hand-Annotated 'Wolf of Wall Street' Speech Draft",
    category: 'Rare Manuscript',
    price: 9800,
    year: '2013',
    isSoldOut: true,
    edition: 'Original Document',
    description: "DiCaprio's handwritten margin notes on Jordan Belfort's iconic Steve Madden IPO motivation speech, including phonetic emphasis marks.",
    provenance: 'Sikelia Productions production binder.',
    imageFallbackGradient: 'from-red-950/40 via-stone-900 to-black'
  },
  {
    id: 'arch-chronometer',
    title: 'Earth Alliance Limited Chronometer Timepiece',
    category: 'Boutique Horology',
    price: 1850,
    year: '2026',
    isSoldOut: false,
    edition: 'Limited Run of 250',
    description: "Ultra-luxury Swiss automatic timepiece forged with titanium and recycled ocean gold. 100% of proceeds fund indigenous rainforest biodiversity programs.",
    provenance: 'Manufactured in Geneva in collaboration with Earth Alliance.',
    imageFallbackGradient: 'from-amber-900/30 via-slate-900 to-black'
  },
  {
    id: 'arch-filmcell-plaque',
    title: 'Original 35mm Master Film Cell Plaque',
    category: 'Cinema Relic',
    price: 750,
    year: '2026',
    isSoldOut: false,
    edition: 'Numbered Collector Series',
    description: "Archival shadowbox preserving three pristine 35mm master projection cells from Titanic, The Aviator, and The Revenant with etched brass dedication.",
    provenance: 'Cinematheque preservation vault certified.',
    imageFallbackGradient: 'from-yellow-950/30 via-zinc-900 to-black'
  }
];

export const TIMELINE_FILMS: FilmItem[] = [
  {
    id: 'film-gilbert',
    title: "What's Eating Gilbert Grape",
    year: 1993,
    director: 'Lasse Hallström',
    role: 'Arnie Grape',
    boxOffice: '$10.0M',
    quote: "I could go at any time... just like that!",
    synopsis: "At only 19 years old, DiCaprio stunned world cinema with a mesmerizing performance as Arnie, earning his first Academy Award nomination and establishing his rare generational talent.",
    accolades: 'Academy Award & Golden Globe Nomination',
    accentColor: '#EAB308'
  },
  {
    id: 'film-titanic',
    title: 'Titanic',
    year: 1997,
    director: 'James Cameron',
    role: 'Jack Dawson',
    boxOffice: '$2.26B',
    quote: "I'm the king of the world!",
    synopsis: "A monumental cinematic triumph that became the highest-grossing film of all time for over a decade. DiCaprio transformed from rising star into an iconic global cultural titan.",
    accolades: '11 Oscars Won · Blockbuster Cultural Milestone',
    accentColor: '#38BDF8'
  },
  {
    id: 'film-catch-me',
    title: 'Catch Me If You Can',
    year: 2002,
    director: 'Steven Spielberg',
    role: 'Frank Abagnale Jr.',
    boxOffice: '$352M',
    quote: "Two little mice fell in a bucket of cream...",
    synopsis: "DiCaprio teamed with Steven Spielberg and Tom Hanks in a breezy, dazzling cat-and-mouse masterclass, cementing his suave charisma and dramatic range.",
    accolades: 'Golden Globe Nominee · BAFTA Honors',
    accentColor: '#A855F7'
  },
  {
    id: 'film-aviator',
    title: 'The Aviator',
    year: 2004,
    director: 'Martin Scorsese',
    role: 'Howard Hughes',
    boxOffice: '$213M',
    quote: "The way of the future... the way of the future.",
    synopsis: "The launch of DiCaprio's towering creative alliance with Martin Scorsese. A harrowing exploration of eccentric aviation pioneer Howard Hughes' brilliant mind and descent into obsession.",
    accolades: 'Golden Globe Winner for Best Actor · 11 Oscar Nominations',
    accentColor: '#F59E0B'
  },
  {
    id: 'film-departed',
    title: 'The Departed',
    year: 2006,
    director: 'Martin Scorsese',
    role: 'Billy Costigan',
    boxOffice: '$291M',
    quote: "I'm not a cop, okay? I'm not a cop!",
    synopsis: "An electrifying psychological crime masterpiece in Boston's underworld. DiCaprio delivered raw, panic-stricken intensity alongside Jack Nicholson and Matt Damon.",
    accolades: '4 Academy Awards Won including Best Picture',
    accentColor: '#EF4444'
  },
  {
    id: 'film-inception',
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    role: 'Dom Cobb',
    boxOffice: '$837M',
    quote: "An idea is like a virus. Resilient. Highly contagious.",
    synopsis: "Christopher Nolan's landmark sci-fi dream heist. DiCaprio anchors a dizzying metaphysical labyrinth with deeply grounded emotional heartbreak as a mind-architect seeking redemption.",
    accolades: '4 Academy Awards · Universal Acclaim',
    accentColor: '#06B6D4'
  },
  {
    id: 'film-django',
    title: 'Django Unchained',
    year: 2012,
    director: 'Quentin Tarantino',
    role: 'Calvin J. Candie',
    boxOffice: '$425M',
    quote: "Gentlemen, you had my curiosity, but now you have my attention.",
    synopsis: "In a blood-chilling villain turn, DiCaprio famously sliced his hand open on real broken glass during filming and kept going without breaking character—a testament to relentless devotion.",
    accolades: 'Golden Globe Nominee · Iconic Tarantino Collaborator',
    accentColor: '#DC2626'
  },
  {
    id: 'film-wolf',
    title: 'The Wolf of Wall Street',
    year: 2013,
    director: 'Martin Scorsese',
    role: 'Jordan Belfort',
    boxOffice: '$406M',
    quote: "The only thing standing between you and your goal is the bullshit story you keep telling yourself.",
    synopsis: "A tour-de-force comic frenzy of greed and indulgence. DiCaprio's physical comedy and ferocious bravura monologues earned him worldwide critical standing.",
    accolades: 'Golden Globe Winner for Best Actor · Oscar Nominee',
    accentColor: '#EAB308'
  },
  {
    id: 'film-revenant',
    title: 'The Revenant',
    year: 2015,
    director: 'Alejandro G. Iñárritu',
    role: 'Hugh Glass',
    boxOffice: '$533M',
    quote: "As long as you can still grab a breath, you fight.",
    synopsis: "Filmed in sub-zero wilderness with only natural light, DiCaprio endured brutal physical trials to deliver a haunting performance that finally captured his Academy Award for Best Actor.",
    accolades: 'Academy Award for Best Actor · BAFTA · Golden Globe',
    accentColor: '#F59E0B'
  },
  {
    id: 'film-hollywood',
    title: 'Once Upon a Time in Hollywood',
    year: 2019,
    director: 'Quentin Tarantino',
    role: 'Rick Dalton',
    boxOffice: '$377M',
    quote: "Eight fucking whiskey sours... I couldn't stop at three or four...",
    synopsis: "A deeply soulful and hilarious love letter to 1969 Los Angeles. DiCaprio's portrayal of a fading television cowboy captured the fragile humanity of the acting craft.",
    accolades: 'Academy Award Nominee · BAFTA & SAG Nominee',
    accentColor: '#FB923C'
  },
  {
    id: 'film-killers',
    title: 'Killers of the Flower Moon',
    year: 2023,
    director: 'Martin Scorsese',
    role: 'Ernest Burkhart',
    boxOffice: '$157M',
    quote: "I love money, sir. But I love Mollie more.",
    synopsis: "A haunting historical reckoning with the Osage Reign of Terror. DiCaprio delivered a nuanced, morally decrepit portrait of complicity and love corrupted by greed.",
    accolades: 'AFI Movie of the Year · 10 Academy Award Nominations',
    accentColor: '#10B981'
  }
];

export const AWARDS_LIST: AwardItem[] = [
  {
    id: 'aw-oscar-revenant',
    year: 2016,
    title: 'Academy Award (Oscar)',
    category: 'Best Performance by an Actor in a Leading Role',
    project: 'The Revenant',
    institution: 'Academy of Motion Picture Arts and Sciences',
    iconType: 'oscar',
    description: "The long-awaited Oscar coronation. In his acceptance speech, Leonardo used the global stage to urge immediate world action against climate change."
  },
  {
    id: 'aw-globe-revenant',
    year: 2016,
    title: 'Golden Globe Award',
    category: 'Best Actor in a Motion Picture – Drama',
    project: 'The Revenant',
    institution: 'Hollywood Foreign Press Association',
    iconType: 'globe',
    description: "Dedicated to indigenous peoples worldwide whose lands and livelihoods are threatened by environmental exploitation."
  },
  {
    id: 'aw-bafta-revenant',
    year: 2016,
    title: 'BAFTA Film Award',
    category: 'Best Leading Actor',
    project: 'The Revenant',
    institution: 'British Academy of Film and Television Arts',
    iconType: 'bafta',
    description: "Honored at the Royal Opera House in London for his transformative survival performance."
  },
  {
    id: 'aw-globe-wolf',
    year: 2014,
    title: 'Golden Globe Award',
    category: 'Best Actor in a Motion Picture – Musical or Comedy',
    project: 'The Wolf of Wall Street',
    institution: 'Hollywood Foreign Press Association',
    iconType: 'globe',
    description: "Awarded for his dynamic physical comedic brilliance and manic charisma as Jordan Belfort."
  },
  {
    id: 'aw-globe-aviator',
    year: 2005,
    title: 'Golden Globe Award',
    category: 'Best Actor in a Motion Picture – Drama',
    project: 'The Aviator',
    institution: 'Hollywood Foreign Press Association',
    iconType: 'globe',
    description: "DiCaprio's first Golden Globe victory, honoring his profound portrayal of billionaire recluse Howard Hughes."
  },
  {
    id: 'aw-sag-revenant',
    year: 2016,
    title: 'Screen Actors Guild Award',
    category: 'Outstanding Performance by a Male Actor in a Leading Role',
    project: 'The Revenant',
    institution: 'SAG-AFTRA',
    iconType: 'sag',
    description: "Celebrated by fellow actors and peers in the industry as the definitive performance of the year."
  },
  {
    id: 'aw-silver-bear',
    year: 1997,
    title: 'Silver Bear for Best Actor',
    category: 'Best Leading Performance',
    project: 'Romeo + Juliet',
    institution: 'Berlin International Film Festival',
    iconType: 'bear',
    description: "Presented at Berlinale for Baz Luhrmann's hyper-kinetic modern adaptation of William Shakespeare's tragedy."
  },
  {
    id: 'aw-un-peace',
    year: 2014,
    title: 'United Nations Messenger of Peace',
    category: 'Global Climate & Environmental Leadership',
    project: 'Earth Alliance / Leonardo DiCaprio Foundation',
    institution: 'United Nations',
    iconType: 'peace',
    description: "Designated by UN Secretary-General Ban Ki-moon with a special focus on combating climate change at the Paris Agreement."
  }
];

export const PHOTO_ARCHIVES: PhotoArchiveItem[] = [
  {
    id: 'photo-1',
    title: 'Cannes Film Festival Red Carpet',
    year: '2019',
    era: 'Global Master',
    description: 'Leonardo DiCaprio in tailored tuxedo commanding the legendary Palais des Festivals steps.',
    location: 'Cannes, French Riviera',
    photographer: 'Stephane Cardinale / Corbis',
    image: '/src/assets/images/leo_hero_portrait_1791625375197.jpg',
    tags: ['Cannes', 'Cinema', 'Formal']
  },
  {
    id: 'photo-2',
    title: 'On-Set Vision with Martin Scorsese',
    year: '2023',
    era: 'Modern Master',
    description: 'Deep in conversation on the set of Killers of the Flower Moon in Fairfax, Oklahoma.',
    location: 'Oklahoma, USA',
    photographer: 'Melinda Sue Gordon',
    image: '/src/assets/images/leo_cinema_archive_1791625389792.jpg',
    tags: ['Scorsese', 'Masterclass', 'Production']
  },
  {
    id: 'photo-3',
    title: 'The Academy Award Triumph',
    year: '2016',
    era: 'Oscar Legend',
    description: 'Leonardo holding his Best Actor Academy Award statuette at the Dolby Theatre press room.',
    location: 'Hollywood, California',
    photographer: 'Kevork Djansezian / Getty',
    image: '/src/assets/images/leo_oscar_trophy_1791625412811.jpg',
    tags: ['Oscar', 'Revenant', 'History']
  },
  {
    id: 'photo-4',
    title: 'VIP Holographic Access Key',
    year: '2026',
    era: 'Boutique Lounge',
    description: 'The obsidian crystal VIP credential with gold leaf stamp and iridescent diffraction band.',
    location: 'Los Angeles Gala',
    photographer: 'Studio Private Atelier',
    image: '/src/assets/images/leo_meet_greet_vip_1791625400061.jpg',
    tags: ['VIP', 'Collector', 'Pass']
  }
];

export const THEME_AURAS = {
  gold: {
    name: 'Gold Imperial',
    primary: '#D4AF37',
    glow: 'rgba(212, 175, 55, 0.4)',
    border: 'rgba(212, 175, 55, 0.3)',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
    chipBg: 'bg-amber-950/60 text-amber-300 border-amber-500/40'
  },
  platinum: {
    name: 'Platinum Diamond',
    primary: '#E5E4E2',
    glow: 'rgba(229, 228, 226, 0.45)',
    border: 'rgba(229, 228, 226, 0.35)',
    gradient: 'from-slate-200 via-cyan-100 to-slate-400',
    chipBg: 'bg-slate-900/70 text-cyan-200 border-cyan-300/40'
  },
  emerald: {
    name: 'Emerald Rainforest',
    primary: '#10B981',
    glow: 'rgba(16, 185, 129, 0.4)',
    border: 'rgba(16, 185, 129, 0.3)',
    gradient: 'from-emerald-400 via-teal-500 to-emerald-700',
    chipBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
  },
  sapphire: {
    name: 'Sapphire Midnight',
    primary: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.4)',
    border: 'rgba(59, 130, 246, 0.3)',
    gradient: 'from-blue-400 via-indigo-500 to-blue-700',
    chipBg: 'bg-blue-950/60 text-blue-300 border-blue-500/40'
  },
  ruby: {
    name: 'Ruby Cinema',
    primary: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.4)',
    border: 'rgba(239, 68, 68, 0.3)',
    gradient: 'from-rose-400 via-red-500 to-rose-700',
    chipBg: 'bg-rose-950/60 text-rose-300 border-rose-500/40'
  }
};
