#!/usr/bin/env -S deno run --allow-read

/**
 * Belief System Generator
 *
 * Generates belief system parameters and internal tensions for fictional religions.
 * Creates cosmology, ethics, institutions, and conflicts.
 *
 * Usage:
 *   deno run --allow-read belief.ts                          # Random belief system
 *   deno run --allow-read belief.ts --type polytheistic      # Specific structural type
 *   deno run --allow-read belief.ts --tech bronze-age        # Technology-appropriate
 *   deno run --allow-read belief.ts "Church of Light" --schism  # Generate schism
 */

interface BeliefSystem {
  name: string;
  structuralType: string;
  techLevel: string;
  cosmology: CosmologyParams;
  theology: TheologyParams;
  ethics: EthicsParams;
  institution: InstitutionParams;
  rituals: string[];
  tensions: string[];
  schismPotential: SchismParams | null;
}

interface CosmologyParams {
  origin: string;
  cosmicStructure: string;
  temporalView: string;
  naturalWorldRelation: string;
}

interface TheologyParams {
  divineNature: string;
  divineHumanRelation: string;
  evilExplanation: string;
  afterlife: string;
}

interface EthicsParams {
  moralFoundation: string;
  coreVirtues: string[];
  prohibitions: string[];
  consequenceSystem: string;
}

interface InstitutionParams {
  authorityStructure: string;
  specialistType: string;
  genderDynamics: string;
  economicBase: string;
}

interface SchismParams {
  cause: string;
  factions: string[];
  coreDispute: string;
  likelyOutcome: string;
}

// Structural types
const STRUCTURAL_TYPES = [
  "animistic",
  "polytheistic",
  "henotheistic",
  "monotheistic",
  "pantheistic",
  "non-theistic",
  "philosophical",
  "dualistic",
];

// Technology levels
const TECH_LEVELS = [
  "pre-agricultural",
  "bronze-age",
  "iron-age",
  "medieval",
  "early-modern",
  "industrial",
  "information-age",
  "post-human",
];

// Cosmology options
const ORIGINS: Record<string, string[]> = {
  animistic: [
    "World emerged from primordial waters inhabited by spirits",
    "First beings shaped land from their own bodies",
    "Dream-time ancestors sang the world into existence",
    "Great Spirit breathed life into formless void",
  ],
  polytheistic: [
    "Gods defeated primordial chaos and built order from its corpse",
    "Divine council shaped world through collaborative creation",
    "War among gods resulted in current world as aftermath",
    "Elder gods sacrificed themselves to birth the world",
  ],
  monotheistic: [
    "Single deity spoke world into existence from nothing",
    "God shaped world from pre-existing materials through will",
    "Divine emanation cascaded down through realms to physical",
    "Creator withdrew to make space for creation",
  ],
  pantheistic: [
    "World is eternal expression of divine being",
    "Universe cycles endlessly through creation and dissolution",
    "All that exists is one consciousness dreaming multiplicity",
    "Reality is the body of the infinite",
  ],
  dualistic: [
    "Light and darkness have warred since before time",
    "Good creator opposed by corrupting counter-force",
    "Material world is prison created by false god",
    "Two principles eternally generate reality through tension",
  ],
  "non-theistic": [
    "World arises from fundamental principles, not personal beings",
    "Cycle of cause and effect has no beginning",
    "Natural law governs all arising and passing away",
    "Universe self-organizes without external direction",
  ],
  default: [
    "Origins lost to time, known only through fragments",
    "Multiple creation accounts coexist without resolution",
    "Creation happened, but reasons remain mysterious",
    "World emerged from something beyond human comprehension",
  ],
};

const COSMIC_STRUCTURES = [
  "Three realms: upper (divine), middle (living), lower (dead)",
  "Seven heavens ascending toward ultimate reality",
  "World tree connecting multiple planes of existence",
  "Wheel of existence with cyclic rebirth between realms",
  "Material world surrounded by spiritual wilderness",
  "Layered reality with decreasing spiritual density",
  "Multiple worlds connected by hidden passages",
  "Single unified field with apparent separations as illusion",
];

const TEMPORAL_VIEWS = [
  "Linear time moving toward ultimate resolution",
  "Cyclic ages repeating with variations",
  "Spiral time combining progress with cycles",
  "Eternal present with past/future as illusions",
  "Degenerating from golden age toward dissolution",
  "Ascending from primitive origins toward perfection",
  "Multiple timelines intersecting at sacred moments",
  "Time as test period before eternal existence",
];

