var giphytv = (function() {

  var gifCount = 0

  var removeGifContainer = function() {
    this.parentNode.removeChild(this)
    gifCount -= 1
  }

  var showCross = function() {
    var cross = this.getElementsByClassName("cross")[0]
    cross.classList.remove("hidden")
  }

  var hideCross = function() {
    var cross = this.getElementsByClassName("cross")[0]
    cross.classList.add("hidden")
  }

  var createCrossNode = function() {
    var cross = document.createElement('div')
    cross.classList.add('hidden')
    cross.classList.add('cross')
    cross.textContent = 'X'
    return cross
  }

  var createGifContainerNode = function(data) {
    var gifContainerNode = document.createElement('div')
    gifContainerNode.classList.add('gif-container')
    gifContainerNode.dataset.id = data.id
    return gifContainerNode
  }

  var createGifNode = function(data) {
    var url = data.image_url
    var width = data.image_width
    var height = data.image_height
    var dimension_class = width > height ? "wider" : "higher"
    var crossNode = createCrossNode()
    var gifContainerNode = createGifContainerNode(data)
    var imgNode = document.createElement('img')
    imgNode.classList.add('gif')
    imgNode.classList.add(dimension_class)
    imgNode.src = url
    imgNode.title = 'GIF via giphy'

    gifContainerNode.appendChild(crossNode)
    gifContainerNode.appendChild(imgNode)

    gifContainerNode.addEventListener("click", removeGifContainer)
    gifContainerNode.addEventListener("mouseover", showCross)
    gifContainerNode.addEventListener("mouseout", hideCross)
    return gifContainerNode
  }

  var getGif = function (e) {
    if (gifCount >= 12) {
      e.target.classList.add("red")
      return setTimeout(function () {
        e.target.classList.remove("red")
      }, 1000)
    }
    var search_term = document.getElementById("tag-input").value || "colours"
    var url = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + search_term
    fetch(url)
      .then(response => response.json())
      .then(function (response) {
        var data = response.data
        document.getElementById("gif-tv").appendChild(createGifNode(data))
        gifCount += 1;
      })
      .catch(function(error) {
        console.log('uh oh...')
      })
  }

  // add button click event
  var new_gif_button = document.getElementById("new-gif-button")
  new_gif_button.addEventListener("click", getGif)

})()
