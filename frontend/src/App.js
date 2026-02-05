import logo from './logo.svg';
import './App.css';
import Slide1 from './Components/Slide1';

const App = () => {
  return (
    <div className="app">
      {/* Шапка */}
      <header className="header">
        <div className="logo">😎</div>
        <div className="burger-menu">☰</div>
      </header>

      {/* Слайд */}
      <Slide1 />
    </div>
  );
}

export default App;
