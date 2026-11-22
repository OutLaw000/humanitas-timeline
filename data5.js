/**
 * Humanitas expansion — remaining worldwide legends (batch 5 of 4+5).
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
      philosophy: { corePrinciples: p.principles, viewOfHumanity: p.view, howWeOperate: p.operate, keyQuotes: p.quotes },
      creations: p.creations, legacy: p.legacy, todayRelevance: p.today, relatedSlugs: p.related,
      accomplishments: p.accomplishments
    };
  }

  var m = [
    fig({
      id: "justinian", slug: "justinian", name: "Justinian I",
      epithet: "Codifier of Roman law",
      categories: ["political", "philosophical"],
      birthYear: 482, deathYear: 565, eraLabel: "Eastern Roman (Byzantine) Empire",
      region: "Constantinople", civilization: "Byzantine / Roman",
      summary: "Emperor who ordered the Corpus Juris Civilis—the great digest of Roman law that became the legal DNA of much of Europe and, through it, the modern world.",
      biography: [
        "Justinian ruled from Constantinople with Theodora at his side, rebuilt Hagia Sophia after riot and fire, and tried to reconquer the western Mediterranean. The military story is mixed; the legal story is civilizational.",
        "He charged Tribonian to gather centuries of jurists into the Digest, Institutes, and Code. Chaos of edicts became a system: persons, property, contracts, equity. Students still meet Roman law in that shape.",
        "Hagia Sophia showed the same instinct in stone: gather, order, lift. Law and dome are both shelters for a crowd."
      ],
      principles: ["Law must be collectable", "Justice needs a library", "Building and codifying are twin crafts", "Empire serves posterity when it writes clearly"],
      view: "Peoples cannot share a future if they cannot find the rule.",
      operate: "Codify. Index. Teach the next clerk.",
      quotes: [q("Justice is the constant and perpetual wish to render every one his due.", "Institutes of Justinian I.1")],
      creations: [work("Corpus Juris Civilis", "stands", "Codification of Roman law.", "Ancestor of civil-law systems worldwide.")],
      legacy: "The legal operating system of half the planet.",
      today: ["When regulations sprawl, Justinian’s instinct—compile and clarify—returns."],
      related: ["hammurabi", "cicero"],
      accomplishments: ["Commissioned the Corpus Juris Civilis", "Standardized Roman law for later Europe", "Rebuilt Hagia Sophia as a civic-sacred monument", "Created the Institutes as a teaching gateway to law", "Transmitted equity and contract concepts across centuries"]
    }),
    fig({
      id: "charlemagne", slug: "charlemagne", name: "Charlemagne",
      epithet: "Patron of the Palatine school",
      categories: ["political", "philosophical"],
      birthYear: 742, deathYear: 814, eraLabel: "Carolingian Renaissance",
      region: "Francia / Aachen", civilization: "Frankish / European",
      summary: "King and emperor who, besides conquest, gathered scholars, standardized writing, and restarted learning in a fractured West—growth as literacy after collapse.",
      biography: [
        "Charles the Great united much of western Europe and was crowned emperor in 800. The sword is famous; the school is the human service: Alcuin at Aachen, palace education, church schools, and the clear Carolingian minuscule that made books copyable again.",
        "He ordered that clergy be able to read, that liturgy and law be consistent enough to travel. It was not a university yet. It was a refusal to let the lights stay out.",
        "Later national myths inflated him. The recoverable fact is enough: after ruin, someone paid for teachers."
      ],
      principles: ["Learning is infrastructure", "Script must be shareable", "Rule needs clerks who can read", "Gather talent to the court"],
      view: "A realm that cannot write cannot remember how to be just.",
      operate: "Fund schools after you fund walls.",
      quotes: [q("Let schools be established in which boys may learn to read.", "Admonitio generalis, 789 (paraphrase)")],
      creations: [work("Carolingian educational reforms & minuscule", "stands", "Palace school and clearer Latin script.", "Ancestor of modern book-hand and European schooling.")],
      legacy: "Renaissance as policy: copy the books.",
      today: ["Failed states still need Charlemagne’s unglamorous item: teachers."],
      related: ["augustine", "justinian"],
      accomplishments: ["Sponsored the Carolingian revival of learning", "Standardized a clearer Latin script for Europe", "Gathered international scholars to Aachen", "Tied imperial rule to clerical literacy", "Reopened a path from collapse to curriculum"]
    }),
    fig({
      id: "al-farabi", slug: "al-farabi", name: "Al-Fārābī",
      epithet: "Second Teacher",
      categories: ["philosophical", "scientific", "political"],
      birthYear: 872, deathYear: 950, eraLabel: "Islamic Golden Age",
      region: "Central Asia / Baghdad / Aleppo", civilization: "Islamic / Persianate",
      summary: "Philosopher who ranked after Aristotle as the ‘Second Teacher’—uniting logic, music, and the virtuous city as one science of human flourishing.",
      biography: [
        "Born in Transoxiana, al-Fārābī worked in the Abbasid intellectual world where Greek texts were being Arabicized. He wrote on logic, political philosophy, and music theory with a calm that made later thinkers call him the Second Teacher.",
        "The Virtuous City asks what a community would look like if it aimed at happiness through knowledge and justice, not only conquest. Prophecy, philosophy, and law are different languages for one civic health.",
        "He is a hinge: Athens speaks through Baghdad to Córdoba, Paris, and the Renaissance. Without that hinge, Europe’s later growth is a missing staircase."
      ],
      principles: ["Logic is a civic tool", "The virtuous city aims at true happiness", "Music trains the soul’s proportions", "Translate without contempt"],
      view: "Humans become complete in a city ordered toward knowledge, not appetite alone.",
      operate: "Teach the organon. Design institutions as if souls needed scales.",
      quotes: [q("The goal of the virtuous city is true happiness.", "On the Perfect State (paraphrase)")],
      creations: [work("The Virtuous City / logical commentaries", "stands", "Political philosophy and Aristotelian logic in Arabic.", "Bridge of Greek thought into Islamic and Latin worlds.")],
      legacy: "The city as an instrument of intellect.",
      today: ["Urban policy still forgets that happiness is not only GDP."],
      related: ["aristotle", "ibn-sina"],
      accomplishments: ["Earned the title Second Teacher after Aristotle", "Fused logic, politics, and music into one curriculum", "Transmitted Greek philosophy through the Islamic world", "Imagined the virtuous city as a knowledge-community", "Prepared the ground for Avicenna and Averroes"]
    }),
    fig({
      id: "ibn-rushd", slug: "ibn-rushd", name: "Ibn Rushd (Averroes)",
      epithet: "Commentator who kept reason public",
      categories: ["philosophical", "scientific"],
      birthYear: 1126, deathYear: 1198, eraLabel: "Almohad al-Andalus",
      region: "Córdoba / Marrakesh", civilization: "Andalusian / Islamic",
      summary: "Judge and physician whose commentaries on Aristotle taught Latin Europe that faith and demonstrative reason could share a table.",
      biography: [
        "Ibn Rushd served as qadi and court physician while writing massive commentaries on Aristotle. He argued that truth cannot contradict truth: scripture and demonstration, rightly read, do not make war.",
        "The Decisive Treatise defends philosophy as a religious duty for those able to bear it. Banished for a time, his Arabic influence waned while Latin ‘Averroes’ became a school in Paris.",
        "He is a patron of intellectual hospitality: the other community’s books may save yours."
      ],
      principles: ["Truth does not contradict truth", "Demonstration is a form of worship for the capable", "Comment so others can climb", "Law should not fear logic"],
      view: "Human intellect is a trust; hiding it is a kind of ingratitude.",
      operate: "Read across languages. Let the best argument sit in court.",
      quotes: [q("Truth does not contradict truth.", "The Decisive Treatise (paraphrase)")],
      creations: [work("Commentaries on Aristotle & Decisive Treatise", "stands", "Defense of philosophy under revealed law.", "Shaped scholastic Europe as ‘the Commentator’.")],
      legacy: "Reason as a shared public good across creeds.",
      today: ["Polarized societies still need judges who can read two libraries."],
      related: ["aristotle", "thomas-aquinas"],
      accomplishments: ["Wrote the commentaries that taught Aristotle to medieval Europe", "Defended the harmony of demonstration and revelation", "Practiced law and medicine as one life of reason", "Kept Andalusian philosophy at world scale", "Became the Commentator of the Latin schools"]
    }),
    fig({
      id: "maimonides", slug: "maimonides", name: "Moses Maimonides",
      epithet: "Guide of the perplexed",
      categories: ["philosophical", "spiritual", "scientific"],
      birthYear: 1138, deathYear: 1204, eraLabel: "Medieval Mediterranean",
      region: "Córdoba / Fustat (Cairo)", civilization: "Jewish / Islamic world",
      summary: "Physician and jurist who organized Jewish law and wrote the Guide for the Perplexed—so that minds caught between scripture and philosophy would not have to choose cruelty to either.",
      biography: [
        "Fleeing Almohad persecution, Maimonides reached Egypt, became a communal leader and court physician, and wrote the Mishneh Torah: law made walkable. Patients and students both queued.",
        "The Guide speaks to those torn by Aristotle and Moses. He refuses both empty piety and a reason that sneers at the vulnerable. God is not a bigger man; language is analogical; the point is a life of mitzvah and intellect.",
        "Jewish, Christian, and Islamic readers all stole from him. That is a compliment in the republic of letters."
      ],
      principles: ["Law should be learnable", "Perplexity is a serious condition", "Heal bodies and arguments", "Negative theology against idol concepts"],
      view: "Humans deserve a path that honors both the commandment and the question.",
      operate: "Organize knowledge. Sit with the perplexed. Keep clinic hours.",
      quotes: [q("Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime.", "Often attributed; the Guide’s spirit is teach-the-method")],
      creations: [work("Mishneh Torah & Guide for the Perplexed", "stands", "Code of law and philosophical theology.", "Pillars of Jewish learning; influence on Aquinas.")],
      legacy: "Compassion for the intellectually stranded.",
      today: ["Scientific believers and secular seekers still need a Guide, not a sneer."],
      related: ["ibn-sina", "thomas-aquinas"],
      accomplishments: ["Codified Jewish law in the Mishneh Torah", "Wrote the Guide for minds between faith and philosophy", "Practiced medicine at the highest court and street level", "Influenced Christian scholasticism", "Modeled the scholar-physician as a public servant"]
    }),
    fig({
      id: "ibn-khaldun", slug: "ibn-khaldun", name: "Ibn Khaldūn",
      epithet: "Founder of social science",
      categories: ["philosophical", "scientific", "political"],
      birthYear: 1332, deathYear: 1406, eraLabel: "Marinid / Mamluk world",
      region: "Tunis / Cairo / Damascus", civilization: "Maghribi / Islamic",
      summary: "Historian who analyzed why states rise and rot—‘asabiyya, luxury, tax, desert and city—inventing sociology before the word existed.",
      biography: [
        "A Tunisian scholar tossed by court intrigue, Ibn Khaldūn wrote the Muqaddimah as a science of history: not only what happened, but the laws of group feeling, urban softness, and dynastic lifespan.",
        "He watched Bedouin cohesion conquer cities and then dissolve in palaces. He treated climate, labor, and pedagogy as causes. It is one of the most original books ever written about how humans actually live together.",
        "Modern economists and historians keep discovering they have an ancestor in the Maghrib."
      ],
      principles: ["History has causes, not only tales", "Solidarity is a resource that can be spent", "Luxury unteaches hardness", "Tax beyond vigor kills the tree"],
      view: "Peoples are patterns of cohesion, work, and forgetting.",
      operate: "Study the cycle before you crown the next house.",
      quotes: [q("The past resembles the future more than one drop of water resembles another.", "Muqaddimah (paraphrase)")],
      creations: [work("Muqaddimah", "stands", "Prolegomenon to a scientific history of civilization.", "Foundational for sociology, economics, and historiography.")],
      legacy: "The social as something you can know.",
      today: ["Polarization and elite decay are Khaldunian weather reports."],
      related: ["aristotle", "adam-smith"],
      accomplishments: ["Wrote the Muqaddimah, a science of civilization", "Analyzed group solidarity as a political force", "Linked taxation, luxury, and dynastic decline", "Treated labor and urban life as historical causes", "Founded a method later called sociology"]
    }),
    fig({
      id: "hildegard", slug: "hildegard", name: "Hildegard of Bingen",
      epithet: "Sibyl of the Rhine",
      categories: ["spiritual", "scientific", "philosophical"],
      birthYear: 1098, deathYear: 1179, eraLabel: "High Middle Ages",
      region: "Rhineland, Germany", civilization: "European Christian",
      summary: "Abbess, composer, and healer who wrote cosmology as song and medicine as garden—proof that a woman’s intellect could command a century’s attention.",
      biography: [
        "Enclosed as a child, Hildegard became abbess and refused to stay inaudible. She recorded visions, composed liturgical music of startling range, and wrote on plants, stones, and the humors as a physician of her community.",
        "She preached on tours, scolded emperors and popes, and invented a lingua ignota. The viriditas—greening power—of God was her name for biological and spiritual growth.",
        "In an age that doubted female authority, she built a house of knowledge with a cloister garden at its center."
      ],
      principles: ["Greening power is holy", "Music educates the cosmos in us", "Know the herbs", "Speak even when unofficial"],
      view: "Creation is a living green; humans are its gardeners and its songs.",
      operate: "Compose. Plant. Counsel the powerful without flattery.",
      quotes: [q("The earth should not be injured. The earth must not be destroyed.", "Attributed from her cosmology of viriditas")],
      creations: [work("Scivias, liturgical songs, Physica", "stands", "Visions, music, and natural medicine.", "UNESCO-recognized musical heritage; feminist and ecological rereadings.")],
      legacy: "Mysticism with a pharmacopeia.",
      today: ["Ecological theology and women’s scholarship still walk her path."],
      related: ["hypatia", "rachel-carson"],
      accomplishments: ["Composed a unique body of medieval sacred music", "Wrote major visionary and scientific works", "Practiced and recorded natural medicine", "Counseled and confronted secular and church power", "Named viriditas as a principle of living growth"]
    }),
    fig({
      id: "aquinas", slug: "thomas-aquinas", name: "Thomas Aquinas",
      epithet: "Architect of reasoned faith",
      categories: ["philosophical", "spiritual"],
      birthYear: 1225, deathYear: 1274, eraLabel: "High Scholasticism",
      region: "Italy / Paris", civilization: "European Christian",
      summary: "Dominican whose Summa showed that Aristotle and the Gospel could be built into one cathedral of argument—reason as a friend of the highest good.",
      biography: [
        "Thomas studied under Albert the Great, taught in Paris, and wrote at a speed that still startles. The Summa Theologiae proceeds by question, objection, answer: a method of intellectual fairness.",
        "He baptized Aristotle without swallowing him whole. Natural law, just war, the virtues, the dignity of created intellect—all become a system other people can inhabit and criticize.",
        "He stopped writing after a late experience, calling his work straw. The straw still holds roofs."
      ],
      principles: ["Grace does not destroy nature; it perfects it", "Fairness to the objection", "Law is an ordinance of reason for the common good", "The highest study is still a craft"],
      view: "Human reason is a created light; it is made to meet a greater light, not to sneer in the dark.",
      operate: "State the other side well. Then answer.",
      quotes: [q("Better to illuminate than merely to shine.", "Attributed scholastic maxim in Thomist spirit")],
      creations: [work("Summa Theologiae", "stands", "Systematic theology and philosophy.", "Still the backbone of much Catholic intellectual life.")],
      legacy: "Argument as hospitality.",
      today: ["Polarized debate still fails Thomas’s first test: can you steel-man the other side?"],
      related: ["aristotle", "maimonides"],
      accomplishments: ["Wrote the Summa as a cathedral of questions", "Reconciled Aristotelian science with Christian doctrine", "Defined natural law for later rights talk", "Modeled charitable objection-and-reply", "Shaped universities as places of disputatio"]
    }),
    fig({
      id: "francis", slug: "francis-of-assisi", name: "Francis of Assisi",
      epithet: "Brother of the poor and of the sun",
      categories: ["spiritual", "humanitarian"],
      birthYear: 1181, deathYear: 1226, eraLabel: "High Middle Ages",
      region: "Assisi, Italy", civilization: "European Christian",
      summary: "Merchant’s son who stripped himself of wealth and founded a brotherhood of peace, poverty, and kinship with creatures—a revolution of gentleness.",
      biography: [
        "Giovanni di Pietro di Bernardone heard a crucifix tell him to repair the church. He took it literally, then more than literally: he kissed a leper, begged, and gathered companions who owned nothing together.",
        "He crossed battle lines to speak with the Sultan. He wrote the Canticle of the Creatures, naming sun and wolf as kin. The Franciscan movement exploded because it made the Gospel tactile.",
        "Institutions later clothed the barefoot idea. The idea still judges them."
      ],
      principles: ["Poverty as freedom to love", "Peace as a crossing of lines", "Creatures are siblings", "Repair what is broken, starting with stone and flesh"],
      view: "The least person and the least sparrow disclose the same generosity.",
      operate: "Give something up that lets you see. Go toward, not around, the wound.",
      quotes: [q("Lord, make me an instrument of your peace.", "Prayer in Franciscan tradition")],
      creations: [work("Franciscan movement & Canticle of the Creatures", "stands", "Order of friars and a hymn to creation.", "Global religious family; patron of ecology.")],
      legacy: "Kinship that includes the poor and the nonhuman.",
      today: ["Climate and inequality are Franciscan subject matter."],
      related: ["jesus", "mary"],
      accomplishments: ["Founded a movement of apostolic poverty and peace", "Wrote a canticle of kinship with creation", "Sought dialogue across crusade lines", "Reoriented medieval piety toward the least", "Became a lasting symbol of ecological and social gentleness"]
    }),
    fig({
      id: "dante", slug: "dante", name: "Dante Alighieri",
      epithet: "Cartographer of the moral cosmos",
      categories: ["philosophical", "spiritual"],
      birthYear: 1265, deathYear: 1321, eraLabel: "Late medieval Italy",
      region: "Florence / Ravenna", civilization: "Italian / European",
      summary: "Exile who wrote the Comedy in the people’s Italian—so that the journey of a soul through hell, purgation, and light could belong to more than clerks.",
      biography: [
        "Banished from Florence, Dante wrote a poem that placed popes and lovers, philosophers and thieves, on a map of justice. Virgil and Beatrice are guides; the pilgrim is us.",
        "Choosing Tuscan vernacular over Latin was a democratic act of language. He made a world-language for interior and civic judgment.",
        "Few books have so trained a civilization’s conscience: what you love, you become; what you betray, you freeze in."
      ],
      principles: ["Language of the people can carry the highest things", "Justice has a geography", "Love must be rightly aimed", "Exile can become a vocation"],
      view: "Every life is a journey through a moral cosmos, whether we admit the map or not.",
      operate: "Write so the baker can climb with the scholar. Judge yourself first.",
      quotes: [q("In His will is our peace.", "Paradiso III")],
      creations: [work("The Divine Comedy", "stands", "Epic of inferno, purgatorio, paradiso.", "Foundation of Italian and of European moral imagination.")],
      legacy: "Vernacular genius in service of the soul’s education.",
      today: ["Cultures still need maps of consequence, not only feeds of impulse."],
      related: ["augustine", "thomas-aquinas"],
      accomplishments: ["Wrote the Comedy, a world-poem of moral education", "Elevated the Italian vernacular to classic status", "Fused classical and Christian wisdom in one journey", "Made love’s orientation the measure of a life", "Gave Europe a shared gallery of justice"]
    }),
    fig({
      id: "mansa-musa", slug: "mansa-musa", name: "Mansa Mūsā",
      epithet: "King who funded knowledge with gold",
      categories: ["political", "humanitarian", "philosophical"],
      birthYear: 1280, deathYear: 1337, eraLabel: "Mali Empire",
      region: "Niani / Timbuktu / trans-Saharan world", civilization: "Malian / West African",
      summary: "Emperor of Mali whose hajj advertised African wealth to the world—and who spent it on mosques, scholars, and Timbuktu as a university city.",
      biography: [
        "Mūsā ruled a vast West African empire of gold, salt, and learning. His 1324 pilgrimage to Mecca, with a caravan of staggering generosity, put Mali on Mediterranean maps—and briefly shocked Cairo’s gold market.",
        "He returned with architects and books. Sankore and other Timbuktu schools became magnets for Islamic learning. The point of the gold, in the best telling, was not display forever but a city that could read.",
        "African kingship here is not a footnote to Europe. It is a center of the human story of endowment."
      ],
      principles: ["Wealth is for houses of prayer and study", "Put your realm on the map by generosity", "Import architects of knowledge", "A city should be a library"],
      view: "Prosperity without scholars is a caravan that never unloads.",
      operate: "Endow the school. Pay the copyist.",
      quotes: [q("He flooded Cairo with gold, then built Timbuktu with what remained of the idea.", "Later historical judgment")],
      creations: [work("Endowments of Timbuktu / Djinguereber mosque tradition", "stands", "Learning quarter of the Mali world.", "Timbuktu manuscripts remain a world treasure.")],
      legacy: "Philanthropy at imperial scale for a university-desert.",
      today: ["Resource states still choose between extractive glitter and funded minds."],
      related: ["charlemagne", "ibn-khaldun"],
      accomplishments: ["Ruled one of the wealthiest states of the medieval world", "Made a hajj that placed West Africa on world maps", "Endowed mosques and scholarly life in Timbuktu", "Recruited architects and books after pilgrimage", "Modeled gold as a servant of learning"]
    }),
    fig({
      id: "sejong", slug: "sejong", name: "Sejong the Great",
      epithet: "King who gave a people letters",
      categories: ["political", "philosophical", "humanitarian"],
      birthYear: 1397, deathYear: 1450, eraLabel: "Joseon Korea",
      region: "Hanseong (Seoul), Korea", civilization: "Korean",
      summary: "Joseon king who created Hangul so farmers and women could read—the rare ruler who treated literacy as a human right.",
      biography: [
        "Sejong sponsored science, music, and agrarian manuals. His greatest technology was a script: Hangul, published in 1446, designed to match Korean speech so common people would no longer be locked out by classical Chinese.",
        "Elites resisted an alphabet ‘for the unlearned.’ He persisted. A phonetic script is a gift that compounds forever: every child who learns it inherits the kingdom of writing.",
        "Among monarchs, few have a monument as quiet and as total as an alphabet."
      ],
      principles: ["Writing belongs to the unlearned too", "Science should serve the farmer", "A king’s job includes the language", "Simplicity can be a high technology"],
      view: "A people who cannot write their own tongue are subjects of someone else’s book.",
      operate: "Design tools for the many. Ignore the sneer of the few.",
      quotes: [q("Because the speech of this country is different from Chinese… I have made 28 letters.", "Hunminjeongeum preface (paraphrase)")],
      creations: [work("Hangul (Hunminjeongeum)", "stands", "Korean alphabet designed for popular literacy.", "National script of Korea; model of designed writing systems.")],
      legacy: "Literacy as royal policy.",
      today: ["Digital access is the new Hangul question: who gets to read?"],
      related: ["johannes-gutenberg", "confucius"],
      accomplishments: ["Created Hangul for popular literacy", "Sponsored agricultural and scientific handbooks", "Defied elite monopoly on writing", "Strengthened Joseon cultural independence", "Left one of history’s most successful designed alphabets"]
    }),
    fig({
      id: "zheng-he", slug: "zheng-he", name: "Zheng He",
      epithet: "Admiral of the treasure fleets",
      categories: ["political", "humanitarian"],
      birthYear: 1371, deathYear: 1433, eraLabel: "Ming China",
      region: "Yunnan / Nanjing / Indian Ocean", civilization: "Chinese",
      summary: "Muslim admiral who led Ming treasure fleets across the Indian Ocean—projection of power as diplomacy, mapping, and exchange rather than settler conquest.",
      biography: [
        "Born Ma He, a captured Muslim boy who rose in the Yongle court, Zheng He commanded fleets of unmatched size to Southeast Asia, India, the Gulf, and East Africa. The ships carried porcelain, diplomats, and a claim of tribute—and brought back giraffes, knowledge, and routes.",
        "Compared with later Atlantic empires, the voyages look like a different theory of the sea: show, trade, install no lasting settler colonies, return. The later halt of the fleets is itself a historical fork.",
        "He remains a symbol of a connected Indian Ocean world with China as a polite giant."
      ],
      principles: ["The sea is a commons of missions", "Diplomacy can ride a larger ship", "Bring the world home as knowledge", "Power need not always settle"],
      view: "Distant peoples can meet as ports, not only as prey.",
      operate: "Map first. Exchange. Do not confuse size with a right to erase.",
      quotes: [q("We have traversed over a hundred thousand li of vast waters.", "Stele inscriptions of the voyages (paraphrase)")],
      creations: [work("Ming treasure voyages", "transformed", "State-sponsored Indian Ocean expeditions.", "Remembered as an alternative history of global contact.")],
      legacy: "Exploration without the full colonial template.",
      today: ["Belt, road, and blue-water ethics still argue in his shadow."],
      related: ["cyrus-the-great", "ibn-khaldun"],
      accomplishments: ["Commanded the largest wooden fleets of the premodern world", "Linked China to the Indian Ocean in systematic diplomacy", "Brought geographic and cultural knowledge back to Ming courts", "Modeled maritime power without classic settler empire", "Became a lasting symbol of Afro-Asian connection"]
    }),
    fig({
      id: "erasmus", slug: "erasmus", name: "Desiderius Erasmus",
      epithet: "Humanist of the open book",
      categories: ["philosophical", "spiritual", "humanitarian"],
      birthYear: 1466, deathYear: 1536, eraLabel: "Northern Renaissance",
      region: "Rotterdam / Basel / Europe of letters", civilization: "European",
      summary: "Scholar who edited the Greek New Testament and mocked cruelty with a smile—peace, education, and a Christianity that could read.",
      biography: [
        "Illegitimate and itinerant, Erasmus became the prince of letters. His Greek New Testament (1516) put the sources back in the hands of Europe; reformers and conservatives both used it, which is the point of a fair edition.",
        "The Praise of Folly and the Adages taught that war is stupidity with flags, and that education should form gentle, witty citizens. He refused to become anyone’s partisan grenade.",
        "In an age splitting into camps, he chose the difficult middle: reform without ruin."
      ],
      principles: ["Return to the sources", "Ridicule cruelty, not the weak", "Education as peace-work", "Refuse the party that requires you to hate"],
      view: "Humans grow by reading together, not by burning the other side’s page.",
      operate: "Edit carefully. Joke precisely. Keep friends across the quarrel.",
      quotes: [q("War is sweet to those who have not tried it.", "Adages (Dulce bellum inexpertis)")],
      creations: [work("Novum Instrumentum & Praise of Folly", "stands", "Greek NT edition and satirical humanism.", "Foundations of biblical scholarship and European wit.")],
      legacy: "Philology as a peace movement.",
      today: ["Culture wars still need Erasmian editors, not only influencers."],
      related: ["johannes-gutenberg", "thomas-aquinas"],
      accomplishments: ["Published a Greek New Testament that reshaped Europe", "Wrote the Praise of Folly against pomp and war", "Modeled irenic scholarship amid Reformation split", "Championed education as the formation of peaceable minds", "Made humanist Latin a European public square"]
    }),
    fig({
      id: "bacon", slug: "francis-bacon", name: "Francis Bacon",
      epithet: "Herald of the experimental age",
      categories: ["philosophical", "scientific"],
      birthYear: 1561, deathYear: 1626, eraLabel: "Early modern England",
      region: "London, England", civilization: "English / European",
      summary: "Statesman-philosopher who told Europe to stop quoting ancients as a substitute for trying—knowledge as organized experiment for the relief of man’s estate.",
      biography: [
        "Bacon rose to Lord Chancellor, fell in a bribery scandal, and still wrote the program of modern research: Novum Organum, New Atlantis, the idol-smashing of the mind’s biases.",
        "He did not invent experiment, but he sold it as a collective, institutional duty. Science would be a house of many workers, not a hero’s hunch. The Royal Society later walked through that door.",
        "His phrase ‘relief of man’s estate’ is the humanitarian clause in the scientific contract."
      ],
      principles: ["Put nature to the question", "Idols of the mind must be named", "Knowledge is a commonwealth", "The end is the relief of the human condition"],
      view: "We grow by shared method, not by worship of old books or of our own tribe’s guesses.",
      operate: "Record. Repeat. Fund the house of experiment.",
      quotes: [q("Knowledge is power.", "Meditationes Sacrae / later tag from Baconian science")],
      creations: [work("Novum Organum & New Atlantis", "stands", "Program for experimental natural philosophy.", "Charter myth of organized science.")],
      legacy: "Research as a public utility.",
      today: ["Labs and open data are Baconian institutions under new names."],
      related: ["galileo", "descartes"],
      accomplishments: ["Formulated the program of experimental science", "Named cognitive ‘idols’ that still describe bias", "Imagined a research college in New Atlantis", "Tied knowledge to the relief of human suffering", "Inspired later scientific societies"]
    }),
    fig({
      id: "descartes", slug: "descartes", name: "René Descartes",
      epithet: "Architect of modern method",
      categories: ["philosophical", "scientific"],
      birthYear: 1596, deathYear: 1650, eraLabel: "Scientific Revolution",
      region: "France / Dutch Republic", civilization: "European",
      summary: "Mathematician-philosopher who rebuilt certainty from doubt, fused algebra to geometry, and told us to think in a clear order.",
      biography: [
        "A soldier and wanderer, Descartes had a stove-heated night of method: doubt what can be doubted, keep what is clear and distinct, build outward. Cogito ergo sum is not a slogan; it is a floor.",
        "Analytic geometry let curves speak algebra. Mechanics and optics were part of the same clean room. He erred (animal-machines, vortices) as pioneers do; the method outlived the errors.",
        "Modernity’s confidence and its loneliness both start in that room: a mind, a method, a world to reconstruct."
      ],
      principles: ["Doubt as hygiene", "Clear and distinct as a standard", "Unify number and shape", "Order thoughts as an army of reasons"],
      view: "A human can start from almost nothing and still reach a shared world if the steps are honest.",
      operate: "Divide problems. Go from simple to complex. Write the proof you could teach.",
      quotes: [q("I think, therefore I am.", "Discourse on the Method / Principles")],
      creations: [work("Discourse on the Method & analytic geometry", "stands", "Foundations of modern philosophy and coordinate geometry.", "Still the gateway of modern thought.")],
      legacy: "Method as a human right of the mind.",
      today: ["Every stack-trace and every therapy of overconfidence is Cartesian hygiene."],
      related: ["francis-bacon", "isaac-newton"],
      accomplishments: ["Founded analytic geometry", "Rebuilt philosophy on methodic doubt", "Set clarity as a public standard of thought", "Linked algebra, optics, and mechanics", "Gave modernity its most famous first principle"]
    }),
    fig({
      id: "spinoza", slug: "spinoza", name: "Baruch Spinoza",
      epithet: "Philosopher of freedom to think",
      categories: ["philosophical", "political", "spiritual"],
      birthYear: 1632, deathYear: 1677, eraLabel: "Dutch Golden Age",
      region: "Amsterdam / The Hague", civilization: "Dutch / Sephardic",
      summary: "Lens-grinder who argued that God-or-Nature is one, that the state should protect free inquiry, and that joy is the mark of adequate understanding.",
      biography: [
        "Excommunicated from Amsterdam’s Portuguese-Jewish community, Spinoza ground lenses for a living and wrote in a geometric style as if ethics were Euclid. He refused chairs that would muzzle him.",
        "The Theological-Political Treatise defended a secular reading of scripture and a republic of free philosophizing. The Ethics maps bondage to the passions and freedom as understanding necessity without hatred.",
        "He died young of lung disease, likely from glass dust. The work is a quiet revolution: dignity without a throne, piety without a prison."
      ],
      principles: ["Freedom of philosophizing", "One substance, many modes", "Democracy as the most natural state", "Joy as the sign of adequate ideas"],
      view: "Humans are modes of one nature; cruelty is ignorance with a weapon.",
      operate: "Protect speech. Understand more than you blame. Earn joy.",
      quotes: [q("The more we understand particular things, the more we understand God.", "Ethics V")],
      creations: [work("Ethics & Theological-Political Treatise", "stands", "Geometric ethics and a defense of free thought.", "Touchstone of liberal and secular philosophy.")],
      legacy: "Intellectual liberty as a spiritual practice.",
      today: ["Blasphemy laws and platform mobs still meet Spinoza’s brief."],
      related: ["descartes", "john-locke"],
      accomplishments: ["Wrote the Ethics in geometric form", "Defended freedom of thought as a political good", "Offered a non-tyrannical idea of God-or-Nature", "Lived independently of court and pulpit", "Became a patron saint of liberal inquiry"]
    }),
    fig({
      id: "kepler", slug: "kepler", name: "Johannes Kepler",
      epithet: "Lawgiver of the planets",
      categories: ["scientific", "philosophical"],
      birthYear: 1571, deathYear: 1630, eraLabel: "Scientific Revolution",
      region: "Holy Roman Empire", civilization: "European",
      summary: "Astronomer who found that planets move in ellipses—turning the sky from crystal spheres into a lawful, measurable home.",
      biography: [
        "Kepler inherited Tycho Brahe’s data and refused to fudge the eight-minute discrepancy that wrecked circular orbits. The ellipse was an act of honesty. Three laws later, the solar system was a piece of physics waiting for Newton.",
        "He wrote as a man of faith and of number, defended his mother in a witch trial, and published on optics and snowflakes. Wonder and measurement were not enemies.",
        "Humanity’s growth here is literal: we learned the shape of our road around the sun."
      ],
      principles: ["Do not fudge the residual", "Harmony is mathematical", "The universe is lawful", "Wonder belongs in the observatory"],
      view: "We are not the geometric center, and we are more at home for knowing it.",
      operate: "Keep the ugly data. Let the model break.",
      quotes: [q("O God, I am thinking Thy thoughts after Thee.", "Attributed Keplerian piety")],
      creations: [work("Astronomia nova / three laws of planetary motion", "stands", "Elliptical orbits and equal areas.", "Foundation of celestial mechanics.")],
      legacy: "The sky as a solved, still beautiful, machine.",
      today: ["Spaceflight still runs on Kepler before it runs on rockets."],
      related: ["nicolaus-copernicus", "galileo"],
      accomplishments: ["Discovered the three laws of planetary motion", "Replaced celestial spheres with ellipses", "Advanced optics and observational honesty", "Bridged Pythagorean harmony and modern physics", "Prepared the data-road for Newton"]
    }),
    fig({
      id: "harvey", slug: "william-harvey", name: "William Harvey",
      epithet: "Discoverer of the circulation",
      categories: ["scientific", "humanitarian"],
      birthYear: 1578, deathYear: 1657, eraLabel: "Scientific Revolution",
      region: "England / Padua training", civilization: "English / European medical",
      summary: "Physician who proved the blood circulates—replacing ancient guesswork with a pump, a circuit, and a new respect for the living body.",
      biography: [
        "Harvey studied at Padua, lectured at the College of Physicians, and in 1628 published De Motu Cordis: the heart is a pump, valves are one-way, quantity proves a circuit. Galenic pores in the septum could not survive the arithmetic.",
        "He experimented on animals and on the living logic of the wrist. Medicine became a hydraulic science without ceasing to be care.",
        "Every IV line and every cardiac ward is a footnote to that circuit."
      ],
      principles: ["Measure the volume", "Nature has pipes", "Experiment on the function, not only the name", "The body is a system"],
      view: "To heal humans you must know how they are built as machines of life, without reducing them to machines only.",
      operate: "Count. Cut only as far as the question requires. Publish the circuit.",
      quotes: [q("The blood is driven in a circle and is in a state of ceaseless motion.", "De Motu Cordis (paraphrase)")],
      creations: [work("De Motu Cordis", "stands", "Demonstration of blood circulation.", "Foundation of physiology and cardiology.")],
      legacy: "The body as a known circulation.",
      today: ["Cardiovascular disease is still the Harvey problem at epidemic scale."],
      related: ["hippocrates", "galileo"],
      accomplishments: ["Demonstrated the circulation of the blood", "Overturned Galenic physiology with quantitative argument", "Founded experimental physiology in England", "Made the heart intelligible as a pump", "Enabled all later cardiology"]
    }),
    fig({
      id: "voltaire", slug: "voltaire", name: "Voltaire",
      epithet: "Enemy of fanaticism",
      categories: ["philosophical", "humanitarian", "political"],
      birthYear: 1694, deathYear: 1778, eraLabel: "Enlightenment",
      region: "France / Europe of exile", civilization: "French / European",
      summary: "Writer who made tolerance a public campaign—Calas, Candide, the laugh that cuts superstition without cutting compassion.",
      biography: [
        "François-Marie Arouet filled Europe with letters, plays, and pamphlets. Imprisoned and exiled, he used fame as a legal aid society for victims of judicial murder and religious malice.",
        "Candide mocked metaphysical shrug in the face of Lisbon’s earthquake and war. Treatise on Tolerance turned a wrongful execution into a European case. He was no saint; he was a useful lightning rod.",
        "The growth is civic: cruelty must now explain itself in print."
      ],
      principles: ["Crush infamy, not persons", "Tolerance as policy", "Wit in the service of the injured", "History against legend"],
      view: "Humans owe each other the right to be wrong without being broken on a wheel.",
      operate: "Publicize the unjust case. Mock the pompous. Plant a garden after the disaster.",
      quotes: [q("I disapprove of what you say, but I will defend to the death your right to say it.", "Paraphrase of Voltairean principle (Hall)")],
      creations: [work("Candide & Treatise on Tolerance", "stands", "Satire and a brief for religious liberty.", "Enlightenment’s most portable weapons against fanaticism.")],
      legacy: "The writer as emergency lawyer for the persecuted.",
      today: ["Show trials and sectarian rage still need a Voltaire in the comments—and in court."],
      related: ["erasmus", "john-locke"],
      accomplishments: ["Camped public opinion against judicial religious murder", "Wrote Candide as a vaccine against cruel optimism", "Popularized Newton and English liberty in France", "Made tolerance a European political brand", "Modeled letters as a human-rights instrument"]
    }),
    fig({
      id: "kant", slug: "immanuel-kant", name: "Immanuel Kant",
      epithet: "Philosopher of the moral law within",
      categories: ["philosophical", "humanitarian"],
      birthYear: 1724, deathYear: 1804, eraLabel: "Enlightenment Germany",
      region: "Königsberg, Prussia", civilization: "German / European",
      summary: "Thinker who located dignity in the capacity to legislate the moral law—treat humanity, in yourself and others, always as an end.",
      biography: [
        "Kant barely left Königsberg and remade ethics, knowledge, and peace theory. Critique of Pure Reason limited what we can know; the Groundwork and second Critique told us what we must do anyway.",
        "The categorical imperative and perpetual peace are demanding. He failed them in places (race comments that later readers rightly reject). The standard he set is still used to judge him—and us.",
        "UN-shaped talk of persons as ends has a Königsberg accent."
      ],
      principles: ["Act only on maxims you could will as universal law", "Humanity is an end, never a mere means", "Sapere aude — dare to know", "Peace is a republican project"],
      view: "Every person is a legislator in the kingdom of ends.",
      operate: "Ask if your rule could be everyone’s. Build peace as architecture, not mood.",
      quotes: [q("Two things fill the mind with ever new admiration: the starry sky above me and the moral law within me.", "Critique of Practical Reason")],
      creations: [work("Critiques & Perpetual Peace", "stands", "Critical philosophy and a sketch of lawful international order.", "Foundation of modern ethics and much human-rights theory.")],
      legacy: "Dignity as a universal form, not a tribal gift.",
      today: ["AI, markets, and war still fail the means-end test daily."],
      related: ["augustine", "john-locke"],
      accomplishments: ["Wrote the three Critiques that define modern philosophy", "Formulated the categorical imperative", "Located dignity in rational moral agency", "Sketched perpetual peace as legal order among republics", "Gave human-rights talk its deepest secular grammar"]
    }),
    fig({
      id: "wollstonecraft", slug: "mary-wollstonecraft", name: "Mary Wollstonecraft",
      epithet: "Vindicator of the rights of woman",
      categories: ["philosophical", "humanitarian", "political"],
      birthYear: 1759, deathYear: 1797, eraLabel: "Age of Revolutions",
      region: "London / revolutionary Paris", civilization: "British / European",
      summary: "Writer who insisted that women are rational beings owed education and citizenship—half of humanity no longer a decorative afterthought.",
      biography: [
        "A governess and translator who saw the French Revolution from both hope and horror, Wollstonecraft answered Burke and the Jacobins with a claim: rights without women are a fraud.",
        "A Vindication of the Rights of Woman (1792) demanded serious education, not ornamental ignorance. She lived a difficult, honest life and died after childbirth. Her daughter would write Frankenstein; the intellectual lineage is one piece.",
        "Every girls’ school that treats mind as destiny is her unfinished monument."
      ],
      principles: ["Reason is not a male property", "Education before ornaments", "Rights must be sex-blind in dignity", "Independence is a moral duty"],
      view: "A civilization that stunts women stunts itself.",
      operate: "Teach girls as citizens. Measure nations by their daughters’ rooms.",
      quotes: [q("I do not wish women to have power over men, but over themselves.", "A Vindication of the Rights of Woman")],
      creations: [work("A Vindication of the Rights of Woman", "stands", "Founding feminist political philosophy.", "Still a charter text of equal education.")],
      legacy: "The other half of the Enlightenment, spoken aloud.",
      today: ["Global girls’ education remains the highest-return Wollstonecraft policy."],
      related: ["john-locke", "susan-b-anthony"],
      accomplishments: ["Wrote the founding argument for women’s civic education", "Tied female independence to national virtue", "Faced revolutionary politics without surrendering the claim", "Opened the modern feminist canon", "Made ‘rights of woman’ a permanent public sentence"]
    }),
    fig({
      id: "franklin", slug: "benjamin-franklin", name: "Benjamin Franklin",
      epithet: "Citizen of improvement",
      categories: ["scientific", "political", "humanitarian"],
      birthYear: 1706, deathYear: 1790, eraLabel: "American Enlightenment",
      region: "Philadelphia / Paris / Atlantic world", civilization: "American / transatlantic",
      summary: "Printer, scientist, and diplomat who treated the common good as a set of inventions: library, fire company, lightning rod, a republic’s useful genius.",
      biography: [
        "Franklin ran away to print, formed a junto of mutual improvement, founded a lending library and a hospital, mapped the Gulf Stream, and tamed lightning into a public-safety device.",
        "As diplomat in France he secured the alliance that made American independence viable. As a framer he preferred compromise to brilliant deadlock. Late in life he petitioned against slavery—late, but on the record.",
        "He is the patron of applied Enlightenment: wit in the service of drains, stoves, and treaties."
      ],
      principles: ["Improve the commons", "Useful knowledge is a virtue", "Compromise can be patriotism", "A penny of prevention"],
      view: "Ordinary people, organized, can electrify a city’s safety and a nation’s chance.",
      operate: "Start the club. Found the library. Ground the kite.",
      quotes: [q("Well done is better than well said.", "Poor Richard’s Almanack")],
      creations: [work("Lightning rod, library, American diplomatic success", "stands", "Civic inventions and alliance diplomacy.", "Philadelphia institutions and a republic still using his habits.")],
      legacy: "Improvement as a civic hobby that scaled to a country.",
      today: ["Cities still need Franklins: clubs that invent public goods."],
      related: ["isaac-newton", "george-washington"],
      accomplishments: ["Invented the lightning rod as public safety", "Founded library, fire, and hospital institutions", "Mapped the Gulf Stream", "Secured French alliance for independence", "Modeled the scientist-citizen of a republic"]
    }),
    fig({
      id: "humboldt", slug: "alexander-von-humboldt", name: "Alexander von Humboldt",
      epithet: "Inventor of the living Earth",
      categories: ["scientific", "humanitarian", "philosophical"],
      birthYear: 1769, deathYear: 1859, eraLabel: "Age of exploration & science",
      region: "Prussia / Spanish America / Paris", civilization: "German / global scientific",
      summary: "Explorer-scientist who saw climate, plants, and human abuse as one web—the first planetary ecology in a traveler’s notebooks.",
      biography: [
        "Humboldt climbed Chimborazo, measured isotherms, and wrote Cosmos to tell a cultured public that Earth is a connected system. He condemned colonial slavery and extractive cruelty as scientific and moral errors.",
        "Darwin packed Humboldt. American park-thinkers packed Humboldt. The word ‘environment’ in its modern feeling owes him a debt.",
        "He made wonder quantitative and ethics geographic."
      ],
      principles: ["Everything is interaction", "Measure the planet as one", "Injustice is an ecological fact", "Science should speak to the public"],
      view: "Humans live inside a web they can harm; knowing the web is a duty of growth.",
      operate: "Travel with instruments. Write for citizens. Name the damage.",
      quotes: [q("The most dangerous worldview is the worldview of those who have not viewed the world.", "Attributed Humboldtian spirit")],
      creations: [work("Cosmos & isotherm maps", "stands", "A unified vision of Earth science.", "Ancestor of ecology, climate science, and nature writing.")],
      legacy: "The planet as a single patient.",
      today: ["Climate reports are Humboldt with satellites."],
      related: ["charles-darwin", "rachel-carson"],
      accomplishments: ["Founded a holistic Earth science", "Mapped climate and vegetation as connected systems", "Publicly condemned colonial slavery", "Inspired Darwin and later conservationists", "Wrote Cosmos as science for citizens"]
    }),
    fig({
      id: "jenner", slug: "edward-jenner", name: "Edward Jenner",
      epithet: "Father of vaccination",
      categories: ["scientific", "humanitarian"],
      birthYear: 1749, deathYear: 1823, eraLabel: "Industrial-era medicine",
      region: "Berkeley, England", civilization: "British / global medical",
      summary: "Country doctor who used cowpox to prevent smallpox—turning an observation of milkmaids into the idea that has saved more lives than any general.",
      biography: [
        "Jenner heard that cowpox protected milkmaids from smallpox. In 1796 he tested the idea with James Phipps and then with a smallpox challenge. Variolation already existed; vaccination was safer and scalable.",
        "He refused to monopolize the method. Parliament later awarded him funds; the world eventually eradicated smallpox—the only human disease so far retired by design.",
        "That is growth in the strictest sense: more children get to become adults."
      ],
      principles: ["Test the folk observation", "Publish the method", "Do not patent a shield for children", "Prevention outranks heroic cure"],
      view: "A civilization is measured by the plagues it chooses to prevent.",
      operate: "Listen to workers. Run the trial. Give the technique away.",
      quotes: [q("I hope that some day the practice of producing cowpox in human beings will spread over the world.", "Jenner’s hope, realized")],
      creations: [work("Vaccination against smallpox", "stands", "Cowpox inoculation as prevention.", "Path to smallpox eradication (1980).")],
      legacy: "The vaccine as a human right of the species.",
      today: ["Every immunization campaign is Jenner plus logistics."],
      related: ["louis-pasteur", "jonas-salk"],
      accomplishments: ["Developed vaccination against smallpox", "Opened the path to disease eradication", "Refused to lock the method in a monopoly", "Replaced riskier variolation with a safer shield", "Saved, by descendant methods, hundreds of millions of lives"]
    }),
    fig({
      id: "faraday", slug: "michael-faraday", name: "Michael Faraday",
      epithet: "Prophet of the electromagnetic age",
      categories: ["scientific", "humanitarian"],
      birthYear: 1791, deathYear: 1867, eraLabel: "Industrial Revolution science",
      region: "London, England", civilization: "British / global scientific",
      summary: "Bookbinder’s apprentice who discovered electromagnetic induction—electricity as a public force—and insisted science be taught to working people.",
      biography: [
        "Faraday educated himself in a bindery, became Davy’s assistant, then the Royal Institution’s great showman-experimenter. Induction, the dynamo principle, benzene, field lines drawn in iron filings: he made the invisible push visible.",
        "Maxwell later mathematized him. Faraday had already moralized the lab: refuse chemical weapons work, lecture to children, stay kind. The electric world is his commons.",
        "No modern city hums without that apprentice."
      ],
      principles: ["Experiment until the field shows itself", "Teach the public", "Refuse knowledge for slaughter", "Genius needs no pedigree"],
      view: "Nature’s forces can be domesticated for light and motion if we stay humble in the lab.",
      operate: "Let the poor boy in. Lecture on Friday nights. Ground the current.",
      quotes: [q("Nothing is too wonderful to be true, if it be consistent with the laws of nature.", "Attributed Faraday")],
      creations: [work("Electromagnetic induction / Christmas lectures", "stands", "Foundation of electric power and public science education.", "Every generator and transformer is Faraday’s child.")],
      legacy: "Electricity as a democratic utility of knowledge.",
      today: ["Energy transition is Faraday at planetary scale."],
      related: ["benjamin-franklin", "james-clerk-maxwell"],
      accomplishments: ["Discovered electromagnetic induction", "Laid the experimental basis of electric power", "Introduced field thinking to physics", "Created a model of public science lectures", "Proved a working-class apprentice could remake the physical world"]
    }),
    fig({
      id: "maxwell", slug: "james-clerk-maxwell", name: "James Clerk Maxwell",
      epithet: "Unifier of light and electromagnetism",
      categories: ["scientific"],
      birthYear: 1831, deathYear: 1879, eraLabel: "Victorian physics",
      region: "Edinburgh / Cambridge / London", civilization: "Scottish / British scientific",
      summary: "Physicist who wrote the equations that light is an electromagnetic wave—unifying electricity, magnetism, and vision in one growth of understanding.",
      biography: [
        "Maxwell mathematized Faraday’s fields, predicted radio, explained Saturn’s rings, and took the first color photograph. His equations are among the most beautiful objects humans have made.",
        "He was also a gentle, joking Presbyterian who treated theory as a gift. Hertz and Marconi would later hear what he had already written in symbols.",
        "The wireless world, optics, and much of modern physics sit on that unification."
      ],
      principles: ["Unify what looks separate", "Mathematics can be a sense organ", "Beauty in equations is a clue", "Leave tools for people you will not meet"],
      view: "The universe is more one thing than our first senses suggest.",
      operate: "Translate the experiment into a law others can build radios from.",
      quotes: [q("The true logic of this world is in the calculus of probabilities.", "Attributed Maxwellian spirit; his papers speak in fields")],
      creations: [work("Maxwell’s equations", "stands", "Unified electromagnetic theory.", "Basis of electronics, radio, and optical technology.")],
      legacy: "One set of laws for spark, magnet, and sunrise.",
      today: ["Every phone is a pocket Maxwell."],
      related: ["michael-faraday", "albert-einstein"],
      accomplishments: ["Unified electricity, magnetism, and light", "Predicted electromagnetic waves", "Advanced statistical physics and color vision", "Set the template Einstein would generalize", "Enabled the entire radio-electronic age"]
    }),
    fig({
      id: "mendel", slug: "gregor-mendel", name: "Gregor Mendel",
      epithet: "Founder of genetics",
      categories: ["scientific"],
      birthYear: 1822, deathYear: 1884, eraLabel: "Nineteenth-century science",
      region: "Brno (Moravia)", civilization: "Austrian / European scientific",
      summary: "Augustinian friar who counted peas until heredity became a science—growth as the understanding of how traits travel.",
      biography: [
        "Mendel trained in physics and farming, then crossed pea plants by the thousands in a monastery garden. Ratios appeared: dominant, recessive, independent assortment. He published in 1866 to almost no audience.",
        "Sixteen years after his death, the laws were rediscovered. Darwin had lacked a mechanism; Mendel had been growing it in silence.",
        "Modern medicine, food, and identity all pass through that garden."
      ],
      principles: ["Count", "Control the cross", "Patience is an instrument", "A garden can be a laboratory"],
      view: "Life’s inheritance is lawful; knowing the law is a way of caring for the next generation.",
      operate: "Design the experiment small, repeat it huge, publish even if no one claps.",
      quotes: [q("My scientific results have been gratifying.", "Mendel’s modest report of a revolution")],
      creations: [work("Experiments on Plant Hybridization", "stands", "Founding paper of genetics.", "Basis of breeding, genomics, and genetic medicine.")],
      legacy: "Heredity as a countable public fact.",
      today: ["CRISPR and grain yields are Mendel with new tools."],
      related: ["charles-darwin", "norman-borlaug"],
      accomplishments: ["Discovered the fundamental laws of inheritance", "Founded genetics as a quantitative science", "Showed a monastery garden could change biology", "Provided the missing mechanism for evolution’s raw material", "Enabled scientific breeding and medicine"]
    }),
    fig({
      id: "braille", slug: "louis-braille", name: "Louis Braille",
      epithet: "Inventor of a writing you can feel",
      categories: ["humanitarian", "scientific"],
      birthYear: 1809, deathYear: 1852, eraLabel: "Nineteenth-century reform",
      region: "Coupvray / Paris, France", civilization: "French / global",
      summary: "Blind teenager who designed a six-dot code so that people without sight could read and write—literacy as a tactile human right.",
      biography: [
        "Injured at three, Braille entered the Royal Institute for Blind Youth in Paris. Night writing for soldiers gave him a hint; he reduced it to six dots a fingertip could hold as a letter.",
        "Officials resisted; students used it anyway. The code spread across languages. A person who cannot see can still enter the republic of letters.",
        "Few inventions are so small and so total."
      ],
      principles: ["Design for the fingertip", "Literacy is not only ocular", "Students may outrun the ministry", "Simplicity travels"],
      view: "Every mind deserves a way into the book.",
      operate: "Prototype with the people who will live the tool.",
      quotes: [q("Access to communication is a human right.", "Later Braille-community principle")],
      creations: [work("Braille code", "stands", "Tactile writing system.", "Global standard for blind literacy.")],
      legacy: "The alphabet of touch.",
      today: ["Digital accessibility is Braille’s next translation."],
      related: ["sejong", "johannes-gutenberg"],
      accomplishments: ["Invented the Braille writing system as a teenager", "Opened literacy to millions of blind readers", "Designed a code compact enough for one fingertip", "Overcame institutional resistance through student use", "Created a lasting model of inclusive design"]
    }),
    fig({
      id: "dunant", slug: "henry-dunant", name: "Henry Dunant",
      epithet: "Founder of the Red Cross",
      categories: ["humanitarian", "political"],
      birthYear: 1828, deathYear: 1910, eraLabel: "Late nineteenth-century humanitarianism",
      region: "Geneva / Solferino", civilization: "Swiss / international",
      summary: "Businessman who, seeing Solferino’s wounded, organized strangers into a neutrality of care—and helped birth the Geneva Conventions.",
      biography: [
        "In 1859 Dunant arrived at Solferino after a battle and found thousands dying unattended. He organized local women and captured soldiers into an improvised ambulance corps: tutti fratelli—all brothers.",
        "A Memory of Solferino (1862) proposed standing volunteer societies and a treaty to protect the wounded. The Red Cross and the first Geneva Convention followed. He died poor, then shared the first Nobel Peace Prize.",
        "The red cross on white is a global sentence: even enemies have a body."
      ],
      principles: ["The wounded are not a side", "Volunteer care should pre-exist the next war", "Law can fence the battlefield", "Tutti fratelli"],
      view: "Humanity remains inside the uniform.",
      operate: "Write the memory. Found the society. Get states to sign.",
      quotes: [q("Would it not be possible to form relief societies…?", "A Memory of Solferino")],
      creations: [work("Red Cross idea & Geneva Convention path", "stands", "Neutral humanitarian societies and laws of war.", "ICRC and conventions still structure conflict care.")],
      legacy: "Neutral mercy as an institution.",
      today: ["Every field hospital under fire is Dunant’s wager."],
      related: ["florence-nightingale", "immanuel-kant"],
      accomplishments: ["Inspired the International Red Cross", "Catalyzed the Geneva Conventions", "Wrote A Memory of Solferino as a policy pamphlet of mercy", "Established neutrality of medical care in war", "Shared the first Nobel Peace Prize"]
    }),
    fig({
      id: "carver", slug: "george-washington-carver", name: "George Washington Carver",
      epithet: "Scientist of the soil",
      categories: ["scientific", "humanitarian"],
      birthYear: 1864, deathYear: 1943, eraLabel: "Jim Crow America / agricultural science",
      region: "Missouri / Tuskegee, Alabama", civilization: "American",
      summary: "Born enslaved, he became the botanist who taught the South to rotate, restore, and invent from peanuts and sweet potatoes—growth as soil justice.",
      biography: [
        "Carver sought education against every closed door, then taught at Tuskegee. He refused to treat poor farmers as an afterthought. Crop rotation, soil restoration, and hundreds of uses for overlooked plants were his industrial-and-moral program.",
        "He could have patented more; he preferred Jesup wagons of demonstration. Science, for him, was a movable school.",
        "The land and the people who work it were one patient."
      ],
      principles: ["Heal the soil, heal the farmer", "Demonstration over lecture", "Abundance from the humble crop", "Knowledge should ride to the field"],
      view: "A nation’s growth is only as honest as its dirt and its poorest fields.",
      operate: "Take the lab to the wagon. Teach rotation. Open the recipe.",
      quotes: [q("Where there is no vision, there is no hope.", "Carver, often cited in his educational work")],
      creations: [work("Tuskegee agricultural extension & crop research", "stands", "Practical chemistry for Southern farmers.", "Model of applied, mobile agricultural science.")],
      legacy: "Agronomy as liberation technique.",
      today: ["Regenerative agriculture is Carver without the Jim Crow obstacles."],
      related: ["george-washington", "norman-borlaug"],
      accomplishments: ["Built a practical science of soil restoration", "Taught crop rotation to impoverished farmers", "Created hundreds of uses for peanut and sweet potato", "Made Tuskegee a mobile university of the field", "Modeled research as service to the least capitalized"]
    }),
    fig({
      id: "addams", slug: "jane-addams", name: "Jane Addams",
      epithet: "Founder of Hull House",
      categories: ["humanitarian", "political", "philosophical"],
      birthYear: 1860, deathYear: 1935, eraLabel: "Progressive Era",
      region: "Chicago, United States", civilization: "American",
      summary: "Social reformer who turned a mansion into a settlement of education, labor peace, and neighborliness—and won the Nobel Peace Prize for treating the city as a shared home.",
      biography: [
        "Addams co-founded Hull House in 1889 among Chicago immigrants: kindergarten, clubs, theater, labor museums, public baths of dignity. She listened first. The settlement was a university of the block.",
        "She worked for child labor laws, suffrage, and peace, taking heat in World War I for refusing to confuse patriotism with hatred. Democracy, she said, is not a form but a way of living together.",
        "Urban social work and community organizing still rent rooms in her house."
      ],
      principles: ["Live among those you would serve", "Democracy is a daily neighborhood skill", "Peace is a domestic policy", "Culture belongs on the poor street too"],
      view: "The city grows when strangers become neighbors with tools.",
      operate: "Open the house. Teach the child. Mediate the strike.",
      quotes: [q("The good we secure for ourselves is precarious and uncertain until it is secured for all of us.", "Addams")],
      creations: [work("Hull House", "transformed", "Model settlement house.", "Template of community centers and social work.")],
      legacy: "The neighborhood as a humanitarian technology.",
      today: ["Migrant cities still need Hull Houses more than slogans."],
      related: ["eleanor-roosevelt", "mary-wollstonecraft"],
      accomplishments: ["Co-founded Hull House as a new civic institution", "Advanced child labor and women’s civic reforms", "Won the Nobel Peace Prize for practical peacemaking", "Defined democracy as a way of living with difference", "Professionalized compassionate urban work without killing its soul"]
    }),
    fig({
      id: "du-bois", slug: "w-e-b-du-bois", name: "W. E. B. Du Bois",
      epithet: "Scholar of the color line",
      categories: ["philosophical", "humanitarian", "political"],
      birthYear: 1868, deathYear: 1963, eraLabel: "Jim Crow to decolonization",
      region: "United States / Ghana", civilization: "American / Pan-African",
      summary: "First Black Harvard PhD who mapped the souls of Black folk and the color line as the problem of the twentieth century—and helped found the NAACP.",
      biography: [
        "Du Bois wrote sociology as moral X-ray: The Philadelphia Negro, The Souls of Black Folk, Black Reconstruction. Double consciousness named a wound and a lens. He insisted on the vote, on education, on telling Reconstruction truly.",
        "He co-founded the NAACP, edited The Crisis, organized Pan-African congresses, and died in Accra as African independence rose. The color line, he had warned, was global.",
        "Few scholars so changed both a nation’s archive and its streets."
      ],
      principles: ["The problem of the twentieth century is the color line", "Truthful history is a civil right", "Education without the ballot is incomplete", "Think with the world, not only the parish"],
      view: "A people locked out of the true story cannot grow; neither can the nation that locked them.",
      operate: "Measure. Narrate. Organize. Cross oceans of solidarity.",
      quotes: [q("The problem of the twentieth century is the problem of the color-line.", "The Souls of Black Folk")],
      creations: [work("The Souls of Black Folk & NAACP", "stands", "Classic of sociology and a civil-rights institution.", "Still in every serious syllabus of American freedom.")],
      legacy: "Scholarship as liberation infrastructure.",
      today: ["The color line mutated; Du Bois’s method did not expire."],
      related: ["frederick-douglass", "martin-luther-king-jr"],
      accomplishments: ["Wrote The Souls of Black Folk", "Co-founded the NAACP", "Reframed Reconstruction against the Lost Cause", "Organized Pan-African intellectual politics", "Set the scholarly standard for studying racial democracy"]
    }),
    fig({
      id: "schweitzer", slug: "albert-schweitzer", name: "Albert Schweitzer",
      epithet: "Reverence for life",
      categories: ["humanitarian", "spiritual", "scientific"],
      birthYear: 1875, deathYear: 1965, eraLabel: "Twentieth-century humanitarianism",
      region: "Alsace / Lambaréné, Gabon", civilization: "European / African hospital world",
      summary: "Theologian-musician who retrained as a doctor and built a hospital in Gabon—ethics summarized as reverence for life, practiced with a scalpel.",
      biography: [
        "Already a celebrated interpreter of Bach and of Jesus, Schweitzer studied medicine and left for Lambaréné. The hospital was imperfect and colonial-era complicated; it was also a decades-long wager that a European genius owed his hands to the sick at the empire’s edge.",
        "Reverence for life widened the moral circle to animals and ecosystems without abandoning the human patient. He received the Nobel Peace Prize and kept returning to the ward.",
        "The legend is sometimes too smooth. The core remains: talent as a debt."
      ],
      principles: ["Reverence for life", "Talent is a debt to the wounded", "Culture should end in a clinic", "The circle of moral concern can widen"],
      view: "Whatever lives makes a claim; the gifted are not exempt.",
      operate: "Learn a second trade if the first only applauds you. Go where the pain is.",
      quotes: [q("Ethics is nothing other than reverence for life.", "Schweitzer")],
      creations: [work("Lambaréné hospital & philosophy of reverence", "stands", "Jungle hospital and ethical formula.", "Still a symbol of medicine as vocation.")],
      legacy: "The polymath who spent himself on care.",
      today: ["Global health still asks Schweitzer’s question of the comfortable expert."],
      related: ["albert-einstein", "mother-teresa"],
      accomplishments: ["Founded a hospital in Lambaréné and served there for decades", "Articulated ‘reverence for life’ as a complete ethic", "Joined music, theology, and surgery in one vocation", "Received the Nobel Peace Prize for practical humanitarianism", "Modeled expertise as a debt to the sick"]
    }),
    fig({
      id: "fleming", slug: "alexander-fleming", name: "Alexander Fleming",
      epithet: "Discoverer of penicillin",
      categories: ["scientific", "humanitarian"],
      birthYear: 1881, deathYear: 1955, eraLabel: "Twentieth-century medicine",
      region: "Scotland / London", civilization: "British / global medical",
      summary: "Bacteriologist who noticed a mold that killed bacteria—opening the antibiotic age that turned infections from fate into a treatable condition.",
      biography: [
        "In 1928 Fleming saw that Penicillium had cleared staphylococci on a dish. He published; the world yawned. Florey and Chain later made a drug. Fleming had the eyes; the team had the factory.",
        "He warned early about resistance if the gift were wasted. Nobel shared, humility mostly kept. The death rate of the twentieth century bent downward.",
        "Human growth here is actuarial: more years, more grandparents, more finished books."
      ],
      principles: ["Notice the spoiled plate", "Share credit with the scale-up", "Warn about misuse", "A chance observation still needs a trained eye"],
      view: "Invisible life can kill us or save us; attention is the first instrument.",
      operate: "Keep the lab messy enough for luck, strict enough to see it.",
      quotes: [q("One sometimes finds what one is not looking for.", "Fleming on the penicillin plate")],
      creations: [work("Penicillin (discovery)", "stands", "First major antibiotic pathway.", "Foundation of modern anti-infective medicine.")],
      legacy: "The mold that rewrote mortality tables.",
      today: ["Antibiotic resistance is Fleming’s unused P.S."],
      related: ["louis-pasteur", "edward-jenner"],
      accomplishments: ["Discovered penicillin’s antibacterial effect", "Opened the antibiotic era", "Warned against careless use and resistance", "Shared the path to industrial production with later teams", "Helped crash death rates from wound and childbed infection"]
    }),
    fig({
      id: "borlaug", slug: "norman-borlaug", name: "Norman Borlaug",
      epithet: "Father of the Green Revolution",
      categories: ["scientific", "humanitarian"],
      birthYear: 1914, deathYear: 2009, eraLabel: "Late twentieth-century development",
      region: "Iowa / Mexico / India / Pakistan", civilization: "American / global agricultural",
      summary: "Plant breeder whose dwarf, rust-resistant wheats averted famine for hundreds of millions—the largest life-saving technology since vaccines.",
      biography: [
        "Borlaug trained in forestry and plant pathology, then bred wheat in Mexico that could take fertilizer without falling over. In the 1960s those seeds went to South Asia as famine loomed. Yields jumped; the predicted millions of deaths receded.",
        "He fought bureaucracy, rust, and despair with field plots. Critics later asked about monoculture and chemicals; he answered that empty plates were the first cruelty. The Nobel Peace Prize in 1970 named food as peace.",
        "If greatness is lives not lost, his ledger is almost unmatched."
      ],
      principles: ["Hunger is a solvable engineering problem", "Take the plot to the farmer", "Peace needs calories", "Fight the rust, then the paperwork"],
      view: "A child not starved is the primary human right from which others grow.",
      operate: "Breed. Train local scientists. Ignore the salon until the granary is full.",
      quotes: [q("Food is the moral right of all who are born into this world.", "Borlaug")],
      creations: [work("Semi-dwarf wheat varieties & Green Revolution methods", "stands", "High-yield disease-resistant wheat systems.", "Still feeding a large share of humanity.")],
      legacy: "Agronomy as peacemaking.",
      today: ["A hotter, more crowded century still needs Borlaugs for the next grain."],
      related: ["louis-pasteur", "george-washington-carver"],
      accomplishments: ["Bred the wheats of the Green Revolution", "Averted famine at historic scale in South Asia", "Won the Nobel Peace Prize for food as peace", "Trained generations of plant scientists in the Global South", "Showed that yield is a humanitarian technology"]
    }),
    fig({
      id: "lovelace", slug: "ada-lovelace", name: "Ada Lovelace",
      epithet: "First computer programmer",
      categories: ["scientific", "philosophical"],
      birthYear: 1815, deathYear: 1852, eraLabel: "Victorian computing dawn",
      region: "London, England", civilization: "British / scientific",
      summary: "Mathematician who saw in Babbage’s Analytical Engine more than a calculator—the idea that machines could manipulate symbols, hence music, thought, and the future.",
      biography: [
        "Daughter of Byron and of a mathematically stern mother, Ada collaborated with Charles Babbage and in 1843 annotated a paper on his unbuilt engine. Note G contains an algorithm for Bernoulli numbers—and a vision: the engine might compose, if we taught it well.",
        "She distinguished the machine’s following of rules from genuine origination, a debate AI still inhabits. She died at thirty-six. The vision outlived the hardware by a century.",
        "Programming as a humanistic art starts here."
      ],
      principles: ["Machines can weave algebra as looms weave patterns", "Anticipate uses beyond the inventor’s habit", "Poetry and number can share a mind", "Write the procedure down"],
      view: "Imagination is a scientific instrument.",
      operate: "Annotate the future. Specify the steps.",
      quotes: [q("The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.", "Sketch of the Analytical Engine, Note A")],
      creations: [work("Notes on the Analytical Engine", "stands", "First published computer algorithm and a theory of what machines might do.", "Founding document of software.")],
      legacy: "Software as a liberal art.",
      today: ["Every discussion of what computers are for still cites her distinction."],
      related: ["alan-turing", "benjamin-franklin"],
      accomplishments: ["Wrote the first published computer algorithm", "Saw that machines could manipulate general symbols", "Framed the still-live question of machine originality", "Bridged poetry and mathematics in one vocation", "Became the namesake of a programming language and a lineage"]
    }),
    fig({
      id: "rosalind-franklin", slug: "rosalind-franklin", name: "Rosalind Franklin",
      epithet: "Photographer of life’s spiral",
      categories: ["scientific"],
      birthYear: 1920, deathYear: 1958, eraLabel: "Molecular biology’s birth",
      region: "London, England", civilization: "British / global scientific",
      summary: "Physical chemist whose X-ray photograph of DNA made the double helix undeniable—and whose credit was delayed, then made a lesson in scientific justice.",
      biography: [
        "Franklin mastered X-ray crystallography on coal, then DNA and viruses. Photograph 51 showed a helical structure with distances that constrained any honest model. Watson and Crick used that intelligence; the 1962 Nobel came after her death and without her name.",
        "Later history restored her. The deeper honor is the work: she insisted on data over charm. Molecular biology needed that stubbornness.",
        "Growth of knowledge includes growth of fairness about who grew it."
      ],
      principles: ["The photograph is an argument", "Measure before you model", "Credit is part of truth", "Viruses and genes are structures"],
      view: "Nature’s secrets yield to careful instruments, not to the loudest café.",
      operate: "Do the hard experiment. Keep the lab book. Name the makers.",
      quotes: [q("Science and everyday life cannot and should not be separated.", "Franklin")],
      creations: [work("Photograph 51 & DNA crystallography", "stands", "Key X-ray evidence for the double helix.", "Foundation of molecular genetics.")],
      legacy: "The helix, and a reformed memory of who saw it.",
      today: ["Authorship, gender, and data-sharing ethics still sit in her lab."],
      related: ["marie-curie", "gregor-mendel"],
      accomplishments: ["Produced the crucial X-ray evidence of DNA’s helix", "Advanced the structures of coal, DNA, and viruses", "Set a standard of experimental rigor in molecular biology", "Posthumously reshaped the ethics of scientific credit", "Helped open the genetic age"]
    }),
    fig({
      id: "goodall", slug: "jane-goodall", name: "Jane Goodall",
      epithet: "Witness of the chimpanzee mind",
      categories: ["scientific", "humanitarian"],
      birthYear: 1934, deathYear: null, eraLabel: "Contemporary conservation",
      region: "England / Gombe, Tanzania / world", civilization: "British / global scientific",
      summary: "Primatologist who showed that chimpanzees make tools, feel, and live in history—collapsing the wall between ‘us’ and ‘them’ and turning science into a conservation vow.",
      biography: [
        "Without a formal degree at the start, Goodall sat in Gombe long enough for chimpanzees to become individuals with names and politics. Tool-use and hunting shattered a proud human monopoly. She then spent decades on sanctuaries, roots-and-shoots education, and the ethics of hope.",
        "Critics of naming animals missed the point: attention is a method. The wall between human and kin is thinner, and our duty thicker.",
        "She is still at work. The living legend is allowed."
      ],
      principles: ["Patience is a scientific instrument", "Kinship without sentimentality", "Teach children as conservationists", "Hope is a discipline"],
      view: "We are not the only minds in the forest; growth includes learning to share the tree.",
      operate: "Watch longer. Protect habitat. Give the next generation a job of care.",
      quotes: [q("Only if we understand, will we care. Only if we care, will we help.", "Goodall")],
      creations: [work("Gombe research & Roots & Shoots", "stands", "Long-term primate study and global youth conservation network.", "Transformed primatology and environmental education.")],
      legacy: "Empathy as a research protocol.",
      today: ["Extinction and lab ethics still run on her evidence."],
      related: ["charles-darwin", "rachel-carson"],
      accomplishments: ["Documented chimpanzee tool use and complex social life", "Transformed primatology’s methods and ethics", "Built a global youth conservation movement", "Collapsed a false wall between human and animal mind", "Turned field science into a public vow of protection"]
    }),
    fig({
      id: "yunus", slug: "muhammad-yunus", name: "Muhammad Yunus",
      epithet: "Banker of the poor",
      categories: ["humanitarian", "political", "philosophical"],
      birthYear: 1940, deathYear: null, eraLabel: "Contemporary development",
      region: "Chittagong / Dhaka, Bangladesh", civilization: "Bangladeshi / global",
      summary: "Economist who proved that the poorest, especially women, are bankable—microcredit as a tool of dignity, and a Nobel for the idea that poverty is not a character flaw.",
      biography: [
        "During famine-shadowed years in Bangladesh, Yunus lent tiny sums from his own pocket, then built Grameen Bank: no collateral, group trust, women as the center of the ledger. Default rates shamed ordinary banks.",
        "Microfinance later drew critiques about interest and over-indebtedness. The core insight remains: exclusion from capital is a designed poverty. He called for social businesses that solve problems rather than extract them.",
        "Development economics got a village branch."
      ],
      principles: ["Credit is a human right if it is sized to the life", "Trust can replace collateral", "Women’s ledgers grow nations", "Business can be social by design"],
      view: "The poor are not a different species of economic agent; they were left outside the office.",
      operate: "Go to the village. Lend small. Measure dignity, not only yield.",
      quotes: [q("Poverty is not created by the poor. It is created by the system we have built.", "Yunus")],
      creations: [work("Grameen Bank / microcredit model", "stands", "Banking without collateral for the poorest.", "Global microfinance and social-business movements.")],
      legacy: "Capital as a neighbor, not only a fortress.",
      today: ["Financial inclusion and its abuses both trace to this experiment."],
      related: ["adam-smith", "jane-addams"],
      accomplishments: ["Founded Grameen Bank for the collateral-poor", "Centered women as economic agents of development", "Shared a Nobel Peace Prize for microcredit", "Reframed poverty as a system design, not a vice", "Spread social-business thinking worldwide"]
    }),
  ];

  if (window.HUMANITAS && window.HUMANITAS.figures) {
    window.HUMANITAS.figures = window.HUMANITAS.figures.concat(m);
  }
})();
