/**
 * Builds data-enrichment.js — detailed bios + accomplishments for all 60 figures.
 * Run: node scripts/build-enrichment.js
 */
const fs = require("fs");
const path = require("path");

/** @type {Record<string, { biography: string[], accomplishments: string[] }>} */
const E = {};

function set(slug, biography, accomplishments) {
  E[slug] = { biography, accomplishments };
}

set("hammurabi", [
  "Hammurabi rose in the early second millennium BCE as king of Babylon, then a rising power among the city-states of southern Mesopotamia. Through a long reign of roughly four decades, he combined diplomacy, fortification, and military campaigns to bring rival kingdoms under Babylonian authority, forging one of the most coherent territorial states of the Old Babylonian period.",
  "His administration invested in canals, temples, and the bureaucratic tools of empire: census-taking, provincial governors, and correspondence that still survives on clay tablets. Law and public works were not separate projects; controlling water and controlling conflict were both ways of making a multi-city landscape governable.",
  "The Code associated with his name—inscribed on a diorite stele now in the Louvre—was not the first legal collection in Mesopotamia, but it became the most famous. It presents justice as a public, written instrument: tariffs, family rules, commercial liability, and protections for the weak against the strong, framed as a divine charge to the king.",
  "Whatever the gap between ideal code and daily practice, Hammurabi’s project fixed a civilizational idea: that power should be legible, proportional, and answerable to published norms rather than pure personal whim. That idea echoes whenever modern societies insist that law be knowable and that rulers stand under it."
], [
  "Unified much of southern Mesopotamia under Babylonian rule",
  "Promulgated one of history’s earliest comprehensive written law codes",
  "Standardized legal and commercial norms across a multi-city empire",
  "Built and maintained irrigation and temple infrastructure as tools of state",
  "Framed kingship as a duty to make justice prevail for the vulnerable"
]);

set("david", [
  "In biblical tradition, David begins as a shepherd of Bethlehem, enters Saul’s court as musician and warrior, and becomes famous for defeating Goliath. Civil war, exile, and alliance politics follow before he is recognized as king—first of Judah, then of a united Israelite monarchy.",
  "As ruler he captures Jerusalem, makes it his capital, and centralizes religious and political life around the city. Military campaigns expand influence; the court gathers administrators, prophets, and scribes. Tradition also credits him with organizing sacred song and with authorship or patronage of psalms that shaped Jewish and later Christian prayer.",
  "David’s story is deliberately un-sanitized. The Bathsheba affair, Uriah’s death, family revolt under Absalom, and the prophet Nathan’s confrontation make him an archetype of power under moral judgment. Greatness, in this telling, is not sinlessness but the capacity to repent and reorient.",
  "For later ages he became the model of covenant kingship: courage, poetry, political unity, and accountability before a standard higher than victory. The messianic hope of a ‘son of David’ shows how deeply his figure entered the moral imagination of Judaism and Christianity."
], [
  "United the tribes of Israel into a lasting monarchical center",
  "Established Jerusalem as political and spiritual capital",
  "Created a template of sacred kingship accountable to covenant and prophet",
  "Left a poetic legacy of psalms that shaped Jewish and Christian worship",
  "Modeled public repentance after moral failure at the height of power"
]);

set("solomon", [
  "Solomon inherits a relatively secure kingdom from David and consolidates it through administration, diplomacy, and monumental building. Biblical narrative presents him as a king who asks for wisdom rather than long life or riches, then becomes famous for judgment, international trade, and the construction of the First Temple in Jerusalem.",
  "The Temple made Israel’s worship architectural as well as covenantal: a fixed house for the divine name, a priesthood, and a pilgrimage center. Parallel traditions of proverb literature associate his court with practical wisdom—how to govern speech, wealth, desire, and justice in a complex society.",
  "His reign also dramatizes the danger of prosperity without restraint: forced labor, foreign entanglements, and religious compromise. After his death the united monarchy fractures. The lesson is structural, not merely personal: institutions and appetite can undo each other in a generation.",
  "Solomon remains the civilizational symbol of wise building and of the need for moral vigilance when power finally has the resources to do anything it wants."
], [
  "Built the First Temple in Jerusalem as a national sacred center",
  "Consolidated the united monarchy through administration and diplomacy",
  "Became the biblical archetype of practical and judicial wisdom",
  "Expanded trade and cultural exchange across the Near East",
  "Left a cautionary model of how unrestrained prosperity can fracture a kingdom"
]);

set("laozi", [
  "Laozi—‘Old Master’—is the semi-legendary figure linked to the Daodejing, a short, dense classic of Chinese thought. Tradition places him as an older contemporary of Confucius who, disillusioned with court life, left for the west and was persuaded at the pass to write down his teaching.",
  "Whether one historical author or a school’s collective voice, the text teaches that the Dao (Way) precedes naming and forcing. Softness overcomes hardness; emptiness is useful; the sage leads by not over-governing. Wu wei is not laziness but non-forcing action aligned with how things actually unfold.",
  "In a world of competing states and ritualized ambition, Laozi’s counsel was radical: reduce desire, distrust clever manipulation, prefer the low ground. Political chapters sketch a ruler who is barely noticed because life under him is simple and free of panic.",
  "Across two millennia the Daodejing has been read as mysticism, statecraft, ecology, and psychology. It remains a permanent counterweight to cultures of compulsive control—useful wherever burnout and over-management pretend to be strength."
], [
  "Authored (or crystallized) the Daodejing, a foundational world classic",
  "Articulated wu wei as a philosophy of non-forcing action",
  "Offered a model of governance by restraint rather than coercion",
  "Elevated softness, emptiness, and simplicity as strategic virtues",
  "Created a lasting counter-tradition to compulsive control and over-naming"
]);

set("confucius", [
  "Kong Qiu, known in the West as Confucius, lived in the Spring and Autumn period of a fragmented China. He served in minor offices, taught disciples, and sought a ruler willing to implement moral governance. Political success eluded him; educational success remade a civilization.",
  "His teaching centers on ren (humaneness), li (ritual propriety as social grammar), and the rectification of names—calling things and roles truthfully so that relationships can hold. Self-cultivation is prior to ruling others: character is infrastructure.",
  "After his death, disciples preserved sayings that became the Analects. Later dynasties made Confucian learning the path to office through examinations. Family ethics, merit, and moral example became the official language of East Asian statecraft for centuries.",
  "Modern debates about technocracy versus leadership character still reenact Confucian questions: What is a good person? How does education form citizens? Can power be trusted without ritual and shame? His influence is not a museum piece; it is still an operating system."
], [
  "Founded a school of ethics that became East Asia’s moral and political spine",
  "Taught ren (humaneness) and li (ritual propriety) as civilizational grammar",
  "Elevated education and self-cultivation as prerequisites for public power",
  "Inspired the Analects and later Confucian classics that shaped imperial exams",
  "Made moral example—not mere force—the measure of legitimate rule"
]);

set("buddha", [
  "Siddhartha Gautama, later called the Buddha (‘Awakened One’), was born into a ruling family of the Ganges plain. Traditional accounts describe a sheltered youth, then a confrontation with aging, sickness, and death that drove him from palace life into renunciation and extreme asceticism.",
  "Rejecting both indulgence and self-mortification, he attained awakening under the Bodhi tree at Bodh Gaya and articulated the Four Noble Truths and the Noble Eightfold Path: a practical psychology of craving, aversion, and liberation. He taught for decades, gathering a sangha of monks, nuns, and lay followers.",
  "His method was empirical and ethical rather than purely speculative: observe the mind, reduce harm, cultivate compassion and mindfulness. The Middle Way made spiritual seriousness available without demanding hereditary priesthood or caste privilege as the price of insight.",
  "Buddhism spread across Asia and later the world, diversifying into many schools. Its core diagnosis—that grasping fuels suffering—remains one of humanity’s most portable tools for mental health, ethics, and attention in an age of engineered craving."
], [
  "Articulated the Four Noble Truths and Noble Eightfold Path",
  "Founded the Buddhist sangha as a durable community of practice",
  "Taught the Middle Way between indulgence and self-mortification",
  "Made awakening a human possibility beyond caste and birth privilege",
  "Established a global tradition of mindfulness, compassion, and non-harm"
]);

