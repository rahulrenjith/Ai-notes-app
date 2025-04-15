
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const NewNote: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { toast } = useToast()

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

    // TODO: Implement actual note saving logic
    toast({
      title: "Note Created",
      description: "Your note has been saved successfully",
    })

    // Reset form
    setTitle('')
    setContent('')
  }

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
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
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Save Note</Button>
        </div>
      </form>
    </div>
  )
}

export default NewNote
