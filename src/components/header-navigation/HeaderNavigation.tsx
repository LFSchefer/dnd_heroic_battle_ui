import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router"

const HeaderNavigation: FC = () => {
    
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const params = useParams();


    const goToCampaigns = (): void => {
        navigate("/campaigns");
    };

    const goToBattleList = (): void => {
        navigate(`/campaigns/${params?.campaignId}`);
    }

    const backToBattle = (): void => {
       navigate(`campaigns/${params.campaignId}/battles/${params.battleId}`); 
    };

    console.log(params)
    
    return (
        <div className="flex">
            {path === "/" &&
            <button onClick={goToCampaigns} className="dnd-btn-small-invert">
                <FormattedMessage id="goToCampaigns"/>
            </button>
            }
            {new RegExp(/(\/campaigns\/)/gm).test(path) &&
            <button onClick={goToCampaigns} className="dnd-btn-small-invert">
                <FormattedMessage id="backToCampaigns"/>
            </button>
            }
            {new RegExp(/(\/campaigns\/\d*)/gm).test(path) &&
            <button onClick={goToBattleList} className="dnd-btn-small-invert">
                <FormattedMessage id="backToBattleList"/>
            </button>
            }
            {new RegExp(/(\/battles\/\d*\/initialize|\/battles\/\d*\/fight)/gm).test(path) &&
            <button onClick={backToBattle} className="dnd-btn-small-invert">
                <FormattedMessage id="backToBattle"/>
            </button>
            }
        </div>
    )
}

export default HeaderNavigation;