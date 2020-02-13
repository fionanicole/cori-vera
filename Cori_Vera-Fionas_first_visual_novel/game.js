const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a dark cave. The only sound around you is some dripping water. You are not tied up, but there are large shards of broken glass around you.',
    options: [
      {
        text: 'Take a large shard for protection?',
        setState: { glass: true },
        nextText: 2
      },
      {
        text: 'Leave the shard?',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You run your hand along the cave wall and get a small cut on your hand, the rock is super sharp!',
    options: [
      {
        text: 'Pick up a rock shard and leave the glass?',
        requiredState: (currentState) => currentState.glass,
        setState: { glass: false, rock: true },
        nextText: 3
      },
      {
        text: 'Keep the glass',
        requiredState: (currentState) => currentState.glass,
        setState: { rock: false, glass: true },
        nextText: 3
      },
      {
        text: 'I just have to keep walking...',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'The cave opens into the grotto and you hear voices',
    options: [
      {
        text: 'Scream and sprint into whatever is up ahead',
        nextText: 4
      },
      {
        text: 'throw a rock down the cave hall and see what happens',
        nextText: 5
      },
      {
        text: 'Sneak up carefully and see whats going on',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are stabbed in the head by a bandit with a dagger and die instantly',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'All the bats wake up an ogre nearby which runs up and punches you, killing you instantly',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'A camp full of bandits and one handsome masked assassin sit around a campfire and talk about some heist plan',
    options: [
      {
        text: 'Listen closer',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'A rock shifts under your foot and you roll down into the bandit camp',
    options: [
      {
        text: 'jump up and throw rocks at them',
        nextText: 8
      },
      {
        text: 'Attack them with your glass shard',
        requiredState: (currentState) => currentState.glass,
        nextText: 9
      },
      {
        text: 'Attack them with your rock dagger',
        requiredState: (currentState) => currentState.rock,
        nextText: 10
      },
      {
        text: 'straight-up cry',
        requiredState: (currentState) => currentState.glass,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'you throw a rock up in the air and it hits you on the head, killing you instantly',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'you put up a good fight against several bandits, but the masked assassin kills you',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'a masked assassin hesitates at first after looking at the glass in your hand, but then jumps behind you and kills you',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'the bandits are confused at first, but then they take pity on you. the masked assassin in the group takes off their mask and reveals that they were SYLVAIN ALL ALONG',
    options: [
      {
        text: 'Haha, got u bitch...THE END',
        nextText: -1
      }
    ]
  }
]

startGame()
