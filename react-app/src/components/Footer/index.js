import { Link } from 'react-router-dom';
import styles from "./Footer.module.css";
import github from "../../company-logos/GitHub.png"
import linkedin from "../../company-logos/LinkedIn.png"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <section className={styles.links}>
                        <h5>TECHNOLOGIES</h5>
                        <div className={styles.devicons}>
                            <i class="devicon-python-plain-wordmark"></i>
                            <i class="devicon-flask-original-wordmark"></i>
                            <i class="devicon-postgresql-plain-wordmark"></i>

                            <i class="devicon-react-original-wordmark"></i>
                            <i class="devicon-redux-original"></i>
                            <i className="devicon-postgresql-plain"></i>
                            <i class="devicon-html5-plain-wordmark"></i>
                            <i class="devicon-css3-plain-wordmark"></i>
                            <i class="devicon-illustrator-line"></i>
                            <i class="devicon-aftereffects-plain"></i>
                            <i class="devicon-xd-line"></i>
                            <i className="devicon-heroku-plain"></i>
                        </div>
                </section>
                <hr className={styles.horizontalLine}></hr>
                <div className={styles.descriptions}>FindTable is an App Academy project created by the following full-stack developers:</div>
                <ul>
                    <div className={styles.items_container}>

                        <div className={styles.items}>
                            <p>Nikolas Garza</p>
                            <span>
                                <a href="https://github.com/nmgarza5" rel="noreferrer" target="_blank">
                                    <img src={github} className={styles.github} alt="Link to Nikolas Garza's LinkedIn profile."/>
                                </a>
                                <a href="https://www.linkedin.com/in/nikolas-garza-7a3202139/" rel="noreferrer" target="_blank">
                                    <img src={linkedin} className={styles.linkedin} alt="Link to Nikolas Garza's LinkedIn profile."/>
                                </a>
                            </span>
                        </div>
                        <div className={styles.items}>
                            <p>Paul Oh</p>
                            <span>
                                <a href="https://github.com/ohpaul28" rel="noreferrer" target="_blank">
                                    <img src={github} className={styles.github} alt="Link to Paul Oh's LinkedIn profile."/>
                                </a>
                                <a href="https://www.linkedin.com/in/paul-oh/" target="_blank">
                                    <img src={linkedin} className={styles.linkedin} alt="Image link to Paul Oh's LinkedIn profile."/>
                                </a>
                            </span>
                        </div>
                        <div className={styles.items}>
                            <p>Will Kee</p>
                            <span>
                                <a href="https://github.com/willkee" rel="noreferrer" target="_blank">
                                    <img src={github} className={styles.github} alt="Link to Will Kee's GitHub profile."/>
                                </a>
                                <a href="https://www.linkedin.com/in/will-kee/" rel="noreferrer" target="_blank">
                                    <img src={linkedin} className={styles.linkedin} alt="Link to Will Kee's LinkedIn profile."/>
                                </a>
                            </span>
                        </div>
                        <div className={styles.items}>
                            <p>Luke Yamasaki</p>
                            <span>
                                <a href="https://github.com/Luke-Yamasaki" rel="noreferrer" target="_blank">
                                    <img src={github} className={styles.github} alt="Link to Luke Yamasaki's GitHub profile."/>
                                </a>
                                <a href="https://www.linkedin.com/in/lukeyamasaki/" rel="noreferrer" target="_blank">
                                    <img src={linkedin} className={styles.linkedin} alt="Link to Luke Yamasaki's LinkedIn profile."/>
                                </a>
                            </span>
                        </div>
                    </div>
                </ul>
            </div>
        </footer>
    )
}
