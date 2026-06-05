# P4Orbit Audit Notes

## Contract Role

`P4Orbit` is the 4-position, 1-line orbit implementation used by F-Freedom levels:

- Level 1
- Level 4
- Level 7
- Level 10

It inherits shared placement, historical cycle, snapshot, and LevelManager-only access logic from `BaseOrbit`.

---

## Supported Levels

P4 supports only:

```txt
1, 4, 7, 10