import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../Auth/authSlice.js";
import { Alert, Button } from "react-bootstrap";
import "../../components/dashboard/formularios/formulario.css";
const Login = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/administrador/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ nombre, password }));
  };

  return (
    <section className="flexCT">
      <div className="form-container">
        <form onSubmit={Auth} className="form">
          <Alert className="alert text-center custom-alert" show={isError}>
            {message}
          </Alert>
          <span className="titulo-login">login</span>
          <div>
            <label htmlFor="nombre">Email</label>
            <input
              type="text"
              id="nombre"
              className="input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="email@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
            />
          </div>

          <div className="button-container-login">
            <Button
              type="submit"
              className="send-button" // Desactivar el botón cuando está cargando
            >
              {isLoading ? <>Cargando...</> : "Iniciar Sesión"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
