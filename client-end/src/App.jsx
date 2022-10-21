import "./assets/styles/scss/App.scss";
import Routes from "./routes";
import "antd/dist/antd.css";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const AppStore = store();
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
    <Provider store={AppStore}>
      <AppContext.Provider value={appContextStore}>
        <Routes />
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
