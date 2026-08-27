import { Check, LockKeyhole, User } from 'lucide-react'
import { formatToken } from '../../Services/freedomPlus'

const STRUCTURES = {
  P39: { rings: [[1, 2, 3], [4, 7, 10, 5, 8, 11, 6, 9, 12], [13, 22, 31, 14, 23, 32, 15, 24, 33, 16, 25, 34, 17, 26, 35, 18, 27, 36, 19, 28, 37, 20, 29, 38, 21, 30, 39]], parent: (p) => p <= 3 ? 0 : p <= 12 ? ((p - 4) % 3) + 1 : ((p - 13) % 9) + 4 },
  P14: { rings: [[1, 2], [3, 5, 4, 6], [7, 11, 8, 12, 9, 13, 10, 14]], parent: (p) => p <= 2 ? 0 : p <= 6 ? ((p - 3) % 2) + 1 : ((p - 7) % 4) + 3 },
  P12: { rings: [[1, 2, 3], [4, 7, 10, 5, 8, 11, 6, 9, 12]], parent: (p) => p <= 3 ? 0 : ((p - 4) % 3) + 1 },
  P6: { rings: [[1, 2], [3, 5, 4, 6]], parent: (p) => p <= 2 ? 0 : ((p - 3) % 2) + 1 },
  P4: { rings: [[1, 2, 3, 4]], parent: () => 0 },
  P3: { rings: [[1, 2, 3]], parent: () => 0 },
}

const RADII = { 1: 25, 2: 37, 3: 47 }

function point(index, count, ring) {
  const angle = (-90 + (360 / count) * index) * (Math.PI / 180)
  const radius = RADII[ring]
  return { x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius }
}

function short(value = '') {
  return value ? `${value.slice(0, 5)}...${value.slice(-3)}` : ''
}

export default function FreedomPlusOrbit({ orbitType, positions = [], owner, onSelect, selectedPosition = null }) {
  const structure = STRUCTURES[orbitType] || STRUCTURES.P39
  const records = new Map(positions.map((item) => [Number(item.position), item]))
  const nextPosition = structure.rings.flat().sort((a, b) => a - b).find((position) => !records.has(position))
  const coordinates = new Map([[0, { x: 50, y: 50 }]])

  structure.rings.forEach((ringPositions, ringIndex) => {
    ringPositions.forEach((position, index) => coordinates.set(position, point(index, ringPositions.length, ringIndex + 1)))
  })
  const connections = structure.rings.flat().flatMap((position) => {
    const record = records.get(position)
    if (!record && position !== nextPosition) return []
    const from = coordinates.get(structure.parent(position))
    const to = coordinates.get(position)
    const relationship = record?.participant?.toLowerCase?.() === owner?.toLowerCase?.() ? 'owner' : record?.relationship || 'next'
    return [{ position, from, to, relationship }]
  })

  return (
    <div className={`fp-orbit-stage fp-orbit-stage--${orbitType.toLowerCase()}`} aria-label={`${orbitType} orbit diagram`}>
      <svg className="fp-orbit-connectors" viewBox="0 0 100 100" aria-hidden="true">{connections.map((connection) => <line key={connection.position} className={`is-${connection.relationship}`} x1={connection.from.x} y1={connection.from.y} x2={connection.to.x} y2={connection.to.y} />)}</svg>
      {structure.rings.map((_, index) => <span key={index} className={`fp-orbit-ring fp-orbit-ring--${index + 1}`} />)}
      <div className="fp-orbit-owner" title={owner || 'Orbit owner'}><User /><strong>Owner</strong><small>{short(owner)}</small></div>
      {structure.rings.flatMap((ringPositions, ringIndex) => ringPositions.map((position) => {
        const record = records.get(position)
        const coordinate = coordinates.get(position)
        const isFinancial = Boolean(record?.financial)
        const isOwner = record?.participant?.toLowerCase?.() === owner?.toLowerCase?.()
        const relationship = isOwner ? 'owner' : record?.relationship || (record ? 'indirect' : position === nextPosition ? 'next' : 'available')
        const selectable = record || { position, ring: ringIndex + 1, cycle: null, empty: true, relationship }
        return (
          <button
            type="button"
            key={position}
            className={`fp-orbit-node ${record ? 'is-filled' : 'is-empty'} is-${relationship} ${isFinancial ? 'is-payment' : ''} ${Number(selectedPosition?.position) === position ? 'is-selected' : ''}`}
            style={{ left: `${coordinate.x}%`, top: `${coordinate.y}%` }}
            onClick={() => onSelect?.(selectable)}
            title={record ? `Position ${position}, Ring ${ringIndex + 1}, ${record.participant}` : `Position ${position}, Ring ${ringIndex + 1}, empty`}
          >
            {record ? (isFinancial ? <LockKeyhole /> : <Check />) : <span>{position}</span>}
            <em>{position}</em>
            {record?.amount ? <small>{formatToken(record.amount)}</small> : null}
          </button>
        )
      }))}
      <div className="fp-orbit-legend"><span><i className="owner" />Your position</span><span><i className="next" />Next to fill</span><span><i className="direct" />Direct downline</span><span><i className="indirect" />Indirect downline</span><span><i className="empty" />Available</span></div>
    </div>
  )
}
