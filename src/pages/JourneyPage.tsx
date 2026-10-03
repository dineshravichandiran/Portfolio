import { useEffect } from 'react'
import JourneyScene from '../components/three/JourneyScene'

const DEFAULT_TITLE = 'Dinesh Ravichandiran | Cloud & Reliability Engineer, open to SRE roles'

export default function JourneyPage() {
  useEffect(() => {
    document.title = 'Dinesh Ravichandiran — 3D Interactive Career Journey'
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [])

  return <JourneyScene />
}
