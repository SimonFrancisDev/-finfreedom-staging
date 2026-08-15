# Workspace Classification Policy

Every dirty file is assigned one disposition before cleanup.

## Retain

Runtime source must build and pass review. Migration source must reproduce an
approved migration. Deployment evidence includes sanitized manifests,
provenance, final verification, rollback records, and immutable pre/post-state
snapshots. Shared documentation is committed separately from runtime changes.

## Archive

One-off diagnostics and intermediate evidence that is useful for incident
review but not required by runtime or deployment tooling. An archive requires
a SHA-256 manifest before its source files are removed.

## Delete

Reproducible build output, logs, empty temporary databases, caches, and exact
duplicates. Deletion requires a checksum inventory, proof that source or an
archive exists, an ignore rule preventing recurrence, and a clean build.

## Blocked from Commit

Any file containing a secret, authenticated RPC endpoint, private database
URI, signing key, bot token, or platform credential remains blocked until the
secret is removed and rotated when appropriate.
