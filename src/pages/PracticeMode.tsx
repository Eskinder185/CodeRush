import { useParams } from 'react-router-dom'
import InteractiveLineTyper from '../components/InteractiveLineTyper'
import { languageTracks } from '../data/lessons'

const SAMPLE = [
  "# Hello World in Python",
  'print("Hello, World!")',
  "",
  "name = \"Alice\"",
  "age = 25",
  "height = 5.6",
  "is_student = True",
  "",
  "print(f\"Name: {name}\")",
  "print(f\"Age: {age}\")",
  "print(f\"Height: {height} feet\")",
  "print(f\"Is student: {is_student}\")",
].join("\n");

const PracticeMode = () => {
  const { language } = useParams<{ language: string }>()
  const currentLanguage = language || 'javascript'
  
  // Get lesson data or use sample
  const getLessonText = () => {
    const track = languageTracks.find(t => t.language === currentLanguage)
    if (track && track.lessons.length > 0) {
      return track.lessons[0].code
    }
    return SAMPLE
  }

  const text = getLessonText()

  return (
    <div className="p-6">
      {/* show 3 lines, forgiving comparison */}
      <InteractiveLineTyper text={text} windowSize={3} strict={false} />
    </div>
  )
}

export default PracticeMode