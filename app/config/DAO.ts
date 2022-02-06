import { getDatabase, ref, onValue, set } from 'firebase/database'

export function store(userId: string, score: number) {
  const db = getDatabase()
  const reference = ref(db, 'users/' + userId)
  set(reference, {
    highscore: score,
  })
}

export function setupHighscoreListener(userId: string) {
  const db = getDatabase()
  const reference = ref(db, 'users/' + userId)
  onValue(reference, (snapshot) => {
    const highscore = snapshot.val().highscore
    console.log('New high score: ' + highscore)
  })
}
