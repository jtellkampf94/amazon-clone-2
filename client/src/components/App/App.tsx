import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route exact path="/" component={Home} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
