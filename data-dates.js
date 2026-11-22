/**
 * Labels traditional or circa dates for scripture and ancient figures.
 * Does not change Native American records (locked).
 */
(function () {
  if (!window.HUMANITAS || !window.HUMANITAS.figures) return;

  var LOCKED = {
    hiawatha: 1, sequoyah: 1, tecumseh: 1, "sitting-bull": 1,
    "crazy-horse": 1, "chief-joseph": 1, sacagawea: 1, "black-elk": 1
  };

  var TRADITIONAL = {
    noah: 1, abraham: 1, moses: 1, joshua: 1, deborah: 1, gideon: 1,
    david: 1, solomon: 1, isaiah: 1, elijah: 1, jeremiah: 1, daniel: 1,
    zoroaster: 1, laozi: 1, buddha: 1, mary: 1
  };

  var CIRCA = {
    imhotep: 1, hammurabi: 1, confucius: 1, socrates: 1, plato: 1,
    hippocrates: 1, "cyrus-the-great": 1, ashoka: 1, jesus: 1,
    "john-the-baptist": 1, "judah-maccabee": 1, hypatia: 1, epictetus: 1,
    muhammad: 1, charlemagne: 1, "johannes-gutenberg": 1,
    "paul-the-apostle": 1, archimedes: 1, "genghis-khan": 1
  };

  var ALTS = {
    plato: { birthYearAlt: -427, deathYearAlt: -347 },
    jesus: { deathYearAlt: 33 },
    "john-the-baptist": {},
    "paul-the-apostle": { deathYearAlt: 67 }
  };

  window.HUMANITAS.figures.forEach(function (f) {
    if (!f || LOCKED[f.slug]) return;
    if (TRADITIONAL[f.slug] && !f.datePrecision) f.datePrecision = "traditional";
    if (CIRCA[f.slug] && !f.datePrecision) f.datePrecision = "circa";
    var alt = ALTS[f.slug];
    if (alt) {
      if (alt.birthYearAlt != null && f.birthYearAlt == null) f.birthYearAlt = alt.birthYearAlt;
      if (alt.deathYearAlt != null && f.deathYearAlt == null) f.deathYearAlt = alt.deathYearAlt;
    }
  });
})();
