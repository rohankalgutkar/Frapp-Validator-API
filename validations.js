
const _ = require('lodash')

var checkTaskAvailability = function (input) {

    let task = input.task;

    // Check Current Status of task 
    // -> If already complete then return as false 
    let taskStatus = input.currentState.tasks[task].status;
    if (taskStatus == "complete") {
        return false
    } else if (taskStatus == "pending") {
        // -> If pending then check for dependency
        let dependency = input.dependencyGraph.tasks[task].dependency
        if (dependency.length == 0) {
            // No dependency & it is pending, hence open
            return true
        } else {
            var flagStatusDependency = true
            _.each(dependency, (val) => {
                console.log(input.currentState.tasks[val].status);

                if (input.currentState.tasks[val].status == "pending")
                    flagStatusDependency = false;
            })

            if (flagStatusDependency) {
                return true
            } else {
                return false
            }
        }
    } else {
        return {
            Error: "Invalid task status"
        }
    }
}

var validateDependencies = function (depGraph) {

    var startTask = 0;
    var countTasks = depGraph.length;
    var stack = [];
    var dependencyCheck = function (currentTask) {
        if (countTasks > currentTask) {
            if (stack.indexOf(currentTask) !== -1) {
                //current task no. found in stack
                return 1;
            }
            stack.push(currentTask);

            // looping on dep. tasks
            var found = depGraph[currentTask].dependency.some(dependencyCheck);

            if (!found) {
                stack.splice(stack.indexOf(currentTask), 1);
            }
            return found;
        } else {
            throw new Error('Invalid task defined as a dependency')
        }
    }

    dependencyCheck(startTask);

    if (stack.length == 0)
        return false;
    else
        return true;
}


module.exports = { checkTaskAvailability, validateDependencies };