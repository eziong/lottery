import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class LotteryBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balls: Array(45).fill(false),
        };
        this.clickHandler = this.clickHandler.bind(this);
        //this.randomSelect = this.randomSelect.bind(this);
    }

    clickHandler() {
        console.log("click");
        const randomNum = [];
        const balls = this.state.balls.slice();
        randomNum.push(Math.ceil(Math.random() * 45));
        randomNum.map((rd) => {
            balls[rd] = !balls[rd];
        });
        this.setState({
            balls: balls,
        });
        console.log("finish");
    }

    randomSelect() {
        return (
            <>
                <div className="selectBtn" onClick={this.clickHandler}>
                    자동 추첨
                </div>
            </>
        );
    }
    render() {
        console.log("rendering in LotteryBox");
        const mapToComponent = (numBalls) => {
            return numBalls.map((checked, i) => {
                console.log(i + " : " + checked);
                return <Ball number={i} key={i} checked={checked} />;
            });
        };
        return (
            <div className="lotteryBox">
                {mapToComponent(this.state.balls)}
                {this.randomSelect()}
            </div>
        );
    }
}

class Ball extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        console.log(this.state.checked);
        this.setState((prevState) => ({
            checked: !prevState.checked,
        }));
        /*this.setState({
            checked: !this.state.checked,
        });*/
    }
    render() {
        return (
            <>
                <div
                    className={
                        this.props.checked ? "checkedball" : "uncheckedball"
                    }
                    onClick={this.clickHandler}
                >
                    {this.props.number + 1}
                </div>
            </>
        );
    }
}

class Lottery extends React.Component {}

ReactDOM.render(<LotteryBox />, document.getElementById("root"));
