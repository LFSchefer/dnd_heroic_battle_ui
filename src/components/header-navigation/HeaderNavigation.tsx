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

    // const goToBattleList = (): void => {
    //     navigate(`/campaigns/${params?.campaignId}`);
    // }

    console.log(params)
    
    return (
        <div className="flex">
            {path === "/" &&
            <button onClick={goToCampaigns} className="dnd-btn-small-invert">
                <FormattedMessage id="goToCampaigns"/>
            </button>
            }
            {new RegExp(/(\/campaigns\/.*)/gm).test(path) &&
            <button onClick={goToCampaigns} className="dnd-btn-small-invert">
                <FormattedMessage id="backToCampaigns"/>
            </button>
            }
        </div>
    )
}

export default HeaderNavigation;