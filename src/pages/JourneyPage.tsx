import { useEffect } from 'react'
import JourneyScene from '../components/three/JourneyScene'

const DEFAULT_TITLE = 'Dinesh Ravichandiran — Site Reliability Engineer (SRE)'

export default function JourneyPage() {
  useEffect(() => {
    document.title = 'Dinesh Ravichandiran — 3D Interactive Career Journey'
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [])

  return <JourneyScene />
}
