import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';

const NewRestaurantForm = ({ all_settings, all_cuisines }) => {
    const [name, setName] = useState('')
    const [priceRating, setPriceRating] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [website, setWebsite] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [borough, setBorough] = useState('')
    const [accessible, setAccessible] = useState('')
    const [cuisines, setCuisines] = useState([])
    const [settings, setSettings] = useState([])
    const [errors, setErrors] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
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
        const cuisines_array = [...settings]
        if (cuisines_array.includes(e.target.value)) {
            const idx_to_remove = cuisines_array.indexOf(e.target.value)
            cuisines_array.splice(idx_to_remove, 1)
        } else {
            cuisines_array.push(e.target.value)
        }
        setCuisines(cuisines_array)
    }

    return (
        <form onSubmit={onSubmit}>
            {console.log('SETTING ARRAY', all_settings)}
            <div>
                <label htmlFor='name'>Name</label>
                <input name='name' type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='price_rating'>Price Rating</label>
                <select name='price_rating' value={priceRating} onChange={e => setPriceRating(e.target.value)}>
                    <option value={1}>$</option>
                    <option value={2}>$$</option>
                    <option value={3}>$$$</option>
                    <option value={4}>$$$$</option>
                </select>
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <textarea name='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label htmlFor='image_url'>Image Link</label>
                <input type="text" name='image_url' value={imageURL} onChange={e => setImageURL(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='phone_number'>Phone Number</label>
                <input type="text" name='phone_number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='web'>Website</label>
                <input type="text" name='web' value={website} onChange={e => setWebsite(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='street_address'>Street Address</label>
                <input type="text" name='street_address' value={streetAddress} onChange={e => setStreetAddress(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor='borough'>Borough</label>
                <select name='borough' value={borough} onChange={e => setBorough(e.target.value)}>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Queens">Queens</option>
                    <option value="The Bronx">The Bronx</option>
                    <option value="Staten Island">Staten Island</option>
                </select>
            </div>
            <div>
                <label htmlFor='accessible'>Accessible?</label>
                <input type="checkbox" value={accessible} onChange={() => setAccessible(!accessible)}></input>
            </div>
            <div>
                <label htmlFor='cuisines'>Cuisines</label>
                <select name='cuisines' value={cuisines} onChange={cuisinesSelector} multiple>
                    {all_cuisines.map(cuisine => <option key={cuisine.id} value={cuisine.type}>{cuisine.type}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor='settings'>Settings</label>
                <select name='settings' value={settings} onChange={settingsSelector} multiple>
                    {all_settings.map(setting => <option key={setting.id} value={setting.type}>{setting.type}</option>)}
                </select>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default NewRestaurantForm
