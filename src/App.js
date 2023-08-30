import React from "react";
import Header from "./components/Layouts/Header";
import Meal from "./components/Meals/Meal";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Meal />
      </main>
    </React.Fragment>
  );
}

export default App;
