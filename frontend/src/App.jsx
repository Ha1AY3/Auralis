import React from 'react'
import Approutes from './Approutes'
import { AuthProvider } from './features/auth/auth.context'
import { SongProvider } from './features/home/song.context'
import { MoodProvider } from './context/mood.context'


const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <MoodProvider>
          <Approutes />
        </MoodProvider>
      </SongProvider>
    </AuthProvider>
  )
}

export default App

