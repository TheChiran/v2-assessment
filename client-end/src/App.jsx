import "./assets/styles/scss/App.scss";
import Routes from "./routes";
import "antd/dist/antd.css";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const navigate = useNavigate();

  const navigateTo = (url) => {
    navigate(`${url}`);
  };

  const appContextStore = {
    navigateURL: navigateTo,
  };

  return (
    <AppContext.Provider value={appContextStore}>
      <Routes />
    </AppContext.Provider>
  );
}

export default App;
