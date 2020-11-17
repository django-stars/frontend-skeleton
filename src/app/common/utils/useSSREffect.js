import { useMemo } from 'react'


let lastIndex = 0
let alreadyEmited = new Set()

export default function usuSSREffect(func) {
  let currentIndex = useMemo(() => lastIndex++, [])

  if(!alreadyEmited.has(currentIndex)) {
    alreadyEmited.add(currentIndex)
    func()
  }
}
