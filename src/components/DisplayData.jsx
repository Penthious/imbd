import React, { Component } from "react";
import { Link } from "react-router-dom";
import pagination from "../utils/pagination";

class DisplayData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            totalItems: 0,
            currentPage: 1,
            pageSize: 10,
            startPage: 1,
            endPage: 10,
            startIndex: 0,
            endIndex: 9,
        };
    }

    componentWillMount() {
        this.handlePagination(1);
    }

    componentWillReceiveProps(newProps) {
        this.setState({data: newProps.data});
    }


    handleAlphaNumericalSort = key => this.setState({
        data: [...this.props.data].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        }),
    });

    handleInverseSort = key => this.setState({
        data: [...this.props.data].sort((a, b) => {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        }),
    });

    handleOriginalSort = () => this.setState({
        data: [...this.props.data],
    });

    handlePagination = (page) => {
        const paginate = pagination(this.props.data.length, page, 10);
        this.setState({ ...paginate });
    };

    render() {
        return (
            <div>
                <p onClick={() => this.handleAlphaNumericalSort("title")}>
                    Sort Name Alphabetically
                </p>
                <button className="button" onClick={() => this.handleInverseSort("title")}>
                    Sort Names in reverse
                </button>
                <button className="button" onClick={this.handleOriginalSort}>Show Original</button>
                <button className="button" onClick={() => this.handleAlphaNumericalSort("rating")}>
                    Sort By Rating
                </button>
                <button className="button" onClick={() => this.handleInverseSort("rating")}>
                    Sort Rating in Reverse
                </button>
                {[...this.state.data]
                    .slice(this.state.startIndex, this.state.endIndex)
                    .map(item => (
                        <div>
                            <Link
                                to={{
                                    pathname: `${this.props.url}/${item.title
                                        .split(" ")
                                        .join("_")}`,
                                    state: item,
                                }}
                            >
                                {item.title}
                            </Link>
                            <p>rating: {item.rating || "Not Yet rated"}</p>
                        </div>
                    ))}
                {this.state.startPage !== this.state.currentPage
                    ? <button
                        onClick={() => this.handlePagination(this.state.currentPage - 1)}
                        className="button"
                      >
                        {"<"}
                    </button>
                    : null}
                {this.state.pages.map(page => (
                    <button
                        onClick={() => this.handlePagination(page)}
                        className={this.state.currentPage === page ? "button hollow" : "button"}
                    >
                        {page}
                    </button>
                ))}
                {this.state.endPage !== this.state.currentPage
                    ? <button
                        onClick={() => this.handlePagination(this.state.currentPage + 1)}
                        className="button"
                      >
                        {">"}
                    </button>
                    : null}
            </div>
        );
    }
}

DisplayData.propTypes = {};
DisplayData.defaultProps = {
    data: [],
};

export default DisplayData;
