// Define a data alvo
function toggleMenu() {
    var menu = document.querySelector('.container-menu');
    menu.classList.toggle('show');
  }
  
  const dataAlvo = new Date('September 15, 2024 07:00:00').getTime();
  
  // Atualiza o contador a cada segundo
  const intervalo = setInterval(function() {
      const agora = new Date().getTime();
      const diferenca = dataAlvo - agora;
  
      // Cálculo do tempo restante
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000).toString().padStart(2, '0');
      
      // Exibe o resultado no elemento com id="contadordias"
      document.getElementById('contadordias').innerHTML = `${dias} DIAS`;
      document.getElementById('contador').innerHTML = `${horas}:${minutos}:${segundos}`;
      
      // Se a contagem terminar, exibe uma mensagem
      if (diferenca < 0) {
          clearInterval(intervalo);
          document.getElementById('contador').innerHTML = "Contagem finalizada!";
      }
  }, 1000);
  
  let porcentagem = 90;
  
  // Espera o carregamento do conteúdo da página antes de iniciar a animação
  window.onload = function() {
    // Aplica a porcentagem ao estilo da barra com a animação
    document.getElementById('barra').style.width = `${porcentagem}%`;
  };

  window.onload = function() {
    // Obtém o valor da tabela valor_bar
    fetch('/valor')
        .then(response => response.json())
        .then(data => {
            document.getElementById('numero-insc').textContent = `${data.valor} virtuosas`;
            updateProgressBar(data.valor); // Atualiza a barra de progresso com o valor obtido
        })
        .catch(error => {
            console.error('Erro ao carregar valor:', error);
            document.getElementById('numero-insc').textContent = 'Erro ao carregar valor';
        });
  };

  async function updateProgressBar(valorAtual) {
    try {
        const total = 3000; // Total para calcular a porcentagem
        const porcentagem = (valorAtual / total) * 100;
  
        // Atualiza a largura da barra de progresso
        document.getElementById('barra').style.width = `${porcentagem}%`;
        // Atualiza o texto com a quantidade de virtuosas
        document.getElementById('numero-insc').textContent = `${valorAtual} virtuosas`;
    } catch (error) {
        console.error('Erro ao atualizar a barra de progresso:', error);
    }
  }
  