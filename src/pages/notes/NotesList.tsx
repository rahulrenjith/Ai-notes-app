
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    // Load notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    setNotes(storedNotes)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-600">My Notes</h1>
        <Link to="/notes/new">
          <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
            <PlusCircle size={16} />
            Create Note
          </Button>
        </Link>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-600 mb-4">No notes yet</h3>
          <p className="text-gray-500 mb-6">Create your first note to get started</p>
          <Link to="/notes/new">
            <Button className="bg-purple-600 hover:bg-purple-700">Create Note</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <Card key={note.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{note.title}</CardTitle>
                <CardDescription>{formatDate(note.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600 line-clamp-3">{note.content}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button variant="outline" size="sm">View Note</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default NotesList
