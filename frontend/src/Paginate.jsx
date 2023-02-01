import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Pagination() {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(2)
    const [total, setTotal] = useState()

    const getAllUsers = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/user/?page=${currentPage}&perpage=${size}`)
        console.log(data);
        setUsers(data.result)
        setTotal(data.totalBtn)
    }
    useEffect(() => {
        getAllUsers()
    }, [currentPage, size])

    return (
        <>
            <select class="" onClick={e => setSize(+e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
            <h1>Page {currentPage + 1} of {total}</h1>
            {
                users.map(item => <div key={item.name} >
                    <h1>{item.name}</h1>
                    <p>{item.city}</p>
                </div>

                )
            }
            <button type="button" onClick={e => setCurrentPage(pre => pre == 0 ? 0 : pre - 1)} class="btn btn-primary">Previous</button>
            {
                [...Array(total).keys()].map(item => <button className='btn btn-success mx-2' key={item} onClick={e => setCurrentPage(item)} >
                    {item + 1}
                </button>)
            }
            <button disabled={currentPage + 1 == total} type="button" onClick={e => setCurrentPage(pre => pre + 1)} class="btn btn-primary">Next</button>
        </>
    )
}