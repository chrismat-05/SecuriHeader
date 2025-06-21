function SummaryMessage({ status, summary }) {
  return (
    <div
      className={`p-4 rounded mb-4 ${
        status === "pass" ? "bg-green-800" : "bg-yellow-800"
      }`}
    >
      <p className="whitespace-pre-line">{summary}</p>
    </div>
  )
}

export default SummaryMessage
