# P12Orbit Audit Notes

## Contract Role

`P12Orbit` is the 12-position, 2-line orbit implementation used by F-Freedom levels:

- Level 2
- Level 5
- Level 8

It inherits placement, cycle storage, historical snapshots, rule snapshots, and LevelManager-only controls from `BaseOrbit`.

---

## Supported Levels

P12 supports only:

```txt
2, 5, 8