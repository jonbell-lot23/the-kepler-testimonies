#!/usr/bin/env -S deno run --allow-read

/**
 * Consequence Cascade Generator
 *
 * Traces consequences from an initial speculative change across multiple domains.
 * Helps identify story-rich conflict points and ensure consistent worldbuilding.
 *
 * Usage:
 *   deno run --allow-read cascade.ts "teleportation exists"
 *   deno run --allow-read cascade.ts "immortality drug" --domains economy,power
 *   deno run --allow-read cascade.ts "magic is real" --horizon decades
 */

interface ConsequenceNode {
  domain: string;
  order: number;
  consequence: string;
  conflicts: string[];
  story_potential: string;
}

interface CascadeResult {
  element: string;
  domains: string[];
  horizon: string;
  consequences: ConsequenceNode[];
  intersection_points: string[];
  story_seeds: string[];
}

// Domain-specific consequence prompts
const DOMAIN_PROMPTS: Record<string, string[]> = {
  economy: [
    "Who gains economic advantage from this?",
    "What existing industries become obsolete?",
    "What new markets emerge?",
    "How does this affect wealth distribution?",
    "What's the black market version?",
    "How do the powerful try to monopolize this?",
  ],
  power: [
    "Who can project force differently now?",
    "What existing power structures are threatened?",
    "How do governments try to control this?",
    "What new forms of resistance become possible?",
    "How does this change warfare?",
    "Who becomes irrelevant?",
  ],
  society: [
    "What new social behaviors emerge?",
    "How do family structures adapt?",
    "What new social classes form?",
    "What becomes socially acceptable?",
    "What new taboos emerge?",
    "How do urban/rural dynamics shift?",
  ],
  culture: [
    "What new language or slang emerges?",
    "What artistic movements respond to this?",
    "What gets romanticized or demonized?",
    "What new traditions form?",
    "What old traditions become obsolete?",
    "How do different generations relate to this?",
  ],
  religion: [
    "How do existing belief systems interpret this?",
    "What new religious movements emerge?",
    "What theological debates arise?",
    "How does this affect concepts of the sacred?",
    "What new heresies are defined?",
    "How do clergy adapt or resist?",
  ],
  technology: [
    "What supporting technologies are needed?",
    "What refinements or iterations follow?",
    "What unexpected applications emerge?",
    "What fails or goes wrong?",
    "How does this combine with other technologies?",
    "What's the DIY/hacker version?",
  ],
  environment: [
    "How does this affect resource consumption?",
    "What environmental side effects occur?",
    "How does this change land use?",
    "What ecological systems are disrupted?",
    "How do people adapt to environmental changes?",
    "What becomes sustainable or unsustainable?",
  ],
  psychology: [
    "How does this change what people fear?",
    "How does this change what people hope for?",
    "What new mental health issues emerge?",
    "How does identity change?",
    "What new addictions or compulsions emerge?",
    "How do relationships change?",
  ],
};

// Time horizon prompts
const HORIZON_PROMPTS: Record<string, string> = {
  immediate: "In the first weeks and months",
  years: "Within a few years",
  decades: "After a generation",
  generations: "After several generations",
  centuries: "After centuries of adaptation",
};

// Intersection analysis prompts
const INTERSECTION_PROMPTS = [
  "How do rich and poor experience this differently?",
  "How do urban and rural areas differ?",
  "How do different generations adapt?",
  "How do marginalized communities experience this?",
  "What geographic variations emerge?",
  "How do different cultures incorporate this?",
];

function randomFrom<T>(arr: T[], count: number = 1): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateConsequences(
  element: string,
  domains: string[],
  horizon: string
): CascadeResult {
  const consequences: ConsequenceNode[] = [];
  const storySeeds: string[] = [];

  // Generate consequences for each domain at each order
  for (const domain of domains) {
    const prompts = DOMAIN_PROMPTS[domain] || DOMAIN_PROMPTS.society;

    // First order (direct effects)
    const firstOrderPrompts = randomFrom(prompts, 2);
    for (const prompt of firstOrderPrompts) {
      consequences.push({
        domain,
        order: 1,
        consequence: `[${domain.toUpperCase()}] ${prompt}`,
        conflicts: [],
        story_potential: `First-order ${domain} consequence of "${element}"`,
      });
    }

    // Second order (systemic adaptations)
    const secondOrderPrompt = randomFrom(prompts, 1)[0];
    consequences.push({
      domain,
      order: 2,
      consequence: `[${domain.toUpperCase()} - ADAPTATION] Given first-order effects, ${secondOrderPrompt.toLowerCase()}`,
      conflicts: [],
      story_potential: `Systemic ${domain} adaptation to "${element}"`,
    });

    // Third order (cultural evolution) - only for longer horizons
    if (horizon !== "immediate" && horizon !== "years") {
      const thirdOrderPrompt = randomFrom(prompts, 1)[0];
      consequences.push({
        domain,
        order: 3,
        consequence: `[${domain.toUpperCase()} - NORMALIZED] ${HORIZON_PROMPTS[horizon]}, ${thirdOrderPrompt.toLowerCase()}`,
        conflicts: [],
        story_potential: `Long-term ${domain} normalization of "${element}"`,
      });
    }
  }

  // Intersection points
  const intersections = randomFrom(INTERSECTION_PROMPTS, 3);

  // Generate story seeds from conflicts between domains
  if (domains.length >= 2) {
    const d1 = domains[0];
    const d2 = domains[1];
    storySeeds.push(
      `Conflict: ${d1} benefits vs ${d2} harms`,
      `Conflict: Those who control ${d1} aspects vs those who control ${d2} aspects`,
      `Conflict: Early adopters vs resisters`
    );
  }

  storySeeds.push(
    "Conflict: Official use vs underground use",
    "Conflict: Those who remember 'before' vs those who only know 'after'",
    "Conflict: Beneficiaries vs those made obsolete"
  );

  return {
    element,
    domains,
    horizon,
    consequences,
    intersection_points: intersections,
    story_seeds: randomFrom(storySeeds, 4),
  };
}

