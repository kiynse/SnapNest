const bcrypt = require("bcryptjs");
const { User } = require("../models");

const UserController = {

  async createUser(req, res) {
    try {
        const { name, email, password, username, birthDate, socialLink, profilePicture } = req.body;
    
        // Verificando se todos os campos obrigatórios foram preenchidos
        if (!name || !email || !password || !username) {
          return res.status(400).json({ message: "Preencha todos os campos obrigatórios!" });
        }
    
        // Verificando se o e-mail ou username já estão cadastrados
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
          return res.status(400).json({ message: "E-mail já cadastrado!" });
        }
    
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
          return res.status(400).json({ message: "Username já está em uso!" });
        }
    
        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Criando o novo usuário com os dados recebidos
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
          username,
          birthDate,
          socialLink,
          profilePicture, // Aqui estamos assumindo que o caminho da imagem já foi enviado
        });
    
        return res.status(201).json({
          message: "Usuário criado com sucesso!",
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            birthDate: newUser.birthDate,
            socialLink: newUser.socialLink,
            profilePicture: newUser.profilePicture
          }
        });
      } catch (error) {
        console.error("❌ Erro ao criar usuário:", error); // Log detalhado para facilitar a depuração
        return res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
      }
    },

  async updateUser(req, res) {
    try {
      const userId = req.user.id; // Pega o ID do usuário autenticado
      const { name, username, birthDate, socialLink } = req.body;

      // Verifica se o username já existe (excluindo o próprio usuário)
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: "Username já está em uso" });
      }

      const updatedUser = await User.update(
        { name, username, birthDate, socialLink },
        { where: { id: userId } }
      );

      if (updatedUser[0] === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json({ message: "Perfil atualizado com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "Erro ao atualizar perfil" });
    }
  },

  // Atualizar foto de perfil
  async updateProfilePicture(req, res) {
    try {
      const userId = req.user.id;
      if (!req.file) {
        return res.status(400).json({ message: "Imagem é obrigatória!" });
      }

      const profilePicture = `/uploads/${req.file.filename}`;
      await User.update({ profilePicture }, { where: { id: userId } });

      return res.json({ message: "Foto de perfil atualizada!", profilePicture });
    } catch (error) {
      console.error("❌ Erro ao atualizar foto de perfil:", error);
      return res.status(500).json({ message: "Erro ao atualizar foto" });
    }
  },

  // Deletar usuário
  async deleteUser(req, res) {
    try {
      const userId = req.user.id;
      const deletedUser = await User.destroy({ where: { id: userId } });

      if (!deletedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json({ message: "Conta deletada com sucesso!" });
    } catch (error) {
      console.error("❌ Erro ao deletar usuário:", error);
      return res.status(500).json({ message: "Erro ao deletar conta" });
    }
  },

  async getAllUsers(req, res){
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'username', 'birthDate', 'socialLink', 'profilePicture']
      });
  
      if (users.length === 0) {
        return res.status(404).json({ message: "Nenhum usuário encontrado." });
      }
  
      return res.json(users);
    } catch (error) {
      console.error("❌ Erro ao buscar todos os usuários:", error);
      return res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
    }
  },

  async  getUserById(req, res) {
    try {
      const userId = req.params.id;
  
      const user = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'name', 'email', 'username', 'birthDate', 'socialLink', 'profilePicture']
      });
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
  
      return res.json(user);
    } catch (error) {
      console.error("❌ Erro ao buscar usuário pelo id:", error);
      return res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
    }
  }
  


};
module.exports = UserController;
