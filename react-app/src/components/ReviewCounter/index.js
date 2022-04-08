import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
    }, [])
// style={{color: "red", fontSize: "16px"}}

    return (
        <div>
            {loaded && (
                <div>
                    <div>One Star: {(oneStar / total)*100}</div>
                    <div>Two Star: {(twoStar / total)*100}</div>
                    <div>Three Star: {(threeStar / total)*100}</div>
                    <div>Four Star: {(fourStar / total)*100}</div>
                    <div>Five Star: {(fiveStar / total)*100}</div>
                    <div className={styles.clear_bar}>
                    <div className={styles.red_bar} style={{width:`${(oneStar / total) * 100}%`}}></div>
                    </div>
                    <div className={styles.clear_bar}>
                    <div className={styles.red_bar} style={{width:`${(twoStar / total) * 100}%`}}></div>
                    </div>
                    <div className={styles.clear_bar}>
                    <div className={styles.red_bar} style={{width:`${(threeStar / total) * 100}%`}}></div>
                    </div>
                    <div className={styles.clear_bar}>
                    <div className={styles.red_bar} style={{width:`${(fourStar / total) * 100}%`}}></div>
                    </div>
                    <div className={styles.clear_bar}>
                    <div className={styles.red_bar} style={{width:`${(fiveStar / total) * 100}%`}}></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReviewCounter;