set("socrates", [
  "Socrates of Athens left no writings; we know him through Plato, Xenophon, and later tradition. He wandered the agora questioning poets, politicians, and craftsmen, exposing confident ignorance and insisting that care of the soul mattered more than reputation or wealth.",
  "His method—elenchus, or cross-examination—made dialogue a moral technology. He claimed a divine sign that checked him, and a mission from the Delphic oracle’s riddle: he was wisest only in knowing that he did not know.",
  "In 399 BCE he was tried for impiety and corrupting the youth. Refusing exile or flattery, he accepted death by hemlock, turning philosophy into a way of life sealed by integrity under pressure.",
  "Western inquiry still runs on Socratic fuel: question slogans, test definitions, prefer hard clarity to flattering lies. In an age of misinformation and performative certainty, his target has only grown larger."
], [
  "Invented the Socratic method of questioning as a path to truth",
  "Made the examined life a moral duty, not a private hobby",
  "Linked virtue with knowledge and care of the soul",
  "Modeled integrity by accepting death rather than abandoning philosophy",
  "Became the founding figure of Western philosophical self-scrutiny"
]);

set("ashoka", [
  "Ashoka Maurya ruled one of antiquity’s largest empires, stretching across much of the Indian subcontinent. Early in his reign he was a conqueror; the war against Kalinga produced mass death and deportation that his own rock edicts later described with unusual public remorse.",
  "After Kalinga he turned toward dhamma: ethical policy, religious tolerance, welfare measures, and a kind of imperial moral advertising carved on pillars and rocks across the realm. He sponsored Buddhism without making belief compulsory, and sent missions abroad.",
  "His inscriptions speak of medical care for humans and animals, road-side wells, and officials charged with the welfare of subjects. Power is measured by what it heals. The conqueror becomes a moral legislator—an almost unique self-presentation among ancient emperors.",
  "Ashoka’s example still matters for post-conflict politics: can a state admit wrong, protect plural communities, and rebrand legitimacy around care rather than pure domination? Few rulers have tried so publicly."
], [
  "Ruled and administered a vast multi-regional Mauryan empire",
  "Publicly repented the violence of the Kalinga war in his own edicts",
  "Promoted dhamma: ethical governance, welfare, and religious tolerance",
  "Raised pillars and rock inscriptions that still stand as public moral law",
  "Sponsored Buddhist missions that helped the tradition travel internationally"
]);

set("jesus", [
  "Jesus of Nazareth was a first-century Jewish teacher and healer in Roman-occupied Judea and Galilee. The Gospels portray a ministry of parables, healings, table fellowship with the marginalized, and confrontation with religious and political hypocrisy.",
  "He proclaimed the nearness of God’s kingdom and taught a radical ethics: love of neighbor and enemy, forgiveness, the last shall be first, and a standard of purity that reached intention as well as act. His challenge to status hierarchies made him dangerous to both local elites and imperial order.",
  "Tried under Roman authority, he was crucified—a death reserved for rebels and the despised. Followers soon proclaimed his resurrection and formed communities that became the Christian church, carrying his story across the Mediterranean and eventually the globe.",
  "Historically and spiritually, Jesus relocated dignity to the lowly and made enemy-love a civic technology as well as a personal command. Polarized ages still collide with that demand."
], [
  "Proclaimed an ethic of love, forgiveness, and enemy-love that reshaped morality",
  "Centered the dignity of the poor, sick, and socially excluded",
  "Inspired the Christian movement that became a world religion",
  "Taught through parables that made complex moral truths memorable",
  "Became the measure of sacrificial leadership in countless later reform movements"
]);

set("marcus-aurelius", [
  "Marcus Aurelius was Roman emperor from 161 to 180 CE and a practicing Stoic. Much of his reign was spent on the northern frontiers amid war and plague. He held ultimate power while writing private notes to himself on anger, mortality, duty, and justice.",
  "Those notes—later called the Meditations—are not a polished treatise but a working journal of self-correction. He reminds himself to act for the common good, to distinguish impressions from judgments, and to treat status and fame as transient.",
  "Stoicism in his hands is not cold detachment; it is social: what is not good for the hive is not good for the bee. Power and self-scrutiny can coexist, and must, if empire is not to become mere predation.",
  "Modern readers still use the Meditations as a manual for cognitive hygiene under pressure—especially useful in outrage cycles that reward reactive power over examined duty."
], [
  "Governed the Roman Empire through war and plague with rare self-scrutiny",
  "Wrote the Meditations, a classic of Stoic practical philosophy",
  "Modeled leadership as duty without craving applause",
  "Taught focus on what is controllable amid chaos",
  "Linked personal virtue to the health of the political community"
]);

set("hypatia", [
  "Hypatia of Alexandria (c. 355–415) was a Neoplatonist philosopher, mathematician, and astronomer who led the city’s philosophical school in late antiquity. She taught an elite of both pagans and Christians, becoming a public intellectual in a city torn by faction.",
  "Her work continued Alexandrian traditions of geometry, astronomy, and commentary. Students came for technical mastery and for a philosophical life that treated mathematical clarity as spiritual discipline.",
  "Political-religious conflict escalated around Bishop Cyril and the imperial prefect Orestes. In 415 a Christian mob murdered Hypatia—an act that shocked contemporaries and later ages as a symbol of anti-intellectual violence.",
  "She stands for the price and necessity of independent thought: schools and scholars need civic protection, or mobs and factions will decide what may be known."
], [
  "Led Alexandria’s philosophical school as a woman in late antiquity",
  "Taught mathematics, astronomy, and Neoplatonist philosophy across factional lines",
  "Sustained the Alexandrian scientific-philosophical tradition under stress",
  "Became a lasting martyr-symbol of learning against political-religious violence",
  "Modeled intellectual courage in a polarized civic space"
]);

set("muhammad", [
  "Muhammad ibn Abd Allah was born in Mecca around 570 CE into a trading society structured by tribe and polytheistic cult. Around 610 he began receiving revelations that proclaimed radical monotheism (tawḥīd), moral accountability, and care for the orphan and poor—challenging Meccan elites.",
  "Persecution led to the Hijra to Medina in 622, which founded a new ummah (community) and became year one of the Islamic calendar. As prophet and statesman he mediated tribal conflict, fought defensive and consolidating wars, and established practices of prayer, almsgiving, and law.",
  "The Qur’an, collected after his death, became Islam’s scripture; his example (sunnah) shaped law and ethics. Within a century, Islamic civilization spanned from Iberia to Central Asia—not only by conquest but by a portable package of faith, literacy, and communal institutions.",
  "His insistence that nobility is measured by righteousness rather than lineage still challenges racism and class contempt. Brotherhood beyond tribe remains one of history’s most consequential social technologies."
], [
  "Proclaimed monotheism and ethical reform that founded the Islamic faith",
  "Established the ummah through the Hijra and Medinan community-building",
  "Left the Qur’an as a scripture that shaped a world civilization",
  "Instituted practices of justice, zakāt, and care for the vulnerable",
  "United Arabia under a framework that outlasted tribal blood-feud politics"
]);

set("rumi", [
  "Jalal al-Din Rumi (1207–1273) was born in the Persianate world, likely near Balkh, and settled in Konya in Anatolia amid Mongol upheavals. Trained as a religious scholar, his life transformed through friendship with the wandering mystic Shams of Tabriz.",
  "After Shams’s disappearance, Rumi poured longing, grief, and divine love into poetry: the Masnavi, a vast spiritual teaching poem, and the Divan lyrics. He taught that the wound is where the light enters, and that ego-death opens onto the real.",
  "The Mevlevi order associated with his legacy practiced music and whirling as embodied remembrance. His verse traveled far beyond Sufi circles to become some of the world’s most read spiritual poetry.",
  "In polarized ages Rumi’s language dissolves us/them without erasing the demand for transformation—art as a technology of soft power over hardened hearts."
], [
  "Composed the Masnavi, a monumental work of spiritual teaching in verse",
  "Created a lyrical corpus on divine love that remains globally beloved",
  "Transformed personal grief into a pedagogy of awakening",
  "Inspired the Mevlevi tradition of music and embodied remembrance",
  "Gave ordinary readers a vocabulary for longing, union, and ego-softening"
]);

