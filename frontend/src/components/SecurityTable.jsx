function SecurityTable({ report }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-left table-auto border border-slate-700">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-2">Header</th>
            <th className="p-2">Status</th>
            <th className="p-2">Severity</th>
            <th className="p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(report).map(([name, details]) => (
            <tr
              key={name}
              className={`${
                details.status === "missing" ? "bg-red-900" : "bg-green-900"
              }`}
            >
              <td className="p-2 font-bold">{name}</td>
              <td className="p-2 capitalize">{details.status}</td>
              <td className="p-2">{details.severity}</td>
              <td className="p-2 text-sm">{details.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SecurityTable
