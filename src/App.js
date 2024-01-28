import "./style/variables.scss";
import AppProvider from "./AppContext";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <AppProvider>
        <Layout />
        <h1>Aplikacja</h1>
      </AppProvider>
    </>
  );
}

export default App;
