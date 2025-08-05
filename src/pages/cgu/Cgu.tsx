import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router"
import "./Cgu.css"
import { FC } from "react";

const Cgu: FC = () => {

    const navigate = useNavigate();

    const navigateBack = (): void => {
        navigate("/");
    }

    return (
        <div className="cgu relative">
            <h1 className="py-8 font-bold"><FormattedMessage id="GCU"/></h1>
            <button className="dnd-btn fixed btn-cgu" onClick={navigateBack}><FormattedMessage id="backHome"/></button>
            <div className="text-left w-6/12 m-auto pb-8">
                <h2 className="font-semibold mt-8 mb-4">1. Préambule</h2>
                <p className="text-wrap">Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation de l'application Dnd Heroic Batlle (ci-après "l'Application"). En accédant et en utilisant l'Application, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'Application.</p>
                <h2 className="font-semibold mt-8 mb-4">2. Description de l'Application</h2>
                <p className="text-wrap">L'Application DnD Heroic Battles est une application gratuite destinée à la gestion de combat Dongon & dragon. Elle permet aux utilisateurs de gérer facilement les combat d'une campagne Dongon & Dragon (gestion des tour, gestion des points de vie, etc.).</p>
                <h2 className="font-semibold mt-8 mb-4">3. Accès à l'Application</h2>
                <p className="text-wrap">L'accès à l'Application est gratuit et réservé aux utilisateurs majeurs ou mineurs avec l'accord de leurs représentants légaux. L'utilisation de l'Application nécessite une connexion Internet et peut entraîner des frais de données auprès de votre opérateur internet et ou mobile.</p>
                <h2 className="font-semibold mt-8 mb-4">4. Création de Compte</h2>
                <p className="text-wrap">Pour utiliser certaines fonctionnalités de l'Application, vous devrez peut-être créer un compte. Vous vous engagez à fournir des informations exactes et complètes lors de la création de votre compte et à les mettre à jour régulièrement. Vous êtes responsable de la confidentialité de votre identifiant et mot de passe et de toute activité effectuée sous votre compte.</p>
                <h2 className="font-semibold mt-8 mb-4">5. Utilisation de l'Application</h2>
                <p className="text-wrap">Vous vous engagez à utiliser l'Application conformément aux lois en vigueur et aux présentes CGU. Vous ne devez pas :</p>
                <ul>
                    <li>- Utiliser l'Application à des fins illégales ou non autorisées.</li>
                    <li>- Perturber, altérer ou interférer avec le fonctionnement de l'Application.</li>
                    <li>- Tenter d'accéder à des parties de l'Application non autorisées.</li>
                    <li>- Collecter ou utiliser des informations personnelles sur d'autres utilisateurs sans leur consentement.</li>
                </ul>
                <h2 className="font-semibold mt-8 mb-4">6. Propriété Intellectuelle</h2>
                <p className="text-wrap">L'Application et tous les contenus, marques, logos et autres éléments de propriété intellectuelle sont la propriété exclusive de l'Éditeur ou de ses concédants. Vous ne pouvez pas reproduire, distribuer, modifier, créer des œuvres dérivées, afficher publiquement, représenter, transmettre ou utiliser de quelque manière que ce soit les contenus de l'Application sans l'autorisation écrite préalable de l'Éditeur.</p>
                <h2 className="font-semibold mt-8 mb-4">7. Données Personnelles</h2>
                <p className="text-wrap">L'Éditeur collecte et traite des données personnelles conformément à sa Politique de Confidentialité, disponible [lien vers la Politique de Confidentialité]. En utilisant l'Application, vous consentez à la collecte et au traitement de vos données personnelles selon les termes de cette politique.</p>
                <h2 className="font-semibold mt-8 mb-4">8. Responsabilité</h2>
                <p className="text-wrap">L'Éditeur s'efforce de maintenir l'Application accessible et fonctionnelle, mais ne peut garantir une disponibilité continue. L'Éditeur ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation de l'Application, y compris mais sans s'y limiter, les pertes de données, les interruptions de service ou les erreurs techniques.</p>
                <h2 className="font-semibold mt-8 mb-4">9. Modification des CGU</h2>
                <p className="text-wrap">L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront notifiées aux utilisateurs par une publication sur l'Application ou par tout autre moyen jugé approprié. L'utilisation continue de l'Application après la notification des modifications constitue votre acceptation des nouvelles CGU.</p>
                <h2 className="font-semibold mt-8 mb-4">10. Droit Applicable et Juridiction</h2>
                <p className="text-wrap">Les présentes CGU sont régies par le droit français. Tout litige relatif à l'interprétation ou à l'exécution des présentes CGU sera soumis à la compétence exclusive des tribunaux français.</p>
                <h2 className="font-semibold mt-8 mb-4">11. Contact</h2>
                <p className="text-wrap">Pour toute question ou réclamation concernant l'Application ou les présentes CGU, veuillez contacter l'Éditeur à l'adresse suivante : lf.schefer@gamil.com.</p>
            </div>
        </div>
    )
}

export default Cgu;