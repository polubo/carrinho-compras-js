// Função para adicionar um produto ao carrinho
function adicionar() {
    // Obter os elementos de produto e quantidade
    const produtoElement = document.getElementById('produto');
    const quantidadeElement = document.getElementById('quantidade');

    // Obter os valores de produto e quantidade
    const produtoSelecionado = produtoElement.value;
    const quantidade = parseInt(quantidadeElement.value);

    // Validar a quantidade
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    // Obter a lista de produtos no carrinho e o valor total
    const listaProdutos = document.getElementById('lista-produtos');
    const valorTotalElement = document.getElementById('valor-total');

    // Extrair o nome do produto e o preço
    const [produtoNome, produtoPreco] = produtoSelecionado.split(" - R$");
    const preco = parseFloat(produtoPreco.replace(',', '.'));

    // Verificar se o produto já está no carrinho
    let produtoExistente = false;
    const itensCarrinho = listaProdutos.getElementsByClassName('carrinho__produtos__produto');
    for (let item of itensCarrinho) {
        if (item.textContent.includes(produtoNome)) {
            const quantidadeAtual = parseInt(item.textContent.split('x')[0]);
            const novoQuantidade = quantidadeAtual + quantidade;
            const novoValorItem = novoQuantidade * preco;
            item.innerHTML = `<span class="texto-azul">${novoQuantidade}x</span> ${produtoNome} <span class="texto-azul">R$${novoValorItem.toFixed(2)}</span>`;
            produtoExistente = true;
            break;
        }
    }

    if (!produtoExistente) {
        // Calcular o valor total do novo item
        const valorItem = quantidade * preco;

        // Criar um novo elemento para o item do carrinho
        const novoItem = document.createElement('section');
        novoItem.classList.add('carrinho__produtos__produto');
        novoItem.innerHTML = `<span class="texto-azul">${quantidade}x</span> ${produtoNome} <span class="texto-azul">R$${valorItem.toFixed(2)}</span>`;

        // Adicionar o novo item à lista de produtos no carrinho
        listaProdutos.appendChild(novoItem);
    }

    // Atualizar o valor total
    const valorTotalAtual = parseFloat(valorTotalElement.textContent.replace('R$', '').replace(',', '.'));
    const novoValorTotal = valorTotalAtual + (quantidade * preco);
    valorTotalElement.textContent = `R$${novoValorTotal.toFixed(2)}`;
}
  
  // Função para limpar o carrinho
  function limpar() {
    // Obter a lista de produtos no carrinho e o valor total
    const listaProdutos = document.getElementById('lista-produtos');
    const valorTotalElement = document.getElementById('valor-total');
  
    // Remover todos os itens do carrinho
    listaProdutos.innerHTML = '';
  
    // Resetar o valor total para zero
    valorTotalElement.textContent = 'R$0,00';
  }
  
// Adicionar os eventos aos botões apenas se eles ainda não foram adicionados
const botaoAdicionar = document.querySelector('.botao-adicionar');
if (!botaoAdicionar.hasEventListener('click', adicionar)) {
    botaoAdicionar.addEventListener('click', adicionar);
}

const botaoLimpar = document.querySelector('.botao-limpar');
if (!botaoLimpar.hasEventListener('click', limpar)) {
    botaoLimpar.addEventListener('click', limpar);
}