/**
 * Humanitas expansion — additional world-changing figures (batch 3).
 * Concatenates onto window.HUMANITAS.figures → total ~60 with data1+data2.
 */
(function () {
  var m = [
    {
      id: "cyrus",
      slug: "cyrus-the-great",
      name: "Cyrus the Great",
      epithet: "Founder of the Achaemenid Empire",
      categories: ["political", "humanitarian"],
      birthYear: -600,
      deathYear: -530,
      eraLabel: "Achaemenid Persia",
      region: "Iran / Near East",
      civilization: "Persian",
      summary:
        "Founder of the first Persian Empire, remembered for imperial scale and for policies of religious and cultural restoration—including the return of exiled peoples—that shaped later ideals of plural rule.",
      biography: [
        "Cyrus rose from Anshan to overthrow the Median and Lydian powers and take Babylon in 539 BCE, creating an empire that stretched from the Aegean toward Central Asia.",
        "Rather than erase conquered cults, Achaemenid practice—later celebrated on the Cyrus Cylinder—allowed temples and communities to reconstitute under imperial sovereignty.",
        "His model of multi-ethnic empire influenced Greek, Jewish, and later imperial imaginations of how power might restrain itself enough to last."
      ],
      philosophy: {
        corePrinciples: [
          "Plural subjects under one imperial peace",
          "Restoration over cultural erasure",
          "Legitimacy through order and return",
          "Power that permits local custom"
        ],
        viewOfHumanity:
          "Peoples can remain distinct under a shared political frame if conquest is followed by reconstitution rather than humiliation alone.",
        howWeOperate:
          "After victory, rebuild the sacred and civic life of the defeated when possible. Rule diversity with laws that do not demand total sameness.",
        keyQuotes: [
          {
            text: "I am Cyrus, king of the world…",
            source: "Cyrus Cylinder (paraphrase of royal inscription tradition)"
          }
        ]
      },
      creations: [
        {
          name: "Cyrus Cylinder",
          type: "Creation",
          status: "stands",
          description: "Babylonian clay cylinder recording Cyrus’s conquest and restorative policies.",
          modernPresence: "British Museum; often invoked in human-rights discourse (with historical caution)."
        }
      ],
      legacy: "The template of a multi-ethnic empire that claims moral legitimacy through restoration.",
      todayRelevance: [
        "Post-conflict reconstruction still chooses between erasure and plural reconstitution."
      ],
      relatedSlugs: ["hammurabi", "ashoka"]
    },
    {
      id: "moses",
      slug: "moses",
      name: "Moses",
      epithet: "Lawgiver of the Exodus",
      categories: ["spiritual", "political", "philosophical"],
      birthYear: -1391,
      deathYear: -1271,
      eraLabel: "Late Bronze Age (tradition)",
      region: "Egypt / Sinai / Canaan",
      civilization: "Israelite",
      summary:
        "Central figure of the Exodus tradition who leads an enslaved people into covenant freedom and receives a moral-legal code that shaped Judaism, Christianity, and Islam.",
      biography: [
        "In the biblical narrative, Moses is raised in Egypt, flees after intervening for a Hebrew slave, encounters the divine at the burning bush, and confronts Pharaoh until the people leave bondage.",
        "At Sinai he mediates covenant law—including the Decalogue—forming a people around justice, worship, and memory of liberation.",
        "Whether read as history, sacred memory, or both, the Moses story became one of humanity’s master templates for emancipation and law."
      ],
      philosophy: {
        corePrinciples: [
          "Liberation from bondage as sacred duty",
          "Covenant law binding rulers and ruled",
          "Memory of oppression as ethical restraint",
          "One God, one moral horizon for a people"
        ],
        viewOfHumanity:
          "Humans are not rightly property. A people becomes free when it accepts law that protects the vulnerable and limits idolatry of power.",
        howWeOperate:
          "Tell the liberation story to children. Bind politics to commandments that outrank the strong.",
        keyQuotes: [
          {
            text: "Let my people go.",
            source: "Exodus 5:1"
          }
        ]
      },
      creations: [
        {
          name: "Sinai covenant tradition / Torah law core",
          type: "Creation",
          status: "idea",
          description: "Foundational narrative and legal-moral code for Abrahamic civilizations.",
          modernPresence: "Scripture, liturgy, ethics, and civil-rights rhetoric worldwide."
        }
      ],
      legacy: "Freedom and law joined as one story.",
      todayRelevance: [
        "Modern emancipation movements still borrow Exodus language."
      ],
      relatedSlugs: ["david", "jesus", "muhammad"]
    },
    {
      id: "plato",
      slug: "plato",
      name: "Plato",
      epithet: "Architect of Western Philosophy",
      categories: ["philosophical", "political"],
      birthYear: -428,
      deathYear: -348,
      eraLabel: "Classical Athens",
      region: "Athens, Greece",
      civilization: "Hellenic",
      summary:
        "Student of Socrates and teacher of Aristotle who founded the Academy and wrote dialogues that set the agenda for metaphysics, politics, education, and justice in the West.",
      biography: [
        "After Socrates’ death, Plato wrote dialogues that preserve Socratic inquiry while developing his own theories of Forms, the soul, and the just city.",
        "He founded the Academy in Athens—an institutional home for philosophy that lasted centuries.",
        "The Republic, Symposium, Phaedo, and related works remain permanent coordinates for political and ethical thought."
      ],
      philosophy: {
        corePrinciples: [
          "Justice as harmony of soul and city",
          "Education as formation of character",
          "Truth beyond mere opinion",
          "Philosopher’s duty to the common good"
        ],
        viewOfHumanity:
          "Humans live among shadows of opinion until education turns them toward what is truly good and real.",
        howWeOperate:
          "Design education that trains desire as well as intellect. Ask what justice is before asking who rules.",
        keyQuotes: [
          {
            text: "The direction in which education starts a man will determine his future life.",
            source: "Republic (paraphrase tradition)"
          }
        ]
      },
      creations: [
        {
          name: "The Academy",
          type: "Creation",
          status: "destroyed",
          description: "Philosophical school in Athens.",
          modernPresence: "Ancestor of the university ideal."
        },
        {
          name: "Dialogues (Republic et al.)",
          type: "Creation",
          status: "stands",
          description: "Foundational philosophical texts.",
          modernPresence: "Taught worldwide."
        }
      ],
      legacy: "Philosophy as institutional and political project.",
      todayRelevance: [
        "Debates on elite education and justice still run through Plato."
      ],
      relatedSlugs: ["socrates", "aristotle"]
    },
    {
      id: "aristotle",
      slug: "aristotle",
      name: "Aristotle",
      epithet: "Master of Those Who Know",
      categories: ["philosophical", "scientific", "political"],
      birthYear: -384,
      deathYear: -322,
      eraLabel: "Classical Greece / Macedon",
      region: "Stagira / Athens / Macedon",
      civilization: "Hellenic",
      summary:
        "Philosopher-scientist who systematized logic, biology, ethics, and politics—teacher of Alexander and the intellectual backbone of later Islamic and European scholasticism.",
      biography: [
        "Aristotle studied at Plato’s Academy, tutored the young Alexander, and founded the Lyceum in Athens.",
        "His surviving works cover nearly every field of knowledge available in his age, from animals to constitutions.",
        "Through Arabic and Latin transmission he became ‘the Philosopher’ for centuries of global learning."
      ],
      philosophy: {
        corePrinciples: [
          "Empirical observation joined to logic",
          "Virtue as cultivated habit (golden mean)",
          "Humans as political animals",
          "Knowledge classified for use"
        ],
        viewOfHumanity:
          "Humans fulfill their nature through reason, friendship, and life in a well-ordered polis.",
        howWeOperate:
          "Study what is. Train character. Design institutions that fit human nature rather than fantasies of it.",
        keyQuotes: [
          {
            text: "Man is by nature a political animal.",
            source: "Politics I"
          }
        ]
      },
      creations: [
        {
          name: "Organon, Ethics, Politics, biological works",
          type: "Creation",
          status: "stands",
          description: "Corpus that structured Western and Islamic curricula.",
          modernPresence: "Logic, virtue ethics, and political science roots."
        }
      ],
      legacy: "The encyclopedia mind that refused to separate science from ethics.",
      todayRelevance: [
        "AI-era classification of knowledge still faces Aristotelian questions of purpose."
      ],
      relatedSlugs: ["plato", "ibn-sina"]
    },
    {
      id: "alexander",
      slug: "alexander-the-great",
      name: "Alexander the Great",
      epithet: "Conqueror Who Hellenized a World",
      categories: ["political"],
      birthYear: -356,
      deathYear: -323,
      eraLabel: "Hellenistic dawn",
      region: "Macedon to Indus",
      civilization: "Hellenistic",
      summary:
        "Macedonian king who shattered the Persian Empire and spread Greek language and cities across three continents, creating the Hellenistic world that shaped Judaism, Christianity, and science.",
      biography: [
        "Trained by Aristotle and inheriting Philip II’s army, Alexander crossed into Asia in 334 BCE and never lost a major set battle.",
        "He founded cities (notably Alexandria) that became engines of trade and learning.",
        "His early death fractured the empire, but the cultural synthesis he forced lasted centuries."
      ],
      philosophy: {
        corePrinciples: [
          "Bold strategic imagination",
          "Cultural fusion after conquest",
          "Personal leadership at the front",
          "Empire as vector of exchange"
        ],
        viewOfHumanity:
          "Peoples can be remixed under shared civic forms—for better and for violence.",
        howWeOperate:
          "When power expands, decide deliberately what culture travels with it.",
        keyQuotes: [
          {
            text: "There is nothing impossible to him who will try.",
            source: "Attributed tradition"
          }
        ]
      },
      creations: [
        {
          name: "Hellenistic world / Alexandria tradition",
          type: "Creation",
          status: "transformed",
          description: "Greek-speaking urban network from Egypt to Asia.",
          modernPresence: "Mediterranean cultural DNA."
        }
      ],
      legacy: "Globalization’s ancient prototype—brilliant and brutal.",
      todayRelevance: [
        "Soft power, cultural imperialism, and city-building remain Alexander’s toolkit."
      ],
      relatedSlugs: ["aristotle", "augustus"]
    },
    {
      id: "augustus",
      slug: "augustus",
      name: "Augustus (Octavian)",
      epithet: "First Roman Emperor",
      categories: ["political"],
      birthYear: -63,
      deathYear: 14,
      eraLabel: "Roman Principate",
      region: "Rome / Mediterranean",
      civilization: "Roman",
      summary:
        "Heir of Caesar who ended the Roman Republic’s civil wars, founded the Principate, and established administrative peace (Pax Romana) that reorganized the Mediterranean world.",
      biography: [
        "After Caesar’s assassination, Octavian outmaneuvered rivals, defeated Antony and Cleopatra, and accepted titles that made him first citizen in form and emperor in fact.",
        "He professionalized the army, reformed taxes and grain, and sponsored literature and building.",
        "The imperial system he founded lasted in various forms for centuries and shaped European statecraft."
      ],
      philosophy: {
        corePrinciples: [
          "Order after chaos as public good",
          "Institutions that outlast strongmen",
          "Propaganda joined to administration",
          "Peace as infrastructure"
        ],
        viewOfHumanity:
          "Humans need stable order; republics can fail into war until a new form holds the center.",
        howWeOperate:
          "Build systems of succession, finance, and law—not only personal charisma.",
        keyQuotes: [
          {
            text: "I found Rome a city of bricks and left it a city of marble.",
            source: "Suetonius tradition"
          }
        ]
      },
      creations: [
        {
          name: "Roman Principate / imperial administration",
          type: "Creation",
          status: "transformed",
          description: "Template of imperial governance.",
          modernPresence: "Law, roads, urban planning inheritances."
        }
      ],
      legacy: "The architecture of long imperial peace—and of concentrated power.",
      todayRelevance: [
        "Democracies still debate emergency powers and the price of order."
      ],
      relatedSlugs: ["marcus-aurelius", "alexander-the-great"]
    },
    {
      id: "qin",
      slug: "qin-shi-huang",
      name: "Qin Shi Huang",
      epithet: "First Emperor of China",
      categories: ["political"],
      birthYear: -259,
      deathYear: -210,
      eraLabel: "Qin unification",
      region: "China",
      civilization: "Chinese",
      summary:
        "King of Qin who conquered rival Warring States, proclaimed the first Chinese empire, standardized script, weights, and roads—and ruled with legendary severity.",
      biography: [
        "Ying Zheng completed conquest by 221 BCE and took the title First Emperor, ending centuries of multi-state warfare in the Chinese heartland.",
        "His regime standardized writing and measures, linked walls, and built roads—while suppressing dissent with harsh legalism.",
        "The dynasty fell quickly after his death, but the imperial unity he forced became China’s enduring political horizon."
      ],
      philosophy: {
        corePrinciples: [
          "Unity over fragmentation",
          "Standardization as state power",
          "Central law above local custom",
          "Monumental state projects"
        ],
        viewOfHumanity:
          "Order is imposed from the center when competing lords will not yield.",
        howWeOperate:
          "When unifying systems (currency, language, infrastructure), weigh efficiency against freedom.",
        keyQuotes: [
          {
            text: "I have collected all the writings… and burned those not useful.",
            source: "Traditional charge of book burning (historiographical tradition)"
          }
        ]
      },
      creations: [
        {
          name: "Imperial unification & Terracotta Army",
          type: "Creation",
          status: "partial",
          description: "Administrative unity and funerary complex.",
          modernPresence: "Chinese state unity narrative; major archaeological site."
        }
      ],
      legacy: "The template of Chinese imperial unity—and a warning about total standardization.",
      todayRelevance: [
        "Digital standardization and central control echo Qin tools at new scale."
      ],
      relatedSlugs: ["confucius", "cyrus-the-great"]
    },
    {
      id: "ibn-sina",
      slug: "ibn-sina",
      name: "Ibn Sina (Avicenna)",
      epithet: "Prince of Physicians",
      categories: ["scientific", "philosophical"],
      birthYear: 980,
      deathYear: 1037,
      eraLabel: "Islamic Golden Age",
      region: "Persia / Central Asia",
      civilization: "Islamic / Persian",
      summary:
        "Polymath whose Canon of Medicine and philosophical works shaped medical education from the Islamic world to Europe for centuries.",
      biography: [
        "Born near Bukhara, Ibn Sina mastered medicine and philosophy young and served courts while writing encyclopedic works.",
        "The Canon organized Greek and Islamic medical knowledge into a teaching system used into the early modern era.",
        "His metaphysics influenced both Islamic philosophy and Latin scholasticism."
      ],
      philosophy: {
        corePrinciples: [
          "Medicine as rational science",
          "Observation joined to theory",
          "Knowledge as public inheritance",
          "Philosophy serving healing"
        ],
        viewOfHumanity:
          "The body and mind can be understood systematically; healing is a learned craft.",
        howWeOperate:
          "Train physicians with rigorous texts. Preserve and improve knowledge across languages.",
        keyQuotes: [
          {
            text: "The knowledge of anything, since all things have causes, is not acquired or complete unless it is known by its causes.",
            source: "Attributed philosophical tradition"
          }
        ]
      },
      creations: [
        {
          name: "The Canon of Medicine",
          type: "Creation",
          status: "stands",
          description: "Medical encyclopedia.",
          modernPresence: "History of medicine curricula; manuscript tradition."
        }
      ],
      legacy: "Globalized medical science before the modern hospital.",
      todayRelevance: [
        "Cross-cultural knowledge exchange remains the condition of medical progress."
      ],
      relatedSlugs: ["aristotle", "hypatia"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Avicenna_Portrait_on_Silver_Vase_-_Museum_at_Ibn-e-Sina_Academy.jpg",
        credit: "Wikimedia Commons (portrait tradition)",
        caption: "Later portrait tradition of Ibn Sina"
      }
    },
    {
      id: "khwarizmi",
      slug: "al-khwarizmi",
      name: "Muḥammad ibn Mūsā al-Khwārizmī",
      epithet: "Father of Algebra",
      categories: ["scientific"],
      birthYear: 780,
      deathYear: 850,
      eraLabel: "Abbasid Baghdad",
      region: "Baghdad / Central Asia origins",
      civilization: "Islamic",
      summary:
        "Mathematician of the House of Wisdom whose works gave the West algebra and algorithms—foundations of modern computation and quantitative science.",
      biography: [
        "Working in Abbasid Baghdad, al-Khwārizmī wrote on Hindu-Arabic numerals, algebra, astronomy, and geography.",
        "Latin translations of his name and methods produced the word algorithm; his algebra structured equation-solving for centuries.",
        "He stands at the junction where Indian, Greek, and Islamic knowledge became a global mathematical language."
      ],
      philosophy: {
        corePrinciples: [
          "Clear procedures for solving unknowns",
          "Number systems as civilizational infrastructure",
          "Translation as scientific power",
          "Mathematics serving astronomy and trade"
        ],
        viewOfHumanity:
          "Humans can master complexity when they invent shared symbolic tools.",
        howWeOperate:
          "Teach quantitative literacy. Honor translators and method-makers.",
        keyQuotes: [
          {
            text: "That fondness for science… has encouraged me to compose a short work on calculating by completion and reduction.",
            source: "Algebra (paraphrase of opening intent)"
          }
        ]
      },
      creations: [
        {
          name: "Kitāb al-Jabr (Algebra)",
          type: "Creation",
          status: "stands",
          description: "Foundational algebraic text.",
          modernPresence: "Every equation and algorithm inherits this lineage."
        }
      ],
      legacy: "The hidden grammar of the digital age.",
      todayRelevance: [
        "AI and finance run on algebraic procedures he helped make thinkable."
      ],
      relatedSlugs: ["ibn-sina", "newton"]
    },
    {
      id: "gutenberg",
      slug: "johannes-gutenberg",
      name: "Johannes Gutenberg",
      epithet: "Inventor of Movable-Type Printing in Europe",
      categories: ["scientific", "philosophical"],
      birthYear: 1400,
      deathYear: 1468,
      eraLabel: "Northern Renaissance",
      region: "Mainz, Holy Roman Empire",
      civilization: "European",
      summary:
        "Craftsman who combined movable metal type, oil-based ink, and the press to make books reproducible at scale—igniting mass literacy, Reformation, and science.",
      biography: [
        "In mid-15th-century Mainz, Gutenberg developed a practical system for printing with movable type.",
        "The 42-line Bible demonstrated that sacred and scholarly texts could multiply beyond the scriptorium.",
        "Information ceased to be only a luxury of monasteries and courts."
      ],
      philosophy: {
        corePrinciples: [
          "Knowledge multiplies when media multiplies",
          "Craft innovation as civilizational lever",
          "Text as public infrastructure",
          "Standardization enables scale"
        ],
        viewOfHumanity:
          "Humans change when everyone can hold the same page.",
        howWeOperate:
          "Invest in tools that democratize reading. Guard against both monopoly and chaos in information systems.",
        keyQuotes: [
          {
            text: "Religious truth is captive in a small number of little manuscripts…",
            source: "Later paraphrase of printing’s effect (historiographical)"
          }
        ]
      },
      creations: [
        {
          name: "Gutenberg Bible / European letterpress system",
          type: "Creation",
          status: "stands",
          description: "Surviving Bibles and the printing method.",
          modernPresence: "Every press, PDF, and blog is a remote descendant."
        }
      ],
      legacy: "The first great information revolution of the modern world.",
      todayRelevance: [
        "Internet-scale publishing is Gutenberg’s explosion continued."
      ],
      relatedSlugs: ["martin-luther", "tim-berners-lee"]
    },
    {
      id: "luther",
      slug: "martin-luther",
      name: "Martin Luther",
      epithet: "Catalyst of the Reformation",
      categories: ["spiritual", "political", "philosophical"],
      birthYear: 1483,
      deathYear: 1546,
      eraLabel: "Protestant Reformation",
      region: "Saxony / Holy Roman Empire",
      civilization: "European Christian",
      summary:
        "Augustinian monk whose challenge to indulgences and authority split Western Christianity, elevated vernacular scripture, and reordered European politics and conscience.",
      biography: [
        "Luther’s Ninety-Five Theses (1517) and subsequent writings refused to recant at Worms, protected by German princes.",
        "He translated the Bible into German and argued justification by faith, priesthood of believers, and scripture’s primacy.",
        "Wars and confessions followed; Europe’s map of belief and state power was permanently redrawn."
      ],
      philosophy: {
        corePrinciples: [
          "Conscience bound to scripture",
          "Faith over purchasable grace",
          "Vernacular access to sacred text",
          "Critique of corrupt religious power"
        ],
        viewOfHumanity:
          "Every person stands before God without needing a market of mediation.",
        howWeOperate:
          "Put foundational texts in the people’s language. Allow conscience public voice—and accept the conflicts that follow.",
        keyQuotes: [
          {
            text: "Here I stand. I can do no other.",
            source: "Diet of Worms tradition"
          }
        ]
      },
      creations: [
        {
          name: "German Bible translation & Protestant confessions",
          type: "Creation",
          status: "stands",
          description: "Scripture and churches of the Reformation.",
          modernPresence: "Global Protestantism; vernacular literacy drives."
        }
      ],
      legacy: "Religious authority decentralized; individual conscience politicized.",
      todayRelevance: [
        "Whistleblowing against institutions still channels Lutheran courage—and risk."
      ],
      relatedSlugs: ["gutenberg", "jesus"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/9/90/Lucas_Cranach_d.Ä._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg",
        credit: "Lucas Cranach the Elder / Wikimedia Commons",
        caption: "Martin Luther, 1528 portrait"
      }
    },
    {
      id: "copernicus",
      slug: "nicolaus-copernicus",
      name: "Nicolaus Copernicus",
      epithet: "Author of the Heliocentric Shift",
      categories: ["scientific", "philosophical"],
      birthYear: 1473,
      deathYear: 1543,
      eraLabel: "Scientific Renaissance",
      region: "Royal Prussia / Poland",
      civilization: "European",
      summary:
        "Astronomer who proposed that Earth and planets revolve around the Sun—displacing the Earth from the cosmic center and enabling modern astronomy.",
      biography: [
        "A canon and polymath, Copernicus developed a heliocentric mathematical model published as De revolutionibus in 1543.",
        "The book’s cautious preface and delayed release could not stop the intellectual earthquake it began.",
        "Galileo, Kepler, and Newton would build on the path he opened."
      ],
      philosophy: {
        corePrinciples: [
          "Mathematical elegance as guide to nature",
          "Courage to displace human centrality",
          "Observation reforming tradition",
          "Cosmos as orderly system"
        ],
        viewOfHumanity:
          "Humans are not geometrically central—but they can understand a vast order.",
        howWeOperate:
          "Let evidence revise sacred cosmologies carefully but honestly.",
        keyQuotes: [
          {
            text: "To know that we know what we know, and to know that we do not know what we do not know, that is true knowledge.",
            source: "Attributed tradition (often linked to the scientific spirit)"
          }
        ]
      },
      creations: [
        {
          name: "De revolutionibus orbium coelestium",
          type: "Creation",
          status: "stands",
          description: "Heliocentric treatise.",
          modernPresence: "Foundation of modern astronomy."
        }
      ],
      legacy: "The cosmic decentering of the human.",
      todayRelevance: [
        "Every GPS satellite rides on post-Copernican physics."
      ],
      relatedSlugs: ["galileo", "newton"]
    },
    {
      id: "galileo",
      slug: "galileo",
      name: "Galileo Galilei",
      epithet: "Father of Modern Observational Science",
      categories: ["scientific", "philosophical"],
      birthYear: 1564,
      deathYear: 1642,
      eraLabel: "Scientific Revolution",
      region: "Italy",
      civilization: "European",
      summary:
        "Physicist and astronomer who turned the telescope on the heavens, defended Copernicanism, and established experiment and mathematics as the language of nature—despite trial by the Inquisition.",
      biography: [
        "Galileo improved the telescope, discovered Jupiter’s moons and lunar mountains, and argued that the book of nature is written in mathematics.",
        "His conflict with church authorities made him a permanent symbol of scientific freedom under pressure.",
        "His kinematics of motion prepared the way for Newton."
      ],
      philosophy: {
        corePrinciples: [
          "Experiment over pure authority",
          "Mathematics as nature’s language",
          "Public demonstration of evidence",
          "Intellectual courage under power"
        ],
        viewOfHumanity:
          "Humans grasp truth by measuring, not only by quoting.",
        howWeOperate:
          "Build instruments. Publish results. Protect dissent in science.",
        keyQuotes: [
          {
            text: "And yet it moves.",
            source: "Attributed after trial (Eppur si muove tradition)"
          }
        ]
      },
      creations: [
        {
          name: "Telescopic astronomy & Two New Sciences",
          type: "Creation",
          status: "stands",
          description: "Observational discoveries and physics texts.",
          modernPresence: "Scientific method culture."
        }
      ],
      legacy: "Science as a public, instrumented confrontation with reality.",
      todayRelevance: [
        "Science communication under political pressure remains Galilean."
      ],
      relatedSlugs: ["nicolaus-copernicus", "newton"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Justus_Sustermans_-_Portrait_of_Galileo_Galilei%2C_1636.jpg",
        credit: "Justus Sustermans / Wikimedia Commons",
        caption: "Galileo Galilei, 1636"
      }
    },
    {
      id: "shakespeare",
      slug: "william-shakespeare",
      name: "William Shakespeare",
      epithet: "Poet of the Human Interior",
      categories: ["philosophical"],
      birthYear: 1564,
      deathYear: 1616,
      eraLabel: "Elizabethan / Jacobean England",
      region: "England",
      civilization: "English / global literary",
      summary:
        "Dramatist and poet whose plays mapped ambition, love, power, and conscience with unmatched depth—becoming a second language of human self-understanding worldwide.",
      biography: [
        "Shakespeare wrote for the London stage, producing tragedies, comedies, and histories that mixed popular entertainment with philosophical force.",
        "Characters like Hamlet, Lear, and Lady Macbeth became permanent mirrors for psychology and politics.",
        "His vocabulary and stories saturated English and, through translation, global culture."
      ],
      philosophy: {
        corePrinciples: [
          "Character revealed under pressure",
          "Power’s corruption made visible",
          "Empathy across social ranks",
          "Language as world-making"
        ],
        viewOfHumanity:
          "Humans contain multitudes—noble, comic, and catastrophic—often in one life.",
        howWeOperate:
          "Use stories to teach moral complexity without propaganda.",
        keyQuotes: [
          {
            text: "This above all: to thine own self be true.",
            source: "Hamlet"
          }
        ]
      },
      creations: [
        {
          name: "Collected plays & sonnets",
          type: "Creation",
          status: "stands",
          description: "Dramatic and poetic corpus.",
          modernPresence: "Stages, schools, film worldwide."
        }
      ],
      legacy: "The modern imagination of the self.",
      todayRelevance: [
        "Leadership and ethics training still use Shakespeare as case law of the soul."
      ],
      relatedSlugs: ["socrates", "leonardo-da-vinci"]
    },
    {
      id: "newton",
      slug: "isaac-newton",
      name: "Isaac Newton",
      epithet: "Architect of Classical Physics",
      categories: ["scientific", "philosophical"],
      birthYear: 1643,
      deathYear: 1727,
      eraLabel: "Scientific Revolution",
      region: "England",
      civilization: "European scientific",
      summary:
        "Formulated laws of motion and universal gravitation, co-invented calculus, and wrote the Principia—unifying heavens and earth under one mathematical physics.",
      biography: [
        "At Cambridge and during plague years, Newton developed optics, calculus, and gravitational theory.",
        "The 1687 Principia became the model of exact science for two centuries.",
        "He also ran the Mint and pursued alchemy and theology—reminding us genius is not only modern-looking."
      ],
      philosophy: {
        corePrinciples: [
          "Universal laws expressible in math",
          "Same physics for apple and moon",
          "Hypothesis disciplined by phenomena",
          "Standing on giants’ shoulders"
        ],
        viewOfHumanity:
          "The universe is intelligible; human reason can decode its laws.",
        howWeOperate:
          "Unify domains with shared principles. Demand quantitative test.",
        keyQuotes: [
          {
            text: "If I have seen further it is by standing on the shoulders of Giants.",
            source: "Letter to Hooke, 1675"
          }
        ]
      },
      creations: [
        {
          name: "Philosophiæ Naturalis Principia Mathematica",
          type: "Creation",
          status: "stands",
          description: "Foundational physics treatise.",
          modernPresence: "Engineering, ballistics, orbital mechanics roots."
        }
      ],
      legacy: "The clockwork cosmos—and the method that later overthrew it.",
      todayRelevance: [
        "Spaceflight and structural engineering still speak Newtonian for everyday scales."
      ],
      relatedSlugs: ["galileo", "albert-einstein"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg",
        credit: "Godfrey Kneller / Wikimedia Commons",
        caption: "Isaac Newton, 1689"
      }
    },
    {
      id: "locke",
      slug: "john-locke",
      name: "John Locke",
      epithet: "Philosopher of Natural Rights",
      categories: ["philosophical", "political"],
      birthYear: 1632,
      deathYear: 1704,
      eraLabel: "English Enlightenment",
      region: "England",
      civilization: "European / Atlantic",
      summary:
        "Political philosopher whose theories of natural rights, consent, and limited government became software for modern constitutional democracies—including the American founding.",
      biography: [
        "Locke wrote amid English revolutions, arguing against absolute monarchy and for government as a trust.",
        "His Essay Concerning Human Understanding shaped empiricism; his Two Treatises shaped liberal politics.",
        "Colonists and revolutionaries treated his arguments as operational manuals."
      ],
      philosophy: {
        corePrinciples: [
          "Natural rights to life, liberty, property",
          "Government by consent",
          "Right of resistance to tyranny",
          "Mind as shaped by experience"
        ],
        viewOfHumanity:
          "Humans are free and equal by nature; political power is a fiduciary duty, not divine ownership of persons.",
        howWeOperate:
          "Write constitutions that limit rulers. Educate citizens who can withdraw consent peacefully when possible.",
        keyQuotes: [
          {
            text: "Wherever law ends, tyranny begins.",
            source: "Second Treatise of Government"
          }
        ]
      },
      creations: [
        {
          name: "Two Treatises of Government",
          type: "Creation",
          status: "stands",
          description: "Foundational liberal political theory.",
          modernPresence: "Constitutions and rights charters."
        }
      ],
      legacy: "The philosophical grammar of liberal democracy.",
      todayRelevance: [
        "Debates on rights, property, and emergency powers remain Lockean."
      ],
      relatedSlugs: ["george-washington", "abraham-lincoln"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/JohnLocke.png",
        credit: "Wikimedia Commons",
        caption: "John Locke"
      }
    },
    {
      id: "smith",
      slug: "adam-smith",
      name: "Adam Smith",
      epithet: "Architect of Modern Economics",
      categories: ["philosophical", "political"],
      birthYear: 1723,
      deathYear: 1790,
      eraLabel: "Scottish Enlightenment",
      region: "Scotland",
      civilization: "European",
      summary:
        "Moral philosopher who analyzed markets, specialization, and the wealth of nations—creating the intellectual framework of modern capitalism and its critics alike.",
      biography: [
        "Smith taught in Scotland and published The Theory of Moral Sentiments and The Wealth of Nations.",
        "He explained division of labor, free trade arguments, and the dangers of monopoly and capture.",
        "Every later debate about markets—from Marx to modern policy—starts by answering him."
      ],
      philosophy: {
        corePrinciples: [
          "Division of labor raises productivity",
          "Sympathy as moral glue",
          "Markets coordinate without omniscient planners",
          "Vigilance against collusion of merchants and masters"
        ],
        viewOfHumanity:
          "Humans exchange, specialize, and need moral sentiments—not only prices—to live together.",
        howWeOperate:
          "Design markets with competition and justice; do not romanticize either the state or the firm.",
        keyQuotes: [
          {
            text: "It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner…",
            source: "Wealth of Nations"
          }
        ]
      },
      creations: [
        {
          name: "The Wealth of Nations",
          type: "Creation",
          status: "stands",
          description: "Foundational political economy text.",
          modernPresence: "Economics curricula; policy discourse."
        }
      ],
      legacy: "Made the economy a moral and scientific object of study.",
      todayRelevance: [
        "Globalization and inequality debates still revolve around Smithian tools."
      ],
      relatedSlugs: ["karl-marx", "john-locke"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/AdamSmith.jpg",
        credit: "Wikimedia Commons",
        caption: "Adam Smith"
      }
    },
    {
      id: "washington",
      slug: "george-washington",
      name: "George Washington",
      epithet: "Founding President Who Relinquished Power",
      categories: ["political", "military"],
      birthYear: 1732,
      deathYear: 1799,
      eraLabel: "American founding",
      region: "United States",
      civilization: "American",
      summary:
        "Commander of the Continental Army and first U.S. president who set the precedent of peaceful transfer and limited tenure—making republican power transferable rather than monarchical.",
      biography: [
        "Washington led the long war for independence, then resigned his commission—an act that stunned a world of kings.",
        "As president he shaped the executive office, then stepped down after two terms.",
        "His restraint became a democratic technology as important as any battlefield."
      ],
      philosophy: {
        corePrinciples: [
          "Power must be laid down",
          "Civilian control of the military",
          "National union over faction",
          "Character as public infrastructure"
        ],
        viewOfHumanity:
          "Republics survive when leaders prefer the nation’s duration to personal permanence.",
        howWeOperate:
          "Build norms of succession stronger than ambition. Honor service that ends.",
        keyQuotes: [
          {
            text: "The basis of our political systems is the right of the people to make and to alter their constitutions of government.",
            source: "Farewell Address tradition"
          }
        ]
      },
      creations: [
        {
          name: "Two-term presidential precedent",
          type: "Creation",
          status: "transformed",
          description: "Custom later constitutionalized (22nd Amendment).",
          modernPresence: "Global symbol of voluntary exit from power."
        }
      ],
      legacy: "The general who would not be king.",
      todayRelevance: [
        "Strongman politics makes Washington’s exit permanently radical."
      ],
      relatedSlugs: ["john-locke", "abraham-lincoln"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
        credit: "Gilbert Stuart / Wikimedia Commons",
        caption: "George Washington (Athenaeum portrait)"
      }
    },
    {
      id: "bolivar",
      slug: "simon-bolivar",
      name: "Simón Bolívar",
      epithet: "El Libertador",
      categories: ["political", "military"],
      birthYear: 1783,
      deathYear: 1830,
      eraLabel: "Latin American independence",
      region: "Northern South America",
      civilization: "Latin American",
      summary:
        "Military and political leader who liberated vast regions of South America from Spanish rule and attempted—imperfectly—to forge republican unity across new nations.",
      biography: [
        "Bolívar led campaigns that freed territories becoming Venezuela, Colombia, Ecuador, Peru, and Bolivia.",
        "He dreamed of confederation but faced fragmentation, exile politics, and the limits of postwar state-building.",
        "His name remains the mythic core of South American independence."
      ],
      philosophy: {
        corePrinciples: [
          "Independence from colonial domination",
          "Republican liberty under law",
          "Continental solidarity",
          "Strong institutions after war"
        ],
        viewOfHumanity:
          "Peoples deserve self-rule—but freedom without order collapses into new tyrannies.",
        howWeOperate:
          "Win independence, then invest harder in constitutions than in monuments.",
        keyQuotes: [
          {
            text: "Judgment comes from experience, and experience comes from bad judgment.",
            source: "Attributed"
          }
        ]
      },
      creations: [
        {
          name: "Independent Andean republics",
          type: "Creation",
          status: "transformed",
          description: "Political map of northern South America.",
          modernPresence: "National identities and Bolivarian political language."
        }
      ],
      legacy: "Liberation on a continental scale.",
      todayRelevance: [
        "Post-colonial state-building lessons remain current."
      ],
      relatedSlugs: ["george-washington", "napoleon"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Bolivar.jpg",
        credit: "Wikimedia Commons",
        caption: "Simón Bolívar"
      }
    },
    {
      id: "darwin",
      slug: "charles-darwin",
      name: "Charles Darwin",
      epithet: "Author of Evolution by Natural Selection",
      categories: ["scientific", "philosophical"],
      birthYear: 1809,
      deathYear: 1882,
      eraLabel: "Victorian science",
      region: "Britain / global voyage",
      civilization: "European scientific",
      summary:
        "Naturalist whose theory of evolution by natural selection reorganized biology and forced a new humility about humanity’s place in the living world.",
      biography: [
        "The Beagle voyage gave Darwin comparative evidence from continents and islands.",
        "On the Origin of Species (1859) proposed natural selection as the mechanism of adaptation and diversity.",
        "The Descent of Man extended the framework to human origins—with social consequences he could not fully control."
      ],
      philosophy: {
        corePrinciples: [
          "Common descent of life",
          "Natural selection as mechanism",
          "Evidence from variation and distribution",
          "Human continuity with nature"
        ],
        viewOfHumanity:
          "Humans are part of the tree of life—kin to other species, not a separate magical kingdom.",
        howWeOperate:
          "Teach biology as history of life. Use evolutionary insight without social Darwinist cruelty.",
        keyQuotes: [
          {
            text: "There is grandeur in this view of life…",
            source: "On the Origin of Species"
          }
        ]
      },
      creations: [
        {
          name: "On the Origin of Species",
          type: "Creation",
          status: "stands",
          description: "Foundational evolutionary biology text.",
          modernPresence: "Medicine, ecology, genetics."
        }
      ],
      legacy: "Life as deep history.",
      todayRelevance: [
        "Antibiotic resistance and conservation are Darwinian realities."
      ],
      relatedSlugs: ["galileo", "rachel-carson"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Charles_Darwin_seated_crop.jpg",
        credit: "Wikimedia Commons",
        caption: "Charles Darwin"
      }
    },
    {
      id: "pasteur",
      slug: "louis-pasteur",
      name: "Louis Pasteur",
      epithet: "Father of Microbiology & Vaccines",
      categories: ["scientific", "humanitarian"],
      birthYear: 1822,
      deathYear: 1895,
      eraLabel: "Germ theory revolution",
      region: "France",
      civilization: "European scientific",
      summary:
        "Chemist and microbiologist who established germ theory applications, invented pasteurization, and developed vaccines that turned invisible death into preventable disease.",
      biography: [
        "Pasteur disproved spontaneous generation claims for microbes in practical contexts and linked microorganisms to fermentation and disease.",
        "His rabies and anthrax vaccine work founded modern immunology practice.",
        "Public health and food safety were reorganized around his insights."
      ],
      philosophy: {
        corePrinciples: [
          "Invisible agents, visible method",
          "Prevention over fatalism",
          "Laboratory serving the hospital",
          "Public health as national strength"
        ],
        viewOfHumanity:
          "Humans can outthink plagues when they respect microscopic reality.",
        howWeOperate:
          "Fund labs. Vaccinate. Sanitize food systems without superstition.",
        keyQuotes: [
          {
            text: "Fortune favors the prepared mind.",
            source: "Attributed"
          }
        ]
      },
      creations: [
        {
          name: "Pasteurization & vaccine methods",
          type: "Creation",
          status: "stands",
          description: "Food safety and immunization foundations.",
          modernPresence: "Every pasteurized carton and vaccine schedule."
        }
      ],
      legacy: "Microbes made governable.",
      todayRelevance: [
        "Pandemic preparedness is Pasteur’s unfinished war."
      ],
      relatedSlugs: ["florence-nightingale", "jonas-salk"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Louis_Pasteur%2C_foto_av_Paul_Nadar%2C_Crisco_edit.jpg",
        credit: "Paul Nadar / Wikimedia Commons",
        caption: "Louis Pasteur"
      }
    },
    {
      id: "marx",
      slug: "karl-marx",
      name: "Karl Marx",
      epithet: "Analyst of Capitalism & Class",
      categories: ["philosophical", "political"],
      birthYear: 1818,
      deathYear: 1883,
      eraLabel: "Industrial modernity",
      region: "Germany / Britain",
      civilization: "European / global revolutionary",
      summary:
        "Philosopher and economist who diagnosed industrial capitalism’s dynamics and inspired movements that remade states, labor law, and global politics—for liberation and for catastrophe.",
      biography: [
        "Marx collaborated with Engels, wrote for the Communist League, and spent years in London analyzing capital.",
        "The Communist Manifesto and Capital became scriptures of revolution and tools of critique.",
        "Regimes claiming his inheritance varied from welfare reforms to totalitarian disaster—making him unavoidable and contested."
      ],
      philosophy: {
        corePrinciples: [
          "Material conditions shape consciousness",
          "Class conflict as historical engine",
          "Critique of exploitation and alienation",
          "Emancipation through collective action"
        ],
        viewOfHumanity:
          "Humans make history under conditions they do not choose; freedom requires transforming those conditions.",
        howWeOperate:
          "Analyze power in production, not only in parliaments. Measure dignity by labor’s share of life.",
        keyQuotes: [
          {
            text: "The philosophers have only interpreted the world, in various ways; the point is to change it.",
            source: "Theses on Feuerbach"
          }
        ]
      },
      creations: [
        {
          name: "Capital / Communist Manifesto",
          type: "Creation",
          status: "stands",
          description: "Foundational critical-political texts.",
          modernPresence: "Labor movements, social science, revolutionary history."
        }
      ],
      legacy: "Made class and capital permanent objects of politics.",
      todayRelevance: [
        "Inequality and automation revive Marxian questions even among non-Marxists."
      ],
      relatedSlugs: ["adam-smith", "frederick-douglass"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Karl_Marx_001.jpg",
        credit: "Wikimedia Commons",
        caption: "Karl Marx"
      }
    },
    {
      id: "anthony",
      slug: "susan-b-anthony",
      name: "Susan B. Anthony",
      epithet: "Organizer of Women’s Suffrage",
      categories: ["political", "humanitarian"],
      birthYear: 1820,
      deathYear: 1906,
      eraLabel: "American reform era",
      region: "United States",
      civilization: "American",
      summary:
        "Organizer and orator who made women’s suffrage a disciplined national campaign, helping convert half the population from political non-persons into voters.",
      biography: [
        "Anthony partnered with Elizabeth Cady Stanton, traveled constantly, and built organizations that outlived her.",
        "She was arrested for voting in 1872 to force constitutional confrontation.",
        "The 19th Amendment followed fourteen years after her death—built on infrastructure she laid."
      ],
      philosophy: {
        corePrinciples: [
          "Equal political personhood",
          "Organization over mere petition",
          "Civil disobedience for rights",
          "Persistence across decades"
        ],
        viewOfHumanity:
          "A democracy that excludes women is a contradiction in terms.",
        howWeOperate:
          "Build durable leagues. Accept arrests as strategy. Keep the horizon generational.",
        keyQuotes: [
          {
            text: "Failure is impossible.",
            source: "Late-life motto of the suffrage movement"
          }
        ]
      },
      creations: [
        {
          name: "National suffrage organizations",
          type: "Creation",
          status: "transformed",
          description: "Campaign architecture for the 19th Amendment.",
          modernPresence: "Women’s political participation worldwide."
        }
      ],
      legacy: "Half of democracy’s electorate.",
      todayRelevance: [
        "Voting access and gender equality remain unfinished."
      ],
      relatedSlugs: ["eleanor-roosevelt", "malala-yousafzai"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Susan_B_Anthony_c1855.png",
        credit: "Wikimedia Commons",
        caption: "Susan B. Anthony"
      }
    },
    {
      id: "edison",
      slug: "thomas-edison",
      name: "Thomas Edison",
      epithet: "Industrial Wizard of Invention",
      categories: ["scientific"],
      birthYear: 1847,
      deathYear: 1931,
      eraLabel: "Second Industrial Revolution",
      region: "United States",
      civilization: "American industrial",
      summary:
        "Inventor-entrepreneur who systematized R&D at Menlo Park and commercialized electric light, sound recording, and motion pictures—electrifying modern life.",
      biography: [
        "Edison built invention factories that turned experiments into patents and industries.",
        "His lighting systems and power distribution helped create the electric city.",
        "His career also shows the ruthless side of industrial competition."
      ],
      philosophy: {
        corePrinciples: [
          "Invention as organized labor",
          "Iterate until it works in the market",
          "Systems, not only gadgets",
          "Persistence as method"
        ],
        viewOfHumanity:
          "Night can be conquered; human life expands when energy is cheap and controlled.",
        howWeOperate:
          "Fund labs that ship. Measure success by adoption, not only theory.",
        keyQuotes: [
          {
            text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
            source: "Attributed"
          }
        ]
      },
      creations: [
        {
          name: "Practical electric lighting systems",
          type: "Creation",
          status: "transformed",
          description: "Commercial electric light and power.",
          modernPresence: "The electrified world."
        }
      ],
      legacy: "The industrial research lab as civilization’s engine.",
      todayRelevance: [
        "Tech campuses still imitate Menlo Park’s myth—for better and worse."
      ],
      relatedSlugs: ["nikola-tesla", "marie-curie"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Thomas_Edison2.jpg",
        credit: "Wikimedia Commons",
        caption: "Thomas Edison"
      }
    },
    {
      id: "einstein",
      slug: "albert-einstein",
      name: "Albert Einstein",
      epithet: "Reweaver of Space, Time & Energy",
      categories: ["scientific", "philosophical", "humanitarian"],
      birthYear: 1879,
      deathYear: 1955,
      eraLabel: "Modern physics",
      region: "Germany / Switzerland / United States",
      civilization: "Global scientific",
      summary:
        "Physicist who reshaped space, time, gravity, and energy with relativity—and used his fame to defend pacifism, civil rights, and internationalism after fleeing Nazism.",
      biography: [
        "Einstein’s 1905 papers and later general relativity overturned Newtonian absolute space and time.",
        "He fled Germany, joined the Institute for Advanced Study, and became a public moral voice.",
        "His letter with Szilárd helped launch the U.S. atomic program—which he later deeply regretted in spirit."
      ],
      philosophy: {
        corePrinciples: [
          "Reality is stranger than common sense",
          "Unity of natural laws",
          "Science with social responsibility",
          "Imagination as scientific instrument"
        ],
        viewOfHumanity:
          "Humans can grasp cosmic order—and must not let technical power outrun moral maturity.",
        howWeOperate:
          "Fund pure research. Tie scientific prestige to peace and human rights.",
        keyQuotes: [
          {
            text: "Imagination is more important than knowledge.",
            source: "Interview / essay tradition"
          }
        ]
      },
      creations: [
        {
          name: "Special & general relativity",
          type: "Creation",
          status: "stands",
          description: "Foundational spacetime physics.",
          modernPresence: "GPS, cosmology, nuclear age."
        }
      ],
      legacy: "The scientist as cosmic thinker and public conscience.",
      todayRelevance: [
        "AI and biotech face Einstein’s problem: power without wisdom."
      ],
      relatedSlugs: ["isaac-newton", "alan-turing"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
        credit: "Wikimedia Commons",
        caption: "Albert Einstein"
      }
    },
    {
      id: "churchill",
      slug: "winston-churchill",
      name: "Winston Churchill",
      epithet: "Voice of Resistance in 1940",
      categories: ["political", "military"],
      birthYear: 1874,
      deathYear: 1965,
      eraLabel: "World War II",
      region: "United Kingdom",
      civilization: "British / Allied",
      summary:
        "British wartime prime minister whose leadership and rhetoric helped hold resistance against Nazi Germany in the war’s darkest early years—while remaining a complex, imperial, and controversial figure.",
      biography: [
        "Churchill became PM in 1940 as France fell and Britain stood exposed.",
        "His speeches and coalition leadership sustained national will until alliances turned the war.",
        "Postwar politics and imperial positions complicate any simple hero cult—yet 1940 remains a hinge of modern history."
      ],
      philosophy: {
        corePrinciples: [
          "Defy existential tyranny",
          "Words as wartime infrastructure",
          "Alliance as survival",
          "Resolve under bombardment"
        ],
        viewOfHumanity:
          "Civilizations can choose surrender or costly resistance when evil organizes.",
        howWeOperate:
          "Prepare defenses before the crisis. Speak truth that steels without lying.",
        keyQuotes: [
          {
            text: "We shall fight on the beaches… we shall never surrender.",
            source: "Speech to Commons, 4 June 1940"
          }
        ]
      },
      creations: [
        {
          name: "Wartime coalition leadership & speeches",
          type: "Creation",
          status: "idea",
          description: "Rhetorical and political resistance archive.",
          modernPresence: "Democratic crisis literature."
        }
      ],
      legacy: "Proof that language and will can hold a free people in the fire.",
      todayRelevance: [
        "Authoritarian surges make 1940 a permanent case study."
      ],
      relatedSlugs: ["franklin-d-roosevelt", "albert-einstein"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Sir_Winston_Churchill_-_19086236948.jpg",
        credit: "Wikimedia Commons",
        caption: "Winston Churchill"
      }
    },
    {
      id: "fdr",
      slug: "franklin-d-roosevelt",
      name: "Franklin D. Roosevelt",
      epithet: "Architect of the New Deal & Wartime Alliance",
      categories: ["political", "humanitarian"],
      birthYear: 1882,
      deathYear: 1945,
      eraLabel: "Depression & World War II",
      region: "United States",
      civilization: "American",
      summary:
        "Four-term U.S. president who redefined the federal role in economic security during the Depression and led the American arsenal and alliance that defeated the Axis.",
      biography: [
        "Paralyzed by polio, Roosevelt returned to politics and won the presidency in 1932 amid mass unemployment.",
        "New Deal programs reshaped banking, labor, and social insurance.",
        "As war leader he partnered with Allies and died on the threshold of victory."
      ],
      philosophy: {
        corePrinciples: [
          "Government as insurer against destitution",
          "Pragmatic experiment in crisis",
          "Democracy’s arsenal against fascism",
          "Four Freedoms as global aims"
        ],
        viewOfHumanity:
          "Ordinary citizens deserve security of work, speech, worship, and freedom from fear and want.",
        howWeOperate:
          "In catastrophe, innovate institutions fast—and keep elections.",
        keyQuotes: [
          {
            text: "The only thing we have to fear is fear itself.",
            source: "First Inaugural, 1933"
          }
        ]
      },
      creations: [
        {
          name: "New Deal institutions & wartime alliance strategy",
          type: "Creation",
          status: "transformed",
          description: "Social Security lineage and Allied victory framework.",
          modernPresence: "Modern welfare-state debates; UN path via Eleanor and postwar order."
        }
      ],
      legacy: "Crisis liberalism that saved capitalism from collapse and democracy from fascism.",
      todayRelevance: [
        "Economic shocks still test FDR’s bargain between markets and security."
      ],
      relatedSlugs: ["eleanor-roosevelt", "winston-churchill"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/42/FDR_1944_Color_Portrait.jpg",
        credit: "Wikimedia Commons",
        caption: "Franklin D. Roosevelt, 1944"
      }
    },
    {
      id: "turing",
      slug: "alan-turing",
      name: "Alan Turing",
      epithet: "Founder of Computer Science",
      categories: ["scientific"],
      birthYear: 1912,
      deathYear: 1954,
      eraLabel: "World War II / early computing",
      region: "United Kingdom",
      civilization: "British / global scientific",
      summary:
        "Mathematician who formalized computation, helped crack Axis codes, and imagined machine intelligence—then was persecuted for his sexuality and died young.",
      biography: [
        "Turing’s abstract machine defined what it means to compute.",
        "At Bletchley Park his work on cryptanalysis shortened the war.",
        "Postwar, chemical castration under British law destroyed his health and freedom; he was later pardoned posthumously."
      ],
      philosophy: {
        corePrinciples: [
          "Mind as implementable process",
          "Formal clarity about algorithms",
          "Science serving survival of free societies",
          "Human dignity independent of prejudice"
        ],
        viewOfHumanity:
          "Humans can externalize thought into machines—and must not destroy the thinkers who do.",
        howWeOperate:
          "Build computing as public infrastructure. Protect LGBTQ scientists and citizens as a moral and talent imperative.",
        keyQuotes: [
          {
            text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
            source: "Computing Machinery and Intelligence, 1950"
          }
        ]
      },
      creations: [
        {
          name: "Turing machine concept & wartime cryptanalysis",
          type: "Creation",
          status: "idea",
          description: "Foundations of computing and AI questions.",
          modernPresence: "Every computer and chatbot."
        }
      ],
      legacy: "The digital age’s quiet founder.",
      todayRelevance: [
        "AI ethics and queer rights both sit in Turing’s shadow."
      ],
      relatedSlugs: ["albert-einstein", "tim-berners-lee"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg",
        credit: "Wikimedia Commons",
        caption: "Alan Turing as a young man"
      }
    },
    {
      id: "parks",
      slug: "rosa-parks",
      name: "Rosa Parks",
      epithet: "Spark of the Montgomery Bus Boycott",
      categories: ["political", "humanitarian"],
      birthYear: 1913,
      deathYear: 2005,
      eraLabel: "Civil Rights Movement",
      region: "United States",
      civilization: "American",
      summary:
        "Organized activist whose refusal to yield a bus seat in 1955 catalyzed the Montgomery Bus Boycott—proving disciplined mass noncooperation could crack legal segregation.",
      biography: [
        "Parks was a trained NAACP investigator, not a passive accidental heroine.",
        "Her arrest after refusing to give up her seat launched a 381-day boycott led with King and local organizers.",
        "The campaign’s victory became a template for the wider movement."
      ],
      philosophy: {
        corePrinciples: [
          "Dignity in everyday public space",
          "Prepared courage, not impulse alone",
          "Mass economic noncooperation",
          "Local organization as national lever"
        ],
        viewOfHumanity:
          "Oppression is enforced in ordinary seats and sidewalks; freedom begins there too.",
        howWeOperate:
          "Train activists. Choose symbolic battles that communities can sustain.",
        keyQuotes: [
          {
            text: "People always say that I didn't give up my seat because I was tired, but that isn't true… I was tired of giving in.",
            source: "Rosa Parks, later reflection"
          }
        ]
      },
      creations: [
        {
          name: "Montgomery Bus Boycott catalyst",
          type: "Creation",
          status: "transformed",
          description: "Mass nonviolent campaign against segregated buses.",
          modernPresence: "Civil rights strategy textbook."
        }
      ],
      legacy: "The quiet act that opened a movement’s throttle.",
      todayRelevance: [
        "Everyday discrimination still needs Parks-level prepared refusal."
      ],
      relatedSlugs: ["martin-luther-king-jr", "harriet-tubman"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Rosaparks.jpg",
        credit: "Wikimedia Commons",
        caption: "Rosa Parks"
      }
    },
    {
      id: "salk",
      slug: "jonas-salk",
      name: "Jonas Salk",
      epithet: "Conqueror of Polio Fear",
      categories: ["scientific", "humanitarian"],
      birthYear: 1914,
      deathYear: 1995,
      eraLabel: "Postwar medical triumph",
      region: "United States",
      civilization: "American scientific",
      summary:
        "Virologist who developed the first successful killed-virus polio vaccine and refused to patent it—turning a terror of childhood into a preventable disease.",
      biography: [
        "Salk led research at Pittsburgh that produced an injectable polio vaccine proven in massive 1954 field trials.",
        "When asked who owned the patent, he famously suggested the people did.",
        "Global vaccination campaigns followed, nearly eradicating wild polio."
      ],
      philosophy: {
        corePrinciples: [
          "Public health over private monopoly",
          "Rigorous trials before rollout",
          "Science as gift to children",
          "Fear defeated by method"
        ],
        viewOfHumanity:
          "A society is measured by whether it lets children walk free of preventable paralysis.",
        howWeOperate:
          "Fund vaccine science. Share life-saving methods widely.",
        keyQuotes: [
          {
            text: "There is no patent. Could you patent the sun?",
            source: "Interview tradition on the polio vaccine"
          }
        ]
      },
      creations: [
        {
          name: "Inactivated polio vaccine (IPV)",
          type: "Creation",
          status: "stands",
          description: "First widely successful polio vaccine.",
          modernPresence: "Global immunization schedules."
        }
      ],
      legacy: "Proof that medical science can retire a nightmare.",
      todayRelevance: [
        "Vaccine equity fights are Salk’s ethics under new names."
      ],
      relatedSlugs: ["louis-pasteur", "marie-curie"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/5/59/Jonas_Salk_candid.jpg",
        credit: "Wikimedia Commons",
        caption: "Jonas Salk"
      }
    },
    {
      id: "carson",
      slug: "rachel-carson",
      name: "Rachel Carson",
      epithet: "Awakener of Environmental Conscience",
      categories: ["scientific", "humanitarian", "philosophical"],
      birthYear: 1907,
      deathYear: 1964,
      eraLabel: "Modern environmental movement",
      region: "United States",
      civilization: "American / global ecological",
      summary:
        "Marine biologist and writer whose Silent Spring exposed pesticide harms and launched modern environmentalism—making ecology a public moral language.",
      biography: [
        "Carson wrote lyrical science for the public before documenting DDT’s cascading damage to ecosystems.",
        "Industry attacked her; evidence and public outcry forced policy shifts and agency creation.",
        "She died of cancer shortly after her victory of attention—leaving a permanent environmental ethic."
      ],
      philosophy: {
        corePrinciples: [
          "Interdependence of living systems",
          "Precaution under uncertainty",
          "Science written for citizens",
          "Nature not a dumping ground"
        ],
        viewOfHumanity:
          "Humans are not separate from webs of life; poisoning the web poisons us.",
        howWeOperate:
          "Regulate toxins with humility. Teach ecology as civic literacy.",
        keyQuotes: [
          {
            text: "In nature nothing exists alone.",
            source: "Silent Spring"
          }
        ]
      },
      creations: [
        {
          name: "Silent Spring",
          type: "Creation",
          status: "stands",
          description: "Book that catalyzed environmental law and culture.",
          modernPresence: "EPA lineage; global green movements."
        }
      ],
      legacy: "The environment as a rights-and-duties domain.",
      todayRelevance: [
        "Climate and chemical policy still need Carson’s courage against denial."
      ],
      relatedSlugs: ["wangari-maathai", "charles-darwin"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Rachel-Carson.jpg",
        credit: "Wikimedia Commons",
        caption: "Rachel Carson"
      }
    },
    {
      id: "berners-lee",
      slug: "tim-berners-lee",
      name: "Tim Berners-Lee",
      epithet: "Inventor of the World Wide Web",
      categories: ["scientific", "philosophical"],
      birthYear: 1955,
      deathYear: null,
      eraLabel: "Digital age",
      region: "CERN / global internet",
      civilization: "Global scientific / digital",
      summary:
        "Computer scientist who invented the World Wide Web’s core technologies and chose openness—creating the universal information space that reordered commerce, politics, and knowledge.",
      biography: [
        "At CERN in 1989–91, Berners-Lee proposed and built HTML, HTTP, URLs, and the first browser-server system.",
        "He fought to keep the web free of proprietary lock-in at the critical moment.",
        "He continues to advocate for an open, user-respecting web against surveillance and enclosure."
      ],
      philosophy: {
        corePrinciples: [
          "Universal access to linked information",
          "Open standards over private cages",
          "Decentralization of publishing",
          "Human control of personal data"
        ],
        viewOfHumanity:
          "Humans think better when anyone can publish and anyone can read—if power does not capture the pipes.",
        howWeOperate:
          "Defend open protocols. Design platforms that serve users, not only advertisers.",
        keyQuotes: [
          {
            text: "This is for everyone.",
            source: "Olympic opening ceremony message / web ethos"
          }
        ]
      },
      creations: [
        {
          name: "World Wide Web (HTML/HTTP/URL)",
          type: "Creation",
          status: "stands",
          description: "Foundational web stack.",
          modernPresence: "The default layer of global communication."
        }
      ],
      legacy: "Gutenberg’s explosion, networked.",
      todayRelevance: [
        "Platform monopolies and AI scrapers test whether the web stays open."
      ],
      relatedSlugs: ["johannes-gutenberg", "alan-turing"],
      image: {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg",
        credit: "Wikimedia Commons",
        caption: "Tim Berners-Lee"
      }
    }
  ];

  // Fix related slug for bolivar (napoleon not in set) and edison (tesla not in set)
  m.forEach(function (fig) {
    if (fig.slug === "simon-bolivar") fig.relatedSlugs = ["george-washington", "abraham-lincoln"];
    if (fig.slug === "thomas-edison") fig.relatedSlugs = ["marie-curie", "alan-turing"];
  });

  if (window.HUMANITAS && window.HUMANITAS.figures) {
    window.HUMANITAS.figures = window.HUMANITAS.figures.concat(m);
  }
})();
