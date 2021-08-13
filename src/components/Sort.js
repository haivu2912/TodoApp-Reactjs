import React, { Component } from 'react';

class Sort extends Component {
    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue);
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp 
                        <span className="far fa-caret-square-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a 
                                role="button" 
                                className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'sort-selected' : ''}
                            >
                                <span className="fas fa-sort-alpha-down pr-5">
                                    <span className="ml-5">Tên A-Z</span>
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a 
                                role="button"
                                className={(this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'sort-selected' : ''}
                            >
                                <span className="fas fa-sort-alpha-down-alt pr-5">
                                    <span className="ml-5">Tên Z-A</span>
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}>
                            <a 
                                role="button"
                                className={(this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'sort-selected' : ''}
                            >
                                Đã Học
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status', -1)}>
                            <a 
                                role="button"
                                className={(this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'sort-selected' : ''}
                            >
                                Chưa Học
                            </a>
                        </li>
                    </ul>
                 </div>
            </div>
        );
    }
}

export default Sort;