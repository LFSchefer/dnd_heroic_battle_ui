import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Footer.css"
import { FormattedMessage } from "react-intl"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FC } from "react";

const Footer: FC = () => {

 const goToCgu = (): void => {
    const baseURL = window.location.origin;
    window.location.replace(baseURL + "/cgu");
 }

    return (
        <footer className="footer">
            <div className="flex justify-between min-h-full items-center mx-4">
                <div className="items-center"><FormattedMessage id="appVersion"/>{process.env.REACT_APP_VERSION}</div>
                <div><button onClick={goToCgu}><FormattedMessage id="cgu"/></button></div>
                <div className="icons flex">
                    <div className="mr-4">
                        <a href="https://github.com/LFSchefer/dnd_heroic_battle/wiki" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faGithub} size="xl" />
                        </a>
                    </div>
                    <div className="mr-4">
                        <a href="https://www.linkedin.com/in/lfschefer/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} size="xl" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;