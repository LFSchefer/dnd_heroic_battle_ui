import { useCallback, useEffect, useState } from "react";
// import { Dices } from "../../models/dice/Dices";
import { FormattedMessage } from "react-intl";

export default function DiceRoller() {

  // const [roll, setRoll] = useState<Dices>({
  //   "4": null,
  //   "6": null,
  //   "8": null,
  //   "10": null,
  //   "12": null,
  //   "20": null,
  //   "100": null,
  //   });
  //   const [bonus, setBonus] = useState<number>(0);
  //   const [total, setTotal] = useState<number>(0);
  //   const [diceIsRoll, setDiceIsRoll] = useState<boolean>(false);

  // const handleNumberOfdices = (params: string) => {
  //   const dice: string = params.split("").slice(1).join("");
  //   const plusMinus: string = params[0]
  //   const numberOfXDice: number = roll[dice] === null ? 0 : roll[dice].length;

  //   if (plusMinus === "+") {
  //     setRoll(prev => {
  //       return {...prev,
  //         [dice]: new Array(numberOfXDice + 1).fill(0)
  //       }})
  //   }  else if (roll[dice] !== null && plusMinus === "-" && roll[dice].length === 1) {
  //     setRoll(prev => {
  //       return {...prev,
  //         [dice]: null
  //       }})
  //   } else if (roll[dice] !== null && plusMinus === "-" && roll[dice].length > 1) {
  //     setRoll(prev => {
  //       return {...prev,
  //         [dice]: new Array(numberOfXDice - 1).fill(0)
  //       }})
  //   }
  //   setDiceIsRoll(false);
  // }

  // const updateBonusMalus = (params: string) => {
  //   if (params === "+") {
  //     setBonus(prev => prev +1)
  //   } else {
  //     setBonus( prev => prev -1)
  //   }
  // }

  // const rollTheDice = () => {
  //   setRoll({
  //     "4": roll["4"] === null ? null : roll["4"].map(d => Math.floor(Math.random() * 4)+ 1),
  //     "6": roll["6"] === null ? null : roll["6"].map(d => Math.floor(Math.random() * 6)+ 1),
  //     "8": roll["8"] === null ? null : roll["8"].map(d => Math.floor(Math.random() * 8)+ 1),
  //     "10": roll["10"] === null ? null : roll["10"].map(d => Math.floor(Math.random() * 10)+ 1),
  //     "12": roll["12"] === null ? null : roll["12"].map(d => Math.floor(Math.random() * 12)+ 1),
  //     "20": roll["20"] === null ? null : roll["20"].map(d => Math.floor(Math.random() * 20)+ 1),
  //     "100": roll["100"] === null ? null : roll["100"].map(d => Math.floor(Math.random() * 100)+ 1)
  //   })
  //   setDiceIsRoll(true);
  // }

  // const sumOfDiceDx = (params: string): number | undefined => {
  //   return roll[params]?.reduce((a: number,b: number) => a + b,0);
  // }

  // const calculateTotal = useCallback((roll: Dices) => {
  //   let preTotal = 0;
  //   for (let key in roll) {
  //     if (roll[key] !== null) {
  //       preTotal += roll[key].reduce((a: number,b: number) => a + b,0)
  //     }
  //   }
  //   setTotal(preTotal + bonus)
  // },[bonus])

  // const resetDice = () => {
  //   setRoll({
  //     "4": null,
  //     "6": null,
  //     "8": null,
  //     "10": null,
  //     "12": null,
  //     "20": null,
  //     "100": null,

  //     });
  //   setBonus(0);
  //   setDiceIsRoll(false);
  // }

  // useEffect(() => {
  //   calculateTotal(roll)
  // }, [calculateTotal, roll])

  return (
    <div className="dice-container bg-sky-800/15 max-w-2xl min-h-40 px-4 py-4 m-5 rounded-lg	shadow-md md:flex md:flex-row">
      
      
    </div>
  );
};
