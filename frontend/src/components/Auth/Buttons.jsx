import "./App.css";
export default function Buttons(prop) {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: "30px" }}>
        <button
          className="btn-logout"
          style={{ margin: "10px" }}
          onClick={prop.login}
        >
          Login
        </button>
        <button
          className="btn-logout"
          style={{ margin: "10px" }}
          onClick={prop.logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
