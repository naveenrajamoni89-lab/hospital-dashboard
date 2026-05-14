import { useState, useMemo } from 'react'

export default function useSort(initialField = null) {
  const [sortField, setSortField] = useState(initialField)
  const [sortDir, setSortDir] = useState('asc')

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sortFn = useMemo(() => {
    return (items) => {
      if (!sortField || !items) return items
      return [...items].sort((a, b) => {
        let valA = a[sortField]
        let valB = b[sortField]
        if (typeof valA === 'string') valA = valA.toLowerCase()
        if (typeof valB === 'string') valB = valB.toLowerCase()
        if (valA < valB) return sortDir === 'asc' ? -1 : 1
        if (valA > valB) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
  }, [sortField, sortDir])

  const SortHeader = ({ field, children }) => (
    <button
      onClick={() => toggleSort(field)}
      className="inline-flex items-center gap-1 hover:text-gray-900 transition cursor-pointer"
    >
      {children}
      {sortField === field && (
        <span className="text-blue-600 text-xs">{sortDir === 'asc' ? '\u25B2' : '\u25BC'}</span>
      )}
    </button>
  )

  return { sortField, sortDir, toggleSort, sortFn, SortHeader }
}
