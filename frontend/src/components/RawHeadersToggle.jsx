function RawHeadersToggle({ show, setShow }) {
  return (
    <button
      onClick={() => setShow(!show)}
      className="text-blue-400 underline mb-4"
    >
      {show ? "Hide Raw Headers" : "Show Raw Headers"}
    </button>
  )
}

export default RawHeadersToggle