set("joan-of-arc", [
  "Joan of Arc (c. 1412–1431) was a peasant girl from Domrémy who claimed guidance by saints to save France during the Hundred Years’ War. Against every expectation of rank and gender, she reached the Dauphin, gained troops, and helped lift the siege of Orléans in 1429.",
  "Her campaigns contributed to Charles VII’s coronation at Reims, a turning point in French legitimacy. Captured by Burgundian allies of England, she was sold, tried for heresy and cross-dressing in a politicized ecclesiastical court, and burned at Rouen at about nineteen.",
  "A postwar nullification trial rehabilitated her name; centuries later she was canonized. Her story became national myth and feminist touchstone: conscience and vocation under institutional disbelief.",
  "Joan’s accomplishment was not only military; it was to prove that moral clarity and courage can arrive from outside the official hierarchy—and that judicial murder can later become a nation’s conscience."
], [
  "Helped lift the siege of Orléans at a decisive moment of the Hundred Years’ War",
  "Enabled Charles VII’s coronation and a turning of French political legitimacy",
  "Led troops as a teenage woman in a male military hierarchy",
  "Endured a politicized heresy trial with unwavering claims of conscience",
  "Became, after rehabilitation and canonization, a lasting symbol of vocation under fire"
]);

set("leonardo-da-vinci", [
  "Leonardo da Vinci (1452–1519) apprenticed in Florence under Verrocchio and worked in Milan, Florence, Rome, and finally France. He painted few finished masterpieces relative to his fame, but those—including the Last Supper and Mona Lisa—redefined Western art’s ambition.",
  "His true archive is the notebooks: thousands of pages on anatomy, flight, hydraulics, machines, optics, and geology. He dissected corpses, mapped vortices of water, and designed war engines and flying devices, treating observation as higher authority than inherited dogma.",
  "Leonardo refused the wall between art and science. Drawing was a way of thinking; beauty and mechanism revealed the same nature. His unfinished projects show a mind always mid-question.",
  "He remains the emblem of Renaissance curiosity as vocation—disciplined wonder without compartment walls—still the gold standard for interdisciplinary genius."
], [
  "Created enduring masterpieces including the Mona Lisa and Last Supper",
  "Filled notebooks that fused art, anatomy, engineering, and natural science",
  "Advanced observational methods in anatomy and fluid study",
  "Designed machines and concepts centuries ahead of fabrication capacity",
  "Modeled unified inquiry: art and science as one disciplined curiosity"
]);

set("frederick-douglass", [
  "Frederick Douglass (c. 1818–1895) was born into slavery on Maryland’s Eastern Shore. He learned to read in secret, understood literacy as power, and escaped north in 1838. Within years he became the abolition movement’s most formidable orator and writer.",
  "His Narrative (1845) and later autobiographies made the brutality of slavery undeniable in the first person. He edited newspapers, recruited Black soldiers for the Union, advised presidents, and after the war fought for Reconstruction rights and women’s suffrage alliances.",
  "Douglass insisted that America’s creed—liberty and equality—be used as a measuring rod against America’s practice. Moral suasion joined political power; speech was a weapon for personhood.",
  "He proved that the oppressed can become a nation’s moral teachers, and that freedom of mind is the beginning of every other freedom."
], [
  "Escaped slavery and became the leading Black orator of the abolition era",
  "Authored autobiographies that made slavery’s reality inescapable",
  "Edited abolitionist newspapers and shaped public opinion",
  "Advised Union leadership and recruited Black troops in the Civil War",
  "Fought for full citizenship, Reconstruction rights, and broader human equality"
]);

set("harriet-tubman", [
  "Harriet Tubman (c. 1822–1913) was born into slavery in Maryland, suffered a lifelong head injury from an overseer’s blow, and escaped to freedom in 1849. Freedom for herself was not enough: she returned south repeatedly as a conductor on the Underground Railroad.",
  "Guiding family and strangers along dangerous routes, she earned the name Moses. Accounts credit her with never losing a passenger. During the Civil War she served the Union as scout, spy, and nurse, including the Combahee River raid that freed hundreds.",
  "Her faith, tactical intelligence, and willingness to re-enter mortal risk made freedom a supply chain of courage rather than a one-time private escape.",
  "Tubman’s life remains the practical definition of solidarity: liberty that keeps going back for others."
], [
  "Escaped slavery and returned repeatedly to free others via the Underground Railroad",
  "Never lost a passenger on her rescue missions (by historical account)",
  "Served as Union scout, spy, and nurse during the Civil War",
  "Helped lead the Combahee River raid freeing hundreds of enslaved people",
  "Became an enduring symbol of courage as repeated practical action"
]);

set("abraham-lincoln", [
  "Abraham Lincoln (1809–1865), self-educated on the frontier, became an Illinois lawyer and politician known for moral clarity against the expansion of slavery. Elected president in 1860, he faced secession and civil war within months.",
  "He refused to accept disunion, managed a fractious coalition, and gradually moved the war’s purpose from Union alone toward emancipation. The Emancipation Proclamation (1863) and support for the Thirteenth Amendment struck legally at slavery; the Gettysburg Address redefined the nation as a government of, by, and for the people.",
  "Lincoln’s Second Inaugural called for malice toward none and charity for all—even as the war ground on. Assassinated days after Confederate surrender, he did not live to oversee Reconstruction.",
  "His greatness lies in holding democratic experiment together under maximum stress and making freedom part of the Union’s meaning."
], [
  "Preserved the United States through the Civil War",
  "Issued the Emancipation Proclamation and advanced the Thirteenth Amendment",
  "Redefined American democracy in the Gettysburg Address",
  "Modeled restrained, principled executive leadership under existential crisis",
  "Articulated postwar charity toward former enemies as a national duty"
]);

set("florence-nightingale", [
  "Florence Nightingale (1820–1910) was born to privilege in Britain but insisted on nursing as a calling when it was low-status work. During the Crimean War she led nurses to Scutari and confronted lethal hospital conditions: filth, overcrowding, and administrative chaos.",
  "Through sanitation, organization, and relentless documentation she helped cut death rates and made care a system. After the war she used statistics—including innovative polar-area diagrams—to force sanitary reform on the British army and public health policy.",
  "She founded a training school that professionalized nursing worldwide and wrote extensively on hospital design and management. Mercy, for her, was not only kindness; it was evidence and logistics.",
  "Modern nursing and data-driven public health still stand on her insistence that dignity of every patient requires disciplined infrastructure."
], [
  "Transformed Crimean War hospitals through sanitation and organization",
  "Professionalized nursing via training schools and standards",
  "Pioneered statistical visualization to drive public-health reform",
  "Reformed military and civilian hospital design and management",
  "Made care of the sick a respected, evidence-based profession"
]);

set("marie-curie", [
  "Marie Skłodowska Curie (1867–1934) left partitioned Poland for Paris because higher scientific education was closed to her at home. With Pierre Curie she investigated radioactivity—a term she coined—and isolated polonium and radium under grueling laboratory conditions.",
  "She won the 1903 Nobel Prize in Physics (shared) and the 1911 Nobel in Chemistry, becoming the first person awarded Nobels in two sciences. After Pierre’s death she continued research, taught, and built institutions for radioactive study.",
  "In World War I she equipped mobile X-ray units (‘Little Curies’) and trained operators near the front, linking pure discovery to battlefield medicine. She died of illness linked to radiation exposure in an era that did not yet understand the cost.",
  "Curie embodies science as international public good and persistence against exclusion—truth through experiment in service of healing."
], [
  "Discovered polonium and radium and coined the framework of radioactivity research",
  "Won Nobel Prizes in both Physics and Chemistry—the first dual science laureate",
  "Advanced medical applications of radiation and X-ray technology",
  "Brought mobile X-ray units to WWI fronts, saving countless wounded",
  "Opened institutional paths for women in advanced scientific research"
]);

