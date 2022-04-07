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
                        <li><a to="https://github.com/willkee/FindTable" target="_blank">About Us</a></li>
                    </div>
                </section>
                <hr className={styles.horizontalLine}></hr>
                <section className={styles.projectDescription}>
                    <ul className={styles.label}>
                        FindTable is an App Academy project created by the following developers:
                        <li>
                            <a href="https://github.com/nmgarza5" target="_blank">
                                <p>Nick Garza</p>
                                <img className={styles.linkedIn} src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/ohpaul28" target="_blank">
                                <p>Paul Oh</p>
                                <img className={styles.linkedIn} src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/willkee" target="_blank">
                                <p>Will Kee</p>
                                <img className={styles.linkedIn} src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Luke-Yamasaki" target="_blank">
                                <p>Luke Yamasaki</p>
                                <img className={styles.linkedIn} src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img>
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </footer>
    )
}