const NATURAL_WORLD_RELATIONS = [
  "Nature is sacred, filled with divine presence",
  "Natural world is fallen, awaiting restoration",
  "Humans are stewards tasked with care of nature",
  "Nature is illusion obscuring deeper reality",
  "Natural cycles reflect divine patterns",
  "Wilderness is dangerous, civilization is sacred",
  "All living things share divine spark",
  "Natural order models proper social order",
];

// Theology options
const DIVINE_NATURES = [
  "Personal deity who knows and responds to individuals",
  "Impersonal force or principle underlying reality",
  "Multiple specialized deities with distinct personalities",
  "Transcendent being beyond human comprehension",
  "Immanent presence within all things",
  "Absent creator who no longer intervenes",
  "Collective of ancestral spirits",
  "Cosmic consciousness of which humans are fragments",
];

const DIVINE_HUMAN_RELATIONS = [
  "Covenantal—reciprocal obligations between divine and human",
  "Devotional—humans serve, divine protects",
  "Mystical—union with divine is possible through practice",
  "Hierarchical—mediated through specialists",
  "Direct—each person has unmediated access",
  "Distant—divine is beyond reach except through revelation",
  "Participatory—humans co-create with divine",
  "Adversarial—divine tests or challenges humans",
];

const EVIL_EXPLANATIONS = [
  "Free will—moral evil is human choice",
  "Cosmic enemy—opposing force causes suffering",
  "Testing—suffering purifies and strengthens",
  "Illusion—evil is misperception of unity",
  "Karma—suffering results from past actions",
  "Mystery—divine purposes beyond human understanding",
  "Absence—evil is lack of divine presence",
  "Necessary—evil enables greater goods to exist",
];

const AFTERLIFE_CONCEPTS = [
  "Paradise/punishment based on moral record",
  "Rebirth based on accumulated karma",
  "Reunion with divine source, loss of individuality",
  "Continuation as ancestor spirit",
  "Bodily resurrection at end of time",
  "Permanent death, living on through memory",
  "Multiple possible destinations based on initiation level",
  "Transformation into different form of existence",
];

// Ethics options
const MORAL_FOUNDATIONS = [
  "Divine command—right is what deity decrees",
  "Natural law—right is aligned with cosmic order",
  "Virtue ethics—right develops good character",
  "Consequentialist—right produces good outcomes",
  "Contractual—right maintains social harmony",
  "Intuitive—right is known through spiritual insight",
  "Relational—right maintains proper relationships",
  "Pragmatic—right is what works for community flourishing",
];

const VIRTUES = [
  "Compassion for all beings",
  "Truthfulness in speech and action",
  "Courage in face of adversity",
  "Wisdom in understanding reality",
  "Justice in dealings with others",
  "Temperance in desires",
  "Generosity with resources",
  "Humility before the sacred",
  "Purity of intention",
  "Loyalty to community",
  "Patience through suffering",
  "Gratitude for existence",
  "Hospitality to strangers",
  "Diligence in duties",
  "Forgiveness of wrongs",
];

const PROHIBITIONS = [
  "Killing except in defense",
  "Theft of property",
  "Sexual misconduct (variously defined)",
  "Deception and false witness",
  "Blasphemy against the sacred",
  "Eating forbidden substances",
  "Violating sacred times or places",
  "Disrespecting parents/elders",
  "Practicing forbidden magic",
  "Associating with outsiders",
  "Accumulating excess wealth",
  "Neglecting ritual obligations",
  "Pride and self-exaltation",
  "Cruelty to animals",
  "Wasting sacred resources",
];

const CONSEQUENCE_SYSTEMS = [
  "Afterlife judgment with eternal stakes",
  "Karmic accumulation affecting future lives",
  "Immediate divine intervention for violations",
  "Community enforcement through ostracism",
  "Natural consequences built into cosmic order",
  "Ancestral displeasure bringing misfortune",
  "Loss of spiritual power or status",
  "Combination of worldly and otherworldly consequences",
];

// Institution options
const AUTHORITY_STRUCTURES = [
  "Hierarchical priesthood with central leader",
  "Council of elders making collective decisions",
  "Charismatic leaders with personal authority",
  "Decentralized local communities",
  "Monastic orders with internal governance",
  "Hereditary religious leadership",
  "Democratic selection of leaders",
  "Guru-disciple lineages",
];

