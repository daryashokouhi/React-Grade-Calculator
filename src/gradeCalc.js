class gradeCalc {

    calc(assignments){
        let total = 0;
        for(let i=0;i<assignments.length;i++) {
            total += assignments[i].grade / 100 * assignments[i].weight
        }
        if(total >= 90) {
            return "A"
        }else if(total >= 80 && total < 90) {
            return "B"
        }else if(total >= 70 && total < 80) {
            return "C"
        }else if(total >= 60 && total < 70) {
            return "D"
        }else {
            return "F"
        }
    }
}
  export default gradeCalc;