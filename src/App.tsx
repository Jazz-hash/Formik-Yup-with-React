import { Box } from "@material-ui/core";
import React from "react";
import "./App.css";
import MultiStepper from "./components/MultiStepper";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Box boxShadow={2} style={{ width: "70%" }}>
        <MultiStepper />
      </Box>
      <Box boxShadow={2} style={{ width: "70%", margin: "20px" }}>
        <Signup />
      </Box>
    </div>
  );
}

export default App;
