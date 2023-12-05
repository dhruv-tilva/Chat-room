import { AuthenticatedApp } from "./components/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/UnauthenticatedApp";
import "./App.css";
import { getTokenFromCookie, deleteTokenCookie, deleteUser } from "./utils";

function App() {
  const token = getTokenFromCookie();

  const logout = () => {
    deleteTokenCookie();
    deleteUser();
    window.location.reload();
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: token ? "space-between" : "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>💬 Chat Room</h1>
        {token && (
          <button onClick={logout} className="send-message">
            Logout
          </button>
        )}
      </div>
      {token ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
