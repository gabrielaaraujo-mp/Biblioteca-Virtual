// Espera a página carregar completamente antes de rodar o código
document.addEventListener('DOMContentLoaded', () => {
  
  // Seleciona o formulário de adicionar livros na página
  const bookForm = document.getElementById('bookForm');
  
  // Seleciona o local onde a lista de livros vai ser mostrada
  const bookList = document.getElementById('bookList');
  
  // Seleciona o campo onde o usuário pode escolher como ordenar os livros
  const sortOrder = document.getElementById('sortOrder');

  // Cria um array vazio para armazenar os livros
  let books = [];
  
  // Variável que vai guardar o índice do livro que está sendo editado, começa com valor null (sem livro sendo editado)
  let editIndex = null;

  // Função que mostra todos os livros na tela
  function displayBooks() {
    // Limpa a lista de livros antes de adicionar novamente
    bookList.innerHTML = '';
    
    // Faz uma cópia dos livros para ordenar sem alterar o array original
    let sortedBooks = [...books];
    
    // Verifica qual tipo de ordenação o usuário escolheu (título, autor ou ano) e organiza os livros
    switch (sortOrder.value) {
      case 'title':
        // Ordena os livros pelo título (alfabeticamente)
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        // Ordena os livros pelo autor (alfabeticamente)
        sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'yearAsc':
        // Ordena os livros pelo ano de publicação (crescente)
        sortedBooks.sort((a, b) => a.year - b.year);
        break;
      case 'yearDesc':
        // Ordena os livros pelo ano de publicação (decrescente)
        sortedBooks.sort((a, b) => b.year - a.year);
        break;
    }

    // Para cada livro, cria um item de lista na tela
    sortedBooks.forEach((book, index) => {
      // Cria um novo item de lista (<li>) para o livro
      const li = document.createElement('li');
      
      // Adiciona as informações do livro e botões para editar e excluir
      li.innerHTML = `
        <span>${book.title} - ${book.author} (${book.year})</span>
        <div>
          <button onclick="editBook(${index})">Editar</button>
          <button onclick="deleteBook(${index})">Excluir</button>
        </div>
      `;
      
      // Adiciona o item de lista ao HTML para que apareça na tela
      bookList.appendChild(li);
    });
  }

  // Função para adicionar um novo livro ao array
  function addBook(title, author, year) {
    // Adiciona o novo livro ao array 'books'
    books.push({ title, author, year });
    // Chama a função para exibir os livros na tela
    displayBooks();
  }

  // Função para editar um livro que já está na lista
  window.editBook = (index) => {
    // Pega o livro que o usuário quer editar, com base no índice
    const book = books[index];
    
    // Preenche os campos do formulário com os dados do livro a ser editado
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    
    // Guarda o índice do livro que está sendo editado
    editIndex = index;
  };

  // Função para salvar as alterações de um livro que está sendo editado
  function saveBook(title, author, year) {
    // Substitui o livro antigo com os novos dados
    books[editIndex] = { title, author, year };
    // Limpa o índice de edição, pois não estamos mais editando
    editIndex = null;
    // Exibe novamente a lista de livros na tela com as mudanças
    displayBooks();
  }

  // Função para excluir um livro
  window.deleteBook = (index) => {
    // Pega o livro que o usuário quer excluir
    const book = books[index];
    
    // Exibe uma janela de confirmação perguntando se o usuário tem certeza de que quer excluir o livro
    const confirmDelete = confirm(`Tem certeza de que deseja excluir o livro "${book.title}"?`);
    
    // Se o usuário confirmar, o livro é excluído
    if (confirmDelete) {
      // Remove o livro do array
      books.splice(index, 1);
      // Atualiza a lista de livros na tela
      displayBooks();
    }
  };

  // Este código roda quando o formulário é enviado (quando o usuário clica no botão de salvar)
  bookForm.addEventListener('submit', (event) => {
    // Previne que a página seja recarregada ao enviar o formulário
    event.preventDefault();
    
    // Pega os valores dos campos do formulário
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const yearInput = document.getElementById('year').value;
    const year = parseInt(yearInput, 10); // Converte o ano para um número inteiro
    const currentYear = new Date().getFullYear(); // Pega o ano atual

    // Verifica se o ano de publicação é válido (não pode ser menor que 1000 e nem maior que o ano atual)
    if (isNaN(year) || year < 1000 || year > currentYear) {
      alert("Por favor, insira um ano de publicação válido"); // Exibe uma mensagem de erro se o ano for inválido
      return; // Impede o envio do formulário se a validação falhar
    }

    // Se o índice de edição for null, significa que é um novo livro, então adiciona o livro à lista
    if (editIndex === null) {
      addBook(title, author, year);
    } else {
      // Se já está editando, salva as mudanças no livro
      saveBook(title, author, year);
    }

    // Reseta o formulário para ficar vazio após adicionar ou editar o livro
    bookForm.reset();
  });

  // Evento para ordenar os livros sempre que o usuário mudar o critério de ordenação
  sortOrder.addEventListener('change', displayBooks);
});