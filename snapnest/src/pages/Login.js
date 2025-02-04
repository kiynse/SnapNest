import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Importando o SweetAlert
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom
import "../style/Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                Swal.fire({
                    icon: "success",
                    title: "Login bem-sucedido!",
                    text: "Você será redirecionado para o feed.",
                }).then(() => {
                    navigate("/feed");
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "Email ou senha incorretos. Tente novamente.",
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="logo.png" alt="Logo" className="logo" />
                <p className="login-text">Faça o login para ver mais</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Digite seu email"
                        />
                    </div>
                    <div className="input-container">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Digite sua senha"
                        />
                    </div>
                    {/* Alterei para Link */}
                    <Link to="/forgot-password" className="forgot-password">
                        Esqueceu a senha?
                    </Link>
                    <button type="submit" className="login-btn">Entrar</button>
                    <div className="signup-text">
                        <p>
                            Não possui conta? <Link to="/register">Cadastre-se</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
