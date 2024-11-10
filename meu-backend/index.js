const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let livros = [];

// Criar livro (Create)
app.post('/livros', (req, res) => {
  const { titulo, autor, ano } = req.body;
  const livro = { id: livros.length + 1, titulo, autor, ano };
  livros.push(livro);
  res.status(201).json(livro);
});

// Ler todos os livros (Read)
app.get('/livros', (req, res) => {
  res.json(livros);
});

// Atualizar livro (Update)
app.put('/livros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano } = req.body;
  const livro = livros.find((livro) => livro.id === parseInt(id));
  if (livro) {
    livro.titulo = titulo;
    livro.autor = autor;
    livro.ano = ano;
    res.json(livro);
  } else {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
});

// Deletar livro (Delete)
app.delete('/livros/:id', (req, res) => {
  const { id } = req.params;
  const index = livros.findIndex((livro) => livro.id === parseInt(id));
  if (index !== -1) {
    const livroDeletado = livros.splice(index, 1);
    res.json(livroDeletado);
  } else {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
