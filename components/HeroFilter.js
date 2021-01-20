import { Component } from "react";
import cn from "classnames";
import utilStyles from "../styles/utils.module.css";

export default class HeroFilter extends Component {
    state = {
        query: "",
        displayedHeroes: this.sortHeroesByName(
            Object.keys(this.props.boiPointMap)
        ),
    };

    getFilteredHeroes = (event) => {
        const query = event.target.value;

        const allHeroes = Object.keys(this.props.boiPointMap);

        let filteredHeroes = allHeroes.filter((id) =>
            this.filterFunction(id, query)
        );

        filteredHeroes = this.sortHeroesByName(filteredHeroes);

        this.setState({
            query: query,
            displayedHeroes: filteredHeroes,
        });

        console.log(filteredHeroes);
    };

    sortHeroesByName(heroes) {
        return heroes.sort((a, b) =>
            this.props.heroData[a].localized_name >
            this.props.heroData[b].localized_name
                ? 1
                : -1
        );
    }

    filterFunction = (id, query) => {
        let name = this.props.heroData[id].localized_name;

        query = query.toLowerCase();
        name = name.toLowerCase();

        query = query.replace(/ |-/g, "");
        name = name.replace(/ |-/g, "");

        return name.includes(query);
    };

    render() {
        return (
            <div className="card profilePageCards">
                <input
                    className="form-control"
                    onChange={this.getFilteredHeroes}
                ></input>
                <ul className="list-group recentMatchesList">
                    {this.state.displayedHeroes.map((id) => {
                        return (
                            <li className="list-group-item">
                                <div className="row">
                                    <div
                                        className="col-4 centerItems"
                                        style={{ justifyContent: "normal" }}
                                    >
                                        <img
                                            src={
                                                "http://cdn.dota2.com" +
                                                this.props.heroData[id].img
                                            }
                                        ></img>
                                    </div>
                                    <div
                                        className="col-4 centerItems"
                                        style={{ justifyContent: "normal" }}
                                    >
                                        {this.props.heroData[id].localized_name}
                                    </div>
                                    <div className="col-4 centerItems">
                                        {this.props.boiPointMap[id] === null ? (
                                            <small>Not Enough Games</small>
                                        ) : (
                                            <h4
                                                className={cn({
                                                    [utilStyles.colorGreen]:
                                                        this.props.boiPointMap[
                                                            id
                                                        ] > 0,
                                                    [utilStyles.colorRed]:
                                                        this.props.boiPointMap[
                                                            id
                                                        ] < 0,
                                                })}
                                            >
                                                {this.props.boiPointMap[id] >
                                                0 ? (
                                                    <>+</>
                                                ) : (
                                                    <></>
                                                )}
                                                {this.props.boiPointMap[id]}
                                            </h4>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
