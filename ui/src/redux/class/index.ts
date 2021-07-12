import { Dispatch } from 'redux';
import { PutEffect } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

type Put = () => PutEffect;

export class Executor {
  protected exec: Dispatch | Put;

  constructor(exec: Dispatch | Put) {
    this.exec = exec;
  }
}

export type UUID = string;

export interface ReduxAction {
  type: UUID;
  payload?: any;
}

type LogicFunction = (state: any, action: ReduxAction) => any;

interface Meta {
  type: UUID;
  createAction: (payload?: any) => ReduxAction;
  logic: LogicFunction;
}

export function init(logic: LogicFunction): Meta {
  const type: UUID = uuidv4();
  const createAction = (payload?: any) => ({ type, payload });
  return { type, createAction, logic };
}
