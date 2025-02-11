import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Footer.css"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {

    return (
        <div className="footer">
            <div className="flex justify-between min-h-full items-center mx-4">
                <div className="items-center">Dnd Heroic Battle v{process.env.REACT_APP_VERSION}</div>
                <div>CGU</div>
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
        </div>
    )
}