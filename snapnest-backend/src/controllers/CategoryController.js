const { Category } = require("../models");

// 1️⃣ Criar Categoria
async function createCategory(req, res) {
  try {
    const { name } = req.body;

    // Verificando se o campo 'name' foi preenchido
    if (!name) {
      return res.status(400).json({ message: "O nome da categoria é obrigatório!" });
    }

    // Verificando se a categoria já existe
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ message: "Categoria já existente!" });
    }

    // Criando a nova categoria
    const newCategory = await Category.create({ name });

    return res.status(201).json({ message: "Categoria criada com sucesso!", category: newCategory });
  } catch (error) {
    console.error("❌ Erro ao criar categoria:", error);
    return res.status(500).json({ message: "Erro ao criar categoria", error: error.message });
  }
}

// 2️⃣ Listar Todas as Categorias
async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();

    if (categories.length === 0) {
      return res.status(404).json({ message: "Nenhuma categoria encontrada." });
    }

    return res.json(categories);
  } catch (error) {
    console.error("❌ Erro ao buscar categorias:", error);
    return res.status(500).json({ message: "Erro ao buscar categorias", error: error.message });
  }
}

// 3️⃣ Mostrar Categoria por ID
async function getCategoryById(req, res) {
  try {
    const categoryId = req.params.id;

    const category = await Category.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    return res.json(category);
  } catch (error) {
    console.error("❌ Erro ao buscar categoria pelo ID:", error);
    return res.status(500).json({ message: "Erro ao buscar categoria", error: error.message });
  }
}

// 4️⃣ Atualizar Categoria
async function updateCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome da categoria é obrigatório!" });
    }

    const category = await Category.findOne({ where: { id: categoryId } });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    // Atualizando a categoria
    category.name = name;
    await category.save();

    return res.json({ message: "Categoria atualizada com sucesso!", category });
  } catch (error) {
    console.error("❌ Erro ao atualizar categoria:", error);
    return res.status(500).json({ message: "Erro ao atualizar categoria", error: error.message });
  }
}

// 5️⃣ Deletar Categoria
async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.id;

    const category = await Category.findOne({ where: { id: categoryId } });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    // Deletando a categoria
    await category.destroy();

    return res.json({ message: "Categoria deletada com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao deletar categoria:", error);
    return res.status(500).json({ message: "Erro ao deletar categoria", error: error.message });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
