/**
 * Humanitas expansion — 50 worldwide legends of service, knowledge, and growth.
 * Concatenates onto window.HUMANITAS.figures (data1+data2+data3 ≈ 60 → ≈ 110).
 */
(function () {
  function q(text, source) {
    return { text: text, source: source };
  }
  function work(name, status, description, modernPresence) {
    return {
      name: name,
      type: "Creation",
      status: status || "stands",
      description: description || "",
      modernPresence: modernPresence || "",
    };
  }
  function fig(p) {
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      epithet: p.epithet,
      categories: p.categories,
      birthYear: p.birthYear,
      deathYear: p.deathYear,
      eraLabel: p.eraLabel,
      region: p.region,
      civilization: p.civilization,
      summary: p.summary,
      biography: p.biography,
      philosophy: {
        corePrinciples: p.principles,
        viewOfHumanity: p.view,
        howWeOperate: p.operate,
        keyQuotes: p.quotes,
      },
      creations: p.creations,
      legacy: p.legacy,
      todayRelevance: p.today,
      relatedSlugs: p.related,
      accomplishments: p.accomplishments,
    };
  }

  var m = [
    fig({
      id: "imhotep", slug: "imhotep", name: "Imhotep",
      epithet: "First named architect and physician",
      categories: ["scientific", "humanitarian", "philosophical"],
      birthYear: -2667, deathYear: -2600, eraLabel: "Old Kingdom Egypt",
      region: "Memphis / Saqqara, Egypt", civilization: "Egyptian",
      summary: "Chancellor to Djoser who designed the Step Pyramid and was later deified as a god of healing—the first individual in recorded history whose genius in building and medicine was remembered by name.",
      biography: [
        "Imhotep served Pharaoh Djoser in the Third Dynasty. As overseer of works he conceived the Step Pyramid at Saqqara: stone stacked as a lasting mountain for the king, and the first monumental architecture in dressed stone.",
        "Later Egyptian and Greek tradition remembered him as a physician and sage. Temples of Imhotep became healing sites; Greeks identified him with Asclepius. Whether every later medical tale is historical, the civilizational fact is clear: a commoner rose by skill, not only blood, and knowledge of body and stone was treated as sacred service.",
        "He stands at the beginning of named expertise. Humanity’s growth has always needed people who can make shelter, order, and care—and who leave methods others can inherit."
      ],
      principles: ["Knowledge as public service", "Building that outlasts the builder", "Healing as a vocation", "Merit beside birth"],
      view: "Human skill—stone, medicine, administration—can serve the living and the dead when it is taught and remembered.",
      operate: "Honor competent service. Preserve methods. Let talent rise.",
      quotes: [q("I am Imhotep… chief of sculptors, chief of carpenters.", "Titles from contemporary inscriptions (paraphrase)")],
      creations: [work("Step Pyramid of Djoser", "stands", "First large-scale dressed-stone pyramid complex.", "Saqqara; UNESCO World Heritage.")],
      legacy: "The named expert: architecture and medicine as gifts to the human city.",
      today: ["Infrastructure and public health still rest on unnamed Imhoteps—and on remembering them."],
      related: ["hammurabi", "hippocrates"],
      accomplishments: ["Designed the Step Pyramid, first monumental stone architecture", "Elevated a commoner to the highest technical office of the state", "Became Egypt’s enduring symbol of healing wisdom", "Linked building, administration, and care in one vocation", "Set the pattern of named scientific-technical memory"]
    }),
    fig({
      id: "hatshepsut", slug: "hatshepsut", name: "Hatshepsut",
      epithet: "Pharaoh of trade and stone",
      categories: ["political", "humanitarian"],
      birthYear: -1507, deathYear: -1458, eraLabel: "New Kingdom Egypt",
      region: "Thebes, Egypt", civilization: "Egyptian",
      summary: "Female pharaoh who ruled in her own right, sent the famous Punt expedition, and filled Egypt with temples—growth through trade, ritual, and building rather than endless war.",
      biography: [
        "Hatshepsut began as queen-regent and then assumed full kingship, wearing the ritual signs of pharaoh so the office would hold. Her reign was long, stable, and unusually well documented in stone.",
        "She dispatched a fleet to Punt for incense, ebony, and living trees—commerce as statecraft. At Deir el-Bahri she raised a terraced temple that still teaches how architecture can look like a conversation with the cliffs.",
        "Later kings tried to chisel her name away. The attempt failed. Growth that plants trees and raises temples is harder to erase than a campaign season."
      ],
      principles: ["Legitimate rule can take an unexpected face", "Trade as peace-power", "Monumental beauty as public good", "Stability over spectacle war"],
      view: "A people grow when their leaders fund expeditions of exchange and houses of meaning, not only armies.",
      operate: "Measure a reign by what still stands and what still trades.",
      quotes: [q("I have done this with a loving heart for my father Amun.", "Inscriptions at Deir el-Bahri (paraphrase)")],
      creations: [work("Mortuary Temple of Hatshepsut", "stands", "Terraced temple at Deir el-Bahri.", "Major archaeological and tourist site.")],
      legacy: "Female sovereignty joined to commercial and architectural flourishing.",
      today: ["Leadership still gets tested on whether it can grow a country without constant war."],
      related: ["imhotep", "cyrus-the-great"],
      accomplishments: ["Ruled Egypt as pharaoh in her own name", "Mounted the Punt expedition and expanded peaceful trade", "Built Deir el-Bahri, a masterpiece of landscape architecture", "Maintained a long, relatively peaceful prosperity", "Proved royal office could be held by a woman at imperial scale"]
    }),
    fig({
      id: "pericles", slug: "pericles", name: "Pericles",
      epithet: "Voice of the Athenian experiment",
      categories: ["political", "philosophical"],
      birthYear: -495, deathYear: -429, eraLabel: "Classical Athens",
      region: "Athens, Greece", civilization: "Hellenic",
      summary: "Statesman who led Athens at its height: democracy, the Parthenon, and a funeral oration that defined citizenship as public courage and culture.",
      biography: [
        "Pericles dominated Athenian politics for decades through election and persuasion, not a crown. He backed pay for juries so poorer citizens could serve, and he sponsored the rebuilding of the Acropolis after Persian destruction.",
        "Thucydides gives him the Funeral Oration: Athens as a school of Hellas, freedom joined to law, honor paid to those who die for a way of life rather than a master. The Peloponnesian War and plague shadowed the end of his career.",
        "The experiment was incomplete—women, slaves, and foreigners were excluded—yet the idea that ordinary citizens could govern, speak, and fund beauty remains one of humanity’s great growth spurts."
      ],
      principles: ["Citizenship as participation", "Public beauty as civic education", "Speech under law", "The city as a school"],
      view: "Humans become larger when they share rule, argument, and art—not only when they share a king.",
      operate: "Pay people to participate. Rebuild the commons. Speak as if the dead are listening.",
      quotes: [q("Our constitution… favors the many instead of the few; this is why it is called a democracy.", "Thucydides, Funeral Oration (paraphrase)")],
      creations: [work("Periclean Acropolis program (Parthenon)", "stands", "Temple and sculptural program of classical Athens.", "Parthenon still stands; democracy’s language still travels.")],
      legacy: "Democratic self-respect given architecture and a speech.",
      today: ["Every republic still argues how wide the ‘many’ really is."],
      related: ["socrates", "plato"],
      accomplishments: ["Led classical Athens through its cultural high noon", "Expanded citizen participation with jury pay", "Sponsored the Parthenon and Acropolis rebuilding", "Articulated democracy as a way of life, not only a procedure", "Set the Western template of civic funeral honor"]
    }),
    fig({
      id: "hippocrates", slug: "hippocrates", name: "Hippocrates of Kos",
      epithet: "Father of Western medicine",
      categories: ["scientific", "humanitarian", "philosophical"],
      birthYear: -460, deathYear: -370, eraLabel: "Classical Greece",
      region: "Kos / Thessaly, Greece", civilization: "Hellenic",
      summary: "Physician of the Hippocratic school who pulled medicine toward observation, prognosis, and an ethic of doing no harm—care as a craft with a conscience.",
      biography: [
        "The Hippocratic Corpus is a library, not one man’s notebook, but it carries a revolution: disease as a natural process to be watched, not only a curse to be bargained with. Case histories, diet, environment, and the course of fever become data.",
        "The Oath—whatever its exact authorship—binds the healer to confidentiality, to the patient’s good, and to refusing what would poison. It made medicine a moral profession, not a marketplace trick.",
        "Every modern clinic still lives in that turn: look, record, refrain from harm, tell the truth about the body."
      ],
      principles: ["Observe before you mythologize", "Do no harm", "The patient is not a means", "Prognosis as honesty"],
      view: "The body is intelligible. The healer’s power is dangerous unless yoked to the patient’s good.",
      operate: "Take a history. Watch the course. Refuse lucrative harm.",
      quotes: [q("As to diseases, make a habit of two things—to help, or at least to do no harm.", "Epidemics I")],
      creations: [work("Hippocratic Corpus & Oath tradition", "stands", "Foundational medical texts and professional ethic.", "Oath still recited in adapted form worldwide.")],
      legacy: "Medicine as science plus vow.",
      today: ["AI diagnostics and pharma incentives still need the Oath’s brake."],
      related: ["imhotep", "louis-pasteur"],
      accomplishments: ["Shifted medicine toward natural causes and case observation", "Left a corpus that trained physicians for centuries", "Established a professional ethic of non-maleficence", "Tied diet, environment, and prognosis into one craft", "Made the physician publicly answerable to the patient"]
    }),
    fig({
      id: "euclid", slug: "euclid", name: "Euclid",
      epithet: "Geometer of Alexandria",
      categories: ["scientific", "philosophical"],
      birthYear: -325, deathYear: -265, eraLabel: "Hellenistic Egypt",
      region: "Alexandria, Egypt", civilization: "Hellenistic",
      summary: "Author of the Elements, the most successful textbook ever written—proof stacked on proof, teaching humanity how to think from axioms to the stars.",
      biography: [
        "Working in Ptolemaic Alexandria, Euclid gathered earlier Greek geometry into thirteen books: definitions, postulates, common notions, and theorems that follow. Parallel lines, triangles, number, and solid space become a single ladder.",
        "The Elements was copied, translated, and taught from Baghdad to Oxford. Newton’s Principia still speaks Euclidean. Non-Euclidean geometry later bent the fifth postulate—but only because Euclid had stated it clearly enough to question.",
        "Growth of mind is this: a structure so clean that strangers centuries later can climb it."
      ],
      principles: ["Start from what is granted", "Prove, do not merely assert", "Clarity is a moral of thought", "Knowledge should be rebuildable"],
      view: "Human reason can share a world if it shares steps.",
      operate: "Write so a stranger can reconstruct your certainty.",
      quotes: [q("There is no royal road to geometry.", "Attributed (to Euclid, addressing a king)")],
      creations: [work("The Elements", "stands", "Axiomatic geometry in thirteen books.", "Still the ancestor of mathematical education.")],
      legacy: "Proof as a public road.",
      today: ["Software, law, and science still fail when they skip the steps."],
      related: ["archimedes", "plato"],
      accomplishments: ["Compiled geometry into the Elements, history’s master textbook", "Standardized axiomatic proof as a method", "Shaped mathematics from the Islamic Golden Age to Newton", "Made space thinkable as a shared logical object", "Enabled later revolutions by stating postulates clearly"]
    }),
    fig({
      id: "archimedes", slug: "archimedes", name: "Archimedes of Syracuse",
      epithet: "Engineer of insight",
      categories: ["scientific"],
      birthYear: -287, deathYear: -212, eraLabel: "Hellenistic Sicily",
      region: "Syracuse, Sicily", civilization: "Hellenistic",
      summary: "Mathematician and engineer who found the lever, buoyancy, and a mind that could move the world—applied thought in defense of a city and of pure number.",
      biography: [
        "Archimedes wrote on spheres, spirals, and floating bodies. The bath story may be legend; the principle is not: a body displaces its volume, and gold can be tested. He approximated pi and treated infinity with a rigor that foreshadows calculus.",
        "When Rome besieged Syracuse he designed war engines. He died in the sack, allegedly still drawing. The combination is the human pattern: play with pure form, then use it to keep people alive.",
        "He is the patron of the engineer-scientist who belongs both to the study and to the wall."
      ],
      principles: ["Give me a fulcrum and I will move it", "Nature has a measurable grain", "Theory must meet matter", "Think until the city is safer"],
      view: "Mind and machine are one craft when they serve understanding and survival.",
      operate: "Calculate. Build. Test in water, not only on wax.",
      quotes: [q("Give me a place to stand, and I shall move the Earth.", "Attributed, Pappus / later tradition")],
      creations: [work("On Floating Bodies / war engines of Syracuse", "idea", "Hydrostatics and practical mechanics.", "Buoyancy and levers remain basic physics.")],
      legacy: "The lever as a philosophy: small truth, large effect.",
      today: ["Climate and infrastructure still need Archimedean leverage, not only slogans."],
      related: ["euclid", "isaac-newton"],
      accomplishments: ["Founded hydrostatics and the law of buoyancy", "Advanced the mathematics of pi, area, and the infinite", "Designed defensive engines that delayed Rome", "Articulated the mechanical advantage of the lever", "Modeled the scientist who serves both truth and the city"]
    }),
    fig({
      id: "mencius", slug: "mencius", name: "Mencius (Mengzi)",
      epithet: "Advocate of innate human goodness",
      categories: ["philosophical", "political", "humanitarian"],
      birthYear: -372, deathYear: -289, eraLabel: "Warring States China",
      region: "Zou / itinerant courts, China", civilization: "Chinese",
      summary: "Confucian thinker who taught that humans are born with sprouts of compassion—and that a ruler who starves the people has already lost the Mandate of Heaven.",
      biography: [
        "Mengzi wandered the Warring States offering kings a bet: govern by benevolence, reduce taxes and punishments, and the people will come of their own accord. Few took it. He kept teaching anyway.",
        "His famous child-and-well example: anyone who sees a child about to fall feels alarm. That sprout, cultivated, becomes humanity (ren). Evil is drought of culture, not original rot.",
        "He also said the people are more important than the ruler. That sentence is one of the oldest human-rights claims on Earth."
      ],
      principles: ["Sprouts of compassion are innate", "Cultivate; do not crush", "The people outweigh the altar and the king", "Tyranny voids legitimacy"],
      view: "Humans tend toward goodness if institutions water rather than scorch them.",
      operate: "Ask of every policy: does it starve the sprouts?",
      quotes: [q("The people are the most important; the state is next; the ruler is least.", "Mencius 7B14 (paraphrase)")],
      creations: [work("The Mencius", "stands", "Dialogues on human nature and righteous rule.", "Core of the Confucian Four Books.")],
      legacy: "Political morality grounded in a psychology of compassion.",
      today: ["Development policy still chooses between extracting people and cultivating them."],
      related: ["confucius", "john-locke"],
      accomplishments: ["Taught innate goodness as a political psychology", "Placed the people’s welfare above the ruler’s person", "Gave Confucianism its most humane and democratic accent", "Defended reducing punishment and hunger as statecraft", "Left a classic still used to judge governments"]
    }),
    fig({
      id: "cicero", slug: "cicero", name: "Marcus Tullius Cicero",
      epithet: "Orator of the republic",
      categories: ["political", "philosophical"],
      birthYear: -106, deathYear: -43, eraLabel: "Late Roman Republic",
      region: "Rome / Arpinum, Italy", civilization: "Roman",
      summary: "Lawyer and consul who tried to save the Roman Republic with words—natural law, civic duty, and the belief that eloquence should serve liberty.",
      biography: [
        "A ‘new man’ without noble ancestors, Cicero rose through the courts, crushed Catiline’s conspiracy as consul, and spent his last years warning that one-man rule was returning.",
        "His speeches and philosophical dialogues transmitted Greek ethics into Latin: duty (De Officiis), the nature of the gods, friendship, old age. He argued there is a law above statutes, written in reason.",
        "Mark Antony had him killed. His head and hands were displayed. The republic died; the sentences did not. They educated Europe’s lawyers, priests, and revolutionaries for two thousand years."
      ],
      principles: ["Natural law above raw decree", "Speech as a civic weapon for peace", "Otium with dignity after service", "The republic is a partnership in justice"],
      view: "Humans are born for community and argument; tyranny is a failure of both.",
      operate: "Speak as if law were watching. Serve, then write.",
      quotes: [q("The welfare of the people is the highest law.", "De Legibus (salus populi suprema lex)")],
      creations: [work("Orations & De Officiis", "stands", "Latin rhetoric and moral philosophy.", "Still in legal and humanist education.")],
      legacy: "Republican conscience in a language that outlived the Forum.",
      today: ["Demagogues still hate lawyers who talk too well for the public."],
      related: ["socrates", "john-locke"],
      accomplishments: ["Defended republican legality against conspiracy and strongmen", "Translated Greek moral philosophy into Latin for Europe", "Articulated natural law as a check on statute", "Set the Western model of the citizen-orator", "Left a library that trained later republics"]
    }),
    fig({
      id: "seneca", slug: "seneca", name: "Seneca the Younger",
      epithet: "Stoic of the inner citadel",
      categories: ["philosophical", "political"],
      birthYear: -4, deathYear: 65, eraLabel: "Julio-Claudian Rome",
      region: "Rome / Córdoba origin", civilization: "Roman",
      summary: "Stoic essayist and tutor of Nero who taught that time, anger, and fortune can be governed from within—even when the palace cannot.",
      biography: [
        "Seneca wrote consolation, letters, and tragedies while serving as adviser to Nero. The contradiction is the lesson: philosophy under compromised power. He grew rich; he also wrote as if death were a daily appointment.",
        "On Anger, On the Shortness of Life, and the Moral Letters to Lucilius teach attention, mercy, and the equality of slaves as human beings—radical in a slave society, incomplete in his practice.",
        "Forced to suicide, he died as his own books prescribed. Later ages read him in monasteries and startups alike: how to stay free inside unfree rooms."
      ],
      principles: ["Time is the only real wealth", "Anger is a brief madness", "Fortune is a loan", "The mind can be a room of one’s own"],
      view: "Outer chaos does not abolish inner jurisdiction.",
      operate: "Audit your days. Spare others your rage. Rehearse loss so you can be generous.",
      quotes: [q("It is not that we have a short time to live, but that we waste a lot of it.", "On the Shortness of Life")],
      creations: [work("Moral Letters to Lucilius", "stands", "Stoic essays on time, anger, and integrity.", "Among the most read philosophical letters in history.")],
      legacy: "Inner freedom as a public health measure.",
      today: ["Attention economies make Seneca’s time-audit urgent again."],
      related: ["marcus-aurelius", "socrates"],
      accomplishments: ["Wrote the most accessible Latin Stoic handbook", "Taught mastery of anger and time as ethical skills", "Argued the humanity of the enslaved from inside Rome", "Modeled philosophy under political compromise", "Influenced Christian and modern self-examination"]
    }),
    fig({
      id: "augustine", slug: "augustine", name: "Augustine of Hippo",
      epithet: "Cartographer of the inner life",
      categories: ["spiritual", "philosophical"],
      birthYear: 354, deathYear: 430, eraLabel: "Late Roman Africa",
      region: "Thagaste / Hippo (Algeria)", civilization: "Roman African / Christian",
      summary: "Bishop whose Confessions invented a new honesty about the self, and whose City of God taught two cities—love of God and love of domination—after Rome’s sack.",
      biography: [
        "Aurelius Augustinus was a brilliant rhetorician in Carthage and Milan, restless through Manichaeism and ambition, then baptized after a garden crisis. He became bishop of Hippo as the western empire cracked.",
        "Confessions is prayer as autobiography: memory, time, desire, theft of pears, the death of a friend. No earlier book had mapped the inner weather so relentlessly. City of God answered pagans who blamed Christians for Rome’s fall: earthly peace is real, but it is not the last city.",
        "He is disputed—on grace, on coercion—and indispensable. Western psychology, just-war talk, and the idea of a restless heart all pass through him."
      ],
      principles: ["Our heart is restless until it rests in the true good", "Two loves make two cities", "Memory is the self’s vast inner hall", "Peace is the tranquility of order"],
      view: "Humans are lovers before they are reasoners; disorder of love disorders cities.",
      operate: "Tell the truth about your wanting. Build earthly peace without worshipping it.",
      quotes: [q("You have made us for yourself, and our heart is restless until it rests in you.", "Confessions I.1")],
      creations: [work("Confessions & City of God", "stands", "Foundational Christian philosophy and spiritual autobiography.", "Still read as psychology, theology, and political theory.")],
      legacy: "The interior person as a subject of history.",
      today: ["Identity cultures still need Augustine’s question: what do you actually love?"],
      related: ["plato", "thomas-aquinas"],
      accomplishments: ["Wrote Confessions, a new form of inner history", "Defended a moral vision of politics after Rome’s sack", "Shaped Western ideas of time, memory, and will", "Articulated peace as rightly ordered love", "Bridged classical philosophy and medieval Christendom"]
    }),
  ];

  if (window.HUMANITAS && window.HUMANITAS.figures) {
    window.HUMANITAS.figures = window.HUMANITAS.figures.concat(m);
  }
})();
