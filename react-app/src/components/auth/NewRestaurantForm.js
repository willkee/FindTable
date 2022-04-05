import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant } from '../../store/restaurants';
import { Redirect } from 'react-router-dom';

const NewRestaurantForm = ({ all_settings, all_cuisines }) => {
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

    const dispatch = useDispatch()
    // const error_list = useSelector(state => state.restaurants.undefined.error)

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
            .catch(async (res) => {
              // console.log(res)
              const data = await res.json()
              if (data && data.errors) {
                // console.log(data.errors)
                return
              }
            })
            if (newRestaurant) {
              return <Redirect to={`/restaurants/${newRestaurant.id}`}/>
            }





            // try {
            //     const data = await dispatch(createRestaurant(new_restaurant))
            //     console.log("\n\n\n\n\n\n\n\ndata\n\n\n\n\n\n\n", data.json())

            // } catch (err) {
            //     setErrors()
            //     // console.log("ERROR", errors)
            // }

            // const data = await error.json()
            // data && setErrors(data)
        }

    // const settingsSelector = (e) => {
    //     const setting_array = [...settings]
    //     if (setting_array.includes(e.target.value)) {
    //         const idx_to_remove = setting_array.indexOf(e.target.value)
    //         setting_array.splice(idx_to_remove, 1)
    //     } else {
    //         setting_array.push(e.target.value)
    //     }
    //     setSettings(setting_array)
    // }

    // const cuisinesSelector = (e) => {
    //     const cuisines_array = [...settings]
    //     if (cuisines_array.includes(e.target.value)) {
    //         const idx_to_remove = cuisines_array.indexOf(e.target.value)
    //         cuisines_array.splice(idx_to_remove, 1)
    //     } else {
    //         cuisines_array.push(e.target.value)
    //     }
    //     setCuisines(cuisines_array)
    // }

    return (
        <div>
            <ul>
                {errors && errors.map(error => {
                    <li key={error}>
                        {error}
                    </li>
                })}
            </ul>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input name='name'
                          type='text'
                          placeholder='Name'
                          value={name}
                          onChange={e => setName(e.target.value)}>
                    </input>
                </div>
                <div>
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
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea name='description'
                              value={description}
                              onChange={e => setDescription(e.target.value)}>
                    </textarea>
                </div>
                <div>
                    <label htmlFor='image_url'>Image Link</label>
                    <input type="text"
                            name='image_url'
                            value={imageURL}
                            onChange={e => setImageURL(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='phone_number'>Phone Number</label>
                    <input type="text"
                            name='phone_number'
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='web'>Website</label>
                    <input type="text"
                            name='web'
                            value={website}
                            onChange={e => setWebsite(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='street_address'>Street Address</label>
                    <input type="text"
                            name='street_address'
                            value={streetAddress}
                            onChange={e => setStreetAddress(e.target.value)}>
                    </input>
                </div>
                <div>
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
                <div>
                    <label htmlFor='accessible'>Accessible?</label>
                    <input type="checkbox"
                            value={accessible}
                            onChange={() => setAccessible(!accessible)}>
                    </input>
                </div>
                <div>
                    <label htmlFor='cuisines'>Cuisines</label>
                    <select name='cuisines'
                            value={cuisines}
                            onChange={(e) => setCuisines(Array.from(new Set(cuisines, e.target.value)))}
                            multiple>
                        {all_cuisines.map(cuisine => <option key={cuisine.id} value={cuisine.id}>{cuisine.type}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor='settings'>Settings</label>
                    <select name='settings'
                            value={settings}
                            onChange={(e) => setSettings(Array.from(new Set(settings, e.target.value)))}
                            multiple>
                        {all_settings.map(setting => <option key={setting.id} value={setting.id}>{setting.type}</option>)}
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewRestaurantForm
