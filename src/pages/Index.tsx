
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Smart Notes AI
        </h1>
        <p className="text-xl text-gray-600">
          Your intelligent note-taking companion powered by artificial intelligence
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/notes/new">
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              Create New Note
            </Button>
          </Link>
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
            Explore Features
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Index
