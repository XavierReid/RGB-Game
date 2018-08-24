var colorGame = {
    winner: false,
    pickedColor: "",
    colors: [],
    squares: [],
    colorDisplay: document.getElementById("color-display"),
    message: document.querySelector("#message"),
    reset: document.querySelector("#reset"),
    modes: document.getElementsByClassName("mode"),
    init: function () {
        var game = this;
        game.modeButtons();
        game.reset.addEventListener("click", function () {
            game.resetGame();
        });
        game.resetGame();
    },
    resetGame: function () {
        this.squares = this.generateSquares();
        this.colors = this.generateRandomColors();
        this.pickedColor = this.pickColor();
        this.squareEvents();
        this.colorDisplay.innerHTML = this.pickedColor;
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].style.backgroundColor = this.colors[i];
        }
        document.querySelector("h1").style.backgroundColor = "steelblue";
        this.message.innerHTML = "";
        this.reset.innerHTML = "New Colors";
        this.message.style.color = "steelblue";
        // if(this.winner){
        //     this.revertHeaderColors();
        //     this.winner = !this.winner;
        // }
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
                //game.youWon();
            }
            else {
                this.style.backgroundColor = "#232323";
                game.message.innerHTML = "Try Again!";
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
        for (var i = 0; i < this.squares.length; i++) {
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
            game.resetGame();
        }
        for (var i = 0; i < this.modes.length; i++) {
            this.modes[i].addEventListener("click", changeMode);
        }
    },
    generateSquares: function () {
        var difficulty = this.gameDifficulty();
        var container = document.querySelector("#container");
        container.innerHTML = "";
        for (var i = 0; i < difficulty; i++) {
            var square = document.createElement("div");
            if (difficulty === 9) {
                square.className = "square hard";
            }
            else if (difficulty === 12) {
                square.className = "square super-hard";
            }
            else {
                square.classList.add("square");
            }
            container.appendChild(square);
        }
        return container.children;
    },
    gameDifficulty: function () {
        var selected = document.querySelector(".selected").innerHTML;
        switch (selected) {
            case "Easy":
                return 3;
            case "Medium":
                return 6;
            case "Hard":
                return 9;
            case "Super Hard":
                return 12;
            default:
                return 6;
        }
    },
    youWon: function () {
        // this.winner = !this.winner;
        // var pickedColor = this.pickedColor;
        // this.message.style.color = pickedColor;
        // for (var i = 0; i < this.modes.length; i++) {
        //     if (this.modes[i].classList.contains("selected")) {
        //         this.modes[i].style.backgroundColor = pickedColor;
        //     }
        //     else {
        //         this.modes[i].style.color = pickedColor;
        //         this.modes[i].addEventListener("mouseover", function (e) {
        //             this.style.backgroundColor = pickedColor;
        //             this.style.color = "white";
        //         });
        //         this.modes[i].addEventListener("mouseout", function (e) {
        //             this.style.backgroundColor = "white";
        //             this.style.color = pickedColor;
        //         });
        //     }
        // }
    },
    revertHeaderColors: function () {
        document.querySelector("h1").style.backgroundColor = "steelblue";
        this.message.innerHTML = "";
        this.reset.innerHTML = "New Colors";
        this.message.style.color = "steelblue";
        for (var i = 0; i < this.modes.length; i++) {
            if (this.modes[i].classList.contains("selected")) {
                this.modes[i].style.backgroundColor = "steelblue";
            }
            else {
                this.modes[i].style.color = "steelblue";
                this.modes[i].addEventListener("mouseover", function (e) {
                    this.style.backgroundColor = "steelblue";
                    this.style.color = "white";
                });
                this.modes[i].addEventListener("mouseout", function (e) {
                    this.style.backgroundColor = "white";
                    this.style.color = "steelblue";
                });
            }
        }
    }
};

colorGame.init();
