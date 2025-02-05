import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaBell, FaEnvelope, FaCog } from "react-icons/fa"; // Ícones do React Icons
import "../style/Sidebar.css"; // Arquivo de estilos

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSelected, setSettingsSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSettingsPopup = () => {
    setSettingsOpen(!settingsOpen);
    setSettingsSelected(!settingsSelected);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link to="/home">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </Link>
        </div>

        <div className="sidebar-menu">
          <div
            className={`sidebar-item ${selectedItem === "create" ? "selected" : ""}`}
            onClick={() => handleItemClick("create")}
            title="Criar"
          >
            <Link to="/create">
              <FaPlus size={20} />
            </Link>
          </div>
          <div
            className={`sidebar-item ${selectedItem === "notifications" ? "selected" : ""}`}
            onClick={() => handleItemClick("notifications")}
            title="Notificações"
          >
            <Link to="/notifications">
              <FaBell size={20} />
            </Link>
          </div>
          <div
            className={`sidebar-item ${selectedItem === "messages" ? "selected" : ""}`}
            onClick={() => handleItemClick("messages")}
            title="Mensagens"
          >
            <Link to="/messages">
              <FaEnvelope size={20} />
            </Link>
          </div>
        </div>

        <div style={{zIndex: 30}}
          className={`sidebar-settings ${settingsSelected ? "selected" : ""}`}
          onClick={toggleSettingsPopup}
          title="Configurações"
        >
          <Link to="#" onClick={(e) => e.preventDefault()}>
            <FaCog size={20} />
          </Link>
        </div>

        {settingsOpen && (
          <div className="settings-popup" style={{zIndex: 30}}>
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
