import { useState } from "react"

function UrlInput({ onSubmit }) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return alert("URL must start with http:// or https://")
    }
    onSubmit(url)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="url"
        placeholder="https://example.com"
        className="flex-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
        Analyze
      </button>
    </form>
  )
}

export default UrlInput
