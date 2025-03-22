// imports
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

// Define the App component
function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

// Export the App component
export default App;