set("mahatma-gandhi", [
  "Mohandas Karamchand Gandhi (1869–1948) trained as a lawyer in London and developed his method of satyagraha—truth-force—while fighting racial discrimination in South Africa. Returning to India, he transformed the independence movement into a mass ethical campaign.",
  "Noncooperation, salt marches, boycotts, and fasts linked personal discipline (swaraj as self-rule of the self) to national liberation. He insisted that means determine ends: violence would poison the freedom it claimed to win.",
  "Gandhi’s leadership helped make British rule politically untenable, though partition and communal bloodshed marked independence in 1947. He was assassinated in 1948 by a Hindu nationalist who rejected his pluralism and restraint.",
  "His global legacy is the portable toolkit of nonviolent resistance—used by King, Mandela’s generation of activists, and countless local movements that treat moral means as strategic, not optional."
], [
  "Developed satyagraha as a systematic method of nonviolent resistance",
  "Led mass campaigns that made Indian independence a moral and political necessity",
  "Elevated ahimsa (non-harm) from personal ethic to political strategy",
  "Modeled self-mastery (diet, simplicity, discipline) as the root of self-rule",
  "Inspired worldwide civil-rights and anti-colonial movements"
]);

set("eleanor-roosevelt", [
  "Eleanor Roosevelt (1884–1962) reinvented the role of First Lady through investigation of conditions, press conferences, and advocacy for the poor, women, and civil rights—often ahead of her husband Franklin’s political caution.",
  "After his death she became a U.S. delegate to the United Nations and chaired the commission that produced the Universal Declaration of Human Rights (1948). She built coalitions across cultures to write a shared vocabulary of dignity for the postwar world.",
  "Her famous claim that human rights begin in ‘small places, close to home’ made the UDHR more than diplomatic prose: a checklist for neighborhoods, workplaces, and schools.",
  "She remains the model of how soft power, persistence, and moral imagination can institutionalize conscience at global scale."
], [
  "Transformed the First Lady role into active social investigation and advocacy",
  "Chaired the UN work that produced the Universal Declaration of Human Rights",
  "Defended civil rights, women’s rights, and economic dignity in public life",
  "Built cross-cultural diplomatic coalitions in the early United Nations",
  "Gave the world a portable language of universal human dignity"
]);

set("martin-luther-king-jr", [
  "Martin Luther King Jr. (1929–1968) was a Baptist minister who rose to leadership during the Montgomery Bus Boycott (1955–56). He fused Christian love, the American constitutional promise, and Gandhian nonviolence into a mass movement against legal segregation.",
  "Through sit-ins, Freedom Rides support, Birmingham, the March on Washington, and Selma, he faced jails, surveillance, and violence while articulating a philosophy of the beloved community. ‘Letter from Birmingham Jail’ remains a masterwork on just and unjust law.",
  "His leadership helped secure the Civil Rights Act (1964) and Voting Rights Act (1965). Later he opposed the Vietnam War and launched the Poor People’s Campaign, linking race to economic justice. He was assassinated in Memphis in 1968.",
  "King showed that spiritual force can restructure a superpower’s laws without civil war—and that nonviolence is active, costly love, not passivity."
], [
  "Led the Montgomery Bus Boycott that cracked segregated transit",
  "Organized and inspired campaigns culminating in landmark civil-rights laws",
  "Authored ‘Letter from Birmingham Jail,’ a classic of moral and legal thought",
  "Articulated the Dream and beloved-community vision for American democracy",
  "Extended the struggle to economic justice and anti-war conscience"
]);

set("nelson-mandela", [
  "Nelson Mandela (1918–2013) trained as a lawyer and joined the African National Congress struggle against apartheid. After the Sharpeville massacre and bans on protest, he helped form an armed wing, was convicted in the Rivonia Trial, and spent 27 years in prison.",
  "Released in 1990, he negotiated with the regime to dismantle apartheid without full-scale civil war. In 1994 he became South Africa’s first democratically elected president, emphasizing reconciliation, a new constitution, and the hard choice not to mirror tyranny’s revenge.",
  "He left office after one term—modeling democratic restraint. The Truth and Reconciliation process (led in public life by figures like Tutu) complemented his politics of inclusion without total forgetting.",
  "Mandela’s greatness is dual: the courage to resist and the rarer courage to govern without becoming what he fought."
], [
  "Led anti-apartheid struggle at personal cost of 27 years’ imprisonment",
  "Negotiated a peaceful transition to majority-rule democracy",
  "Became South Africa’s first democratically elected president",
  "Championed reconciliation over revenge in nation-building",
  "Helped secure a democratic constitution and left power voluntarily"
]);

set("mother-teresa", [
  "Agnes Gonxha Bojaxhiu, known as Mother Teresa (1910–1997), was born in Skopje and joined a teaching order in India. In 1946 she experienced a call to leave the convent school for the streets of Kolkata, founding the Missionaries of Charity to serve the poorest of the poor.",
  "Her homes for the dying, orphanages, and leprosy work made visible those modern cities discard. The order expanded globally. She received the Nobel Peace Prize in 1979 and became a controversial saint-figure: admired for presence among the abandoned, debated over medical standards and theology of suffering.",
  "Whatever the debates, she forced prosperity to look at what it throws away and insisted that love is measured by proximity to the unwanted.",
  "Her accomplishment is institutional mercy: an order that still operates where dignity is scarcest."
], [
  "Founded the Missionaries of Charity to serve the destitute and dying",
  "Built homes, clinics, and orphanages across Kolkata and then the world",
  "Made the abandoned visible to global conscience",
  "Received the Nobel Peace Prize for work among the poorest",
  "Created a durable religious order dedicated to radical proximity to suffering"
]);

set("wangari-maathai", [
  "Wangari Maathai (1940–2011) was a Kenyan biologist, the first woman in East and Central Africa to earn a PhD, and founder of the Green Belt Movement. She linked deforestation, soil loss, and poverty to political disempowerment—especially of rural women.",
  "By organizing women to plant trees, she restored landscapes and livelihoods while building civic capacity. She faced harassment and violence from authoritarian politics, yet persisted in environmental and pro-democracy activism.",
  "In 2004 she became the first African woman to win the Nobel Peace Prize, recognized for connecting ecology, peace, and human rights. Planting a tree became a political act.",
  "Her model—ecological restoration as democratic practice—remains urgently relevant under climate stress."
], [
  "Founded the Green Belt Movement, planting tens of millions of trees",
  "Linked environmental restoration to women’s empowerment and democracy",
  "Became the first African woman to receive the Nobel Peace Prize",
  "Advanced scientific and civic leadership as Kenya’s pioneering woman PhD",
  "Showed that ecological care is national security and human rights work"
]);

set("desmond-tutu", [
  "Desmond Tutu (1931–2021) was an Anglican archbishop who became the moral voice of the anti-apartheid church. Through humor, courage, and theology of ubuntu—humanity through other people—he denounced racial tyranny without surrendering to hatred.",
  "He led the South African Council of Churches’ resistance, won the Nobel Peace Prize in 1984, and after apartheid chaired the Truth and Reconciliation Commission, inventing a public ritual for truth-telling short of pure retribution.",
  "Tutu continued to critique corruption and injustice after liberation, refusing to treat any government as beyond prophetic challenge. His laugh and his anger both served dignity.",
  "He taught the world that reconciliation without truth is amnesia, and truth without a path to coexistence is endless war."
], [
  "Became the leading church voice against apartheid",
  "Received the Nobel Peace Prize for nonviolent moral resistance",
  "Chaired South Africa’s Truth and Reconciliation Commission",
  "Popularized ubuntu as ethical and political wisdom",
  "Modeled prophetic critique of power even after liberation"
]);

set("malala-yousafzai", [
  "Malala Yousafzai (b. 1997) grew up in Pakistan’s Swat Valley advocating for girls’ education as the Taliban restricted freedoms. Blogging and speaking as a teenager made her a target; in 2012 she was shot on a school bus and survived.",
  "Recovery became a global platform. With her father and allies she built the Malala Fund, addressed the UN, and co-authored I Am Malala. In 2014 she became the youngest Nobel Peace Prize laureate.",
  "Her message is stubbornly practical: education is not charity for girls; it is the infrastructure of free societies. She continues advocacy for students under conflict and displacement.",
  "Malala proves that a single student’s courage can reframe a global agenda—and that the classroom is a front line of human rights."
], [
  "Advocated for girls’ education under Taliban restriction in Swat",
  "Survived assassination attempt and turned recovery into global advocacy",
  "Became the youngest Nobel Peace Prize laureate",
  "Co-founded the Malala Fund to support education worldwide",
  "Made ‘books not bullets’ a generation’s rallying moral claim"
]);

