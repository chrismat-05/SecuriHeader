import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import UrlInput from "./components/UrlInput"
import SummaryMessage from "./components/SummaryMessage"
import SecurityTable from "./components/SecurityTable"
import RawHeadersToggle from "./components/RawHeadersToggle"
import RawHeaders from "./components/RawHeaders"

function App() {
  const [data, setData] = useState(null)
  const [showRaw, setShowRaw] = useState(false)

  const handleSubmit = async (url) => {
    setData(null)
    toast.loading("Analyzing headers...")
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const result = await res.json()
      toast.dismiss()
      if (!res.ok) throw new Error(result.detail || "Unknown error")
      setData(result)
      toast.success("Analysis complete!")
    } catch (err) {
      toast.dismiss()
      toast.error(`Error: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto text-white bg-[#0f172a]">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">SecuriHeader</h1>
      <UrlInput onSubmit={handleSubmit} />
      {data && (
        <>
          <SummaryMessage status={data.status} summary={data.summary} />
          <SecurityTable report={data.security_analysis} />
          <RawHeadersToggle show={showRaw} setShow={setShowRaw} />
          {showRaw && <RawHeaders headers={data.raw_headers} />}
        </>
      )}
    </div>
  )
}

export default App
