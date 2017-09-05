import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pagination from '../utils/pagination';

class DisplayData extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        url: PropTypes.string,
    };

    static defaultProps = {
        data: [],
    };

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

    /*
     * Sorts the data by alphaNumeric
     * @param {string} key - The objects key
     */
    handleAlphaNumericalSort = key => this.setState({
        data: [...this.props.data].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        }),
    });

    /*
     * Sorts the data in reverse
     * @param {string} key - The objects key
     */
    handleInverseSort = key => this.setState({
        data: [...this.props.data].sort((a, b) => {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        }),
    });

    /*
     * Reverts back to how our data looks like at the start
     */
    handleOriginalSort = () => this.setState({
        data: [...this.props.data],
    });

    /*
     * Sets the correct page for our pagination
     * @param {int} page - The page number
     */
    handlePagination = (page) => {
        const paginate = pagination(this.props.data.length, page, 10);
        this.setState({ ...paginate });
    };

    /*
     * Renders the pagination buttons
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
                <div key={page} className="column small-1">
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
    renderData = (item, index) => (
        <div key={`${item.imbd_id}${index}`} className="card column small-4 text-center"
             style={{ width: '300px', border: '1px solid black', }}>
            <div className="card-divider" style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <p className="text-center">
                    {item.title}
                </p>
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
                    <img src={item.poster ? item.poster.large : item.image.poster}
                         alt={item.title} />
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
                        .map((item, index) => this.renderData(item, index))}
                </div>
                {this.renderPagination()}
            </div>
        );
    }
}


export default DisplayData;