set("cyrus-the-great", [
  "Cyrus II of Persia (d. 530 BCE) founded the Achaemenid Empire, uniting Medes and Persians and conquering Lydia and Babylon. His realm became a multi-ethnic superstate stitched by roads, satraps, and a pragmatic policy of local customs under imperial oversight.",
  "The Cyrus Cylinder and biblical tradition portray him as a liberator who allowed exiled peoples—including Judeans—to return and rebuild temples. Whether read as propaganda or policy, the model of imperial tolerance was real enough to matter.",
  "He died on campaign, but the structure he built outlasted him and shaped Near Eastern statecraft for centuries. Respect for plural cults became a tool of stability.",
  "Cyrus remains a symbol of power that expands by inclusion rather than cultural annihilation."
], [
  "Founded the Achaemenid Persian Empire, antiquity’s first true superstate",
  "Conquered Babylon and reorganized the Near East under Persian rule",
  "Practiced a policy of relative religious and cultural tolerance",
  "Enabled the return of exiled communities, including Judeans to Jerusalem",
  "Created administrative models (satrapies, roads) copied by later empires"
]);

set("moses", [
  "Moses, central figure of the Torah/Hebrew Bible, is portrayed as liberator, lawgiver, and prophet. Tradition places him leading the Israelites out of Egyptian bondage through the Exodus—a story of emancipation that has inspired freedom movements for millennia.",
  "At Sinai he receives the covenant and commandments that bind a people not only by blood but by law and story. The wilderness wandering becomes a school of dependence, justice, and identity formation.",
  "As leader he mediates between divine demand and a resistant community, models intercession, and dies within sight of the promised land without entering it—an image of leadership that serves a future it will not possess.",
  "Historically debated in details, Moses’s cultural accomplishment is unmatched: a portable law-and-liberation narrative that still structures ethics, politics, and hope."
], [
  "Led the Exodus narrative of liberation from bondage",
  "Mediated the Sinai covenant and Ten Commandments tradition",
  "Founded Israel’s identity as a people under law, not only kinship",
  "Modeled prophetic leadership that confronts both empire and the people",
  "Gave later freedom movements their deepest archetypal story"
]);

set("plato", [
  "Plato (c. 427–347 BCE), student of Socrates and teacher of Aristotle, founded the Academy in Athens—often called the first enduring institution of higher learning in the West. His dialogues explore justice, knowledge, love, politics, and the soul.",
  "In the Republic he sketches a city ordered by wisdom and a theory of Forms that made reality more than appearance. Allegories like the Cave still name the human tendency to mistake shadows for truth.",
  "Plato preserved Socrates’s voice while building a metaphysical and political system that later shaped Christianity, Islam, and secular philosophy alike. Education, for him, was turning the soul around.",
  "Every debate about ideal justice, philosopher-rulers, or the nature of knowledge still walks through his door."
], [
  "Founded the Academy, a prototype of Western higher education",
  "Wrote dialogues that defined the agenda of Western philosophy",
  "Developed the theory of Forms and the allegory of the Cave",
  "Preserved and transformed the Socratic inheritance",
  "Shaped political thought on justice, education, and the ideal city"
]);

set("aristotle", [
  "Aristotle (384–322 BCE) studied under Plato, tutored Alexander the Great, and founded the Lyceum. He built encyclopedic systems of logic, biology, ethics, politics, rhetoric, and metaphysics grounded in observation and classification.",
  "Where Plato emphasized transcendent Forms, Aristotle analyzed substances, causes, and the actualization of potentials in nature. His ethics centers the golden mean and eudaimonia—human flourishing through virtue and practical wisdom.",
  "His logic (the Organon) trained minds for two millennia; his politics treated humans as political animals who need well-designed constitutions. Even when later science overturned specifics, his method of systematic inquiry endured.",
  "Aristotle’s accomplishment is the toolkit: categories, arguments, and the confidence that the world can be known by patient attention."
], [
  "Founded formal logic as a systematic discipline",
  "Built foundational works in ethics, politics, biology, and metaphysics",
  "Tutored Alexander and founded the Lyceum research community",
  "Established virtue ethics and the ideal of practical wisdom (phronesis)",
  "Set the template for encyclopedic scientific and philosophical inquiry"
]);

set("alexander-the-great", [
  "Alexander III of Macedon (356–323 BCE) inherited a professional army from Philip II and, before age thirty-three, toppled the Persian Empire and campaigned to the Indus. His conquests stitched Greece, Egypt, and Asia into a new political geography.",
  "He founded cities (notably Alexandria), encouraged cultural fusion, and spread Greek language and institutions—the Hellenistic world in which science, philosophy, and trade later flourished. Brutality and vision traveled together.",
  "Dying young in Babylon without a stable succession, he left an empire that fragmented among generals yet culturally endured. The idea of a connected oikoumene—a inhabited world of exchange—owes much to his rupture of old borders.",
  "Alexander remains the archetype of strategic audacity and the question of whether conquest can serve civilization or only appetite."
], [
  "Conquered the Persian Empire and reshaped Eurasian political maps",
  "Founded cities that became hubs of Hellenistic culture and learning",
  "Spread Greek language and institutions across a vast territory",
  "Enabled the cultural fusion of the Hellenistic age",
  "Set a lasting model of lightning strategic campaigning"
]);

set("augustus", [
  "Born Octavian, Augustus (63 BCE–14 CE) emerged from Rome’s civil wars as sole master after defeating Antony and Cleopatra. He kept republican forms while building the Principate—the imperial system that stabilized Rome for centuries.",
  "His reign reorganized the army, finances, provinces, and city of Rome; he claimed to restore the republic while monopolizing real power. The Pax Romana began under his careful propaganda and administrative genius.",
  "Patron of arts (the age of Virgil and Horace), he linked cultural prestige to political order. Succession arrangements tried to make empire heritable without admitting monarchy by name.",
  "Augustus’s accomplishment is institutional: turning chaos into a durable imperial peace, for better and for worse for subject peoples."
], [
  "Ended Rome’s civil wars and founded the imperial Principate",
  "Created administrative systems that sustained the Roman Empire",
  "Inaugurated the Pax Romana era of relative Mediterranean stability",
  "Rebuilt Rome’s urban and religious infrastructure",
  "Patronized a cultural golden age that defined Latin literature"
]);

set("qin-shi-huang", [
  "Ying Zheng, Qin Shi Huang (259–210 BCE), conquered rival Warring States and proclaimed himself First Emperor of a unified China. Standardization of script, weights, measures, and axle widths made a single economic-administrative space possible.",
  "He expanded roads and defensive walls (ancestors of the Great Wall tradition), suppressed dissent harshly, and built the monumental mausoleum guarded by the Terracotta Army. Legalist rigor and absolute sovereignty were the tools of unity.",
  "The Qin dynasty fell soon after his death, but the imperial template—unified China under a centralized bureaucracy—outlasted the house of Qin for two millennia.",
  "His greatness is structural: forcing plurality into a state form that later dynasties inherited, reformed, and humanized."
], [
  "Unified China after the Warring States period",
  "Standardized script, measures, and infrastructure across the empire",
  "Built roads and early Great Wall fortification systems",
  "Created the imperial bureaucratic template for later dynasties",
  "Left the Terracotta Army and mausoleum complex as world heritage"
]);

set("ibn-sina", [
  "Ibn Sina (Avicenna, 980–1037) was a Persian polymath of the Islamic Golden Age—physician, philosopher, and scientist. His Canon of Medicine synthesized Greek and Islamic medical knowledge into a standard textbook used in Eurasia for centuries.",
  "Philosophically he advanced Aristotelian and Neoplatonic thought on the soul, existence, and intellect, influencing both Islamic and later Latin scholasticism. He wrote while serving courts and often under political instability.",
  "His method combined empirical clinical observation with systematic theory. Hospitals and medical education from Baghdad to Europe felt his taxonomy of disease and treatment.",
  "Ibn Sina stands for the cosmopolitan intellect: science and philosophy as a shared human inheritance across languages and faiths."
], [
  "Authored the Canon of Medicine, a millennial medical standard",
  "Advanced philosophy of being, soul, and intellect in the Islamic tradition",
  "Synthesized Greek and Islamic scientific learning at the highest level",
  "Influenced European scholasticism and medical teaching for centuries",
  "Modeled the physician-philosopher as a single vocation of care and reason"
]);

