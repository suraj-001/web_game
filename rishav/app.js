document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
        {
            name:'pic1',
            img:'img/pic1.png'
        },
        {
            name:'pic1',
            img:'img/pic1.png'
        },
        {
            name:'pic2',
            img:'img/pic2.png'
        },
        {
            name:'pic2',
            img:'img/pic2.png'
        },
        {
            name:'pic3',
            img:'img/pic3.png'
        },
        {
            name:'pic3',
            img:'img/pic3.png'
        },
        {
            name:'pic4',
            img:'img/pic4.png'
        },
        {
            name:'pic4',
            img:'img/pic4.png'
        },
        {
            name:'pic5',
            img:'img/pic5.png'
        },
        {
            name:'pic5',
            img:'img/pic5.png'
        },
        {
            name:'pic6',
            img:'img/pic6.png'
        },
        {
            name:'pic6',
            img:'img/pic6.png'
        },
        {
          name:'pic7',
          img:'img/pic7.png'
      },
      {
          name:'pic7',
          img:'img/pic7.png'
      },
      {
        name:'pic8',
        img:'img/pic8.png'
    },
    {
        name:'pic8',
        img:'img/pic8.png'
    }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    const flipDisplay = document.querySelector('#totalflip')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    let flip=0
    let level=0
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'img/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      flipDisplay.textContent = ++flip;
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'img/blank.png')
        cards[optionTwoId].setAttribute('src', 'img/blank.png')
        alert('You have clicked the same image!')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
       // alert('You found a match')
        cards[optionOneId].setAttribute('src', 'img/white.png')
        cards[optionTwoId].setAttribute('src', 'img/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', 'img/blank.png')
        cards[optionTwoId].setAttribute('src', 'img/blank.png')
       // alert('Sorry, try again')
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length*10
      if  (cardsWon.length === cardArray.length/2) {
        let effic=(8/flip)*100
        resultDisplay.textContent = cardsWon.length*10+'  Congratulations! You found them all! with '+parseInt(effic)+'% efficiency'
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }

    createBoard()
  })