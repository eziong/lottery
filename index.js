import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class LotteryBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balls: Array(45)
                .fill()
                .map(function (value, index) {
                    return index + 1;
                }),
            winningNums: Array(6).fill(),
            drawing: false,
            count: 0,
        };
        this.clickHandler = this.clickHandler.bind(this);
        //this.randomSelect = this.randomSelect.bind(this);
    }

    clickHandler() {
        if (!this.state.drawing) {
            this.setState({ drawing: true });
            this.timer = setInterval(() => {
                this.randomNumber();
            }, 100);

            setTimeout(() => {
                clearTimeout(this.timer);
                this.setState({ drawing: false });
            }, 1000);
        }
    }

    randomNumber() {
        var balls = this.state.balls.slice();
        const count = this.state.count;
        var pool = [];
        var winningNums = [];
        while (balls.length > 0) {
            var pick = balls.splice(
                Math.floor(Math.random() * balls.length),
                1
            )[0];
            pool.push(pick);
        }
        for (var i = 0; i < 7; i++) {
            var pick = pool.splice(
                Math.floor(Math.random() * pool.length),
                1
            )[0];
            winningNums.push(pick);
        }
        this.setState({ winningNums: winningNums, count: count + 1 });
    }
    randomSelect() {
        return (
            <>
                <div
                    className={this.state.drawing ? "selectedBtn" : "selectBtn"}
                    onClick={this.clickHandler}
                >
                    자동 추첨
                </div>
            </>
        );
    }
    render() {
        console.log("rendering in LotteryBox");
        const mapToComponent = (numBalls, winningNum) => {
            return numBalls.map((i) => {
                return (
                    <Ball
                        number={i}
                        key={i}
                        checked={winningNum.indexOf(i) > -1 ? true : false}
                    />
                );
            });
        };
        return (
            <div className="lotteryBox">
                {mapToComponent(this.state.balls, this.state.winningNums)}
                {this.randomSelect()}
            </div>
        );
    }
}

class Ball extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div
                    className={
                        this.props.checked ? "checkedball" : "uncheckedball"
                    }
                >
                    {this.props.number}
                </div>
            </>
        );
    }
}

class Lottery extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <LotteryBox />;
    }
}

ReactDOM.render(<Lottery />, document.getElementById("root"));