set("al-khwarizmi", [
  "Muḥammad ibn Mūsā al-Khwārizmī (c. 780–850) worked in Baghdad’s House of Wisdom. His treatises on algebra (al-jabr) and Hindu-Arabic numerals transmitted computational methods that remade mathematics in the Islamic world and later in Europe.",
  "The word algorithm derives from his Latinized name; algebra from his book’s title. He also contributed to astronomy and geography, including a revision of Ptolemaic maps.",
  "By treating equations as a teachable public craft, he helped move calculation from specialist mystery toward systematic method—infrastructure for science, commerce, and later computing.",
  "Every modern algorithm quietly carries his name and the Baghdad project of translating and extending knowledge."
], [
  "Founded algebra as a systematic mathematical discipline",
  "Transmitted and formalized Hindu-Arabic numerals and calculation methods",
  "Gave his name to the concept of the algorithm",
  "Advanced astronomy and geographic measurement in the Abbasid age",
  "Built mathematical tools that became global scientific infrastructure"
]);

set("johannes-gutenberg", [
  "Johannes Gutenberg (c. 1400–1468) of Mainz developed movable-type printing with metal type, oil-based ink, and a press adapted from existing technology—an integrated system more than a single gadget.",
  "His Bible and the rapid spread of print shops across Europe detonated an information revolution: cheaper books, vernacular literacy, scientific correspondence, and religious controversy at scale. The Reformation and the Scientific Revolution rode print’s rails.",
  "Gutenberg himself faced lawsuits and financial trouble; the invention outran the inventor’s fortune. Yet the press became the machine that multiplied minds.",
  "His accomplishment is the industrialization of writing—and with it, modern public opinion."
], [
  "Invented practical movable-type printing in Europe",
  "Produced the Gutenberg Bible, a landmark of craft and communication",
  "Triggered an explosion of literacy and book culture",
  "Enabled the Reformation and scientific exchange at unprecedented speed",
  "Created the technical basis of the modern information world"
]);

set("martin-luther", [
  "Martin Luther (1483–1546), Augustinian monk and theology professor at Wittenberg, protested indulgences and published the Ninety-Five Theses in 1517—an act that helped ignite the Protestant Reformation.",
  "He translated the Bible into forceful German, taught justification by faith, and defied imperial and papal pressure at Worms: conscience bound by scripture. Print amplified his voice across Europe.",
  "Luther’s reforms reshaped church, state, education, and language, while his later polemics—including harsh writings against peasants and Jews—leave a morally mixed legacy that must be taught honestly.",
  "His core accomplishment remains the reopening of scripture and conscience as contested public goods, not only clerical property."
], [
  "Sparked the Protestant Reformation with the Ninety-Five Theses",
  "Translated the Bible into German, shaping language and lay literacy",
  "Articulated justification by faith as a reforming doctrine",
  "Defended conscience under political and religious threat at Worms",
  "Used the printing press to create a new mass religious public"
]);

set("nicolaus-copernicus", [
  "Nicolaus Copernicus (1473–1543), Polish astronomer and canon, developed a heliocentric model that placed the Sun near the center of planetary motions. His De revolutionibus was published as he lay dying.",
  "Building on earlier data and geometric ingenuity, he challenged the Earth-centered cosmos of Ptolemy without yet having a full physics of motion. The book’s slow fuse lit Galileo, Kepler, and Newton.",
  "Copernicus worked carefully within church structures even as his idea unsettled them. The scientific revolution’s first great decentering of humanity’s cosmic privilege bears his name.",
  "His accomplishment is intellectual courage through mathematics: let the model fit the heavens, even if it wounds common sense."
], [
  "Formulated the modern heliocentric model of the solar system",
  "Authored De revolutionibus, a foundational scientific classic",
  "Initiated the Copernican Revolution in astronomy and worldview",
  "Improved planetary mathematics that later enabled Kepler’s laws",
  "Decentered Earth in a way that remade science and philosophy"
]);

set("galileo", [
  "Galileo Galilei (1564–1642) turned the telescope on the sky and saw moons of Jupiter, phases of Venus, and a rugged Moon—evidence that cracked Aristotelian heavens. He advanced kinematics of falling bodies and the ideal of mathematical physics.",
  "His advocacy of Copernicanism collided with church authority; trial and house arrest made him a symbol of science under power. Dialogue and Discourse taught a new public to think mechanically about nature.",
  "Galileo’s method—instrument, experiment, geometry—became the house style of modern science. He wrote in Italian as well as Latin to reach beyond specialists.",
  "He remains the emblem of seeing for oneself and paying the cost when institutions fear what is seen."
], [
  "Pioneered telescopic astronomy and discovered Jupiter’s moons",
  "Provided decisive evidence for the Copernican framework",
  "Founded key principles of classical kinematics and scientific method",
  "Wrote public scientific arguments that reshaped educated Europe",
  "Became the enduring symbol of free inquiry under institutional pressure"
]);

set("william-shakespeare", [
  "William Shakespeare (1564–1616) of Stratford-upon-Avon became the leading dramatist of the London stage, writing comedies, histories, and tragedies that mapped ambition, love, jealousy, power, and mercy with unmatched linguistic energy.",
  "Hamlet, Lear, Macbeth, Othello, the sonnets, and the rest created characters who feel more real than many historical persons. He expanded English expressive range and made theater a place of national self-reflection.",
  "Working within a commercial playhouse system, he proved popular art could carry philosophical depth. Four centuries of performance have only multiplied his meanings.",
  "His accomplishment is a portable human encyclopedia in dramatic form—still the world’s most staged playwright."
], [
  "Wrote a dramatic canon that defines English-language literature",
  "Created characters and phrases that entered global cultural memory",
  "Elevated popular theater to profound psychological and political art",
  "Expanded the expressive power of the English language",
  "Built a body of work continuously performed and reinterpreted worldwide"
]);

set("isaac-newton", [
  "Isaac Newton (1643–1727) formulated the laws of motion and universal gravitation, invented calculus (in priority dispute with Leibniz), and transformed optics with experiments on light and color. The Principia (1687) set the gold standard of mathematical physics.",
  "He explained Kepler’s planetary laws with a single inverse-square force and terrestrial falling with the same principle—unifying heaven and earth. At the Mint and in later years he also pursued alchemy and biblical chronology, a reminder that genius is not only modern.",
  "Newtonian mechanics powered engineering and astronomy until relativity and quantum theory limited its domain—without erasing its daily utility.",
  "His accomplishment is the classical universe as a knowable machine of law."
], [
  "Formulated the three laws of motion and universal gravitation",
  "Co-invented calculus as a mathematical language of change",
  "Transformed optics through experimental study of light and color",
  "Authored the Principia, founding classical mathematical physics",
  "Unified celestial and terrestrial mechanics under one framework"
]);

set("john-locke", [
  "John Locke (1632–1704) was an English physician-philosopher whose Two Treatises of Government and Essay Concerning Human Understanding shaped liberalism, empiricism, and educational thought. He argued that legitimate government rests on consent and that natural rights to life, liberty, and property constrain rulers.",
  "His theory of mind as a blank slate filled by experience challenged innate ideas and influenced psychology and pedagogy. Religious toleration—imperfect by modern standards—was advanced as civil peace.",
  "Locke’s ideas traveled into the American and French revolutionary languages of rights and limited government. Property and consent remain contested; his framework still structures the argument.",
  "He made philosophy operational for constitutions."
], [
  "Articulated natural rights and government by consent",
  "Authored foundational texts of political liberalism",
  "Developed empiricist theory of knowledge and education",
  "Advanced arguments for religious toleration in civil society",
  "Directly influenced modern constitutional democracies"
]);

