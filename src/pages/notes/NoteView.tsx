
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardFooter
} from "@/components/ui/card"
import { ArrowLeft, Sparkles, RotateCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

const NoteView: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [note, setNote] = useState<Note | null>(null)
  const [aiResponse, setAiResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [aiAction, setAiAction] = useState<string>('summarize')
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (id) {
      // Load notes from localStorage
      const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
      const foundNote = storedNotes.find((note: Note) => note.id === id)
      if (foundNote) {
        setNote(foundNote)
      } else {
        navigate('/notes')
      }
    }
  }, [id, navigate])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const generateAiResponse = () => {
    setIsLoading(true)
    setTimeout(() => {
      let response = ''
      if (note) {
        switch (aiAction) {
          case 'summarize':
            response = `Summary of "${note.title}":\n\n${generateSummary(note.content)}`
            break
          case 'analyze':
            response = `Analysis of "${note.title}":\n\n${generateAnalysis(note.content)}`
            break
          case 'suggest':
            response = `Suggestions for "${note.title}":\n\n${generateSuggestions(note.content)}`
            break
          default:
            response = 'Please select an AI action.'
        }
      }
      setAiResponse(response)
      setIsLoading(false)
      toast({
        title: "AI Assistant",
        description: `Generated ${aiAction} for your note`,
      })
    }, 1500) // Simulate AI processing time
  }

  // Simulated AI functions (in a real app, these would call actual AI APIs)
  const generateSummary = (content: string) => {
    const sentences = content.split(/[.!?]+/).filter(Boolean)
    return sentences.slice(0, Math.min(2, sentences.length)).join('. ') + (sentences.length > 2 ? '...' : '')
  }

  const generateAnalysis = (content: string) => {
    const wordCount = content.split(/\s+/).filter(Boolean).length
    const sentenceCount = content.split(/[.!?]+/).filter(Boolean).length
    
    return `This note contains ${wordCount} words in approximately ${sentenceCount} sentences. 
    
The tone appears to be ${['informative', 'casual', 'formal'][Math.floor(Math.random() * 3)]}.
    
Key topics identified:
- ${generateRandomTopic()}
- ${generateRandomTopic()}
- ${generateRandomTopic()}`
  }

  const generateRandomTopic = () => {
    const topics = ['Organization', 'Ideas', 'Projects', 'Work', 'Personal', 'Learning', 'Research', 'Planning', 'Questions', 'Solutions']
    return topics[Math.floor(Math.random() * topics.length)]
  }

  const generateSuggestions = (content: string) => {
    return `Based on your note, you might want to consider:

1. ${['Adding more specific details', 'Breaking this into smaller sections', 'Creating action items'][Math.floor(Math.random() * 3)]}
2. ${['Researching more about this topic', 'Connecting this to your other notes', 'Setting a reminder for follow-up'][Math.floor(Math.random() * 3)]}
3. ${['Sharing these ideas with others', 'Creating a visual representation', 'Adding references or sources'][Math.floor(Math.random() * 3)]}`
  }

  if (!note) {
    return (
      <div className="container mx-auto max-w-2xl py-10 px-4">
        <div className="text-center py-10">Loading note...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/notes')}
        >
          <ArrowLeft size={16} />
          Back to Notes
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-purple-600">{note.title}</h1>
        <p className="text-sm text-gray-500 mb-4">Created on {formatDate(note.createdAt)}</p>
        <div className="bg-white p-4 rounded-lg border whitespace-pre-wrap">
          {note.content}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-600">
          <Sparkles size={18} />
          AI Assistant
        </h2>
        
        <div className="flex space-x-2 mb-4">
          <Button 
            variant={aiAction === 'summarize' ? 'default' : 'outline'} 
            onClick={() => setAiAction('summarize')}
            className={aiAction === 'summarize' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Summarize
          </Button>
          <Button 
            variant={aiAction === 'analyze' ? 'default' : 'outline'} 
            onClick={() => setAiAction('analyze')}
            className={aiAction === 'analyze' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Analyze
          </Button>
          <Button 
            variant={aiAction === 'suggest' ? 'default' : 'outline'} 
            onClick={() => setAiAction('suggest')}
            className={aiAction === 'suggest' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Suggest Ideas
          </Button>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <RotateCw className="animate-spin h-6 w-6 text-purple-600" />
                <span className="ml-2">Thinking...</span>
              </div>
            ) : aiResponse ? (
              <div className="whitespace-pre-line">{aiResponse}</div>
            ) : (
              <div className="text-gray-500 italic">Select an AI action and click "Generate" to get AI assistance with your note.</div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              onClick={generateAiResponse} 
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              <Sparkles size={16} />
              Generate
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default NoteView