const SPECIALIST_TYPES: Record<string, string[]> = {
  "pre-agricultural": [
    "Shamans who journey to spirit world",
    "Elders who remember sacred stories",
    "Healers who channel spiritual power",
  ],
  "bronze-age": [
    "Temple priests managing divine property",
    "Oracle interpreters reading divine signs",
    "Ritual specialists for sacrifice",
  ],
  "iron-age": [
    "Scholarly priests interpreting sacred texts",
    "Prophets speaking divine messages",
    "Judges applying sacred law",
  ],
  medieval: [
    "Ordained clergy administering sacraments",
    "Monks and nuns in contemplative communities",
    "Theologians developing doctrine",
  ],
  "early-modern": [
    "Ministers preaching and pastoring",
    "Missionaries expanding the faith",
    "Reformers challenging institutions",
  ],
  industrial: [
    "Professional clergy with seminary training",
    "Social reformers applying faith to society",
    "Denominational administrators",
  ],
  "information-age": [
    "Media personalities spreading message",
    "Therapist-pastors providing counseling",
    "Virtual community facilitators",
  ],
  "post-human": [
    "Consciousness architects designing spiritual experiences",
    "Upload chaplains guiding transition",
    "Inter-species theologians bridging perspectives",
  ],
  default: [
    "Religious specialists with training",
    "Community leaders with spiritual authority",
    "Ritual performers maintaining traditions",
  ],
};

const GENDER_DYNAMICS = [
  "Male-only leadership with female auxiliary roles",
  "Female-only leadership in goddess tradition",
  "Parallel male and female hierarchies",
  "Gender-neutral leadership based on calling",
  "Third-gender or non-binary sacred roles",
  "Complementary gendered roles in ritual",
  "Leadership rotates between genders",
  "Gender irrelevant to spiritual authority",
];

const ECONOMIC_BASES = [
  "Tithing—percentage of member income",
  "Temple lands and estates",
  "Donations and offerings",
  "State support as official religion",
  "Endowments and investments",
  "Sale of ritual services",
  "Mendicant begging tradition",
  "Member labor and community resources",
];

// Ritual options
const RITUALS: Record<string, string[]> = {
  animistic: [
    "Trance journeys to spirit world",
    "Animal sacrifice for spirit appeasement",
    "Vision quests in wilderness",
    "Seasonal renewal ceremonies",
    "Ancestor veneration offerings",
  ],
  polytheistic: [
    "Temple sacrifices to specific deities",
    "Festival processions through sacred routes",
    "Mystery initiations with secret rites",
    "Oracle consultations before decisions",
    "Votive offerings for answered prayers",
  ],
  monotheistic: [
    "Congregational worship with prayer and scripture",
    "Sacraments marking life transitions",
    "Sabbath observance with rest and reflection",
    "Pilgrimage to holy sites",
    "Fasting for spiritual discipline",
  ],
  pantheistic: [
    "Meditation for union with the All",
    "Chanting to alter consciousness",
    "Yoga or body practices for enlightenment",
    "Nature immersion as worship",
    "Silence and stillness retreats",
  ],
  "non-theistic": [
    "Meditation for insight and calm",
    "Ethical reflection and examination",
    "Community gathering for mutual support",
    "Study of wisdom literature",
    "Mindful daily practices",
  ],
  default: [
    "Weekly communal gathering",
    "Life-cycle ceremonies (birth, coming-of-age, marriage, death)",
    "Seasonal festivals",
    "Personal daily devotion",
    "Pilgrimage or sacred journey",
  ],
};

// Tension patterns
const TENSIONS = [
  "Specialists vs. direct access for all believers",
  "Tradition preservation vs. adaptation to new conditions",
  "Mystical experience vs. institutional authority",
  "Universal claims vs. cultural particularity",
  "Literal interpretation vs. symbolic reading",
  "Withdrawal from world vs. engagement with society",
  "Exclusive truth vs. tolerance of other paths",
  "Personal salvation vs. collective transformation",
  "Rational theology vs. mystery and paradox",
  "Original purity vs. accumulated tradition",
  "Centralized authority vs. local autonomy",
  "Elite knowledge vs. popular practice",
];

// Schism patterns
const SCHISM_CAUSES = [
  "Leadership succession dispute",
  "Doctrinal disagreement on core issue",
  "Ritual practice divergence",
  "Political alignment differences",
  "Reform movement going too far",
  "Geographic isolation developing distinct traditions",
  "Prophetic challenge to established order",
  "Generational cultural change",
];

