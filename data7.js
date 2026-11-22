/**
 * Humanitas expansion — five figures approved for the core roster (110 → 115).
 * Concatenates after data6 (Archimedes is on data6's DROP list, so this is a new entry).
 * Does not alter Native American records.
 */
(function () {
  function q(text, source) { return { text: text, source: source }; }
  function work(name, status, description, modernPresence) {
    return { name: name, type: "Creation", status: status || "stands", description: description || "", modernPresence: modernPresence || "" };
  }
  function fig(p) {
    return {
      id: p.id, slug: p.slug, name: p.name, epithet: p.epithet, categories: p.categories,
      birthYear: p.birthYear, deathYear: p.deathYear, eraLabel: p.eraLabel, region: p.region,
      civilization: p.civilization, summary: p.summary, biography: p.biography,
      philosophy: { corePrinciples: p.principles, viewOfHumanity: p.view, howWeOperate: p.operate, keyQuotes: p.quotes || [] },
      creations: p.creations, legacy: p.legacy, todayRelevance: p.today, relatedSlugs: p.related,
      accomplishments: p.accomplishments,
      datePrecision: p.datePrecision,
      birthYearAlt: p.birthYearAlt,
      deathYearAlt: p.deathYearAlt
    };
  }

  var m = [
    fig({
      id: "paul",
      slug: "paul-the-apostle",
      name: "Paul the Apostle",
      epithet: "Apostle to the Gentiles",
      categories: ["spiritual", "philosophical"],
      birthYear: 5, deathYear: 64, deathYearAlt: 67,
      datePrecision: "circa",
      eraLabel: "Early Christian mission / Julio-Claudian Rome",
      region: "Tarsus / Antioch / Aegean cities / Rome",
      civilization: "Jewish / Roman / early Christian",
      summary: "A Pharisee from Tarsus whose letters and journeys established churches around the eastern Mediterranean and made a Gentile mission a durable part of the Christian movement.",
      biography: [
        "Paul, also called Saul of Tarsus, was a Greek-speaking Jew and, by his own account, a Pharisee and a Roman citizen. The seven letters widely agreed to be his—Romans, 1 and 2 Corinthians, Galatians, Philippians, 1 Thessalonians, and Philemon—are the earliest surviving Christian writings and the main firsthand evidence for his thought.",
        "In those letters he argues that Gentiles may belong to the churches without taking on full Mosaic observance, and that trust in Christ, not lineage or ritual status, is the basis of standing before God. He describes the assembly as one body with many members and travels a network of cities from Syria and Cilicia through Asia Minor and Greece, writing when he cannot be present.",
        "Acts and later tradition place an earlier period in which he opposed Jesus’ followers, then a turning on the road to Damascus. Paul’s own letters speak of a revelation of Christ rather than narrating that journey in detail. The change is historically material; it is not the whole of the record he left.",
        "He was arrested in Jerusalem, appealed to the emperor, and was taken to Rome. Early Christian writers report that he was executed there under Nero, around 64 or 67 CE. The exact year is not certain. The letters remained in circulation, were collected as scripture, and shaped later Christian teaching on law, faith, and the makeup of the church."
      ],
      principles: [
        "Standing before God does not rest on birth or ritual status alone",
        "A community can be one body with many members",
        "Teaching can travel by letter when the teacher cannot",
        "A mission may cross ethnic and legal boundaries without erasing them from view"
      ],
      view: "Human beings, Jew and Gentile, can be held in a single community without a single ancestral law as the ticket of admission.",
      operate: "Write clearly, travel where the work is, and measure belonging by conduct and faith rather than by origin alone.",
      quotes: [q("There is neither Jew nor Greek, there is neither slave nor free, there is no male and female, for you are all one in Christ Jesus.", "Galatians 3:28")],
      creations: [
        work("The undisputed epistles", "stands", "Seven letters that are the earliest extant Christian documents and a primary source for first-century church life.", "Read as scripture in Christian churches; used as historical sources for the period."),
        work("The Gentile mission as a lasting structure", "transformed", "A practice of admitting non-Jews without full Torah observance, argued in letters such as Galatians and Romans.", "Remains a defining feature of most later Christian communities.")
      ],
      legacy: "A written theology and a missionary pattern that made Christianity portable across the eastern Roman world.",
      today: ["Questions of who belongs in a community, and on what terms, still follow the lines these letters first drew in public."],
      related: ["jesus", "john-the-baptist", "augustine", "constantine"],
      accomplishments: [
        "Wrote the earliest surviving Christian letters, seven of them widely accepted as his",
        "Argued that Gentile converts need not take on full Mosaic observance",
        "Founded and corresponded with churches around the Aegean and eastern Mediterranean",
        "Set out a theology of justification by faith and of the church as one body",
        "Was, according to early Christian tradition, executed in Rome under Nero (c. 64/67 CE)"
      ]
    }),
    fig({
      id: "archimedes",
      slug: "archimedes",
      name: "Archimedes",
      epithet: "Mathematician of Syracuse",
      categories: ["scientific", "philosophical"],
      birthYear: -287, deathYear: -212,
      datePrecision: "circa",
      eraLabel: "Hellenistic Sicily",
      region: "Syracuse, Sicily",
      civilization: "Greek / Hellenistic",
      summary: "A mathematician and engineer in Hellenistic Syracuse whose surviving treatises on areas, volumes, floating bodies, and mechanical advantage were studied for centuries.",
      biography: [
        "Archimedes was born in Syracuse, then a major Greek city in Sicily, around 287 BCE. He wrote in Doric Greek on geometry, statics, and hydrostatics. Surviving works include On the Sphere and Cylinder, Measurement of a Circle, On Floating Bodies, On Spirals, Quadrature of the Parabola, The Sand Reckoner, and The Method of Mechanical Theorems, the last recovered in a palimpsest in the modern period.",
        "In On the Sphere and Cylinder he proved that a sphere has two-thirds the volume of its circumscribed cylinder and an equal relation for surface area, a result he is said to have wanted marked on his tomb. Measurement of a Circle gives bounds for the ratio of circumference to diameter: 3 10/71 and 3 1/7. On Floating Bodies states the principle that a body in a fluid is buoyed up by the weight of the fluid it displaces. Later anecdote (Vitruvius) connected that principle to a gold crown; the treatise does not tell that story.",
        "He also treated levers, centers of gravity, and compound pulleys, and later writers credit him with a water-lifting screw and with engines used in the defense of Syracuse. How many of the machines are his, and how many are later attribution, is not always clear from the contemporary record.",
        "Syracuse fell to Rome under Marcus Claudius Marcellus in 212 BCE. Ancient accounts say Archimedes was killed during the sack, one version while at work on a diagram. His treatises were copied in the Greek and Islamic mathematical traditions and, in Latin translation, entered European curricula in the late Middle Ages and Renaissance."
      ],
      principles: [
        "A proof should close a quantity inside stated bounds",
        "Mechanical models can suggest a result that geometry must then prove",
        "The same relations can describe floating bodies and the lever",
        "Written demonstration outlasts the workshop that first used it"
      ],
      view: "Physical things can be reasoned about with the same exactness as figures in a plane.",
      operate: "State the assumptions, compute the bounds, and keep the argument in a form someone else can repeat.",
      quotes: [q("Give me a place to stand, and I shall move the Earth.", "Attributed to Archimedes by Pappus of Alexandria, Collection, Book VIII")],
      creations: [
        work("On the Sphere and Cylinder", "stands", "Proofs relating the volume and surface of a sphere to the cylinder that encloses it.", "Standard in the history of mathematics; the sphere-cylinder result is still taught."),
        work("On Floating Bodies", "stands", "A treatise stating the principle of buoyancy and analyzing the stability of floating masses.", "The principle remains a foundation of hydrostatics and naval architecture."),
        work("Measurement of a Circle", "stands", "A short work bounding the ratio of a circle’s circumference to its diameter.", "The bounds 22/7 and 223/71 remain a classic example of approximation by inscribed and circumscribed polygons.")
      ],
      legacy: "A body of mathematical argument on measure, mechanics, and floating bodies that later traditions kept in use.",
      today: ["Engineering still depends on buoyancy, mechanical advantage, and the habit of bounding an unknown rather than guessing it."],
      related: ["aristotle", "hippocrates", "galileo", "isaac-newton"],
      accomplishments: [
        "Proved the volume and surface relations between a sphere and its circumscribed cylinder",
        "Calculated explicit bounds for π in Measurement of a Circle",
        "Stated the principle of buoyancy in On Floating Bodies",
        "Developed exhaustion methods for areas and volumes later readers connected to integral calculus",
        "Designed mechanical devices used, according to later writers, in the defense of Syracuse"
      ]
    }),
    fig({
      id: "genghis",
      slug: "genghis-khan",
      name: "Genghis Khan",
      epithet: "Founder of the Mongol Empire",
      categories: ["political", "military"],
      birthYear: 1162, deathYear: 1227,
      datePrecision: "circa",
      eraLabel: "Rise of the Mongol Empire",
      region: "Mongolian steppe / Central and East Asia",
      civilization: "Mongol",
      summary: "Temüjin, later titled Chinggis Khan, unified the Mongol tribes in 1206 and built the core of an empire that, under him and his successors, spanned much of the Eurasian steppe and adjoining settled lands.",
      biography: [
        "Temüjin was born on the Mongolian steppe, most often dated around 1162 (1155 and 1167 also appear in the sources). After a childhood marked by the killing of his father and the dispersal of his family’s following, he gathered a personal retinue, made and broke alliances among steppe lineages, and by 1206 had brought the main Mongol tribes under one command. A quriltai then proclaimed him Chinggis Khan.",
        "He organized the army on a decimal system (arban, jaghun, mingghan, tumen) and promoted officers by service as well as by birth. Campaigns followed against the Tangut state of Western Xia, the Jin dynasty in northern China, and, after the killing of Mongol envoys, the Khwarazmian Empire in Central Asia and Iran. Those wars extended Mongol rule from the east Asian frontier into the Islamic world and were accompanied by the destruction of cities and large loss of life, which the record does not set aside.",
        "Administration traveled with the armies: a written record in the Uyghur-Mongol script, a postal relay (yam), protection for merchants, and decrees that, among other things, exempted some religious specialists from ordinary duties. What later writers call the Yassa is hard to reconstruct as a single law book; a body of orders and custom is better attested than a surviving code.",
        "He died in 1227 during a campaign against Western Xia. Succession passed through his sons, and under Ögedei, Möngke, and Kublai the empire reached its greatest contiguous extent, with routes of trade and communication running across Eurasia. The political center he founded is the starting point of that later map."
      ],
      principles: [
        "Command can be organized by decimal units and by recorded service",
        "Long-distance movement needs relays, scouts, and protected trade",
        "A ruler may leave local cults in place while claiming the right to tax and to levy troops",
        "Succession has to be settled, or an assembled empire divides"
      ],
      view: "Peoples of the steppe and of the sown can be held in one command if information, mobility, and law travel with the army.",
      operate: "Keep the units small enough to control, reward service, and make the roads safer for messengers and merchants than they were before.",
      quotes: [],
      creations: [
        work("The Mongol imperial army and decimal organization", "transformed", "A steppe military system grouped in tens, hundreds, thousands, and ten-thousands, with mixed tribal units.", "Studied as a model of mobile command; successor states carried variants of the system west and south."),
        work("The yam relay and protected trade routes", "transformed", "A postal and logistics network that moved orders, envoys, and goods across long distances.", "A foundation of the later trans-Eurasian traffic often called the Pax Mongolica.")
      ],
      legacy: "A unified Mongol polity whose conquests and routes tied East Asia, Central Asia, and the Middle East into one imperial field.",
      today: ["How a state treats trade corridors, subject religions, and the human cost of rapid conquest remains a live political question."],
      related: ["qin-shi-huang", "cyrus-the-great", "alexander-the-great"],
      accomplishments: [
        "Unified the Mongol tribes and was proclaimed Chinggis Khan in 1206",
        "Organized the army on a decimal system with promotion by service",
        "Conquered Western Xia, large parts of the Jin realm, and the Khwarazmian Empire",
        "Established written orders, a postal relay, and protection for long-distance trade",
        "Left a succession that, under his sons and grandsons, became the largest contiguous land empire on record"
      ]
    }),
    fig({
      id: "napoleon",
      slug: "napoleon-bonaparte",
      name: "Napoleon Bonaparte",
      epithet: "Civil Code and imperial France",
      categories: ["political", "military"],
      birthYear: 1769, deathYear: 1821,
      eraLabel: "French Revolution and Napoleonic Wars",
      region: "Corsica / France / Europe",
      civilization: "French",
      summary: "A Corsican-born general who became First Consul and Emperor of the French, issued the Civil Code of 1804, reorganized French administration, and fought a series of wars that redrew the map of Europe.",
      biography: [
        "Napoleon Bonaparte was born in Ajaccio, Corsica, on 15 August 1769, shortly after the island passed to France. Trained as an artillery officer, he rose during the French Revolutionary Wars, took power in the coup of 18 Brumaire (1799), and governed as First Consul, then, from 1804, as Emperor of the French.",
        "The Civil Code (promulgated 1804) fixed a single written law of persons, property, and contract for France: civil equality for male citizens, secular civil status, and strong protection of property. It was imposed or imitated in much of Europe and later in legal systems outside Europe. In the same years he created the Bank of France (1800), lycées, the Legion of Honour, a centralized prefectural administration, and, in 1801, the Concordat with the papacy.",
        "The Napoleonic Wars extended French control over large parts of the continent and ended in defeat: the retreat from Russia in 1812, abdication in 1814, a return in the Hundred Days, and Waterloo in 1815. The campaigns caused mass death and displacement. In 1802 he also restored slavery in French colonies where the revolutionary government had abolished it. Both facts belong in the record of the same career that produced the Code.",
        "Exiled first to Elba and then to Saint Helena, he died there on 5 May 1821. The Code, the administrative map of France, and the legal idea of a uniform civil statute remained after the empire did not."
      ],
      principles: [
        "Civil law should be written, uniform, and publicly known",
        "Administration can be trained and posted rather than inherited",
        "A state may settle with a church without making the church the source of civil status",
        "Military success does not, by itself, settle the legitimacy of a legal order"
      ],
      view: "Citizens can be equal before a published code even when political power is concentrated in one office.",
      operate: "Write the law down, train the people who apply it, and keep civil status in the hands of the state.",
      quotes: [],
      creations: [
        work("The Civil Code of 1804", "stands", "A comprehensive statute of civil law on persons, property, and obligations.", "Still the core of French civil law, as amended; ancestor of many civil-law codes in Europe and beyond."),
        work("Prefects, lycées, and the Bank of France", "stands", "A centralized administrative, educational, and financial apparatus created in the Consulate and Empire.", "Prefects, the lycée system, and the Bank of France remain institutions of the French state."),
        work("The Concordat of 1801", "transformed", "An agreement with Pope Pius VII that reopened legal Catholic worship in France under state oversight.", "Set a pattern of state–church settlement later revised in 1905.")
      ],
      legacy: "A written civil-law model and a centralized administrative state that outlasted the empire that issued them.",
      today: ["Legal systems still choose between a single written civil code and case-based common law; the 1804 Code is one origin of that choice."],
      related: ["justinian", "simon-bolivar", "george-washington", "john-locke"],
      accomplishments: [
        "Promulgated the Civil Code of 1804, which shaped civil law in France and in many later codes",
        "Reorganized French administration, public education (lycées), and finance (Bank of France, 1800)",
        "Negotiated the Concordat of 1801 between the French state and the papacy",
        "Commanded French armies through the Revolutionary and Napoleonic Wars, redrawing European borders",
        "Was defeated in 1815 and died in exile on Saint Helena on 5 May 1821"
      ]
    }),
    fig({
      id: "watt",
      slug: "james-watt",
      name: "James Watt",
      epithet: "Separate-condenser steam engine",
      categories: ["scientific"],
      birthYear: 1736, deathYear: 1819,
      eraLabel: "British Industrial Revolution",
      region: "Greenock / Glasgow / Birmingham",
      civilization: "Scottish / British",
      summary: "A Scottish instrument maker and engineer who patented a separate-condenser steam engine in 1769 and, with Matthew Boulton, manufactured rotative engines that became a standard power source for mills and factories.",
      biography: [
        "James Watt was born in Greenock, Renfrewshire, on 19 January 1736, and trained as a maker of mathematical instruments. While repairing a model of a Newcomen atmospheric engine at the University of Glasgow in the 1760s, he identified the heat lost when the cylinder was cooled to condense steam, and designed a separate condenser so the cylinder could remain hot.",
        "He obtained a British patent in 1769. After years of development and financial difficulty, he entered partnership with Matthew Boulton at Soho, near Birmingham, in 1775. Their firm supplied engines first for mines and then, with a rotative drive, for mills and factories. Watt also worked on the parallel motion, a sun-and-planet gear (to convert reciprocating motion into rotation while a patent on the crank was in others’ hands), a centrifugal governor, and an indicator for measuring engine performance.",
        "He described engine output in horsepower so that buyers could compare machines. The partnership’s patents, enforced into the late 1790s, both spread and, critics argued, slowed some rival designs. Watt was a member of the Lunar Society of Birmingham. He did not invent the steam engine; he made a much more economical form of an engine already in use.",
        "He retired from the firm around 1800, when the main patent term ended, and died at Heathfield Hall, Handsworth, on 19 August 1819. In 1960 the General Conference on Weights and Measures adopted the watt, named for him, as the SI unit of power."
      ],
      principles: [
        "Find where energy is wasted before adding more fuel",
        "A shop that can make many engines matters as much as a single prototype",
        "Name a unit so that two machines can be compared",
        "Improve an existing device rather than claiming to have begun the art"
      ],
      view: "Natural powers can be measured, saved, and set to regular work in a factory as well as in a mine.",
      operate: "Repair the model, isolate the loss, patent the remedy if you must, and then manufacture it at a useful scale.",
      quotes: [],
      creations: [
        work("The separate-condenser steam engine (patent 1769)", "transformed", "An engine that condenses steam in a vessel apart from the working cylinder, cutting fuel use compared with the Newcomen type.", "The design is a starting point for later high-pressure and rotative engines; examples survive in museums and in the technical literature."),
        work("Boulton & Watt rotative engines", "transformed", "Manufactured engines that delivered rotary motion to mills and workshops.", "A standard industrial power source in Britain and abroad until displaced by later engine types and by electricity."),
        work("Horsepower as a practical unit", "stands", "A way of stating an engine’s output by comparison with draught animals.", "The SI unit of power, the watt, was later named for him.")
      ],
      legacy: "A more economical steam engine, manufactured at scale, that became a common source of factory power in the industrial period.",
      today: ["Industrial power still begins with the same question Watt asked of the Newcomen model: where is the energy going, and can that loss be separated out?"],
      related: ["isaac-newton", "adam-smith", "benjamin-franklin", "thomas-edison"],
      accomplishments: [
        "Patented the separate-condenser steam engine in 1769, reducing fuel use compared with the Newcomen engine",
        "With Matthew Boulton, manufactured rotative engines that powered mines, mills, and factories",
        "Developed the parallel motion, sun-and-planet gear, and centrifugal governor used on those engines",
        "Introduced horsepower as a practical unit for comparing engine output",
        "Was the namesake, in 1960, of the SI unit of power, the watt"
      ]
    })
  ];

  var LOCKED = {
    hiawatha: 1, sequoyah: 1, tecumseh: 1, "sitting-bull": 1,
    "crazy-horse": 1, "chief-joseph": 1, sacagawea: 1, "black-elk": 1
  };

  var ADD_RELATED = {
    jesus: ["paul-the-apostle"],
    "john-the-baptist": ["paul-the-apostle"],
    augustine: ["paul-the-apostle"],
    constantine: ["paul-the-apostle"],
    aristotle: ["archimedes"],
    hippocrates: ["archimedes"],
    galileo: ["archimedes"],
    "isaac-newton": ["archimedes", "james-watt"],
    "qin-shi-huang": ["genghis-khan"],
    "cyrus-the-great": ["genghis-khan"],
    "alexander-the-great": ["genghis-khan"],
    justinian: ["napoleon-bonaparte"],
    "simon-bolivar": ["napoleon-bonaparte"],
    "george-washington": ["napoleon-bonaparte"],
    "john-locke": ["napoleon-bonaparte"],
    "adam-smith": ["james-watt"],
    "benjamin-franklin": ["james-watt"],
    "thomas-edison": ["james-watt"]
  };

  if (window.HUMANITAS && window.HUMANITAS.figures) {
    window.HUMANITAS.figures = window.HUMANITAS.figures.concat(m);
    window.HUMANITAS.figures.forEach(function (f) {
      if (LOCKED[f.slug]) return;
      var extra = ADD_RELATED[f.slug];
      if (!extra) return;
      f.relatedSlugs = f.relatedSlugs ? f.relatedSlugs.slice() : [];
      extra.forEach(function (s) {
        if (f.relatedSlugs.indexOf(s) === -1) f.relatedSlugs.push(s);
      });
    });
  }
})();
