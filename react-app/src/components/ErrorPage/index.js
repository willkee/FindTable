import notfound from "../../images/notfound.png";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
	return (
		<div className={styles.error_parent}>
			<div>
				<h1>Page Not Found</h1>
				<img
					src={notfound}
					alt="not found"
					className={styles.error_img}
				></img>
			</div>
		</div>
	);
};

export default ErrorPage;
