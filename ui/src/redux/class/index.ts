import { Dispatch } from "redux";
import { PutEffect } from "redux-saga/effects";

type Put = () => PutEffect

export class Actuator {
  protected exec: Dispatch | Put;

  constructor(exec: Dispatch | Put) {
    this.exec = exec;
  }
}
