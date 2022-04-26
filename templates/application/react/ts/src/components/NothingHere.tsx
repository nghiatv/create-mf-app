const NothingHere = () => {
  return (
    <div className="{{TAILWIND_PREFIX}}p-6">
      <div>Name: {{ NAME }}</div>
      <div>Framework: {{ FRAMEWORK }}</div>
      <div>Language: {{ LANGUAGE }}</div>
      <div>CSS: {{ CSS }}</div>
    </div>
  )
}
export default NothingHere
