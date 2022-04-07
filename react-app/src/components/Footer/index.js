import { Link } from 'react-router-dom';
import styles from "./Footer.module.css";
import github from "../../company-logos/GitHub.png"
import linkedin from "../../company-logos/LinkedIn.png"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <section className={styles.links}>
                    <div className={styles.discover}>
                        <ul className={styles.label}>DISCOVER
                            <li className={styles.discoverLinks}><Link to="/cuisines">Cuisines Near Me</Link></li>
                            <li className={styles.discoverLinks}><Link to="/restaurants">Restaurants Near Me</Link></li>
                            <li className={styles.discoverLinks}><Link to="/restaurants">Restaurants</Link></li>
                            <li className={styles.discoverLinks}><Link to="/cuisines">Cuisines</Link></li>
                       </ul>
                    </div>
                    <div className={styles.about}>
                        <ul className={styles.label}>FindTable</ul>
                        <li><a href="https://github.com/willkee/FindTable" target="_blank">About Us</a></li>
                    </div>
                </section>
                <hr className={styles.horizontalLine}></hr>
                <ul className={styles.descriptions}>
                    FindTable is an App Academy project created by the following developers:
                    <li className={styles.items}>
                        <p>Nikolas Garza</p>
                        <a href="https://github.com/nmgarza5" target="_blank">
                            <img src={github} className={styles.github} alt="Image link to Nikolas Garza's LinkedIn profile."/>
                        </a>
                        <a href="https://www.linkedin.com/in/nikolas-garza-7a3202139/" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Image link to Nikolas Garza's LinkedIn profile."/>
                        </a>
                    </li>
                    <li className={styles.items}>
                        <p>Paul Oh</p>
                        <a href="https://github.com/ohpaul28" target="_blank">
                            <img src={github} className={styles.github} alt="Image link to Paul Oh's LinkedIn profile."/>
                        </a>
                        {/* <a href="https://www.linkedin.com/in/paul-oh/" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Image link to Paul Oh's LinkedIn profile."/>
                        </a> */}
                    </li>
                    <li className={styles.items}>
                        <p>Will Kee</p>
                        <a href="https://github.com/willkee" target="_blank">
                            <img src={github} className={styles.github} alt="Image link to Will Kee's GitHub profile."/>
                        </a>
                        <a href="https://www.linkedin.com/in/will-kee/" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Image link to Will Kee's LinkedIn profile."/>
                        </a>
                    </li>
                    <li className={styles.items}>
                        <p>Luke Yamasaki</p>
                        <a href="https://github.com/Luke-Yamasaki" target="_blank">
                            <img src={github} className={styles.github} alt="Image link to Luke Yamasaki's GitHub profile."/>
                        </a>
                        <a href="https://www.linkedin.com/in/lukeyamasaki/" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Image link to Luke Yamasaki's LinkedIn profile."/>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
