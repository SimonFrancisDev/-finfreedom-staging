# P39Orbit Audit Notes

## Contract Role

`P39Orbit` is the 39-position, 3-line orbit implementation used by F-Freedom levels:

- Level 3
- Level 6
- Level 9

It inherits shared placement, historical cycle storage, snapshot storage, mirror behavior, recycle behavior, and LevelManager-only controls from `BaseOrbit`.

---

## Supported Levels

P39 supports only:

```txt
3, 6, 9