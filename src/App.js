import logo from './logo.svg';
import './App.css';

function App() {
  return (
    // JSX를 따르고 있어서 class 말고 className이라고 작성해준다.
    <div className="gray-background">
      <img src={logo} lat='logo' />
      <h2>Let's develop management system!</h2>
    </div>
  );
}

export default App;
