import {Injector} from "./injector";
var injector = Injector.getInstance();
var mySuperNewDependency = {
  "name": "test"
};
var mySuperNewDependency2 = {
  "name": "test2"
};
function testingFunction(dep1, dep2) {
  console.log(dep1)
  console.log(dep2)
}
injector.register("myDep", mySuperNewDependency);
injector.register("myDep2", mySuperNewDependency2);
var f = injector.resolve(["myDep", "myDep2"], testingFunction, {});
f();
