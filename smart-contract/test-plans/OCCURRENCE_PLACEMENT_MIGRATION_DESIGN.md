# Occurrence Placement And Migration Design

## Objective

Make placement, payment, eligibility, auto-upgrade, and recycle deterministic without rewriting valid production history.

## Identity model

Every structural placement is an occurrence, not merely a wallet.

An occurrence is identified by:

`orbit contract + orbit owner + level + cycle + position + activation ID`

It records:

- occupant wallet
- physical line
- physical parent position
- source or mirror role
- generating occurrence
- routed component role
- stored amount
- timestamp

Sponsor remains a separate permanent registration relationship.

## Placement rules

### Source activation

The activating wallet enters the next valid local position in the selected orbit owner's current cycle. The search is deterministic and constrained to that orbit's topology. It never scans unrelated upper orbits for an arbitrary empty slot.

### Connected placement

Each routed participant component creates exactly one connected occurrence in the recipient's relevant orbit unless it terminates as ID1 fallback. The connected occurrence uses the exact source occurrence and component role that generated it.

The destination physical line determines the stored line amount. The source role does not override the destination line.

### Existing wallet in multiple places

The same wallet may validly occupy several positions or cycles. Each occurrence retains its own parent. Future activity uses the wallet's current occurrence; already generated components retain their generating occurrence.

## Eligibility traversal

For each independently computed participant component:

1. Determine the structural candidate from the generating occurrence.
2. Check exact-level activation.
3. If inactive, pay and place nothing for that candidate.
4. Walk that candidate's permanent sponsor chain.
5. Select the first exact-level-eligible wallet.
6. If none exists, terminate at ID1.

Different P39 components are resolved independently even if they eventually select the same wallet.

## ID1 rules

Normal structural payment to ID1 remains a normal occurrence and may fill a position.

Terminal fallback to ID1 is different:

- founder distribution is executed
- a fallback receipt is recorded
- no orbit position is created
- no cycle counter advances
- multiple fallback components remain separately auditable

## Recycle rules

Recycle closes the completed cycle and archives it unchanged. The recycle owner receives FGTr but cannot earn a participant component from its own repurchase.

The repurchase begins from the recycle owner's permanent sponsor and creates a fresh occurrence in the sponsor route. P12 and P39 components are then computed from the new occurrence's physical position.

If a component resolves back to the recycle owner, only that component terminates at ID1 with no ID1 placement. Other components continue normally.

## Production boundary

The migration imports occurrence references without moving old positions. Four P12 level-2 cycles at 11 of 12 positions receive a narrow closing-boundary marker. Their next arrival closes the old chapter using the approved grandfather semantics; the newly opened cycle uses canonical reserve and recycle behavior.

No P39 cycle currently requires this one-fill grandfather marker. P4 continues under its owner-only rule.

## Required invariants

- no child occurrence without its physical parent
- no component paid to an inactive exact-level candidate
- no self-payment during recycle repurchase
- no participant payment without one matching placement
- no placement for terminal ID1 fallback
- no merged P39 component roles
- no duplicate mirror for one component
- no historical mutation
- no premature or repeated escrow release
- no premature or repeated recycle
- participant components plus system charge equal activation price
- every receipt satisfies gross equals liquid plus escrow plus recycle reserve
