import React from 'react'
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios'
import NavBar from '../NavBar'
import "./index.css"
const Home = () => {
    const [recipes, setRecipes] = useState([])
    const jwtToken = Cookies.get("jwtToken")
    const navigate = useNavigate()
    const userData = jwtDecode(jwtToken)
    const { id } = userData
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3005/recipe/get/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        if (response.status === 200) {
            const { recipesList } = response.data
            setRecipes(recipesList)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleAdd = () => {
        navigate("/add")
    }
    const handleUpdate = (recipeId) => {
        navigate(`/update/${recipeId}`)
    }
    const handleDelete = () => {
        console.log("delete")
    }
    return (
        <div className='home-container'>
            <NavBar />
            <div className='recipes-container' >
                <button onClick={handleAdd} className='api-button'>Add New Recipe</button>
                <ul className='unorder-recipe-list' >
                    {recipes?.map((each) => <li key={each._id} className='recipe-list-item'>
                        <p><span>Recipe name:</span> {each.title}</p>
                        <p><span>Category:</span> {each.category}</p>
                        <p><span>Ingredients:</span> {(each.ingredients).join(", ")}</p>
                        <p><span>Instructions:</span> {each.instructions}</p>
                        <p><span>Cookig time:</span> {each.cooking_time}</p>
                        <div className='buttons-container'>
                            <button onClick={()=>handleUpdate(each._id)} className='api-button'>update</button>
                            <button onClick={handleDelete} className='api-button'>delete</button>
                        </div>
                    </li>)}
                </ul>
            </div>
        </div >
    )
}

export default Home
