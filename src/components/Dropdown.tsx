type DropdownProps = {
  keys: string[]
  data: string[]
}

export default function Dropdown({ data, keys }: DropdownProps) {
  return (
    <select className="select-bordered select w-full max-w-xs">
      {data.map((value, i) => (
        <option key={keys[i]}>{value}</option>
      ))}
    </select>
  )
}
