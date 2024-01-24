import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import PizzaStagesSection from "./components/PizzaStagesSection";
import MainSection from "./components/MainSection";
import PizzaForm from "./components/PizzaForm";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <div className="column">
          <PizzaForm />
        </div>
        <PizzaStagesSection />
        <MainSection />
      </div>
    </Provider>
  );
}

export default App;
