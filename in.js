

let deck = [
    {
      id: 1,
      name: "jett",
      color: "#84CFFA",
      imagem: "imagens/jett.jpg",
      descricao: ["descricao 1", "descricao 2", "descricao 3"],
      virado: true,
    },
    {
      id: 2,
      name: "neon",
      color: "#FA8484",
      imagem: "imagens/neon.jpg",
      descricao: ["descricao 1", "descricao 2", "descricao 3"],
      virado: true,
    },
    {
      id: 3,
      name: "sage",
      color: "#E984FA",
      imagem: "imagens/sage.jpg",
      descricao: ["descricao 1", "descricao 2", "descricao 3"],
      virado: true,
    },
    {
      id: 4,
      name: "viper",
      color: "#84FAAC",
      imagem: "imagens/viper.jpg",
      descricao: ["descricao 1", "descricao 2", "descricao 3"],
      virado: true,
    },
   
  ];
  
  const cards = document.querySelectorAll('.card');
  
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let movements = 0;
  let winContador = 0;
  let score = 0;

  function flipCard() {
   
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
  
     if (!hasFlippedCard) {
       hasFlippedCard = true;
       firstCard = this;
       return;
      }
  
      console.log(winContador)
       
      secondCard = this;
   
      checkForMatch();
  }
   
    
  
    function checkForMatch() {
      if(firstCard.dataset.nome !== secondCard.dataset.nome) {
        movements++;
        score-=5;
      }else{
        score+=10;
      }
      document.getElementById("movimentos").innerHTML = `${movements}`;
      document.getElementById("movimentos2").innerHTML = `${movements}`;
      document.getElementById("pontuacao").innerHTML = `${score}`;
        
      if (firstCard.dataset.nome === secondCard.dataset.nome) {
        winContador++;
        //score+=10;
        disableCards();
        
        if(winContador == 4) {
          setTimeout(() => {
            document.querySelector('#vitoria').style.display = 'block'
            document.querySelector('#movimentosvitoria').innerHTML = movements
            document.querySelector('#pontuacaovitoria').innerHTML = score;
          }, 1000);
        }
        
        return;
      }
  
   
      unflipCards();
  
      console.log(movements);
  
    }
   
    
  
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      resetBoard();
    }
   
   
  
    function unflipCards() {
      lockBoard = true;
  
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
  
        resetBoard();
  
      }, 1500);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  
   
  
    (function shuffle() {
      cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
      });
    })();
  
  cards.forEach(card => card.addEventListener('click', flipCard));