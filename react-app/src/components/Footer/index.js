import { Link } from 'react-router-dom';
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <section className={styles.links}>
                    <div className={styles.discover}>
                        <ul className={styles.label}>DISCOVER
                            <li><Link to="/cuisines">Cuisines Near Me</Link></li>
                            <li><Link to="/restaurants">Restaurants Near Me</Link></li>
                            <li><Link to="/restaurants">Restaurants</Link></li>
                            <li><Link to="/cuisines">Cuisines</Link></li>
                       </ul>
                    </div>
                    <div className={styles.about}>
                        <ul className={styles.label}>FindTable</ul>
                        <li><a href="https://github.com/willkee/FindTable" target="_blank">About Us</a></li>
                    </div>
                </section>
                <hr className={styles.horizontalLine}></hr>
                <section className={styles.projectDescription}>
                    <ul className={styles.descriptions}>
                        FindTable is an App Academy project created by the following developers:
                        <li>
                            <p>Nikolas Garza</p>
                            <a href="https://github.com/nmgarza5" target="_blank">
                                <div className={styles.github} />
                            </a>
                            <a href="https://www.linkedin.com/in/nikolas-garza-7a3202139/" target="_blank">
                                <div className={styles.linkedin} />
                            </a>
                        </li>
                        <li>
                            <p>Paul Oh</p>
                            <a href="https://github.com/willkee" target="_blank">
                                <div className={styles.github} />
                            </a>
                            {/* <a href="https://www.linkedin.com/in/paul-oh/" target="_blank">
                                <div className={styles.linkedin} />
                            </a> */}
                        </li>
                        <li>
                            <p>Will Kee</p>
                            <a href="https://github.com/ohpaul28" target="_blank">
                                <div className={styles.github} />
                            </a>
                            <a href="https://www.linkedin.com/in/will-kee/" target="_blank">
                                <div className={styles.linkedin} />
                            </a>
                        </li>
                        <li>
                            <p>Luke Yamasaki</p>
                            <a href="https://github.com/Luke-Yamasaki" target="_blank">
                                <div className={styles.github} />
                            </a>
                            <a href="https://www.linkedin.com/in/lukeyamasaki/" target="_blank">
                                <div className={styles.linkedin} />
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    )
}
