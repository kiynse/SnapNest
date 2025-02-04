const { Post, Category } = require("../models");

const PostController = {
  // 1️⃣ Criar Post com Múltiplas Categorias
  async createPost(req, res) {
    try {
      // Verificar se a imagem foi enviada
      if (!req.file) {
        return res.status(400).json({ message: "Imagem é obrigatória!" });
      }

      const { title, description, categoryIds } = req.body;

      // Verificar se o título e descrição foram passados
      if (!title || !description) {
        return res.status(400).json({ message: "Título e descrição são obrigatórios!" });
      }

      // Verificar se as categorias foram passadas
      if (!categoryIds || categoryIds.length === 0) {
        return res.status(400).json({ message: "Pelo menos uma categoria é obrigatória!" });
      }

      // Criar o novo post
      const imageUrl = `/uploads/${req.file.filename}`;
      const userId = req.user.id; // Pegamos o usuário autenticado

      const newPost = await Post.create({
        title,
        description,  // Adicionando a descrição ao post
        imageUrl,
        userId,
      });

      // Associe as categorias ao post
      const categories = await Category.findAll({
        where: {
          id: categoryIds,
        },
      });

      // Estabelecer a associação muitos para muitos entre o post e as categorias
      await newPost.setCategories(categories);

      return res.status(201).json({ message: "Post criado com sucesso!", post: newPost });
    } catch (error) {
      console.error("❌ Erro ao criar post:", error);
      return res.status(500).json({ message: "Erro ao criar post", error: error.message });
    }
  },

  // 2️⃣ Mostrar Todos os Posts
  async getAllPosts(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: Category,
            as: "categories", // Incluindo as categorias associadas
            attributes: ["id", "name"],
          },
        ],
      });

      if (posts.length === 0) {
        return res.status(404).json({ message: "Nenhum post encontrado." });
      }

      return res.json(posts);
    } catch (error) {
      console.error("❌ Erro ao buscar posts:", error);
      return res.status(500).json({ message: "Erro ao buscar posts", error: error.message });
    }
  },

  // 3️⃣ Mostrar Post pelo ID
  async getPostById(req, res) {
    try {
      const postId = req.params.id;

      const post = await Post.findOne({
        where: { id: postId },
        include: [
          {
            model: Category,
            as: "categories", // Incluindo as categorias associadas
            attributes: ["id", "name"],
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ message: "Post não encontrado." });
      }

      return res.json(post);
    } catch (error) {
      console.error("❌ Erro ao buscar post:", error);
      return res.status(500).json({ message: "Erro ao buscar post", error: error.message });
    }
  },
};

module.exports = PostController;
