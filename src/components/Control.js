import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <Search onSearch={this.props.Search}></Search>
                <Sort 
                    onSort={this.props.Sort} 
                    sortBy={this.props.sortBy}
                    sortValue={this.props.sortValue}
                >
                </Sort>
            </div>
        );
    }
}
export default Control;