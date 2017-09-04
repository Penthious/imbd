import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pagination from '../utils/pagination';

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
        this.setState({ data: newProps.data });
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

    /*
    Renders the pagination buttons
     */
    renderPagination = () => (
        <div className="row">
            <div className="column small-1">
                {this.state.startPage !== this.state.currentPage
                    ? <button
                        onClick={() => this.handlePagination(this.state.currentPage - 1)}
                        className="button"
                    >
                        {'<'}
                    </button>
                    : null}
            </div>
            {this.state.pages.map(page => (
                <div className="column small-1">
                    <button
                        onClick={() => this.handlePagination(page)}
                        className={this.state.currentPage === page ? 'button hollow' : 'button'}
                    >
                        {page}
                    </button>
                </div>
            ))}
            <div className="column small-1">
                {this.state.endPage !== this.state.currentPage
                    ? <button
                        onClick={() => this.handlePagination(this.state.currentPage + 1)}
                        className="button"
                    >
                        {'>'}
                    </button>
                    : null}
            </div>
        </div>
    );

    /*
    Renders the list items
     */
    renderData = item => (
        <div className="card column large-4" style={{width: "300px", border: '1px solid black'}}>
            <div className="card-divider">
                {item.title}
            </div>
            <div className="card-section">
                <h4>rating: {item.rating || 'Not Yet rated'}</h4>
                <p>{item.description}</p>
                <Link
                    to={{
                        pathname: `${this.props.url}/${item.title.split(' ').join('_')}`,
                        state: item,
                    }}
                >
                    <img src={item.poster ? item.poster.large : item.image.poster} />
                </Link>
            </div>
        </div>
    );

    render() {
        return (
            <div>
                <div className="row">
                    <div className="column">
                        <button className="button"
                                onClick={() => this.handleAlphaNumericalSort('title')}>
                            Sort Name Alphabetically
                        </button>
                    </div>
                    <div className="column">
                        <button className="button" onClick={() => this.handleInverseSort('title')}>
                            Sort Names in reverse
                        </button>
                    </div>
                    <div className="column">
                        <button className="button" onClick={this.handleOriginalSort}>Show Original
                        </button>
                    </div>
                    <div className="column">
                        <button className="button"
                                onClick={() => this.handleAlphaNumericalSort('rating')}>
                            Sort By Rating
                        </button>
                    </div>
                    <div className="column">
                        <button className="button" onClick={() => this.handleInverseSort('rating')}>
                            Sort Rating in Reverse
                        </button>
                    </div>
                </div>
                <div className="row marg-top-20">

                {[...this.state.data]
                    .slice(this.state.startIndex, this.state.endIndex)
                    .map(item => this.renderData(item))}
                {this.renderPagination()}
                </div>
            </div>
        );
    }
}

DisplayData.propTypes = {};
DisplayData.defaultProps = {
    data: [],
};

export default DisplayData;
