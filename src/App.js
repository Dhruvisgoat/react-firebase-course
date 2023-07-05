import Auth from './components/Auth'
import StudentPanel from './components/StudentPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/authContext';


function App() {
  return (
    <>
      <AuthProvider>
      <h1 style={{ display: 'flex', justifyContent: 'center', margin: '30px', border: '3px solid black', padding: '20px', backgroundColor: '#e5e5f7' }}>CRUD APP</h1>
        <Auth />
        <StudentPanel />
      </AuthProvider >
    </>
  );
}
export default App;
