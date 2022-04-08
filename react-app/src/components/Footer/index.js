import { Link } from 'react-router-dom';
import styles from "./Footer.module.css";
import github from "../../company-logos/GitHub.png"
import linkedin from "../../company-logos/LinkedIn.png"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <section className={styles.links}>
                    <div className={styles.linksBox}>
                        <ul className={styles.label}>DISCOVER
                            <li className={styles.sectionLinks}><Link className={styles.sectionLinks} to="/cuisines">Cuisines Near Me</Link></li>
                            <li className={styles.sectionLinks}><Link className={styles.sectionLinks} to="/restaurants">Restaurants Near Me</Link></li>
                            <li className={styles.sectionLinks}><Link className={styles.sectionLinks} to="/restaurants">Restaurants</Link></li>
                            <li className={styles.sectionLinks}><Link className={styles.sectionLinks} to="/cuisines">Cuisines</Link></li>
                       </ul>
                    </div>
                    <div className={styles.linksBox}>
                        <ul className={styles.label}>FindTable
                            <li className={styles.sectionLinks}><a className={styles.sectionLinks} href="https://github.com/willkee/FindTable" rel="noreferrer" target="_blank">About Us</a></li>
                        </ul>
                    </div>
                </section>
                <hr className={styles.horizontalLine}></hr>
                <ul className={styles.descriptions}>
                    FindTable is an App Academy project created by the following developers:
                    <li className={styles.items}>
                        <p>Nikolas Garza</p>
                        <a href="https://github.com/nmgarza5" rel="noreferrer" target="_blank">
                            <img src={github} className={styles.github} alt="Link to Nikolas Garza's LinkedIn profile."/>
                        </a>
                        <a href="https://www.linkedin.com/in/nikolas-garza-7a3202139/" rel="noreferrer" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Link to Nikolas Garza's LinkedIn profile."/>
                        </a>
                    </li>
                    <li className={styles.items}>
                        <p>Paul Oh</p>
                        <a href="https://github.com/ohpaul28" rel="noreferrer" target="_blank">
                            <img src={github} className={styles.github} alt="Link to Paul Oh's LinkedIn profile."/>
                        </a>
                        {/* <a href="https://www.linkedin.com/in/paul-oh/" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Image link to Paul Oh's LinkedIn profile."/>
                        </a> */}
                    </li>
                    <li className={styles.items}>
                        <p>Will Kee</p>
                        <a href="https://github.com/willkee" rel="noreferrer" target="_blank">
                            <img src={github} className={styles.github} alt="Link to Will Kee's GitHub profile."/>
                        </a>
                        <a href="https://www.linkedin.com/in/will-kee/" rel="noreferrer" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Link to Will Kee's LinkedIn profile."/>
                        </a>
                    </li>
                    <li className={styles.items}>
                        <p>Luke Yamasaki</p>
                        <a href="https://github.com/Luke-Yamasaki" rel="noreferrer" target="_blank">
                            <img src={github} className={styles.github} alt="Link to Luke Yamasaki's GitHub profile."/>
                        </a>
                        <a href="https://www.linkedin.com/in/lukeyamasaki/" rel="noreferrer" target="_blank">
                            <img src={linkedin} className={styles.linkedin} alt="Link to Luke Yamasaki's LinkedIn profile."/>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