function formatResult(result: CascadeResult): string {
  const lines: string[] = [];

  lines.push(`# Consequence Cascade: "${result.element}"\n`);
  lines.push(`**Domains analyzed:** ${result.domains.join(", ")}`);
  lines.push(`**Time horizon:** ${result.horizon}\n`);

  // Group by order
  const byOrder: Record<number, ConsequenceNode[]> = {};
  for (const c of result.consequences) {
    if (!byOrder[c.order]) byOrder[c.order] = [];
    byOrder[c.order].push(c);
  }

  const orderLabels: Record<number, string> = {
    1: "First Order (Direct Effects)",
    2: "Second Order (Systemic Adaptations)",
    3: "Third Order (Cultural Evolution)",
  };

  for (const order of [1, 2, 3]) {
    if (byOrder[order]) {
      lines.push(`## ${orderLabels[order]}\n`);
      for (const c of byOrder[order]) {
        lines.push(`- ${c.consequence}`);
      }
      lines.push("");
    }
  }

  lines.push("## Intersection Analysis\n");
  lines.push("Consider these differential effects:\n");
  for (const intersection of result.intersection_points) {
    lines.push(`- ${intersection}`);
  }
  lines.push("");

  lines.push("## Story Seeds\n");
  lines.push("Potential conflicts arising from this change:\n");
  for (const seed of result.story_seeds) {
    lines.push(`- ${seed}`);
  }
  lines.push("");

  lines.push("## Next Steps\n");
  lines.push("1. Pick the most story-relevant consequence chain");
  lines.push("2. Trace that chain to specific character impacts");
  lines.push("3. Identify where your protagonist intersects with these changes");
  lines.push("4. Look for the most dramatic conflict points");

  return lines.join("\n");
}

function main(): void {
  const args = Deno.args;

  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    console.log(`Consequence Cascade Generator

Usage:
  deno run --allow-read cascade.ts "<speculative element>"
  deno run --allow-read cascade.ts "<element>" --domains economy,power,religion
  deno run --allow-read cascade.ts "<element>" --horizon generations

Options:
  --domains   Comma-separated list of domains to analyze
              Available: economy, power, society, culture, religion,
                        technology, environment, psychology
              Default: economy,power,society,culture

  --horizon   Time horizon for consequences
              Available: immediate, years, decades, generations, centuries
              Default: decades

  --json      Output as JSON

Examples:
  deno run --allow-read cascade.ts "teleportation is invented"
  deno run --allow-read cascade.ts "immortality drug discovered" --domains economy,religion
  deno run --allow-read cascade.ts "AI becomes sentient" --horizon centuries
`);
    Deno.exit(0);
  }

  // Parse arguments
  const domainsIndex = args.indexOf("--domains");
  const horizonIndex = args.indexOf("--horizon");
  const jsonOutput = args.includes("--json");

  // Get element (first non-flag argument)
  let element = "";
  for (const arg of args) {
    if (!arg.startsWith("--")) {
      element = arg;
      break;
    }
  }

  if (!element) {
    console.error("Error: No speculative element specified");
    Deno.exit(1);
  }

  // Parse domains
  let domains = ["economy", "power", "society", "culture"];
  if (domainsIndex !== -1 && args[domainsIndex + 1]) {
    domains = args[domainsIndex + 1].split(",").map((d) => d.trim());
    // Validate domains
    for (const d of domains) {
      if (!DOMAIN_PROMPTS[d]) {
        console.error(`Error: Unknown domain "${d}"`);
        console.error(
          `Available: ${Object.keys(DOMAIN_PROMPTS).join(", ")}`
        );
        Deno.exit(1);
      }
    }
  }

  // Parse horizon
  let horizon = "decades";
  if (horizonIndex !== -1 && args[horizonIndex + 1]) {
    horizon = args[horizonIndex + 1];
    if (!HORIZON_PROMPTS[horizon]) {
      console.error(`Error: Unknown horizon "${horizon}"`);
      console.error(
        `Available: ${Object.keys(HORIZON_PROMPTS).join(", ")}`
      );
      Deno.exit(1);
    }
  }

  const result = generateConsequences(element, domains, horizon);

  if (jsonOutput) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(formatResult(result));
  }
}

main();
