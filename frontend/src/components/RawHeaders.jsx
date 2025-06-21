function RawHeaders({ headers }) {
  return (
    <pre className="bg-slate-800 p-4 rounded text-sm overflow-x-auto mb-8">
      {JSON.stringify(headers, null, 2)}
    </pre>
  )
}

export default RawHeaders
