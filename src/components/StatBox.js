function StatBox({ label, stat }) {
  return (
    <div className="flex flex-column items-center ph3">
      <div className="f4 mb2 b">{label}</div>
      <div className="f2">{stat}</div>
    </div>
  )
}

export default StatBox
