import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { retrieveSettings } from '../../store/settings'
import { retrieveCusines } from '../../store/cuisines'
import { createRestaurant } from '../../store/restaurants';
import { CuisinesIcon, RedStar, RestaurantIcon } from '../../components/Icons';
import styles from './RestaurantForm.module.css'


export const RestaurantForm = ({ all_settings, all_cuisines }) => {

    const [name, setName] = useState('')
    const [priceRating, setPriceRating] = useState(1)
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [website, setWebsite] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [borough, setBorough] = useState('Manhattan')
    const [accessible, setAccessible] = useState('')
    const [cuisines, setCuisines] = useState([])
    const [settings, setSettings] = useState([])
    const [errors, setErrors] = useState([])
    const settingsState = useSelector(state => Object.values(state.settings))
    const cuisinesState = useSelector(state => Object.values(state.cuisines))

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        (async() => {
          await dispatch(retrieveSettings())
          await dispatch(retrieveCusines())
        })();
      }, [dispatch]);


    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            name: name,
            price_rating: priceRating,
            description: description,
            img_url: imageURL,
            phone_number: phoneNumber,
            website: website,
            street_address: streetAddress,
            borough: borough,
            accessible: accessible,
            settings: settings,
            cuisines: cuisines
        }

        !name? setErrors(['Please provide a name.'])
        : !imageURL ? setErrors(['Please provide a URL for your image.'])
        : !phoneNumber ? setErrors(['Please provide a phone number.'])
        : !streetAddress ? setErrors(['Please provide an address.'])
        : setErrors([])



        const newRestaurant = await dispatch(createRestaurant(formData))
        console.log(newRestaurant.id)
        if (newRestaurant.error) {
            console.log('ERRORS \n\n', newRestaurant.error)
            setErrors(newRestaurant.error)
        }
        else {
            history.push(`/restaurants/${newRestaurant.id}`)
        }
        }

    const settingsSelector = (e) => {
        const setting_array = [...settings]
        if (setting_array.includes(e.target.value)) {
            const idx_to_remove = setting_array.indexOf(e.target.value)
            setting_array.splice(idx_to_remove, 1)
        } else {
            setting_array.push(e.target.value)
        }
        setSettings(setting_array)
    }

    const cuisinesSelector = (e) => {
        const cuisines_array = [...cuisines]
        if (cuisines_array.includes(e.target.value)) {
            const idx_to_remove = cuisines_array.indexOf(e.target.value)
            cuisines_array.splice(idx_to_remove, 1)
        } else {
            cuisines_array.push(e.target.value)
        }
        setCuisines(cuisines_array)
        console.log(cuisines_array)
    }

    return (
            <div className={styles.container}>
                <div className={styles.form_entries}>
                    <h2>Restaurant Information</h2>
                    <ul>
                        {errors && errors.map(error => <li key={error} className={styles.error_messages}>{error}</li>)}
                    </ul>
                    <form onSubmit={onSubmit}>
                        <div className={styles.form_container}>
                            <div className={styles.left_entries}>
                                <div className={styles.input_container}>
                                    <label htmlFor='name'>Name</label>
                                    <input name='name'
                                        type='text'
                                        placeholder='Name'
                                        value={name}
                                        required
                                        onChange={e => setName(e.target.value)}>
                                    </input>
                                </div>
                                <div className={styles.input_container}>
                                    <label htmlFor='price_rating'>Price Rating</label>
                                    <select name='price_rating'
                                            value={priceRating}
                                            onChange={e => setPriceRating(e.target.value)}>
                                        <option value={1}>$</option>
                                        <option value={2}>$$</option>
                                        <option value={3}>$$$</option>
                                        <option value={4}>$$$$</option>
                                    </select>
                                </div>
                                <div className={styles.input_container}>
                                    <label htmlFor='description'>Description</label>
                                    <textarea name='description'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}>
                                    </textarea>
                                </div>
                                <div className={styles.input_container}>
                                    <label htmlFor='image_url'>Image Link</label>
                                    <input type="text"
                                            name='image_url'
                                            value={imageURL}
                                            required
                                            onChange={e => setImageURL(e.target.value)}>
                                    </input>
                                </div>
                                <div className={styles.input_container}>
                                    <label htmlFor='phone_number'>Phone Number</label>
                                    <input type="text"
                                            name='phone_number'
                                            value={phoneNumber}
                                            required
                                            onChange={e => setPhoneNumber(e.target.value)}>
                                    </input>
                                </div>
                                <div className={styles.input_container}>
                                    <label htmlFor='web'>Website</label>
                                    <input type="text"
                                            name='web'
                                            value={website}
                                            onChange={e => setWebsite(e.target.value)}>
                                    </input>
                                </div>
                                <div className={styles.input_container}>
                                    <label htmlFor='street_address'>Street Address</label>
                                    <input type="text"
                                            name='street_address'
                                            value={streetAddress}
                                            required
                                            onChange={e => setStreetAddress(e.target.value)}>
                                    </input>
                                </div>
                                <div className={styles.input_container}>
                                    <label htmlFor='borough'>Borough</label>
                                    <select name='borough'
                                            value={borough}
                                            onChange={e => setBorough(e.target.value)}>
                                        <option value="Manhattan">Manhattan</option>
                                        <option value="Brooklyn">Brooklyn</option>
                                        <option value="Queens">Queens</option>
                                        <option value="The Bronx">The Bronx</option>
                                        <option value="Staten Island">Staten Island</option>
                                    </select>
                                </div>
                                <div className={styles.input_container}>
                                    <i className="fa-solid fa-wheelchair"></i>
                                    <label htmlFor='accessible'>Accessible?</label>
                                    <input type="checkbox"
                                            value={accessible}
                                            onChange={() => setAccessible(!accessible)}>
                                    </input>
                                </div>
                            </div>
                            <div className={styles.right_entries}>
                                <fieldset>
                                    <legend className={styles.legend}>Attributes</legend>
                                    <div className={styles.input_container} >
                                        <label htmlFor='cuisines' className={styles.check_label}>
                                            Cuisines
                                            <CuisinesIcon />
                                        </label>
                                        <div className={styles.cuisines_container}>
                                        {cuisinesState.map(cuisine => (
                                        <div key={cuisine.id} className={styles.check_boxes}>
                                            <input type='checkbox' key={cuisine.id} name='cuisine' value={cuisine.id} onChange={cuisinesSelector}/>
                                            <label htmlFor='cuisine' className={styles.box_label}>{cuisine.type}</label>
                                        </div>
                                        ))}
                                        </div>
                                    </div>
                                    <div className={styles.input_container}>
                                        <label htmlFor='settings' className={styles.check_label}>
                                            Settings
                                            <RestaurantIcon />
                                        </label>
                                        <div className={styles.settings_container}>
                                        {settingsState.map(setting => (
                                        <div key={setting.id} className={styles.check_boxes}>
                                            <input type='checkbox' key={setting.id} name='setting' value={setting.id} onChange={settingsSelector}/>
                                            <label htmlFor='setting' className={styles.box_label}>{setting.type}</label>
                                        </div>
                                        ))}
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className={styles.submit_button}>
                            <button  type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                <div className={styles.form_display}>
                    <div className={styles.restaurant_card}>
                        <img src={imageURL} alt="" width='300px'></img>
                        <h2 className={styles.card_header}>{name}</h2>
                        { imageURL && name ?
                        <>
                            <div>
                                <RedStar />
                                <RedStar />
                                <RedStar />
                                <RedStar />
                                <RedStar />
                                1234 Reviews
                            </div>
                            <div>
                                {cuisines} | {priceRating} | {borough}
                            </div>
                            <div>
                                {phoneNumber}
                            </div>
                        </>
                        : null }
                    </div>
                </div>
            </div>
    )
}