const SCHISM_DISPUTES = [
  "Nature of the divine being(s)",
  "Requirements for salvation/liberation",
  "Authority of particular texts or leaders",
  "Proper form of central ritual",
  "Role of reason vs. revelation",
  "Treatment of members who leave",
  "Relationship to secular power",
  "Boundaries of acceptable belief",
];

const SCHISM_OUTCOMES = [
  "Formal split into two denominations",
  "One faction declared heretical, persecuted",
  "Ongoing cold war within same institution",
  "Reformers expelled, form new movement",
  "Compromise reached, tensions suppressed",
  "Gradual drift apart without formal break",
  "Violent conflict with lasting enmity",
  "One side absorbed into secular institutions",
];

function randomFrom<T>(arr: T[], count: number = 1): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

function generateBeliefSystem(
  existingName: string | null,
  structuralType: string | null,
  techLevel: string | null,
  includeSchism: boolean
): BeliefSystem {
  const type = structuralType || randomFrom(STRUCTURAL_TYPES, 1)[0];
  const tech = techLevel || randomFrom(TECH_LEVELS, 1)[0];

  // Generate name if not provided
  const namePrefixes = ["Church of", "Temple of", "Order of", "Way of", "Path of", "Followers of"];
  const nameConcepts = ["Light", "Truth", "Eternal Flame", "Sacred Mountain", "Living Waters", "Cosmic Unity"];
  const name = existingName || `${randomFrom(namePrefixes, 1)[0]} ${randomFrom(nameConcepts, 1)[0]}`;

  // Build cosmology
  const originPool = ORIGINS[type] || ORIGINS.default;
  const cosmology: CosmologyParams = {
    origin: randomFrom(originPool, 1)[0],
    cosmicStructure: randomFrom(COSMIC_STRUCTURES, 1)[0],
    temporalView: randomFrom(TEMPORAL_VIEWS, 1)[0],
    naturalWorldRelation: randomFrom(NATURAL_WORLD_RELATIONS, 1)[0],
  };

  // Build theology
  const theology: TheologyParams = {
    divineNature: randomFrom(DIVINE_NATURES, 1)[0],
    divineHumanRelation: randomFrom(DIVINE_HUMAN_RELATIONS, 1)[0],
    evilExplanation: randomFrom(EVIL_EXPLANATIONS, 1)[0],
    afterlife: randomFrom(AFTERLIFE_CONCEPTS, 1)[0],
  };

  // Build ethics
  const ethics: EthicsParams = {
    moralFoundation: randomFrom(MORAL_FOUNDATIONS, 1)[0],
    coreVirtues: randomFrom(VIRTUES, 3),
    prohibitions: randomFrom(PROHIBITIONS, 3),
    consequenceSystem: randomFrom(CONSEQUENCE_SYSTEMS, 1)[0],
  };

  // Build institution
  const specialistPool = SPECIALIST_TYPES[tech] || SPECIALIST_TYPES.default;
  const institution: InstitutionParams = {
    authorityStructure: randomFrom(AUTHORITY_STRUCTURES, 1)[0],
    specialistType: randomFrom(specialistPool, 1)[0],
    genderDynamics: randomFrom(GENDER_DYNAMICS, 1)[0],
    economicBase: randomFrom(ECONOMIC_BASES, 1)[0],
  };

  // Get rituals
  const ritualPool = RITUALS[type] || RITUALS.default;
  const rituals = randomFrom(ritualPool, 3);

  // Get tensions
  const tensions = randomFrom(TENSIONS, 2);

  // Generate schism if requested
  let schismPotential: SchismParams | null = null;
  if (includeSchism) {
    const cause = randomFrom(SCHISM_CAUSES, 1)[0];
    const dispute = randomFrom(SCHISM_DISPUTES, 1)[0];
    schismPotential = {
      cause,
      factions: [`Traditionalist ${name}`, `Reformed ${name}`],
      coreDispute: dispute,
      likelyOutcome: randomFrom(SCHISM_OUTCOMES, 1)[0],
    };
  }

  return {
    name,
    structuralType: type,
    techLevel: tech,
    cosmology,
    theology,
    ethics,
    institution,
    rituals,
    tensions,
    schismPotential,
  };
}

