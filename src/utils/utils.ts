import { Battle } from "../models/battle/Battle";

export const validateEmail = (email: string): boolean => {
    const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return result === null ? false : true;
  };

export const validatePassword = (password: string): boolean => {
  let valid = false;
  if (password.match(/[A-Z]/) && password.match(/[a-z].*[a-z]/) && password.match(/[0-9]/) && password.match(/(!|%|#|\$|~|\?|&|:|;|\^|\+|-)/)) {
      valid = true
  }
  return valid
}

export const allMonstersHaveInitiative = (battle: Battle | undefined): boolean => {
  let result = false;
  if (battle && battle.battleMonsters.length >= 1) {
      if(battle.battleMonsters.filter(monster => monster.initiative === null).length === 0) {
          result = true;
      }
  }
  return result;
}