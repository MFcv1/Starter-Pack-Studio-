---
name: shared-design-protocol
description: Shared execution, accessibility, and performance protocol for the Refero design skills. This is a reference file, not a standalone style identity.
---

# Shared Design Protocol

Use this only for universal production rules. Style identity, tokens, components, motion primitives, and archetypes must live in the active skill.

## Design Plan Contract

For substantial UI work, define:

1. Product type, audience, primary action, and emotional target.
2. Active skill and chosen archetype/source direction.
3. First viewport structure: navigation, H1 strategy, proof object, CTA, next-section hint.
4. Type, color, surface, geometry, imagery, state, and motion contracts.
5. Components needed for the actual workflow, including empty/loading/error/success states.
6. Mobile strategy and any text-overflow risks.
7. Style-specific bans that must be checked before delivery.

## First Viewport Contract

- Show the brand/product/place/object/workflow immediately.
- Include concrete visual evidence, not only atmospheric decoration.
- Make the primary action visible and readable.
- Leave a hint of the next section on desktop and mobile when building a landing page.
- Do not ship an empty hero, vague claim, or placeholder content.

## Component Contract

- Build real components with real content and states.
- Define hover, focus-visible, active, disabled, loading, empty, error, and success behavior.
- Use stable dimensions: grid tracks, aspect ratios, min/max sizes, and container-aware spacing.
- Keep hover and selected states inside the component bounds.
- Do not use nested cards unless the inner surface is a true control, modal, or data detail.

## Motion Contract

- Every motion must have a role: reveal, transition, feedback, continuity, attention routing, or storytelling.
- Prefer `transform`, `opacity`, `clip-path`, `filter`, and `background-position`.
- Avoid animating `top`, `left`, `width`, `height`, and expensive layout properties.
- Add `prefers-reduced-motion` fallbacks for nontrivial motion.
- Clean up GSAP/ScrollTrigger/RAF listeners in component lifecycles.
- Do not use fade-up as the only motion pattern in a style skill.

## Accessibility Contract

- Text must remain readable on actual backgrounds, images, gradients, glass, and dark panels.
- Touch targets should be at least 40px unless the existing design system has a stronger rule.
- Keyboard focus must be visible and style-consistent.
- Semantic status colors must not conflict with decorative accent colors.
- Do not communicate state only through hue; combine color with text, icon, rule, inversion, weight, underline, or pattern.

## Failure Corrections

- If the design looks generic, return to the chosen source/archetype and strengthen typography, spacing, surface, and component geometry.
- If it looks noisy, cut accent count, effects, and component variation until hierarchy is clear.
- If it looks stylish but unusable, make controls, states, and workflow structure more conventional while preserving the active style.
- If two neighboring skills would produce the same output, add a differentiation rule before coding.
