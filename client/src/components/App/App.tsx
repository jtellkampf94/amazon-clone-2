import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
