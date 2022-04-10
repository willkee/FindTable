import React, { useState, useEffect } from 'react'
import styles from './ReviewCounter.module.css'

const ReviewCounter = ({ stars }) => {
    const [oneStar, setOneStar] = useState(0)
    const [twoStar, setTwoStar] = useState(0)
    const [threeStar, setThreeStar] = useState(0)
    const [fourStar, setFourStar] = useState(0)
    const [fiveStar, setFiveStar] = useState(0)
    const [total, setTotal] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        let one = 0
        let two = 0
        let three = 0
        let four = 0
        let five = 0

        stars.forEach(star => {
            if (star === 1) {
                one++
            } else if (star === 2) {
                two++
            } else if (star === 3) {
                three++
            } else if (star === 4) {
                four++
            } else {
                five++
            }
        })
        setOneStar(one)
        setTwoStar(two)
        setThreeStar(three)
        setFourStar(four)
        setFiveStar(five)
        setTotal(one + two + three + four + five)
        setLoaded(true)
    }, [stars])

    return (
        <div className={styles.review_counter_parent}>
            {loaded && (
                <div>

                    {/* 1 */}
                    <div className={styles.each_rating_container}>
                        <div className={styles.counter_left}><span>{oneStar}</span><span className={styles.star_icon_container}><i className="fa-solid fa-star"/></span></div>
                        <div>
                            <div className={styles.clear_bar}>
                            <div className={styles.red_bar} style={{width:`${(oneStar / total) * 100}%`}}></div>
                            </div>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className={styles.each_rating_container}>
                        <div className={styles.counter_left}><span>{twoStar}</span><span className={styles.star_icon_container}><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/></span></div>
                        <div>
                            <div className={styles.clear_bar}>
                            <div className={styles.red_bar} style={{width:`${(twoStar / total) * 100}%`}}></div>
                            </div>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className={styles.each_rating_container}>
                        <div className={styles.counter_left}><span>{threeStar}</span><span className={styles.star_icon_container}><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/></span></div>
                        <div>
                            <div className={styles.clear_bar}>
                            <div className={styles.red_bar} style={{width:`${(threeStar / total) * 100}%`}}></div>
                            </div>
                        </div>
                    </div>

                    {/* 4 */}
                    <div className={styles.each_rating_container}>
                        <div className={styles.counter_left}><span>{fourStar}</span><span className={styles.star_icon_container}><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/></span></div>
                        <div>
                            <div className={styles.clear_bar}>
                            <div className={styles.red_bar} style={{width:`${(fourStar / total) * 100}%`}}></div>
                            </div>
                        </div>
                    </div>

                    {/* 5 */}
                    <div className={styles.each_rating_container}>
                        <div className={styles.counter_left}><span>{fiveStar}</span><span className={styles.star_icon_container}><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/><i className="fa-solid fa-star"/></span></div>
                        <div>
                            <div className={styles.clear_bar}>
                            <div className={styles.red_bar} style={{width:`${(fiveStar / total) * 100}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReviewCounter;
