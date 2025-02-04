import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  // Importe o SweetAlert2
import { Link } from "react-router-dom";  // Importe o Link do react-router-dom
import "../style/Login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Enviando dados do usuário para a API
      await axios.post("http://localhost:3000/users/", { name, email, password, username });

      // Exibindo SweetAlert2 de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Cadastro bem-sucedido!',
        text: 'Você foi registrado com sucesso!',
      }).then(() => {
        // Redireciona para a página de login após o alerta de sucesso
        navigate("/"); // Use navigate para redirecionar para a página de login
      });

    } catch (error) {
      console.error("Erro ao criar usuário", error);

      // Exibindo SweetAlert2 de erro
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao cadastrar, por favor tente novamente.',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="logo.png" alt="Logo" className="logo" />
        <h2 style={{ marginBottom: "0px" }}>Cadastre-se para ver mais!</h2>
        <p className="Cadastrar-mensagem">Um mundo de descobertas começa aqui</p>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Cadastrar</button>
        </form>
        <div className="signup-text">
          <p>
            Já possui conta? <Link to="/">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
