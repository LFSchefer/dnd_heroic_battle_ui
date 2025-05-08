import { useEffect } from "react";
import { useParams } from "react-router";

type Props = {
    updateBattle:() => void
}

export default function BattleInitiative(props: Props) {

    const {updateBattle} = props;

    const params = useParams();
    const battleId = +params?.battleId!;

    useEffect(() => {
        
    },[])

    return (
        <>
        </>
    )
}