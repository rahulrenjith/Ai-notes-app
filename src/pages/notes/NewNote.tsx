
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const NewNote: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note",
        variant: "destructive"
      })
      return
    }

    // Save note to localStorage
    const notes = JSON.parse(localStorage.getItem('notes') || '[]')
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString()
    }
    notes.push(newNote)
    localStorage.setItem('notes', JSON.stringify(notes))

    toast({
      title: "Note Created",
      description: "Your note has been saved successfully",
    })

    // Reset form
    setTitle('')
    setContent('')
    
    // Navigate to the notes list page
    navigate('/notes')
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
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Create New Note</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea 
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={10}
            className="mt-2"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/notes')}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Save Note</Button>
        </div>
      </form>
    </div>
  )
}

export default NewNote
