import Homepage from './Pages/Homepage/Homepage';
import { MotionConfig } from 'framer-motion';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Homepage />
    </MotionConfig>
  );
}

export default App;
