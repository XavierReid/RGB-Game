var colorGame = {
    colors: [],
    squares: document.getElementsByClassName("square"),
    colorDisplay: document.getElementById("color-display"),
    message: document.querySelector("#message"),
    reset: document.querySelector("#reset"),
    modes: document.getElementsByClassName("mode"),
    squareAmount: null,
    init: function () {
        var game = this;
        game.squareAmount = game.squares.length;
        game.modeButtons();
        game.squareEvents();
        this.reset.addEventListener("click", function () {
            game.squareAmount = document.querySelector(".selected").innerHTML === "Easy" ? 3 : game.squares.length;
            game.resetGame();
        });
        game.resetGame();
    },
    resetGame: function () {
        this.colors = this.generateRandomColors(this.squareAmount);
        this.pickedColor = this.pickColor();
        this.colorDisplay.innerHTML = this.pickedColor;
        for (var i = 0; i < this.squares.length; i++) {
            if (!this.colors[i]) {
                this.squares[i].style.backgroundColor = "#232323";
            }
            else {
                this.squares[i].style.backgroundColor = this.colors[i];
            }
        }
        document.querySelector("h1").style.backgroundColor = "steelblue";
        this.message.style.color = "white";
        this.reset.innerHTML = "New Colors";
    },
    squareEvents: function () {
        var game = this;
        function squareLogic() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === game.pickedColor) {
                game.message.innerHTML = "Correct!";
                game.changeColors();
                document.querySelector("h1").style.backgroundColor = game.pickedColor;
                game.reset.innerHTML = "Play Again?";
            }
            else {
                this.style.backgroundColor = "#232323";
                game.message.innerHTML = "Try Again!";
                game.message.style.color = "black";
                // setTimeout(() => {
                //     message.style.color = "white";
                // }, 1000);
            }
        }
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].addEventListener("click", squareLogic);
        }
    },
    changeColors: function () {
        for (var j = 0; j < this.colors.length; j++) {
            this.squares[j].style.backgroundColor = this.pickedColor;
        }
    },
    pickColor: function () {
        var num = Math.floor(Math.random() * this.colors.length);
        return this.colors[num];
    },
    generateRandomColors: function () {
        var arr = [];
        for (var i = 0; i < this.squareAmount; i++) {
            arr.push(this.randomColor());
        }
        return arr;
    },
    randomColor: function () {
        var r = Math.floor(Math.random() * 255 + 1);
        var g = Math.floor(Math.random() * 255 + 1);
        var b = Math.floor(Math.random() * 255 + 1);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    },
    modeButtons: function () {
        var game = this;
        function changeMode() {
            document.querySelector(".selected").classList.remove("selected");
            this.classList.add("selected");
            game.squareAmount = this.innerHTML === "Easy" ? 3 : game.squares.length;
            game.resetGame();

        }
        for (var i = 0; i < this.modes.length; i++) {
            this.modes[i].addEventListener("click", changeMode);
        }
    }
};

colorGame.init();