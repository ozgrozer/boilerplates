import { createRoot } from 'react-dom/client'

import * as styles from './../css/App.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      Hello World!
    </div>
  )
}

createRoot(document.getElementById('app'))
  .render(<App />)
