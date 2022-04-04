import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';

const NewRestaurantForm = () => {
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
    const dispatch = useDispatch()

    useEffect(() => {

    })

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='name'>Name</label>
            <input name='name' type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)}></input>
            <label htmlFor='price_rating'>Price Rating</label>
            <input name='price_rating' type='text' placeholder='Name' value={priceRating} onChange={e => setName(e.target.value)}></input>
            <label htmlFor='settings'>Settings</label>
            <select name='settings' value={settings} onChange={e => setSettings(e.target.value)}>
                <option value="casual">Casual</option>
                <option value="outdoor">Outdoor</option>
                <option value="fine dining">Fine Dining</option>
                <option value="bar">Bar</option>
                <option value="cafe">Cafe</option>
            </select>
        </form>
    )
}

export default NewRestaurantForm
