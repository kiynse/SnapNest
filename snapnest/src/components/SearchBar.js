import React, { useState } from 'react';
import '../style/SearchBar.css'; // Adicione seus estilos aqui
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Controla o texto na barra de pesquisa
  const [isFocused, setIsFocused] = useState(false); // Controla o foco no input

  // Função para limpar a pesquisa
  const handleClearSearch = () => {
    setSearchQuery(""); // Limpa o texto da pesquisa
  };

  return (
    <div className="navbar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="search-bar"
          value={searchQuery} // O valor do input é controlado pelo estado searchQuery
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado com o valor do input
          onFocus={() => setIsFocused(true)} // Marca o input como focado
          onBlur={() => setIsFocused(false)} // Marca o input como não focado
        />
        <i className="bi bi-search search-icon"></i> {/* Ícone de lupa */}

        {/* Ícone de "x" que aparece quando o campo está focado e tem texto */}
        {searchQuery && isFocused && (
          <i 
            className="bi bi-x-circle clear-icon" 
            onClick={handleClearSearch} // Chama a função para limpar o campo
          ></i>
        )}
      </div>
      <div className="profile-container">
        <img
          src="https://via.placeholder.com/40" // Substitua com o link da sua foto
          alt="Perfil"
          className="profile-image"
        />
      </div>
    </div>
  );
};

export default Navbar;
