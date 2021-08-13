import React, { Component } from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1             //All: -1, active: 1, deative: 0
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.Filter(name === 'filterName' ? value : this.state.filterName, name === 'filterStatus' ? value : this.state.filterStatus);
        this.setState({
            [name] : value
        });

    }

    render() {
        var  tasks = this.props.tasks;
        var filterStatus = this.state.filterStatus;
        var filterName = this.state.filterName;
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                        onUpdateStatus={this.props.upDateStatus}
                        onDelete={this.props.Delete}
                        onUpdate={this.props.Update}
                    >
                    </TaskItem>
        });

        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control"
                                name="filterName" 
                                value={filterName}
                                onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <select 
                                className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onChange}
                            >
                                <option value="-1">Tất Cả</option>
                                <option value="0">Chưa học</option>
                                <option value="1">Đã học</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;