import { getDatabase, ref, onValue, set } from 'firebase/database'

export function store(userId: string, score: number) {
  const db = getDatabase()
  const reference = ref(db, 'points/' + userId)
  set(reference, {
    highscore: score,
  })
}

export function setupPointListener(doSomething: (point: any) => void) {
  const db = getDatabase()
  const reference = ref(db, 'points')
  onValue(reference, (snapshot) => {
    const points = snapshot.val()
    doSomething(Object.values(points));
  })
}
