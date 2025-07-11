import { useCallback, useEffect, useState } from "react";
import { Dices } from "../../models/dice/Dices";
import { FormattedMessage } from "react-intl";

export default function DiceRoller() {

  const [roll, setRoll] = useState<Dices>({
    "4": null,
    "6": null,
    "8": null,
    "10": null,
    "12": null,
    "20": null,
    "100": null,
    });
    const [bonus, setBonus] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [diceIsRoll, setDiceIsRoll] = useState<boolean>(false);

  const handleNumberOfdices = (params: string) => {
    const dice: string = params.split("").slice(1).join("");
    const plusMinus: string = params[0]
    const numberOfXDice: number = roll[dice] === null ? 0 : roll[dice].length;

    if (plusMinus === "+") {
      setRoll(prev => {
        return {...prev,
          [dice]: new Array(numberOfXDice + 1).fill(0)
        }})
    }  else if (roll[dice] !== null && plusMinus === "-" && roll[dice].length === 1) {
      setRoll(prev => {
        return {...prev,
          [dice]: null
        }})
    } else if (roll[dice] !== null && plusMinus === "-" && roll[dice].length > 1) {
      setRoll(prev => {
        return {...prev,
          [dice]: new Array(numberOfXDice - 1).fill(0)
        }})
    }
    setDiceIsRoll(false);
  }

  const updateBonusMalus = (params: string) => {
    if (params === "+") {
      setBonus(prev => prev +1)
    } else {
      setBonus( prev => prev -1)
    }
  }

  const rollTheDice = () => {
    setRoll({
      "4": roll["4"] === null ? null : roll["4"].map(d => Math.floor(Math.random() * 4)+ 1),
      "6": roll["6"] === null ? null : roll["6"].map(d => Math.floor(Math.random() * 6)+ 1),
      "8": roll["8"] === null ? null : roll["8"].map(d => Math.floor(Math.random() * 8)+ 1),
      "10": roll["10"] === null ? null : roll["10"].map(d => Math.floor(Math.random() * 10)+ 1),
      "12": roll["12"] === null ? null : roll["12"].map(d => Math.floor(Math.random() * 12)+ 1),
      "20": roll["20"] === null ? null : roll["20"].map(d => Math.floor(Math.random() * 20)+ 1),
      "100": roll["100"] === null ? null : roll["100"].map(d => Math.floor(Math.random() * 100)+ 1)
    })
    setDiceIsRoll(true);
  }

  const sumOfDiceDx = (params: string): number | undefined => {
    return roll[params]?.reduce((a: number,b: number) => a + b,0);
  }

  const calculateTotal = useCallback((roll: Dices) => {
    let preTotal = 0;
    for (let key in roll) {
      if (roll[key] !== null) {
        preTotal += roll[key].reduce((a: number,b: number) => a + b,0)
      }
    }
    setTotal(preTotal + bonus)
  },[bonus])

  const resetDice = () => {
    setRoll({
      "4": null,
      "6": null,
      "8": null,
      "10": null,
      "12": null,
      "20": null,
      "100": null,

      });
    setBonus(0);
    setDiceIsRoll(false);
  }

  useEffect(() => {
    calculateTotal(roll)
  }, [calculateTotal, roll])

  return (
    <div className="dice-container bg-sky-800/15 max-w-2xl min-h-40 px-4 py-4 m-5 rounded-lg	shadow-md md:flex md:flex-row">
      
      <div className="part-one flex flex-row">
        
        <div className="dice grow">
          <div className="d4 grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={e => handleNumberOfdices("+4")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{roll["4"]?.length ? roll["4"]?.length : 0}</p>
              <div onClick={e => handleNumberOfdices("-4")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
              <p className="self-center	">d4</p>
          </div>
          <p><FormattedMessage id="result" /></p>
          <p>{diceIsRoll && sumOfDiceDx("4")}</p>
        </div>
        <div className="dice grow">
          <div className="d6 grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={e => handleNumberOfdices("+6")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{roll["6"]?.length ? roll["6"]?.length : 0}</p>
              <div onClick={e => handleNumberOfdices("-6")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
            <p className="self-center	">d6</p>
          </div>
          <p><FormattedMessage id="result" /></p>
          <p>{diceIsRoll && sumOfDiceDx("6")}</p>
        </div>
        <div className="dice grow">
          <div className="d_ grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={e => handleNumberOfdices("+8")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{roll["8"]?.length ? roll["8"]?.length : 0}</p>
              <div onClick={e => handleNumberOfdices("-8")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
            <p className="self-center	">d8</p>
          </div>
          <p><FormattedMessage id="result" /></p>
          <p>{diceIsRoll && sumOfDiceDx("8")}</p>
        </div>

      </div>

      <div className="part-two flex flex-row">

        <div className="dice grow">
          <div className="d10 grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={e => handleNumberOfdices("+10")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{roll["10"]?.length ? roll["10"]?.length : 0}</p>
              <div onClick={e => handleNumberOfdices("-10")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
            <p className="self-center	">d10</p>
          </div>
          <p><FormattedMessage id="result" /></p>
          <p>{diceIsRoll && sumOfDiceDx("10")}</p>
        </div>
        <div className="dice grow">
          <div className="d12 grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={e => handleNumberOfdices("+12")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{roll["12"]?.length ? roll["12"]?.length : 0}</p>
              <div onClick={e => handleNumberOfdices("-12")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
            <p className="self-center	">d12</p>
          </div>
          <p><FormattedMessage id="result" /></p>
          <p>{diceIsRoll && sumOfDiceDx("12")}</p>
        </div>
        <div className="dice grow">
          <div className="d20 grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={e => handleNumberOfdices("+20")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{roll["20"]?.length ? roll["20"]?.length : 0}</p>
              <div onClick={e => handleNumberOfdices("-20")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
            <p className="self-center	">d20</p>
          </div>
          <p><FormattedMessage id="result" /></p>
          <p>{diceIsRoll && sumOfDiceDx("20")}</p>
        </div>

      </div>

      <div className="part-tree flex flex-row">

        <div className="dice grow">
          <div className="d100 grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={e => handleNumberOfdices("+100")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{roll["100"]?.length ? roll["100"]?.length : 0}</p>
              <div onClick={e => handleNumberOfdices("-100")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
            <p className="self-center	">d100</p>
          </div>
          <p><FormattedMessage id="result" /></p>
          <p>{diceIsRoll && sumOfDiceDx("100")}</p>
        </div>
        <div className="dice grow">
          <div className="+ grow flex justify-center	items-start">
            <div className="flex flex-col">
              <div onClick={ e => updateBonusMalus("+")} className="mx-2 my-1 dnd-btn-small">+</div>
              <p>{bonus}</p>
              <div onClick={ e => updateBonusMalus("-")} className="mx-2 my-1 dnd-btn-small">-</div>
            </div>
            <p className="self-center	">(+)</p>
          </div>
        </div>

        <div className="roll grow flex flex-col justify-between	">
          <div>
            <p onClick={resetDice} className="justify-start mx-2 my-1 dnd-btn"><FormattedMessage id="reset" /></p>
            {/* <p onClick={rollTheDice} className="justify-start link border border-gray-500/10 rounded-full bg-blue-300 py-1 px-4 mx-2 my-1 shadow-md"><FormattedMessage id="roll" /></p> */}
            <p onClick={rollTheDice} className="justify-start mx-2 my-2 dnd-btn"><FormattedMessage id="roll" /></p>
          </div>
            <div>
              <p><FormattedMessage id="total" /></p>
              <p>{diceIsRoll && total}</p>
            </div>
        </div>

      </div>

    </div>
  );
};
