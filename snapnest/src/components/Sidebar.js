import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaBell, FaEnvelope, FaCog } from "react-icons/fa"; // Ícones do React Icons
import "../style/Sidebar.css"; // Arquivo de estilos

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false); // Estado para controlar o popup
  const [settingsSelected, setSettingsSelected] = useState(false); // Estado para controlar a seleção do ícone de configurações
  const [selectedItem, setSelectedItem] = useState(null); // Estado para controlar o item selecionado

  // Função para abrir/fechar o popup de configurações
  const toggleSettingsPopup = () => {
    setSettingsOpen(!settingsOpen);
    setSettingsSelected(!settingsSelected); // Alterna o estado da seleção
  };

  // Função para marcar o item como selecionado
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <Link to="/home">
            <img src="/logo.png" alt="Logo" className="logo-img" /> {/* Substitua pelo caminho do seu logo */}
          </Link>
        </div>

        {/* Lista de Links com ícones usando divs */}
        <div className="sidebar-menu">
          <div
            className={`sidebar-item ${selectedItem === "create" ? "selected" : ""}`}
            onClick={() => handleItemClick("create")}
          >
            <Link to="/create">
              <FaPlus size={20} />
            </Link>
          </div>
          <div
            className={`sidebar-item ${selectedItem === "notifications" ? "selected" : ""}`}
            onClick={() => handleItemClick("notifications")}
          >
            <Link to="/notifications">
              <FaBell size={20} />
            </Link>
          </div>
          <div
            className={`sidebar-item ${selectedItem === "messages" ? "selected" : ""}`}
            onClick={() => handleItemClick("messages")}
          >
            <Link to="/messages">
              <FaEnvelope size={20} />
            </Link>
          </div>
        </div>

        {/* Ícone de Configurações */}
        <div
          className={`sidebar-settings ${settingsSelected ? "selected" : ""}`}
          onClick={toggleSettingsPopup}
        >
          <Link to="#" onClick={(e) => e.preventDefault()}>
            <FaCog size={20} />
          </Link>
        </div>

        {/* Popup de Configurações */}
        {settingsOpen && (
          <div className="settings-popup">
            <div>
              <Link to="/settings">Configurações</Link>
            </div>
            <div>
              <Link to="/logout">Sair</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
