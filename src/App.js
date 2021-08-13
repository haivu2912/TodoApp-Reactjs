import React, { Component } from 'react';
import TaskForm from './components/TaskForm'
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter:{
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name', 
      sortValue: 1
    }
  }

  componentDidMount() {
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  // generateData = () => {
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name: 'HTML 5',
  //       status: true
  //     },

  //     {
  //       id: this.generateID(),
  //       name: 'CSS 3',
  //       status: true
  //     },

  //     {
  //       id: this.generateID(),
  //       name: 'Javascript',
  //       status: true
  //     },

  //     {
  //       id: this.generateID(),
  //       name: 'Reactjs',
  //       status: false
  //     },
  //   ];

  //   this.setState({
  //     tasks: tasks
  //   });

  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  //   localStorage.removeItem('tasks');
  // }

  s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID(){
    return(this.s4() + this.s4() + this.s4() + this.s4());
  }

  ToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !== null){
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    }else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }

  showForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  }

  closeForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null
    });
  }

  subMit = (data) => {
    var tasks = this.state.tasks;
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      //taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  upDateStatus = (id) => {
    var tasks = this.state.tasks;
    var index = this.findIndex(id);
    // console.log(index);
    if(index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    var tasks = this.state.tasks;
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id){
        return result = index;
      }
    });
    return result;
  }

  Delete = (id) => {
    var tasks = this.state.tasks;
    var index = this.findIndex(id);
    // console.log(index);
    if(index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.closeForm();
  }

  Update = (id) => {
    var tasks = this.state.tasks;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.showForm();
  }

  Filter = (filterName, filterStatus) => {
    filterStatus = +filterStatus;             //Chuyển từ string sang number
    this.setState({
      filter:{
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  Search = (keyword) => {
    this.setState({
      keyword: keyword
    });
  }

  Sort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    });
    
  }
  
  render() {
    var tasks = this.state.tasks; // var {tasks, isDisplayForm} = this.state
    var isDisplayForm = this.state.isDisplayForm;
    var taskEditing = this.state.taskEditing;
    var filter = this.state.filter;
    var keyword = this.state.keyword;
    var sortBy = this.state.sortBy;
    var sortValue = this.state.sortValue;

    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }

      tasks = tasks.filter((task) => {
        if(filter.status === -1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if(sortBy === 'name'){
      tasks.sort((a, b) => {
        if(a.name > b.name){
          return sortValue;
        }else if(a.name < b.name){
          return -sortValue;
        }else{
          return 0;
        }
      });
    }else{
      tasks.sort((a, b) => {
        if(a.status > b.status){
          return -sortValue;
        }else if(a.status < b.status){
          return sortValue;
        }else{
          return 0;
        }
      });
    }

    var elmTaskForm = isDisplayForm ? <TaskForm closeForm={this.closeForm} subMit={this.subMit} task={taskEditing}></TaskForm> : '';
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>

        <div className="row">
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                {elmTaskForm}
            </div>

            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-primary" onClick={this.ToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                
                {/* <button type="button" className="btn btn-danger" onClick={this.generateData}>
                    <span className="fa fa-plus mr-5"></span>Test
                </button> */}

                <Control 
                  Search={this.Search} 
                  Sort={this.Sort}
                  sortValue={sortValue}
                  sortBy={sortBy}
                >
                </Control>
                <TaskList 
                  tasks={tasks} 
                  upDateStatus={this.upDateStatus}
                  Delete={this.Delete}
                  Update={this.Update}
                  Filter={this.Filter}
                >
                </TaskList>
            </div>
        </div>
    </div>
    );
  }
}

export default App;