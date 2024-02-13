import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import FavContexProvider from "./context/FavContex.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <FavContexProvider>
      <div className="bg-[rgb(11,22,34)]">
        <App/>
      </div>
    </FavContexProvider>
  </AuthContextProvider>
);
