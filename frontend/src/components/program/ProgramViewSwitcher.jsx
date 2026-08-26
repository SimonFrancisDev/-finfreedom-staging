import { Layers3 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import FreedomPlusPage from '../../Pages/FreedomPlus/FreedomPlusPage'
import './ProgramViewSwitcher.css'

const PROGRAMS = [
  { value: 'f-freedom', label: 'F-Freedom' },
  { value: 'freedom-plus', label: 'Freedom-Plus' },
]

export default function ProgramViewSwitcher({ fFreedom, freedomPlusTab }) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const activeProgram = params.get('program') === 'freedom-plus' ? 'freedom-plus' : 'f-freedom'

  const selectProgram = (program) => {
    const nextParams = new URLSearchParams(location.search)
    if (program === 'freedom-plus') nextParams.set('program', 'freedom-plus')
    else nextParams.delete('program')
    const search = nextParams.toString()
    navigate(`${location.pathname}${search ? `?${search}` : ''}`, { replace: true, state: location.state })
  }

  return (
    <div className="program-view">
      <section className="program-view__switcher" aria-label="Program view">
        <span className="program-view__label"><Layers3 /> Program view</span>
        <div className="program-view__options" role="tablist" aria-label="Choose program">
          {PROGRAMS.map((program) => (
            <button type="button" role="tab" aria-selected={activeProgram === program.value} className={activeProgram === program.value ? 'active' : ''} onClick={() => selectProgram(program.value)} key={program.value}>
              {program.label}
            </button>
          ))}
        </div>
      </section>
      <div className="program-view__content" key={activeProgram}>
        {activeProgram === 'freedom-plus' ? <FreedomPlusPage initialTab={freedomPlusTab} /> : fFreedom}
      </div>
    </div>
  )
}
