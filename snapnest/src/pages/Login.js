import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Importando o SweetAlert
import "../style/Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/login", {
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
                    <a href="/forgot-password" className="forgot-password">
                        Esqueceu a senha?
                    </a>
                    <button type="submit" className="login-btn">Entrar</button>
                    <div className="signup-text">
                        <p>
                            Não possui conta? <a href="/register">Cadastre-se</a>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