function formatBeliefSystem(system: BeliefSystem): string {
  const lines: string[] = [];

  lines.push(`# Belief System: ${system.name}\n`);
  lines.push(`**Type:** ${system.structuralType}`);
  lines.push(`**Technology Level:** ${system.techLevel}\n`);

  lines.push("## Cosmology\n");
  lines.push(`**Origin:** ${system.cosmology.origin}`);
  lines.push(`**Cosmic Structure:** ${system.cosmology.cosmicStructure}`);
  lines.push(`**Time:** ${system.cosmology.temporalView}`);
  lines.push(`**Nature:** ${system.cosmology.naturalWorldRelation}`);
  lines.push("");

  lines.push("## Theology\n");
  lines.push(`**Divine Nature:** ${system.theology.divineNature}`);
  lines.push(`**Divine-Human Relation:** ${system.theology.divineHumanRelation}`);
  lines.push(`**Evil Explained:** ${system.theology.evilExplanation}`);
  lines.push(`**Afterlife:** ${system.theology.afterlife}`);
  lines.push("");

  lines.push("## Ethics\n");
  lines.push(`**Moral Foundation:** ${system.ethics.moralFoundation}`);
  lines.push(`**Core Virtues:** ${system.ethics.coreVirtues.join(", ")}`);
  lines.push(`**Prohibitions:** ${system.ethics.prohibitions.join(", ")}`);
  lines.push(`**Consequences:** ${system.ethics.consequenceSystem}`);
  lines.push("");

  lines.push("## Institution\n");
  lines.push(`**Authority:** ${system.institution.authorityStructure}`);
  lines.push(`**Specialists:** ${system.institution.specialistType}`);
  lines.push(`**Gender Dynamics:** ${system.institution.genderDynamics}`);
  lines.push(`**Economic Base:** ${system.institution.economicBase}`);
  lines.push("");

  lines.push("## Rituals\n");
  for (const ritual of system.rituals) {
    lines.push(`- ${ritual}`);
  }
  lines.push("");

  lines.push("## Internal Tensions\n");
  for (const tension of system.tensions) {
    lines.push(`- ${tension}`);
  }
  lines.push("");

  if (system.schismPotential) {
    lines.push("## Schism Potential\n");
    lines.push(`**Cause:** ${system.schismPotential.cause}`);
    lines.push(`**Core Dispute:** ${system.schismPotential.coreDispute}`);
    lines.push(`**Factions:** ${system.schismPotential.factions.join(" vs. ")}`);
    lines.push(`**Likely Outcome:** ${system.schismPotential.likelyOutcome}`);
    lines.push("");
  }

  lines.push("## Story Implications\n");
  lines.push("- This belief system's tensions could drive character conflicts");
  lines.push("- Institution structure suggests power dynamics to explore");
  lines.push("- Cosmology provides metaphors and imagery for the narrative");
  lines.push("- Ethics create moral dilemmas for characters within this tradition");

  return lines.join("\n");
}

function main(): void {
  const args = Deno.args;

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`Belief System Generator

Usage:
  deno run --allow-read belief.ts
  deno run --allow-read belief.ts --type <type>
  deno run --allow-read belief.ts --tech <level>
  deno run --allow-read belief.ts "Religion Name" --schism

Options:
  --type    Structural type
            Available: ${STRUCTURAL_TYPES.join(", ")}
            Default: random

  --tech    Technology level for appropriate institutions
            Available: ${TECH_LEVELS.join(", ")}
            Default: random

  --schism  Generate a schism scenario

  --json    Output as JSON

Examples:
  deno run --allow-read belief.ts --type polytheistic --tech bronze-age
  deno run --allow-read belief.ts "Church of the Eternal Light" --schism
  deno run --allow-read belief.ts --type monotheistic --tech medieval
`);
    Deno.exit(0);
  }

  // Parse arguments
  const typeIndex = args.indexOf("--type");
  const techIndex = args.indexOf("--tech");
  const jsonOutput = args.includes("--json");
  const includeSchism = args.includes("--schism");

  // Get existing name if provided
  let existingName: string | null = null;
  for (const arg of args) {
    if (!arg.startsWith("--") && args.indexOf(arg) === 0) {
      existingName = arg;
      break;
    }
  }

  const structuralType = typeIndex !== -1 && args[typeIndex + 1]
    ? args[typeIndex + 1]
    : null;

  const techLevel = techIndex !== -1 && args[techIndex + 1]
    ? args[techIndex + 1]
    : null;

  const system = generateBeliefSystem(existingName, structuralType, techLevel, includeSchism);

  if (jsonOutput) {
    console.log(JSON.stringify(system, null, 2));
  } else {
    console.log(formatBeliefSystem(system));
  }
}

main();
