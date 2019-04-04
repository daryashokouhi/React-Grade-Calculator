import React, { Component } from 'react';
import GradeCalc from './gradeCalc';
import './App.css';
import SimpleReactValidator from 'simple-react-validator';


class App extends Component {

  theTotalWeight = 0;

  constructor(props) {
    super(props);
    
    this.state ={
      assignments: [],
      name: null,
      grade: 0,
      weight: 0,
      totalWeight: 0,
      errorMsg: '',
      letterGrade: ''
 
    }

    this.addAssignment = this.addAssignment.bind(this);  
    this.calc = this.calc.bind(this);
    this.setName = this.setName.bind(this);
    this.setGrade = this.setGrade.bind(this);
    this.setWeight = this.setWeight.bind(this);

  }

  calc(e){
    this.setState({totalWeight: 0});
    this.theTotalWeight = 0;

    this.calcWeight()

    if (parseFloat(this.theTotalWeight) != 100) {
      this.setState({errorMsg: '* the weight to be add up to 100'});
    }
    else {
      this.setState({errorMsg: ''});
      this.calcLetterGrade();

    }
  }

  calcWeight() {
    var myAssignments = this.state.assignments;
  
    for (var i = 0; i < myAssignments.length; i++) {
      this.theTotalWeight = parseFloat(myAssignments[i].weight) + parseFloat(this.theTotalWeight);
    }
    this.setState({ totalWeight: parseFloat(this.theTotalWeight) });
  }
  
  calcLetterGrade() {
    var myAssignments = this.state.assignments;
    let total = 0;
    for(let i=0;i<myAssignments.length; i++){
        total += myAssignments[i].grade / 100 * myAssignments[i].weight;
    }
  
    if(total >=90){
        this.setState({letterGrade: "The Final Grade is A. The grades have been sent." }); 
    }
    else if(total >= 80 && total < 90){
      this.setState({letterGrade: "The Final Grade is B. The grades have been sent." }); 
    }
  
    else if(total >= 70 && total < 80){
      this.setState({letterGrade: "The Final Grade is C. The grades have been sent." }); 
    }
  
    else if(total >= 60 && total < 70){
      this.setState({letterGrade: "The Final Grade is D. The grades have been sent." }); 
    }
  
    else {
      this.setState({letterGrade: "The Final Grade is F. The grades have been sent." }); 
    }
  }

  setName(e){
      this.setState({myname: e.target.value});
  }

  setGrade(e){
      this.setState({mygrade: e.target.value});
  }

  setWeight(e){
      this.setState({myweight: e.target.value});
  }

  componentWillMount() {
    // Create new validator object for each form.
    this.validator = new SimpleReactValidator({
      element:
      (message, className) => <div className='text-danger'>{message}</div>,
    })
  }
 
  addAssignment(e) {
    let tempItem = {
        name: this.state.myname,
        grade: this.state.mygrade,
        weight: this.state.myweight
    }
 
    if( this.validator.allValid() ){
 
      let tempAssignList = this.state.assignments;
      tempAssignList.push(tempItem);
      this.setState({"assignments":tempAssignList});
      console.log(tempAssignList)
    }
 
    else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }

  deleteAssignment(index) {
    for(var i=0; i<this.state.assignments.length; i++) {
      console.log(this.state.assignments[i].grade);
    }
    let tempAssignList = this.state.assignments;
    tempAssignList.splice(index, 1);
    this.setState({"assignments":tempAssignList});
  }

  render() {
    return  (
      <div>
        <h2>Student Grade Calculator</h2>
        <div className="formInputs">
          <input type="text" onChange={this.setName} placeholder="Course Name"/>
          {this.validator.message('Name', this.state.myname, 'required|alpha')}
          <input type="text" onChange={this.setGrade} placeholder="Grade"/>
          {this.validator.message('Grade', this.state.mygrade, 'required|numeric')}
          <input type="text" onChange={this.setWeight} placeholder="Weight"/>
          {this.validator.message('Weight', this.state.myweight, 'required|numeric')} 
          <input type='button' className="addBtn" onClick={this.addAssignment} value="Add New Assignment"></input>
        </div>

        <div className="scriptView">
        <h3>Transcript</h3>
          <ul>
            {this.state.assignments.map((asgn, index) => (
              <li key={asgn.grade}>
              <div onClick={(e) => this.deleteAssignment(index)}><b>X</b></div>
              <div><b>Course:</b> {asgn.name}</div>
              <div><b>Grade:</b> {asgn.grade}</div>
              <div><b>Weight:</b> {asgn.weight}%</div>
              </li>
            ))} 
          </ul>
        </div> 
        <div className="submit">
          <input type='button' className="submitBtn" onClick={this.calc} value="Submit Records"></input>
          <p className='text-danger'>{this.state.errorMsg}</p>
          <p className='text-submit'>{this.state.letterGrade}</p>
        </div>
      </div>
    ); 
  }
}
export default App;
