/**
 * Humanitas refit — drop specialist names; add prophets, Mary, Native nations,
 * Americans, philosophers, and generals who fought under sacred duty.
 */
(function () {
  var DROP = {
    hatshepsut: 1, pericles: 1, euclid: 1, archimedes: 1, mencius: 1, seneca: 1,
    "al-farabi": 1, "ibn-rushd": 1, "ibn-khaldun": 1, hildegard: 1, dante: 1,
    "zheng-he": 1, erasmus: 1, "francis-bacon": 1, descartes: 1, spinoza: 1,
    kepler: 1, "william-harvey": 1, "alexander-von-humboldt": 1, "michael-faraday": 1,
    "james-clerk-maxwell": 1, "gregor-mendel": 1, "louis-braille": 1, "jane-addams": 1,
    "albert-schweitzer": 1, "ada-lovelace": 1, "rosalind-franklin": 1, "jane-goodall": 1,
    "muhammad-yunus": 1, sejong: 1, "mansa-musa": 1, voltaire: 1, "mary-wollstonecraft": 1
  };

  function q(text, source) { return { text: text, source: source }; }
  function work(name, status, description, modernPresence) {
    return { name: name, type: "Creation", status: status || "stands", description: description || "", modernPresence: modernPresence || "" };
  }
  function fig(p) {
    return {
      id: p.id, slug: p.slug, name: p.name, epithet: p.epithet, categories: p.categories,
      birthYear: p.birthYear, deathYear: p.deathYear, eraLabel: p.eraLabel, region: p.region,
      civilization: p.civilization, summary: p.summary, biography: p.biography,
      philosophy: { corePrinciples: p.principles, viewOfHumanity: p.view, howWeOperate: p.operate, keyQuotes: p.quotes },
      creations: p.creations, legacy: p.legacy, todayRelevance: p.today, relatedSlugs: p.related,
      accomplishments: p.accomplishments
    };
  }

  var m = [
    fig({
      id: "mary", slug: "mary", name: "Mary of Nazareth",
      epithet: "Mother of Jesus",
      categories: ["spiritual", "humanitarian"],
      birthYear: -18, deathYear: 48, eraLabel: "Second Temple Judaism / early Church",
      region: "Nazareth / Bethlehem / Jerusalem", civilization: "Israelite / Christian",
      summary: "The most widely honored woman in history—the mother of Jesus, called blessed among women, whose consent, courage, and grief became a pattern of faith for billions.",
      biography: [
        "In the Gospels, Mary consents to a calling that could have destroyed her reputation: ‘Let it be to me according to your word.’ She bears Jesus, flees Herod, ponders events in her heart, and stands at the cross when most have fled.",
        "Christian tradition names her Theotokos—God-bearer. Islam honors her as Maryam, the only woman named in the Qur’an, a sign of purity and steadfastness. Catholic, Orthodox, and many Protestant lives of prayer still pass through her name.",
        "She is not a general or a lawgiver. She is the human yes that, in the story of salvation, made the rest of the story possible."
      ],
      principles: ["Consent to a costly good", "Ponder before you speak", "Stay at the foot of the suffering", "Greatness can look like a mother’s courage"],
      view: "The highest human office can be faithfulness in a hidden life.",
      operate: "Say yes when the good is hard. Keep vigil with those who suffer.",
      quotes: [q("My soul magnifies the Lord, and my spirit rejoices in God my Savior.", "Luke 1:46–47, Magnificat")],
      creations: [work("The Magnificat", "stands", "Canticle of humility and reversal.", "Prayed daily across churches; Maryam honored in Islam.")],
      legacy: "Motherhood, consent, and steadfast love as world-historical power.",
      today: ["Cultures still argue what honor is owed to mothers, refugees, and the quietly faithful."],
      related: ["jesus", "david"],
      accomplishments: ["Became the mother of Jesus in Christian faith", "Spoke the Magnificat, a charter of the humble exalted", "Is venerated across Christianity and honored in Islam", "Modeled courage at the cross", "Shaped art, charity, and devotion more than any other woman in history"]
    }),
    fig({
      id: "abraham", slug: "abraham", name: "Abraham",
      epithet: "Father of faith",
      categories: ["spiritual", "philosophical"],
      birthYear: -1813, deathYear: -1638, eraLabel: "Patriarchal age (tradition)",
      region: "Ur / Canaan / Hebron", civilization: "Hebrew / Near Eastern",
      summary: "Patriarch of Jews, Christians, and Muslims—the man who left home at a call, trusted a promise, and became the father of peoples and of faith itself.",
      biography: [
        "Tradition places Abram leaving Ur for a land he did not own, renamed Abraham, ‘father of many.’ Covenant, hospitality to strangers, argument with God over Sodom, and the binding of Isaac (or Ishmael in Islamic telling) make him the pattern of trust under impossible command.",
        "Judaism, Christianity, and Islam all claim him. That shared ancestry is one of humanity’s rare agreements: holiness began as a journey, not a palace.",
        "He is less a biography than a root. Three civilizations grew from that root, for blessing and for quarrel."
      ],
      principles: ["Go when you are called", "Covenant over blood-magic", "Hospitality to the stranger", "Argue with heaven for the innocent"],
      view: "One life of trust can father nations.",
      operate: "Leave the familiar when the good requires it. Keep the tent open.",
      quotes: [q("Go from your country… to the land that I will show you.", "Genesis 12:1")],
      creations: [work("Covenant of Abraham", "stands", "Promise of people, land, and blessing to the nations.", "Foundation of Judaism, Christianity, and Islam.")],
      legacy: "Faith as a road, not a fortress.",
      today: ["The children of Abraham still decide whether the blessing is for the nations or only for their own."],
      related: ["moses", "muhammad"],
      accomplishments: ["Became the patriarchal root of three world faiths", "Modeled covenant trust and hospitality", "Interceded for a city slated for destruction", "Left a name that still binds and divides civilizations", "Defined faith as obedience joined to moral argument"]
    }),
    fig({
      id: "noah", slug: "noah", name: "Noah",
      epithet: "Preserver of life",
      categories: ["spiritual", "humanitarian"],
      birthYear: -2948, deathYear: -1998, eraLabel: "Primeval tradition",
      region: "Ancient Near East (flood tradition)", civilization: "Hebrew / shared flood memory",
      summary: "The righteous man who built an ark and kept a remnant of life through the flood—humanity’s oldest story of stewardship when the world goes under.",
      biography: [
        "In Genesis, Noah walks with God in a violent generation, builds an ark, and carries family and creatures through catastrophe. A rainbow covenant follows: never again will the earth be erased that way; humans are charged with the blood of life.",
        "Flood heroes appear across Mesopotamia. Noah is the version that became the West’s and Islam’s (Nuh) memory: one household tasked with the biosphere.",
        "He is the patron of those who prepare, conserve, and start again without pretending the storm was imaginary."
      ],
      principles: ["Build before the rain", "Preserve more than your own kin", "Covenant after catastrophe", "Life is a trust"],
      view: "A remnant can carry the whole if it is faithful.",
      operate: "Prepare. Keep seed and story. Honor the creatures you depend on.",
      quotes: [q("Never again shall all flesh be cut off by the waters of the flood.", "Genesis 9:11")],
      creations: [work("The ark & rainbow covenant", "idea", "Narrative of preservation and divine restraint.", "Shared by Judaism, Christianity, and Islam.")],
      legacy: "Stewardship as the first post-disaster politics.",
      today: ["Climate and extinction put every generation back in Noah’s yard."],
      related: ["abraham", "rachel-carson"],
      accomplishments: ["Became the scriptural type of the preserver of life", "Carried a remnant through cosmic judgment", "Received a covenant that limits destruction", "Linked human righteousness to the fate of creatures", "Gave three faiths their flood-and-hope story"]
    }),
    fig({
      id: "isaiah", slug: "isaiah", name: "Isaiah",
      epithet: "Prophet of holy justice",
      categories: ["spiritual", "philosophical", "political"],
      birthYear: -760, deathYear: -680, eraLabel: "First Temple Judah",
      region: "Jerusalem", civilization: "Israelite",
      summary: "The great writing prophet of Israel—holiness, justice for the poor, and a vision of swords beaten into plowshares that still judges nations.",
      biography: [
        "Isaiah prophesied in Jerusalem as Assyria swallowed the region. He confronted kings, denounced empty ritual, and demanded that worship match care for the widow and the oppressed.",
        "The book that bears his name (in one or several voices) gave the world images that outlived the empire: a child named Wonderful Counselor, a servant who suffers, nations streaming to a mountain of peace.",
        "He taught that God’s people are measured by justice, not by the volume of their festivals."
      ],
      principles: ["Holiness without justice is noise", "Learn to do good; seek justice", "Swords into plowshares", "The poor are the test of a nation"],
      view: "A people can be religious and still rotten if they crush the weak.",
      operate: "Tell the powerful the truth. Dream peace in public.",
      quotes: [q("They shall beat their swords into plowshares.", "Isaiah 2:4")],
      creations: [work("Book of Isaiah", "stands", "Prophetic poetry of judgment and hope.", "Core of Jewish and Christian scripture.")],
      legacy: "Peace and justice as the true liturgy of a nation.",
      today: ["Every arms race still collides with Isaiah’s plowshare."],
      related: ["moses", "jesus"],
      accomplishments: ["Wrote (and inspired) the towering prophetic book of Israel", "Tied worship to defense of the poor", "Cast the vision of nations at peace", "Counseled kings under imperial threat", "Shaped messianic hope in Judaism and Christianity"]
    }),
    fig({
      id: "elijah", slug: "elijah", name: "Elijah",
      epithet: "Prophet of fire and drought",
      categories: ["spiritual", "political"],
      birthYear: -900, deathYear: -849, eraLabel: "Divided monarchy of Israel",
      region: "Gilead / Samaria / Carmel", civilization: "Israelite",
      summary: "The fierce prophet who stood against royal idolatry, defended the powerless, and became the forerunner figure later generations expected before the end.",
      biography: [
        "Elijah confronts Ahab and Jezebel, announces drought, and stages the contest on Carmel: the Lord, not Baal, answers with fire. He flees, hears God in a still small voice, and condemns the theft of Naboth’s vineyard.",
        "He is taken up in a whirlwind. Jewish tradition sets a chair for him at circumcision and a cup at Passover. The Gospels hear John and Jesus in his register.",
        "He is the prophet as opposition: no king is too high to steal a poor man’s field."
      ],
      principles: ["No other gods", "The still small voice", "A poor man’s vineyard is sacred", "Courage before palaces"],
      view: "Power that murders for real estate has already chosen its god.",
      operate: "Speak when silence would baptize theft. Then go to the mountain and listen.",
      quotes: [q("How long will you go limping between two opinions?", "1 Kings 18:21")],
      creations: [work("Elijah cycle in Kings", "stands", "Narratives of prophetic resistance.", "Living figure in Jewish ritual and Christian expectation.")],
      legacy: "The prophet who will not let the palace devour the village.",
      today: ["Land theft and captured religion still meet Elijah."],
      related: ["isaiah", "john-the-baptist"],
      accomplishments: ["Confronted royal idolatry in Israel", "Defended Naboth against state murder for property", "Became the expected forerunner in later faith", "Modeled prophetic solitude and public fire", "Entered Jewish and Christian liturgy as a living name"]
    }),
    fig({
      id: "jeremiah", slug: "jeremiah", name: "Jeremiah",
      epithet: "Prophet of the new covenant",
      categories: ["spiritual", "political", "philosophical"],
      birthYear: -650, deathYear: -570, eraLabel: "Fall of Judah",
      region: "Anathoth / Jerusalem / Egypt", civilization: "Israelite",
      summary: "The weeping prophet who told Jerusalem the truth before it burned—and promised a law written on the heart after the city fell.",
      biography: [
        "Called young, Jeremiah spent decades warning Judah not to trust the Temple as a lucky charm while injustice ran the streets. He was beaten, caged, and called a traitor for saying Babylon would win.",
        "When the city fell, he did not gloat. He lamented, then spoke of a new covenant: not only stone tablets, but law in inward parts. Exile became a classroom instead of only a grave.",
        "Truth-tellers who love their people enough to be hated by them still walk in his coat."
      ],
      principles: ["Do not cry ‘peace’ when there is no peace", "The heart can hold the law", "Love the city enough to warn it", "After ruin, plant gardens"],
      view: "A nation can lose buildings and still keep a covenant if it turns.",
      operate: "Warn early. Weep when you were right. Plant in exile.",
      quotes: [q("I will put my law within them, and I will write it on their hearts.", "Jeremiah 31:33")],
      creations: [work("Book of Jeremiah / New covenant promise", "stands", "Prophecy of judgment and interior law.", "Central to Jewish exile theology and Christian covenant talk.")],
      legacy: "Patriotism as painful truth.",
      today: ["States still punish the messenger who says the walls will not hold."],
      related: ["isaiah", "moses"],
      accomplishments: ["Prophesied through Judah’s last generation", "Articulated a new covenant written on the heart", "Modeled love of country as warning, not flattery", "Left Lamentations’ neighborhood of grief", "Taught exile as a place to build, not only to despair"]
    }),
    fig({
      id: "john-the-baptist", slug: "john-the-baptist", name: "John the Baptist",
      epithet: "Forerunner in the wilderness",
      categories: ["spiritual", "humanitarian"],
      birthYear: -5, deathYear: 29, eraLabel: "Second Temple Judaism",
      region: "Judean wilderness / Jordan", civilization: "Israelite",
      summary: "The last prophet of the old order—who called a nation to repent in water, named injustice in a palace, and prepared the way for Jesus.",
      biography: [
        "John lived in the wilderness, ate simply, and baptized in the Jordan as a sign of turning. Crowds came. He refused to baptize without fruit: share coats, be just in office, do not extort.",
        "He pointed beyond himself: one coming whose sandal he was unfit to untie. He rebuked Herod’s household and was imprisoned, then executed. The Gospels call him Elijah returned in spirit.",
        "He is the patron of inconvenient preachers who will not bless a corrupt table."
      ],
      principles: ["Repent in public", "Prepare the way", "Decrease so the greater can increase", "Tell the tetrarch the truth"],
      view: "A people is ready for God only when it stops cheating the soldier and the poor.",
      operate: "Strip the show. Name the sin. Point past yourself.",
      quotes: [q("Prepare the way of the Lord, make his paths straight.", "Isaiah 40:3 as preached by John, Mark 1:3")],
      creations: [work("Wilderness baptism movement", "transformed", "Call to repentance at the Jordan.", "Origin of Christian baptism; Jewish and Muslim memory of Yahya.")],
      legacy: "The last prophet as a road-builder, not a rival.",
      today: ["Religious celebrity still fails John’s test: he must increase, I must decrease."],
      related: ["elijah", "jesus"],
      accomplishments: ["Launched the baptism of repentance at the Jordan", "Identified as forerunner of Jesus", "Rebuked royal corruption at the cost of his life", "Linked justice in ordinary work to spiritual turning", "Became a saint and prophet across churches and in Islam"]
    }),
    fig({
      id: "deborah", slug: "deborah", name: "Deborah",
      epithet: "Judge and general of Israel",
      categories: ["political", "spiritual", "military"],
      birthYear: -1200, deathYear: -1140, eraLabel: "Period of the Judges",
      region: "Mount Tabor / Ephraim, Israel", civilization: "Israelite",
      summary: "Prophet-judge who summoned Barak to war, routed Sisera’s chariots, and sang the victory—proof that sacred leadership and command could rest on a woman.",
      biography: [
        "Deborah sat as judge under a palm. When Israel was oppressed by Canaanite iron, she called Barak and went with him to Tabor. The Song of Deborah is among the oldest Hebrew poems: stars fighting from their courses, a mother in Israel arising.",
        "Jael finishes the enemy commander. The story does not apologize for female agency in war or in court.",
        "She is the biblical type of the woman who both discerns and commands."
      ],
      principles: ["Judgment under the tree", "Go with the army you call", "Praise the helpers", "Mother in Israel as a public office"],
      view: "God’s people are not saved only by men with spears.",
      operate: "Discern. Summon. Stand on the ridge you named.",
      quotes: [q("Awake, awake, Deborah; awake, awake, break out in song.", "Judges 5:12")],
      creations: [work("Song of Deborah", "stands", "Ancient victory hymn and political theology.", "Among the oldest texts in the Hebrew Bible.")],
      legacy: "Sacred command without apology for the commander’s sex.",
      today: ["Arguments about women in leadership still have to walk past her palm tree."],
      related: ["joshua", "joan-of-arc"],
      accomplishments: ["Judged Israel in a time of oppression", "Directed a war of liberation against Sisera", "Left one of the oldest Hebrew poems", "Modeled combined prophetic and military authority", "Became the Bible’s clearest female commander"]
    }),
    fig({
      id: "joshua", slug: "joshua", name: "Joshua",
      epithet: "Successor of Moses, captain of the land",
      categories: ["military", "spiritual", "political"],
      birthYear: -1355, deathYear: -1245, eraLabel: "Israelite settlement (tradition)",
      region: "Jordan Valley / Canaan", civilization: "Israelite",
      summary: "Moses’ general who led Israel across the Jordan, took Jericho, and charged a people to choose whom they would serve.",
      biography: [
        "Joshua son of Nun was Moses’ aide, one of the two spies who trusted the promise, and then the commander of the entry into the land. The book that bears his name is conquest literature—hard, debated, and central to Israel’s memory of becoming a people in place.",
        "He sets stones in the river, circles Jericho, and at Shechem binds the tribes: choose this day. Leadership after the giant is his problem; he does not try to be Moses.",
        "For Jews and Christians he is the type of faithful succession. The wars are read as holy, as history, and as warning—depending on the century."
      ],
      principles: ["Be strong and courageous", "Choose whom you will serve", "Remember with stones", "Succeed without impersonating the dead"],
      view: "A people must decide their allegiance in the open, then live with the cost.",
      operate: "Carry the charge you were given, not the one you envied.",
      quotes: [q("Choose this day whom you will serve… but as for me and my house, we will serve the Lord.", "Joshua 24:15")],
      creations: [work("Book of Joshua / Shechem covenant", "stands", "Conquest narrative and tribal allegiance.", "Foundational to Israel’s land-memory and Christian typology.")],
      legacy: "The general as covenant enforcer, not merely a raider.",
      today: ["Succession after founders still fails Joshua’s humility test."],
      related: ["moses", "deborah"],
      accomplishments: ["Succeeded Moses as national leader", "Led the Jordan crossing and Jericho tradition", "Bound the tribes to a public choice of God", "Modeled courage as obedience, not swagger", "Left the type of the faithful lieutenant who can command"]
    }),
    fig({
      id: "daniel", slug: "daniel", name: "Daniel",
      epithet: "Prophet in the empire’s court",
      categories: ["spiritual", "political", "philosophical"],
      birthYear: -620, deathYear: -538, eraLabel: "Babylonian / Persian exile",
      region: "Babylon / Susa", civilization: "Israelite in exile",
      summary: "Exile who served empires without swallowing their gods—lions’ den, writing on the wall, and visions of kingdoms that fall.",
      biography: [
        "Taken to Babylon as a youth, Daniel refuses the king’s defiling table, interprets dreams, and survives the lions. He reads the writing that ends Belshazzar. Under Darius he prays toward Jerusalem with the window open.",
        "The visions of beasts and a son of man gave later Judaism and Christianity a language for history under monsters: kingdoms rise, they are judged, the holy ones receive the kingdom.",
        "He is the patron of believers who must work in palaces without kneeling to them."
      ],
      principles: ["Serve the city of exile, refuse its idols", "Pray with the window open", "Numbered, numbered, weighed, divided", "Empires are mortal"],
      view: "You can keep faith in a foreign civil service.",
      operate: "Excel at the work. Do not eat the idolatry. Tell the king the bad dream.",
      quotes: [q("My God sent his angel and shut the lions’ mouths.", "Daniel 6:22")],
      creations: [work("Book of Daniel", "stands", "Court tales and apocalyptic visions.", "Shaped Jewish and Christian views of history and empire.")],
      legacy: "Integrity inside the superpower.",
      today: ["Every professional in a compromised system still sits in Daniel’s office."],
      related: ["moses", "isaiah"],
      accomplishments: ["Modeled faithful service in pagan courts", "Interpreted imperial dreams as moral verdicts", "Gave apocalyptic hope under occupation", "Survived the lions’ den narrative as a type of trust", "Taught that kingdoms are weighed and found wanting"]
    }),
    fig({
      id: "zoroaster", slug: "zoroaster", name: "Zoroaster (Zarathustra)",
      epithet: "Prophet of light and truth",
      categories: ["spiritual", "philosophical"],
      birthYear: -1200, deathYear: -1130, eraLabel: "Ancient Iran (traditional dating debated)",
      region: "Eastern Iran / Central Asia", civilization: "Iranian",
      summary: "Founder of Zoroastrianism—the religion of Ahura Mazda, truth against the lie, that shaped later Jewish, Christian, and Islamic ideas of heaven, hell, and moral choice.",
      biography: [
        "Zarathustra, dates long debated, preached against daeva-cult and cattle-raiding chaos. The Gathas call humans to asha—truth, right order—against druj, the lie. Fire becomes the sign of pure mind, not a god to be fed with blood.",
        "Persian imperial religion carried these ideas across the Near East. Many scholars see footprints in later apocalyptic faith: a last judgment, a savior figure, angels and demons as a moral war.",
        "He is one of the oldest named prophets whose community still prays."
      ],
      principles: ["Good thoughts, good words, good deeds", "Truth against the lie", "Care for the living world", "Choose in every act"],
      view: "Humans are combatants in a moral cosmos; neutrality is a vote for the lie.",
      operate: "Keep the fire of the mind clean. Protect cattle, water, and the stranger.",
      quotes: [q("Good thoughts, good words, good deeds.", "Zoroastrian triad")],
      creations: [work("Gathas / Zoroastrian tradition", "stands", "Hymns and a living faith of asha.", "Parsi and Iranian communities; influence on later monotheisms.")],
      legacy: "Ethical monotheism’s older cousin.",
      today: ["Truth versus disinformation is asha versus druj in new clothes."],
      related: ["isaiah", "moses"],
      accomplishments: ["Founded one of the world’s oldest ethical monotheisms", "Taught a cosmic war of truth and lie", "Influenced later Jewish and Christian apocalyptic imagery", "Tied holiness to care for animals and elements", "Left a living community of practice"]
    }),
    fig({
      id: "guru-nanak", slug: "guru-nanak", name: "Guru Nanak",
      epithet: "Founder of the Sikh path",
      categories: ["spiritual", "humanitarian", "philosophical"],
      birthYear: 1469, deathYear: 1539, eraLabel: "Early modern Punjab",
      region: "Punjab (India / Pakistan)", civilization: "Punjabi / Sikh",
      summary: "Mystic who taught there is no Hindu, there is no Muslim—one Creator, honest work, share the meal, and reject caste as a lie about the soul.",
      biography: [
        "Nanak traveled widely, sang hymns, and gathered a path beyond the quarrels of his day. After a river experience he preached Ik Onkar: one reality. The langar—open kitchen—made equality edible.",
        "He appointed a successor, beginning the Guru line that would give Sikhs scripture, discipline, and, later, a warrior-saint ideal of protecting the weak.",
        "Sikhism’s global dignity begins in that refusal of both empty ritual and empty pride."
      ],
      principles: ["One Creator", "Work honestly", "Share the meal", "No caste of the soul"],
      view: "The divine name is not owned by a priesthood; the hungry person at the door is the test.",
      operate: "Sing, work, feed whoever comes.",
      quotes: [q("There is no Hindu, there is no Muslim.", "Janamsakhi tradition of Nanak after the river")],
      creations: [work("Sikh panth & langar", "stands", "Community and open kitchen.", "Global Sikh faith; langar as radical hospitality.")],
      legacy: "Equality you can taste.",
      today: ["Caste, religious hate, and closed tables still fail Nanak’s kitchen."],
      related: ["rumi", "moses"],
      accomplishments: ["Founded the Sikh path of one Creator", "Established langar as equality made edible", "Rejected caste as spiritual falsehood", "Traveled and taught across religious frontiers", "Began a lineage that became a world faith"]
    }),
    fig({
      id: "gideon", slug: "gideon", name: "Gideon",
      epithet: "The few against the host",
      categories: ["military", "spiritual"],
      birthYear: -1190, deathYear: -1110, eraLabel: "Period of the Judges",
      region: "Ophrah / Jezreel, Israel", civilization: "Israelite",
      summary: "Judge who reduced his army to three hundred so Israel would know the victory was the Lord’s—holy war as humility, not numbers.",
      biography: [
        "Gideon threshes wheat in a winepress, afraid of Midian. An angel calls him mighty. He tears down his father’s altar, then gathers too many men; God sends most home so the story cannot be told as mere force.",
        "Torches, jars, trumpets: panic in the camp. Later he refuses kingship—‘the Lord will rule over you’—then stumbles into an ephod that becomes a snare. The Bible keeps the complexity.",
        "He is remembered for the three hundred and for the lesson that salvation is not a census."
      ],
      principles: ["Too many soldiers can hide the true help", "Tear down the house idol first", "Refuse the crown you were not asked to wear", "Fear is not the last word"],
      view: "A people is safest when it does not worship its own troop count.",
      operate: "Start in hiding if you must. Then obey the reduction.",
      quotes: [q("The people with you are too many… lest Israel boast, ‘My own hand has saved me.’", "Judges 7:2")],
      creations: [work("Gideon cycle in Judges", "stands", "Narrative of reduced force and divine victory.", "Type of faith against odds.")],
      legacy: "The army small enough to tell the truth.",
      today: ["Great-power politics still boasts the hand that saves itself."],
      related: ["joshua", "deborah"],
      accomplishments: ["Led Israel against Midianite oppression", "Accepted a reduced force so pride would not steal the credit", "Tore down local idolatry before battle", "Refused kingship in the name of the Lord’s rule", "Left a lasting type of victory by the few"]
    }),
    fig({
      id: "judah-maccabee", slug: "judah-maccabee", name: "Judah Maccabee",
      epithet: "Hammer of religious freedom",
      categories: ["military", "spiritual", "political"],
      birthYear: -190, deathYear: -160, eraLabel: "Seleucid crisis",
      region: "Modein / Jerusalem", civilization: "Jewish",
      summary: "Guerrilla captain who recaptured the Temple, lit the story of Hanukkah, and fought so a people could keep faith under an empire.",
      biography: [
        "When Antiochus IV outlawed Jewish practice and desecrated the Temple, Mattathias’s son Judah took the field. Outnumbered, he won in the hills, entered Jerusalem, and rededicated the sanctuary—the memory kept as Hanukkah.",
        "He died in battle. The Hasmonean state that followed was imperfect. The core deed remains: a small people refused to let an empire dictate their altar.",
        "Religious liberty as armed resistance enters the record here."
      ],
      principles: ["The altar is not the emperor’s", "Train the few in the hills", "Rededicate what was defiled", "Freedom of worship is worth a war"],
      view: "A people may be small and still not be available for spiritual erasure.",
      operate: "When the law forbids your prayers, decide what you will risk.",
      quotes: [q("It is not on the size of the army that victory in battle depends, but strength comes from Heaven.", "1 Maccabees 3:19")],
      creations: [work("Rededication of the Temple / Hanukkah", "stands", "Festival of lights and liberty.", "Jewish calendar; Western image of faith against empire.")],
      legacy: "The hammer that kept a people from vanishing into a Greek mold.",
      today: ["Minorities still light Hanukkah against erasure."],
      related: ["david", "joshua"],
      accomplishments: ["Led the Maccabean revolt against Seleucid persecution", "Recaptured and rededicated the Temple", "Gave Hanukkah its military-theological core", "Showed a small nation could defeat an empire for its faith", "Entered world memory as a captain of religious freedom"]
    }),
    fig({
      id: "constantine", slug: "constantine", name: "Constantine the Great",
      epithet: "Emperor under the cross",
      categories: ["political", "military", "spiritual"],
      birthYear: 272, deathYear: 337, eraLabel: "Late Roman Empire",
      region: "York / Rome / Constantinople", civilization: "Roman",
      summary: "The emperor who won at the Milvian Bridge under the sign of the cross, legalized Christianity, and moved the center of the world to Constantinople.",
      biography: [
        "Constantine rose through civil war. Tradition says he saw a cross and the words ‘in this sign, conquer.’ After the Milvian Bridge he issued the Edict of Milan: Christianity legal, confiscated churches restored.",
        "He chaired Nicaea’s peace of doctrine, built the new Rome on the Bosporus, and was baptized at the end. The fusion of empire and church is debated as blessing and burden to this day.",
        "For better and worse, he is the general who made the faith of the martyrs a public architecture."
      ],
      principles: ["In this sign, conquer", "Legalize the persecuted", "Build a city for a new age", "Unity of faith as imperial peace"],
      view: "The God of the oppressed can also be invoked by the man who holds the eagles.",
      operate: "Protect worship. Found the city. Know the alliance will tempt both sides.",
      quotes: [q("In this sign you shall conquer.", "Eusebius / Lactantius tradition of the vision")],
      creations: [work("Edict of Milan & Constantinople", "stands", "Toleration of Christianity and a new capital.", "The Christian empire’s birth certificate.")],
      legacy: "The cross on the labarum—church and state in one story.",
      today: ["Every debate on established religion still starts after Milan."],
      related: ["jesus", "augustine"],
      accomplishments: ["Won the empire under the Christian sign", "Legalized Christianity after centuries of persecution", "Founded Constantinople", "Convened the Council of Nicaea", "Shifted Roman history onto a Christian axis"]
    }),
    fig({
      id: "charles-martel", slug: "charles-martel", name: "Charles Martel",
      epithet: "The Hammer at Tours",
      categories: ["military", "political"],
      birthYear: 688, deathYear: 741, eraLabel: "Early medieval Francia",
      region: "Austrasia / Tours–Poitiers", civilization: "Frankish / Christian Europe",
      summary: "Frankish mayor of the palace who stopped a major Umayyad raid at Tours and kept western Europe’s future open for the Carolingian world.",
      biography: [
        "Charles, illegitimate son of Pepin, fought rivals and then met Abd al-Rahman’s forces near Tours in 732. The infantry stand became, in later memory, the shield of Christian Gaul.",
        "Modern historians argue scale and myth. The core is still a captain who organized a defense when kingdoms were thin. His grandson was Charlemagne.",
        "He is the hammer in Europe’s story of not being absorbed in that century."
      ],
      principles: ["Hold the line with infantry", "Unify before the next raid", "Defense of a people as vocation", "Build the house your grandson will need"],
      view: "A civilization can die in an afternoon if no one will stand.",
      operate: "Train the unfashionable troops. Meet the raid inland.",
      quotes: [q("He was called Martel, the Hammer, because he crushed the invaders.", "Later Frankish memory")],
      creations: [work("Victory at Tours / Carolingian path", "transformed", "Defense that enabled later European order.", "Remembered as a turning battle of the early Middle Ages.")],
      legacy: "The stand that let a later renaissance happen.",
      today: ["Border panic still misquotes Tours; the real lesson is preparation, not myth."],
      related: ["charlemagne", "jan-sobieski"],
      accomplishments: ["Defeated a major Umayyad army near Tours", "Unified Frankish power as mayor of the palace", "Opened the path to the Carolingian empire", "Became Europe’s type of the defending hammer", "Preserved a Christian-Frankish political future"]
    }),
    fig({
      id: "saladin", slug: "saladin", name: "Saladin (Ṣalāḥ ad-Dīn)",
      epithet: "Chivalrous recapture of Jerusalem",
      categories: ["military", "political", "spiritual"],
      birthYear: 1137, deathYear: 1193, eraLabel: "Counter-Crusade",
      region: "Egypt / Syria / Jerusalem", civilization: "Kurdish / Islamic",
      summary: "The sultan who retook Jerusalem in 1187 and became, even in enemy chronicles, the model of a holy warrior who kept his word and spared what others would have sacked.",
      biography: [
        "Yusuf ibn Ayyub unified Egypt and Syria, then crushed the Crusader field army at Hattin and entered Jerusalem. Unlike 1099, the city was not drowned in a general massacre of civilians; ransoms and orderly departure shamed the earlier crusade.",
        "Richard the Lionheart found him a worthy opposite. Muslim memory holds him as defender of al-Quds; Western knighthood stole his courtesy as an ideal.",
        "He died with little personal treasure. The jihad, in his best portrait, was discipline plus mercy."
      ],
      principles: ["Keep faith with the surrendered", "Unify before you strike", "Holy war is not a license to butcher", "Live spare, fight hard"],
      view: "A warrior of God is measured by what he does when the gates open.",
      operate: "Win, then be stricter with yourself than with the defeated.",
      quotes: [q("I have become so great as I am because I have won men’s hearts by gentleness.", "Attributed in later Saladin lore")],
      creations: [work("Ayyubid unification & recovery of Jerusalem", "transformed", "Muslim reconquest with notable clemency.", "A shared chivalric legend in East and West.")],
      legacy: "The enemy even your enemy could respect.",
      today: ["Occupation and holy language still fail Saladin’s clemency test."],
      related: ["cyrus-the-great", "joan-of-arc"],
      accomplishments: ["Unified Egypt and Syria against the Crusades", "Won at Hattin and recovered Jerusalem", "Spared the city a 1099-style slaughter", "Became a chivalric ideal in Christian as well as Muslim memory", "Died having given treasure to the struggle, not a private hoard"]
    }),
    fig({
      id: "sobieski", slug: "jan-sobieski", name: "John III Sobieski",
      epithet: "Savior of Vienna",
      categories: ["military", "political"],
      birthYear: 1629, deathYear: 1696, eraLabel: "Great Turkish War",
      region: "Poland–Lithuania / Vienna", civilization: "Polish / Christian Europe",
      summary: "Polish king who led the winged hussars down the Kahlenberg in 1683 and broke the siege of Vienna—the battle that turned the Ottoman advance in central Europe.",
      biography: [
        "Sobieski, already a hetman famous against Ottoman and Tatar raids, brought a relief army to a starving Vienna. On 12 September 1683 he charged from the hills. The siege broke. He wrote to his wife, ‘God and our Lord forever blessed gave a victory.’",
        "Pope and Protestant alike treated it as a deliverance of Christendom’s gate. Poland paid for Europe’s breathing space.",
        "He is the last of the great winged-hussar kings in the story of faith and frontier."
      ],
      principles: ["Ride when the gate is failing", "Credit God, not only the lance", "Alliance of the unlike against the siege", "A commonwealth can save a continent"],
      view: "Free peoples still owe each other a relief army.",
      operate: "March farther than is convenient. Charge when the hour is one.",
      quotes: [q("Venimus, vidimus, Deus vicit.", "Sobieski after Vienna — We came, we saw, God conquered")],
      creations: [work("Relief of Vienna, 1683", "transformed", "Breaking of the Ottoman siege.", "Turning point of Ottoman advance in Europe.")],
      legacy: "The charge that kept a capital free.",
      today: ["Alliances still form too late; Sobieski formed in time."],
      related: ["charles-martel", "constantine"],
      accomplishments: ["Led the relief that saved Vienna", "Commanded the famous hussar charge from Kahlenberg", "Credited victory to God in the Roman formula of conquest", "Halted the Ottoman high-water mark in central Europe", "Became Poland’s type of the king who fights for Christendom"]
    }),
    fig({
      id: "hiawatha", slug: "hiawatha", name: "Hiawatha",
      epithet: "Peacemaker of the Longhouse",
      categories: ["political", "spiritual", "philosophical"],
      birthYear: 1400, deathYear: 1450, eraLabel: "Founding of the Haudenosaunee",
      region: "Iroquoia (today’s New York / Ontario)", civilization: "Haudenosaunee",
      summary: "Onondaga (or Mohawk) leader who, with the Peacemaker, helped found the Great Law of Peace—a confederacy of nations under wampum, council, and buried weapons.",
      biography: [
        "Oral history tells of a time of blood feud. The prophet Deganawida (the Peacemaker) and Hiawatha carried a message of peace, condolence, and a constitution of clans and sachems. Weapons were buried beneath the Great Tree.",
        "The Haudenosaunee Confederacy—Mohawk, Oneida, Onondaga, Cayuga, Seneca, later Tuscarora—became one of the most sophisticated Indigenous polities in the world. Some American founders later studied its federal idea.",
        "Longfellow’s poem is not this man. The real Hiawatha is a lawgiver of peace."
      ],
      principles: ["Bury the hatchet under a living tree", "Condole the grieving before you council", "Nations can federate without disappearing", "Peace is a law, not a mood"],
      view: "Peoples who have been killing each other can still sit under one roof if the grief is spoken and the weapons go under the ground.",
      operate: "Clear the mind with condolence. Then legislate.",
      quotes: [q("We bind ourselves together by taking hold of each other’s hands so firmly that a falling tree cannot divide us.", "Great Law of Peace, oral tradition (paraphrase)")],
      creations: [work("Great Law of Peace / Haudenosaunee Confederacy", "stands", "Federal constitution of the Longhouse nations.", "Living confederacy; influence on later federal thought.")],
      legacy: "Indigenous constitutionalism as world-class political thought.",
      today: ["Broken treaties still accuse the heirs of the Tree of Peace."],
      related: ["confucius", "cyrus-the-great"],
      accomplishments: ["Helped found the Haudenosaunee Great Law of Peace", "Turned blood feud into confederacy", "Modeled condolence as a political technology", "Built a federal system of nations still extant", "Offered the world a Native constitution of peace"]
    }),
    fig({
      id: "sequoyah", slug: "sequoyah", name: "Sequoyah",
      epithet: "Inventor of the Cherokee syllabary",
      categories: ["philosophical", "humanitarian"],
      birthYear: 1770, deathYear: 1843, eraLabel: "Cherokee Nation / early United States",
      region: "Cherokee country (Tennessee / Oklahoma)", civilization: "Cherokee",
      summary: "The man who, without first being literate in English, created a writing system so his people could read, print, and govern in their own tongue.",
      biography: [
        "Sequoyah (George Gist) watched the power that ‘talking leaves’ gave settlers. He invented a syllabary of eighty-some signs. Within years the Cherokee Phoenix was in print and literacy rates soared.",
        "The Trail of Tears still came. The syllabary did not prevent removal; it did keep a nation able to write its laws, hymns, and memory on the far side of the river.",
        "Few individuals have given a whole people an alphabet of their own."
      ],
      principles: ["A nation needs its own letters", "Invent what the empire will not give you", "Print the laws in the people’s speech", "Literacy is sovereignty"],
      view: "A people without a script is forced to think in someone else’s house.",
      operate: "Build the tool. Teach it fast. Publish.",
      quotes: [q("The Cherokee people can now write.", "The fact Sequoyah made true")],
      creations: [work("Cherokee syllabary", "stands", "Working writing system for Cherokee.", "Still taught; newspapers and scripture followed within years.")],
      legacy: "Indigenous literacy as an act of nationhood.",
      today: ["Language revival movements still walk Sequoyah’s path."],
      related: ["johannes-gutenberg", "confucius"],
      accomplishments: ["Invented the Cherokee syllabary", "Enabled mass Cherokee literacy within a generation", "Made a Native press possible", "Preserved law and story through removal", "Became one of history’s few lone inventors of a full script"]
    }),
    fig({
      id: "tecumseh", slug: "tecumseh", name: "Tecumseh",
      epithet: "Shawnee statesman of a Native confederacy",
      categories: ["political", "military", "spiritual"],
      birthYear: 1768, deathYear: 1813, eraLabel: "Early American republic",
      region: "Ohio Valley / Great Lakes", civilization: "Shawnee / Native confederacy",
      summary: "The leader who tried to unite Native nations against land theft—oratory, alliance, and war for a homeland that was already theirs.",
      biography: [
        "Tecumseh, with his brother Tenskwatawa, built a confederacy from the Great Lakes toward the South. He argued that land was held in common by all Native peoples and could not be sold by a village under pressure.",
        "He fought with the British in 1812 as the least-bad instrument to hold the line. He died at the Thames. The confederacy fractured; the speech of unity did not.",
        "He is among the greatest Indigenous statesmen of the continent."
      ],
      principles: ["Land is not a trinket one village can sell", "Confederacy or erasure", "Eloquence as a weapon of nations", "Die on the line you named"],
      view: "A continent of nations can still choose each other.",
      operate: "Ride farther than the last treaty. Speak to every council fire.",
      quotes: [q("Sell a country! Why not sell the air, the great sea, as well as the earth?", "Attributed Tecumseh")],
      creations: [work("Tecumseh’s confederacy", "transformed", "Intertribal alliance against dispossession.", "Enduring symbol of Native unity.")],
      legacy: "The case against selling the sky.",
      today: ["Pipeline and treaty fights still quote his logic."],
      related: ["sitting-bull", "hiawatha"],
      accomplishments: ["Built a large Native confederacy in the Old Northwest", "Articulated communal land as unsellable by fragments", "Allied tactically to defend homelands in 1812", "Left oratory that still defines Indigenous resistance", "Became a continental symbol of Native statesmanship"]
    }),
    fig({
      id: "sitting-bull", slug: "sitting-bull", name: "Sitting Bull (Tȟatȟáŋka Íyotake)",
      epithet: "Hunkpapa leader of the last great stand",
      categories: ["political", "spiritual", "military"],
      birthYear: 1831, deathYear: 1890, eraLabel: "Great Sioux War / reservation era",
      region: "Northern Plains", civilization: "Lakota",
      summary: "Holy man and chief who refused to sell the Black Hills, gathered the camps before Little Bighorn, and died as the Ghost Dance was crushed—a life of sacred resistance.",
      biography: [
        "Sitting Bull earned leadership in war and in vision. He opposed treaties that carved the Paha Sapa. In 1876 the gathered nations destroyed Custer’s battalion. He later went to Canada, then reservation life, then Buffalo Bill’s show—a humiliating circuit he used as he could.",
        "He was killed in 1890 as police tried to arrest him amid Ghost Dance fear. Wounded Knee followed days later.",
        "He remains the face of a people who would not call theft a purchase."
      ],
      principles: ["The Black Hills are not for sale", "Vision before the campaign", "Do not sign what you cannot live", "A chief is a shield"],
      view: "A nation is still a nation when the map says otherwise.",
      operate: "Hold the sacred land in speech and in camp.",
      quotes: [q("Let us put our minds together and see what life we can make for our children.", "Sitting Bull")],
      creations: [work("Leadership of Lakota resistance", "transformed", "Spiritual and military defense of the northern plains.", "Central figure of Native American historical memory.")],
      legacy: "The stand that still names the Hills.",
      today: ["Land-back and pipeline fights still sit in his camp."],
      related: ["crazy-horse", "tecumseh"],
      accomplishments: ["Led Hunkpapa resistance to illegal seizure of the Black Hills", "Helped gather the camps of 1876", "Kept a spiritual center for his people in defeat", "Spoke for children’s future as the measure of policy", "Became a global symbol of Indigenous defiance"]
    }),
    fig({
      id: "crazy-horse", slug: "crazy-horse", name: "Crazy Horse (Tȟašúŋke Witkó)",
      epithet: "Oglala captain of Little Bighorn",
      categories: ["military", "spiritual"],
      birthYear: 1840, deathYear: 1877, eraLabel: "Great Sioux War",
      region: "Black Hills / Powder River", civilization: "Lakota",
      summary: "The war leader who would not be photographed, would not be bought, and rode at Little Bighorn—then was killed in custody rather than caged.",
      biography: [
        "Crazy Horse fought as a shirt-wearer and visionary warrior to keep the Powder River country. He helped destroy Fetterman’s command and, in 1876, led charges that broke the 7th Cavalry.",
        "He surrendered in 1877 under pressure of starvation, was bayoneted at Fort Robinson, and left almost no artifact but a name. The monument in the Hills is contested; the life was spare and absolute.",
        "He is the type of the captain who belongs to the land, not to the archive."
      ],
      principles: ["Do not sell the earth", "Fight in the shirt you were given", "Refuse the cage", "Let the name be the monument"],
      view: "Freedom can be a way of riding, not a signature on a treaty.",
      operate: "Keep your face your own. Defend the camp.",
      quotes: [q("One does not sell the earth upon which the people walk.", "Attributed Crazy Horse")],
      creations: [work("Leadership at Little Bighorn / unphotographed life", "transformed", "Military defense of Lakota hunting grounds.", "Enduring symbol of uncompromising Native resistance.")],
      legacy: "The warrior who would not pose for the conqueror’s camera.",
      today: ["Consent and land still collide with his sentence about selling the earth."],
      related: ["sitting-bull", "chief-joseph"],
      accomplishments: ["Led Oglala fighting power in the Sioux Wars", "Helped defeat Custer at Little Bighorn", "Refused to be reduced to a reservation showpiece", "Left a name without a treaty signature", "Embodied uncompromising defense of a people’s country"]
    }),
    fig({
      id: "chief-joseph", slug: "chief-joseph", name: "Chief Joseph (Hinmatóowyalahtq̓it)",
      epithet: "Nez Perce orator of the fighting retreat",
      categories: ["political", "military", "humanitarian"],
      birthYear: 1840, deathYear: 1904, eraLabel: "Nez Perce War, 1877",
      region: "Wallowa Valley / northern Rockies", civilization: "Nimiipuu (Nez Perce)",
      summary: "The leader who tried to take his people to asylum in Canada, fought a brilliant fighting retreat of 1,170 miles, and then said he would fight no more forever.",
      biography: [
        "Joseph inherited a promise that the Wallowa was home. When the U.S. broke it, bands fled. The 1877 retreat fought off the army again and again until freeze and hunger stopped them forty miles from the Medicine Line.",
        "His surrender speech became American scripture of the broken word. He spent the rest of his life asking to go home and dying in exile in Washington state.",
        "Eloquence did not return the valley. It did convict the record."
      ],
      principles: ["A broken promise is a war", "Protect the noncombatants on the trail", "Speak so the enemy must write it down", "I will fight no more forever is also a verdict"],
      view: "Honor is keeping the line you drew on the map when you were strong.",
      operate: "Retreat toward life. Then tell the truth in the victor’s language.",
      quotes: [q("I will fight no more forever.", "Surrender speech, Bear Paw, 1877")],
      creations: [work("1877 fighting retreat & surrender address", "stands", "Military epic and a speech of exhausted honor.", "Among the most quoted Native texts in American history.")],
      legacy: "The map of a people who almost made it to the line.",
      today: ["Refugees still die forty miles from a border Joseph would recognize."],
      related: ["tecumseh", "sitting-bull"],
      accomplishments: ["Led the Nez Perce fighting retreat of 1877", "Protected families across a thousand miles of war", "Delivered the surrender speech that indicted U.S. honor", "Advocated for return to Wallowa until death", "Became a global symbol of dignified Native resistance"]
    }),
    fig({
      id: "sacagawea", slug: "sacagawea", name: "Sacagawea",
      epithet: "Guide of the continent’s crossing",
      categories: ["humanitarian", "political"],
      birthYear: 1788, deathYear: 1812, eraLabel: "Lewis and Clark expedition",
      region: "Lemhi Shoshone country / Missouri / Pacific", civilization: "Shoshone / Lemhi",
      summary: "The young Shoshone woman who, with a child on her back, interpreted, foraged, and signaled peace so an American expedition could cross a continent it did not own.",
      biography: [
        "Taken as a girl in a raid, Sacagawea was living among the Hidatsa when Lewis and Clark hired Toussaint Charbonneau. She translated, recognized landmarks, found food, and, at a desperate moment, met a Shoshone band led by her brother—horses followed.",
        "Her presence with an infant told wary nations this was not a war party. She voted with the company on where to winter. Then history tried to make her only a helper in someone else’s myth.",
        "She is the Indigenous mind without which the famous map does not close."
      ],
      principles: ["Knowledge of the land is power", "A child can be a flag of peace", "Translate both ways", "Remember who already lived on the route"],
      view: "Exploration that erases the guide is a lie about how the continent was crossed.",
      operate: "Listen to the person who knows the pass.",
      quotes: [q("The presence of Sacagawea… reconciled all the Indians as to our friendly intentions.", "Clark’s journals, paraphrase of the company’s debt")],
      creations: [work("Guidance of the Corps of Discovery", "transformed", "Interpretation, diplomacy, and geographic knowledge.", "U.S. map of the West; Native memory of a woman who still belonged to her people.")],
      legacy: "The guide who made the crossing possible.",
      today: ["Projects still fail when they ignore the people who already know the river."],
      related: ["sequoyah", "hiawatha"],
      accomplishments: ["Guided and interpreted for Lewis and Clark", "Secured Shoshone horses at a crisis of the journey", "Signaled peaceful intent by traveling with her child", "Contributed geographic and food knowledge across the Rockies", "Became the most recognized Native woman in American public memory"]
    }),
    fig({
      id: "black-elk", slug: "black-elk", name: "Black Elk (Heȟáka Sápa)",
      epithet: "Lakota visionary of the hoop",
      categories: ["spiritual", "philosophical"],
      birthYear: 1863, deathYear: 1950, eraLabel: "From Little Bighorn to the reservation church",
      region: "Pine Ridge / Black Hills", civilization: "Lakota",
      summary: "Holy man who saw a great vision as a boy, survived Wounded Knee, and late in life gave the world Black Elk Speaks—a theology of the broken and still-living hoop of the nation.",
      biography: [
        "Black Elk fought as a young man, performed in Europe, became a Catholic catechist, and still carried the great vision of the six grandfathers. John Neihardt’s book (with all its editorial problems) brought Lakota cosmology into world literature.",
        "The hoop is broken, he said, but it can be mended. That is both lament and program.",
        "He stands at the meeting of Native sacrament and the century that tried to end it."
      ],
      principles: ["The hoop of the nation can be mended", "Vision is a public trust", "Two roads of faith may meet in one life", "The center is a tree that must live"],
      view: "A people is a sacred hoop; scattering it is a cosmic injury.",
      operate: "Tell the vision. Plant the tree at the center again.",
      quotes: [q("The sacred hoop of my people was one of many hoops that made one circle.", "Black Elk Speaks")],
      creations: [work("Black Elk Speaks / Lakota vision tradition", "stands", "Testimony of vision and history.", "A primary text of Native American spirituality worldwide.")],
      legacy: "The broken hoop as a world symbol of a wounded people still praying.",
      today: ["Healing of nations still uses his image of the hoop."],
      related: ["sitting-bull", "francis-of-assisi"],
      accomplishments: ["Received and transmitted a great Lakota vision", "Survived the era of Wounded Knee as a teacher", "Helped carry Lakota cosmology into world literature", "Held Native and Christian practice in one difficult life", "Gave the hoop as an image of collective healing"]
    }),
    fig({
      id: "jefferson", slug: "thomas-jefferson", name: "Thomas Jefferson",
      epithet: "Pen of American independence",
      categories: ["political", "philosophical"],
      birthYear: 1743, deathYear: 1826, eraLabel: "American founding",
      region: "Virginia / Philadelphia / Paris", civilization: "American",
      summary: "Author of the Declaration of Independence—who wrote that all men are created equal, and whose life with slavery remains the American contradiction he did not resolve.",
      biography: [
        "Jefferson drafted the Declaration, founded the University of Virginia, doubled the country with Louisiana, and filled letters with science, disestablishment of state church, and a yeoman ideal.",
        "He also held people in bondage, including children he fathered with Sally Hemings. The nation still lives inside that gap between the sentence and the plantation.",
        "The growth he served is real: a creed that later generations—Douglass, Lincoln, King—used as a weapon against the country’s own failure."
      ],
      principles: ["All men are created equal", "Rights are endowed, not granted by kings", "Establish no church over conscience", "Educate a republic or lose it"],
      view: "A people may declare truths they do not yet live; the declaration still judges them.",
      operate: "Write the creed. Fund the university. Do not pretend the hypocrisy is small.",
      quotes: [q("We hold these truths to be self-evident, that all men are created equal.", "Declaration of Independence")],
      creations: [work("Declaration of Independence", "stands", "American creed of equal rights.", "The sentence later used to abolish what Jefferson would not.")],
      legacy: "The pen that outran the planter.",
      today: ["Every American argument about equality still starts on his parchment."],
      related: ["george-washington", "john-locke"],
      accomplishments: ["Drafted the Declaration of Independence", "Advanced religious liberty in Virginia", "Founded the University of Virginia", "Completed the Louisiana Purchase", "Left a creed that later Americans used to finish the work he would not"]
    }),
    fig({
      id: "madison", slug: "james-madison", name: "James Madison",
      epithet: "Father of the Constitution",
      categories: ["political", "philosophical"],
      birthYear: 1751, deathYear: 1836, eraLabel: "American founding",
      region: "Virginia / Philadelphia", civilization: "American",
      summary: "Architect of the Constitution and Bill of Rights—the small man who designed a large machine to keep ambition from eating liberty.",
      biography: [
        "Madison arrived at Philadelphia with a plan, wrote much of the Federalist case for extended republics, and then, under pressure from the country, shepherded the Bill of Rights.",
        "He feared both kings and unchecked majorities. Separation of powers, federalism, and rights against the government are his engineering.",
        "The document is compromised (slavery’s shadow). The machine still runs, and still needs the amendments he began."
      ],
      principles: ["Ambition must counteract ambition", "Enumerate rights", "An extended republic can dilute faction", "No sacred cow of unamended power"],
      view: "Humans are not angels; government must be designed accordingly.",
      operate: "Write the structure. Then add the fences.",
      quotes: [q("If men were angels, no government would be necessary.", "Federalist No. 51")],
      creations: [work("U.S. Constitution & Bill of Rights", "stands", "Frame of federal government and first ten amendments.", "Oldest working written constitution of a large republic.")],
      legacy: "Liberty as architecture.",
      today: ["Polarization is the faction problem he diagnosed."],
      related: ["thomas-jefferson", "john-locke"],
      accomplishments: ["Principal architect of the U.S. Constitution", "Co-wrote the Federalist defense of the extended republic", "Pushed through the Bill of Rights", "Designed checks to restrain both tyrant and mob", "Left a frame still in force after two centuries"]
    }),
    fig({
      id: "john-adams", slug: "john-adams", name: "John Adams",
      epithet: "Advocate of a republic of laws",
      categories: ["political", "philosophical"],
      birthYear: 1735, deathYear: 1826, eraLabel: "American founding",
      region: "Massachusetts / Philadelphia / Europe", civilization: "American",
      summary: "The stubborn lawyer who defended redcoats in court, pushed independence, and insisted that a republic lives under law, not under a popular mood.",
      biography: [
        "Adams argued the case for independence when it was still dangerous, designed Massachusetts’ constitution, and served as diplomat and second president. He also defended British soldiers after the Boston Massacre because the law is not a team sport.",
        "He was vain, difficult, and often right about the need for balance, an independent judiciary, and the danger of French revolutionary fashion.",
        "He and Jefferson died on the same July 4. The friendship after the quarrel is part of the gift."
      ],
      principles: ["Facts are stubborn things", "A government of laws, not of men", "Defend even the despised in court", "Independence requires character, not only cannon"],
      view: "Liberty dies when the crowd becomes the court.",
      operate: "Take the unpopular brief if it is just. Then go home and write constitutions.",
      quotes: [q("Facts are stubborn things.", "Boston Massacre defense, 1770")],
      creations: [work("Massachusetts Constitution / independence advocacy", "stands", "Model state constitution and the legal case for a new nation.", "Oldest functioning written constitution; Adams’s legal republicanism.")],
      legacy: "The lawyer as founder.",
      today: ["Due process still needs an Adams when the mob is sure."],
      related: ["thomas-jefferson", "george-washington"],
      accomplishments: ["Made the legal and moral case for independence", "Defended unpopular defendants to prove the rule of law", "Authored a model constitution for Massachusetts", "Helped secure European recognition of the United States", "Modeled a republic that can quarrel and still hold"]
    }),
    fig({
      id: "stowe", slug: "harriet-beecher-stowe", name: "Harriet Beecher Stowe",
      epithet: "Author who made slavery visible",
      categories: ["humanitarian", "philosophical"],
      birthYear: 1811, deathYear: 1896, eraLabel: "Antebellum America",
      region: "Connecticut / Ohio / Maine", civilization: "American",
      summary: "The novelist whose Uncle Tom’s Cabin put the cruelty of slavery into millions of parlors—and helped make a political crisis into a moral one.",
      biography: [
        "Stowe, from a family of preachers, wrote after the Fugitive Slave Act made the North complicit. The novel was melodramatic, hugely read, and attacked as exaggeration by those who lived off the system it described.",
        "Lincoln is said to have called her the little woman who wrote the book that made this great war. Whether he said it, the effect was real: narrative as abolition.",
        "She showed that a republic can be argued with in stories as well as in briefs."
      ],
      principles: ["Make the distant suffering near", "A Christian nation cannot own people", "Print is a battlefield", "Sentiment can be a form of truth-telling"],
      view: "People change laws after they have first changed what they cannot bear to imagine.",
      operate: "Write the scene they will not visit. Then let the law catch up.",
      quotes: [q("The bitterest tears shed over graves are for words left unsaid and deeds left undone.", "Stowe")],
      creations: [work("Uncle Tom’s Cabin", "stands", "Abolitionist novel of global reach.", "Among the most consequential political novels ever written.")],
      legacy: "Fiction as a weapon against legal cruelty.",
      today: ["Human-rights campaigns still need the book that makes a statistic into a face."],
      related: ["frederick-douglass", "abraham-lincoln"],
      accomplishments: ["Wrote Uncle Tom’s Cabin, a catalyst of Northern conscience", "Globalized the moral case against American slavery", "Showed the novel as a civic instrument", "Stood in a family tradition of public Christianity against bondage", "Helped make abolition unshelvable in ordinary homes"]
    }),
    fig({
      id: "clara-barton", slug: "clara-barton", name: "Clara Barton",
      epithet: "Angel of the battlefield",
      categories: ["humanitarian", "military"],
      birthYear: 1821, deathYear: 1912, eraLabel: "American Civil War / Gilded Age",
      region: "United States", civilization: "American",
      summary: "The nurse who showed up where the armies were actually dying, then brought the Red Cross to America and a profession of organized mercy.",
      biography: [
        "Barton left a patent-office desk to haul supplies to Civil War fields, work the lines, and later identify the missing at Andersonville. She founded the American Red Cross and pushed the U.S. toward the Geneva Convention.",
        "She was stubborn, unofficial, and present. That combination built an institution.",
        "American disaster response still walks in her wagon tracks."
      ],
      principles: ["Go to the wound, not the parlor", "Mercy needs a system", "Name the missing", "Women may command logistics of care"],
      view: "A nation that can raise armies can also raise ambulances.",
      operate: "Pack the wagon. Ignore the permission slip. Then incorporate so it outlives you.",
      quotes: [q("I may be compelled to face danger, but never fear it, and while our soldiers can stand and fight, I can stand and feed and nurse them.", "Barton")],
      creations: [work("American Red Cross", "stands", "U.S. disaster and battlefield relief society.", "Still the country’s primary voluntary emergency network.")],
      legacy: "Battlefield nursing as an American institution.",
      today: ["Every disaster still needs Bartons who start before the org chart."],
      related: ["florence-nightingale", "henry-dunant"],
      accomplishments: ["Brought organized nursing to Civil War battlefields", "Founded the American Red Cross", "Championed U.S. adherence to the Geneva Convention", "Worked to identify missing prisoners of war", "Made large-scale mercy a lasting American office"]
    }),
    fig({
      id: "epictetus", slug: "epictetus", name: "Epictetus",
      epithet: "Slave who taught inner freedom",
      categories: ["philosophical", "spiritual"],
      birthYear: 50, deathYear: 135, eraLabel: "Roman Empire",
      region: "Hierapolis / Rome / Nicopolis", civilization: "Greek / Roman",
      summary: "The enslaved Stoic who taught that some things are up to us and some are not—and that freedom begins in that distinction.",
      biography: [
        "Born enslaved, crippled, Epictetus was freed and taught in Nicopolis. He wrote nothing; a student, Arrian, kept the Discourses and the Enchiridion—a handbook of the soul under tyranny, illness, and insult.",
        "Marcus Aurelius read this tradition. Prisoners, soldiers, and addicts still do. The doctrine is severe and humane: your will is your only unconfiscatable property.",
        "He is the philosopher as proof that a cage does not have to own the mind."
      ],
      principles: ["Know what is up to you", "You are not your possessions or your pain", "Insults are opinions", "Freedom is an interior art"],
      view: "A human can be unfree in law and free in will—or the reverse.",
      operate: "Divide every event: mine to choose, not mine to command.",
      quotes: [q("It’s not what happens to you, but how you react to it that matters.", "Enchiridion, paraphrase of Epictetus")],
      creations: [work("Discourses & Enchiridion", "stands", "Practical Stoic teaching from a formerly enslaved man.", "Handbook of resilience across centuries.")],
      legacy: "Philosophy from below.",
      today: ["Anxiety cultures still need his split between control and weather."],
      related: ["marcus-aurelius", "socrates"],
      accomplishments: ["Taught Stoicism as a former slave", "Left the most practical handbook of inner freedom", "Influenced Marcus Aurelius and later Christian ascetics", "Defined what is and is not in our power", "Proved philosophy is not a rich man’s toy"]
    }),
    fig({
      id: "al-ghazali", slug: "al-ghazali", name: "Al-Ghazālī",
      epithet: "Reviver of the religious sciences",
      categories: ["spiritual", "philosophical"],
      birthYear: 1058, deathYear: 1111, eraLabel: "Seljuk / Abbasid Islam",
      region: "Tus / Baghdad / Damascus", civilization: "Persian / Islamic",
      summary: "The jurist who doubted, left the prestigious madrasa, and came back to marry law, philosophy, and Sufi sincerity—so that knowledge would again serve God rather than vanity.",
      biography: [
        "Al-Ghazālī reached the top of Nizamiyya teaching, then suffered a crisis of certainty and walked away. Deliverance from Error tells the autobiography of a mind that would not fake faith.",
        "The Revival of the Religious Sciences put law back in conversation with the heart. The Incoherence of the Philosophers argued with the falasifa without burning the love of truth. He is a hinge of Sunni Islam.",
        "He taught that a clever tongue is not the same as a live soul."
      ],
      principles: ["Doubt honestly, then walk", "Law without the heart is a husk", "Sincerity over display", "Philosophy must sit under revelation without becoming a toy"],
      view: "The intellect is a light, not a throne.",
      operate: "Leave the post that is killing your truth. Then write for the ordinary believer.",
      quotes: [q("Knowledge without action is vanity.", "Ghazalian teaching in the Ihya (paraphrase)")],
      creations: [work("Ihya Ulum al-Din", "stands", "Revival of the religious sciences.", "A summit of Sunni spirituality and ethics.")],
      legacy: "The scholar who chose sincerity over the chair.",
      today: ["Expert cultures still confuse credentials with a living conscience."],
      related: ["augustine", "thomas-aquinas"],
      accomplishments: ["Wrote the Revival of the Religious Sciences", "Modeled an intellectual crisis resolved in integrity", "Integrated law, theology, and Sufi practice", "Set a lasting Sunni settlement with philosophy", "Taught that knowledge is judged by the life it produces"]
    })
  ];

  if (window.HUMANITAS && window.HUMANITAS.figures) {
    window.HUMANITAS.figures = window.HUMANITAS.figures.filter(function (f) {
      return !DROP[f.slug];
    }).concat(m);
  }
})();