set("adam-smith", [
  "Adam Smith (1723–1790), Scottish moral philosopher, wrote The Theory of Moral Sentiments and The Wealth of Nations. He analyzed markets, division of labor, and the wealth of nations while insisting that sympathy and justice are part of human nature—not only self-interest.",
  "The ‘invisible hand’ metaphor captured how private aims can yield public coordination under the right rules—often misread as pure greed worship. He criticized monopoly, mercantilism, and the moral risks of commercial society.",
  "Smith became the founding figure of modern economics and a touchstone for debates on free trade, regulation, and inequality. Read whole, he is as much ethicist as market theorist.",
  "His accomplishment is a science of prosperity that still must answer his moral questions."
], [
  "Founded modern economics with The Wealth of Nations",
  "Analyzed division of labor as an engine of productivity",
  "Integrated moral philosophy with market analysis",
  "Critiqued mercantilism and monopoly privilege",
  "Shaped global debates on trade, growth, and economic policy"
]);

set("george-washington", [
  "George Washington (1732–1799) commanded the Continental Army through the American Revolution, holding a fragile coalition together across years of defeat and scarcity until French alliance and Yorktown secured independence.",
  "As first U.S. president he set precedents: civilian control, cabinet government, two-term restraint, and a Farewell Address warning against factions and entangling permanent alliances. He refused kingship when some wanted it.",
  "A slaveholder who freed his slaves in his will, he embodies both the founding’s achievement and its contradictions. Leadership by character and exit from power were his rarest gifts.",
  "His accomplishment is republican self-limitation at the birth of a superpower."
], [
  "Led the Continental Army to victory in the American Revolution",
  "Presided over the Constitutional Convention’s authority and spirit",
  "Served as first President and set enduring executive precedents",
  "Voluntarily relinquished power, modeling democratic restraint",
  "Symbolized national unity across regional factions at founding"
]);

set("simon-bolivar", [
  "Simón Bolívar (1783–1830), the Liberator, led independence wars that ended Spanish rule across much of northern South America—including territories of modern Venezuela, Colombia, Ecuador, Peru, and Bolivia (named for him).",
  "Educated in Enlightenment ideas, he combined military campaigning with constitutional experiments, struggling to balance unity and regional autonomy. Gran Colombia’s eventual fracture tempered his dream of continental federation.",
  "Bolívar’s letters and decrees wrestle with the difficulty of founding free republics amid inequality and militarization. He died politically disappointed but historically immense.",
  "His accomplishment is continental-scale emancipation from colonial rule—and a permanent debate on how to make liberation last."
], [
  "Led wars of independence that liberated much of northern South America",
  "Helped found multiple republics free of Spanish colonial rule",
  "Articulated a vision of continental unity and republican government",
  "Became the central symbol of Latin American liberation",
  "Left constitutional and military models still studied across the region"
]);

set("charles-darwin", [
  "Charles Darwin (1809–1882) sailed on the Beagle as a young naturalist, collecting observations that later fed his theory of evolution by natural selection. On the Origin of Species (1859) proposed a mechanism for the diversity of life without constant special creation of each form.",
  "Decades of evidence—from barnacles to pigeons to biogeography—backed a patient, careful argument. Descent of Man extended evolutionary thinking to humans, unsettling religious and racial hierarchies (even as Victorian biases marked some of his language).",
  "Evolutionary biology, genetics, and medicine still run on Darwinian frameworks refined by later science. He changed humanity’s story of itself.",
  "His accomplishment is a unifying scientific idea of life’s history."
], [
  "Formulated the theory of evolution by natural selection",
  "Authored On the Origin of Species, transforming biology",
  "Provided a scientific framework for the diversity and kinship of life",
  "Extended evolutionary thought to human origins and behavior",
  "Founded the research program of modern evolutionary biology"
]);

set("louis-pasteur", [
  "Louis Pasteur (1822–1895) was a French chemist and microbiologist who proved that microorganisms cause fermentation and disease, defeating spontaneous generation with elegant experiments. He developed pasteurization to protect food and drink.",
  "Vaccines for anthrax, fowl cholera, and rabies turned laboratory insight into public salvation. He founded an institute that became a global model for biomedical research.",
  "Pasteur’s work made germ theory operational for industry, medicine, and cities. Countless lives were saved by methods that now seem ordinary: heat treatment, sterile procedure, immunization.",
  "His accomplishment is making the invisible microbial world governable for human health."
], [
  "Established germ theory through decisive experiments",
  "Invented pasteurization to protect the food supply",
  "Developed vaccines including the rabies vaccine",
  "Founded institutional models for biomedical research",
  "Saved countless lives by linking lab science to public health practice"
]);

set("karl-marx", [
  "Karl Marx (1818–1883), German philosopher and economist, co-authored the Communist Manifesto (1848) with Engels and spent decades on Capital, a critique of political economy analyzing capitalism’s dynamics, exploitation, and crises.",
  "He argued that class struggle drives historical change and that capitalism’s productivity coexists with alienation and inequality. His ideas inspired labor movements, revolutions, and states—some liberatory, some catastrophically authoritarian.",
  "Honest assessment separates analytic tools (class, ideology, commodity fetishism) from the crimes of regimes that claimed his name. Few thinkers have so altered politics and social science.",
  "His accomplishment is a language for diagnosing power in the economy that the world still cannot ignore."
], [
  "Co-authored the Communist Manifesto, a world-changing political text",
  "Wrote Capital, a foundational critique of political economy",
  "Developed analytic tools of class, ideology, and historical materialism",
  "Inspired global labor movements and social-democratic reforms",
  "Permanently shaped how societies debate inequality and capitalism"
]);

set("susan-b-anthony", [
  "Susan B. Anthony (1820–1906) was a Quaker-raised organizer who devoted her life to women’s suffrage and equality in the United States. With Elizabeth Cady Stanton and others she built organizations, newspapers, and petition campaigns when women could not vote.",
  "She was arrested for voting in 1872, using the trial as a platform. Decade after decade she lectured, lobbied, and refused to accept ‘not yet’ as final. The Nineteenth Amendment passed fourteen years after her death.",
  "Anthony linked abolition and women’s rights early, though the post–Civil War movement fractured over priorities—a complexity history must hold. Her stubborn professionalism made suffrage a serious national cause.",
  "Her accomplishment is the long march that put women’s ballots into the Constitution’s trajectory."
], [
  "Built the organizational backbone of the U.S. women’s suffrage movement",
  "Defied law by voting in 1872 to publicize women’s political exclusion",
  "Co-founded key suffrage associations and publications",
  "Lectured nationwide for decades to normalize women’s political equality",
  "Laid groundwork for the Nineteenth Amendment’s eventual victory"
]);

set("thomas-edison", [
  "Thomas Edison (1847–1931) was an American inventor-entrepreneur who built industrial research at Menlo Park and West Orange. The phonograph, practical incandescent lighting systems, and motion-picture technology were among hundreds of patents.",
  "More than gadgets, he invented the invention lab: teams, iterative testing, and commercialization. Electric power systems remade cities, nights, and factories.",
  "His reputation includes hard business tactics and disputes (notably with Tesla/Westinghouse over current systems). The lightbulb myth simplifies a networked achievement of materials, vacuum, dynamos, and distribution.",
  "His accomplishment is the electrified modern environment and the R&D laboratory as an institution."
], [
  "Developed practical electric lighting and power distribution systems",
  "Invented the phonograph and advanced motion-picture technology",
  "Founded the industrial research laboratory model",
  "Held over a thousand patents spanning communications and power",
  "Helped create the infrastructure of the electrified modern city"
]);

set("albert-einstein", [
  "Albert Einstein (1879–1955) transformed physics with special and general relativity, explaining the photoelectric effect (Nobel 1921) in ways that supported quantum theory even as he later debated its completeness. E=mc² entered culture as the emblem of scientific power.",
  "A German-born Jew, he fled Nazism, settled in the U.S., warned of nuclear weapons, and became a public voice for pacifism, civil rights, and internationalism—imperfectly navigating the atomic age he helped make possible.",
  "General relativity’s curved spacetime predicted phenomena from Mercury’s orbit to black holes and gravitational waves later observed. Cosmology still speaks his equations.",
  "His accomplishment is a new architecture of space, time, gravity, and energy—and the model of the scientist as global citizen."
], [
  "Created special and general relativity, remaking physics",
  "Explained the photoelectric effect, aiding quantum theory’s rise",
  "Became the global symbol of scientific genius and moral conscience",
  "Predicted phenomena confirmed from eclipses to gravitational waves",
  "Advocated internationalism and civil rights as a public intellectual"
]);

