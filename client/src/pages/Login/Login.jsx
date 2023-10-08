import "../../components/dashboard/formularios/formulario.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoginUser, reset } from "../../Auth/authSlice";
import { Alert, Button, Spinner } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
  return (
    <section className="flexCT">
      <div className="form-container">
        <form onSubmit={Auth} className="form">
          {isError && (
            <Alert variant="danger" show={isError}>
              {message}
            </Alert>
          )}
          <span className="titulo-login">login</span>
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
            />
          </div>
          <div>
            <label for="password">Password</label>
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
              {isLoading ? (
                <>
                  Cargando... <Spinner animation="border" size="sm" />
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
