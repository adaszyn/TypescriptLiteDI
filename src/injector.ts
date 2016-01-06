/// <reference path="service.ts"/>
import {Service} from "./service";

export class Injector {
  private dependencies: {[s: string]: Object};
  private static _injector = new Injector();
  constructor() {
        if(Injector._injector){
            throw new Error("Error: Injector instance can be created by getInstance() method.");
        }
        Injector._injector = this;
        this.dependencies = {};
    }
  public static getInstance(): Injector {
     return Injector._injector;
  }
  public register(name: string, dependency: Object): void {
    this.dependencies[name] = dependency;
  }
  public resolve(dependencies: Array<string>, fun: Function, scope: any): Function {
    var args = new Array<Object>();
    scope = scope || {};
    for (var i = 0; i < dependencies.length; i++) {
      var dep = dependencies[i];
      if (this.dependencies[dep]) {
        args.push(this.dependencies[dep]);
      }
      else {
        throw new Error("Dependency not registered.");
      }
    }
    return function() {
       fun.apply(scope, args.concat(Array.prototype.slice.call(arguments, 0)));
   }
  }
}