set("winston-churchill", [
  "Winston Churchill (1874–1965) led Britain as prime minister through the existential crisis of 1940–45, when Nazi Germany seemed poised to dominate Europe. His speeches and refusal to negotiate a humiliating peace stiffened national and Allied resolve.",
  "A complex career included the disaster of Gallipoli, imperial attitudes, and controversial domestic policies; honesty requires the shadows beside the finest hour. Yet in 1940 his leadership mattered decisively.",
  "He helped forge the Grand Alliance, managed wartime strategy with Roosevelt and later Stalin, and coined phrases that framed the early Cold War. Awarded the Nobel Prize in Literature for historical and oratorical writings.",
  "His accomplishment is political and rhetorical: holding a free society’s nerve at the brink."
], [
  "Led Britain through the critical years of World War II",
  "Used oratory to sustain public resolve against Nazi domination",
  "Helped build the Allied coalition that won the war in Europe",
  "Authored major historical works and won the Nobel Prize in Literature",
  "Framed early Cold War strategy and the idea of the ‘Iron Curtain’"
]);

set("franklin-d-roosevelt", [
  "Franklin D. Roosevelt (1882–1945) was elected U.S. president four times, guiding the nation through the Great Depression and most of World War II. The New Deal built social security, financial regulation, public works, and a new expectation of government responsibility in economic crisis.",
  "Polio left him paralyzed in the legs; he led from a wheelchair in an age that hid disability, modeling resilience. In war he became arsenal and strategist of democracy, dying on the eve of victory in 1945.",
  "Critics contest the New Deal’s economics and the internment of Japanese Americans as a grave injustice under his watch. His coalition transformed American politics for generations.",
  "His accomplishment is dual: domestic reinvention under collapse and global leadership in the fight against fascism."
], [
  "Created the New Deal framework of modern American social and economic policy",
  "Led the United States through the Great Depression’s worst years",
  "Commanded the U.S. role in World War II as Allied leader",
  "Established Social Security and financial regulatory institutions",
  "Redefined the presidency as active guardian of economic security"
]);

set("alan-turing", [
  "Alan Turing (1912–1954) was a British mathematician who formalized computation with the Turing machine—the conceptual core of computer science. During WWII he was central to breaking Enigma at Bletchley Park, shortening the war and saving lives.",
  "He proposed the Turing Test for machine intelligence and worked on early computing and morphogenesis. Prosecuted for homosexuality, he suffered chemical castration and died in 1954; the state later apologized and pardoned him.",
  "Every smartphone and server is a descendant of his abstraction. His life also indicts the cruelty of the society he helped save.",
  "His accomplishment is the theoretical and practical founding of the digital age."
], [
  "Founded theoretical computer science with the Turing machine concept",
  "Played a central role in breaking Nazi Enigma codes in WWII",
  "Pioneered artificial intelligence questions via the Turing Test",
  "Contributed to early electronic computing design and morphogenesis math",
  "Became a symbol of LGBTQ injustice and posthumous recognition"
]);

set("rosa-parks", [
  "Rosa Parks (1913–2005) was a seasoned NAACP activist in Montgomery, Alabama—not merely a tired seamstress—when she refused to give up her bus seat to a white passenger on December 1, 1955. Her arrest sparked the Montgomery Bus Boycott.",
  "For 381 days the Black community organized carpools and walked, proving economic and moral power. The boycott brought King to national leadership and ended bus segregation by court order.",
  "Parks continued civil-rights work for decades, often under financial hardship. Her quiet firmness became a global icon of dignified resistance.",
  "Her accomplishment is the spark that made a movement unstoppable—and the long discipline behind a single ‘no.’"
], [
  "Sparked the Montgomery Bus Boycott by refusing unjust segregation",
  "Helped catalyze the modern Civil Rights Movement’s mass phase",
  "Modeled disciplined, dignified nonviolent resistance",
  "Served long-term as NAACP activist and community organizer",
  "Became a worldwide symbol of everyday courage against racist law"
]);

set("jonas-salk", [
  "Jonas Salk (1914–1995) developed the first effective inactivated polio vaccine, announced in 1955 after the largest clinical trial of its kind. Polio had terrified parents with paralysis and iron lungs; vaccination campaigns drove cases toward eradication in much of the world.",
  "Salk famously did not patent the vaccine, saying the equivalent of ‘Could you patent the sun?’ He later founded the Salk Institute for biological research.",
  "Scientific credit is always collective—teams, funders, rival approaches like Sabin’s oral vaccine matter—but Salk’s name rightly marks a turning point in public health.",
  "His accomplishment is children walking who would have been paralyzed."
], [
  "Developed the first widely used effective polio vaccine",
  "Led historic clinical trials that proved vaccine safety and efficacy",
  "Refused to patent the vaccine for private profit",
  "Helped drive polio toward elimination in much of the world",
  "Founded a major institute for fundamental biological research"
]);

set("rachel-carson", [
  "Rachel Carson (1907–1964) was a marine biologist and writer whose Silent Spring (1962) documented how indiscriminate pesticides—especially DDT—poison ecosystems and enter human bodies. Clear prose made ecological science a public alarm.",
  "Industry attacked her; cancer claimed her life soon after. Yet her book helped launch the modern environmental movement, contributed to the U.S. EPA’s creation, and led to policy bans and restrictions on dangerous chemicals.",
  "Carson taught that humans are not outside nature’s web. Precaution and humility became civic duties.",
  "Her accomplishment is a planet that began to listen when the birds went quiet."
], [
  "Authored Silent Spring, founding text of modern environmentalism",
  "Exposed the ecological and human costs of indiscriminate pesticides",
  "Catalyzed policy change including DDT restrictions and environmental law",
  "Helped inspire the creation of environmental protection institutions",
  "Made ecological interdependence a public moral concern"
]);

set("tim-berners-lee", [
  "Tim Berners-Lee (b. 1955) invented the World Wide Web at CERN in 1989–91: HTTP, HTML, URLs, and the first browser-server system so scientists could share documents across networks. Crucially, he and CERN released the web as open technology rather than a proprietary silo.",
  "He founded the World Wide Web Consortium (W3C) to keep standards open and has advocated for net neutrality, data rights, and a web that serves humanity rather than only platforms.",
  "The web’s later problems—surveillance, monopoly, misinformation—do not erase the gift of a universal linked information space. Few individuals have so scaled human communication.",
  "His accomplishment is the shared canvas on which modern knowledge and culture now paint."
], [
  "Invented the World Wide Web (HTTP, HTML, URLs, first browser/server)",
  "Released the web as open, non-proprietary technology",
  "Founded the W3C to steward open web standards",
  "Enabled the global information and commerce ecosystem of the modern era",
  "Advocates ongoing for a human-centered, open internet"
]);

// Write data-enrichment.js
const out = `/* Auto-generated detailed biographies + accomplishments. Run scripts/build-enrichment.js to regenerate. */
(() => {
  const ENRICH = ${JSON.stringify(E, null, 0)};
  const figures = (window.HUMANITAS && window.HUMANITAS.figures) || [];
  figures.forEach((f) => {
    const e = ENRICH[f.slug];
    if (!e) return;
    if (e.biography && e.biography.length) f.biography = e.biography;
    if (e.accomplishments && e.accomplishments.length) f.accomplishments = e.accomplishments;
  });
  window.HUMANITAS_ENRICHED = true;
})();
`;

const dest = path.join(__dirname, "..", "data-enrichment.js");
fs.writeFileSync(dest, out);
console.log("Wrote", dest, "figures:", Object.keys(E).length);
console.log("Missing check will run against data files...");

const g = { window: {} };
const c =
  fs.readFileSync(path.join(__dirname, "..", "data1.js"), "utf8") +
  fs.readFileSync(path.join(__dirname, "..", "data2.js"), "utf8") +
  fs.readFileSync(path.join(__dirname, "..", "data3.js"), "utf8");
eval(c.replace(/window\./g, "g.window."));
const slugs = g.window.HUMANITAS.figures.map((f) => f.slug);
const missing = slugs.filter((s) => !E[s]);
const extra = Object.keys(E).filter((s) => !slugs.includes(s));
console.log("data figures:", slugs.length, "missing enrichment:", missing, "extra:", extra);
