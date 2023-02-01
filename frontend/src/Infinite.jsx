import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
export default function Infinite() {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(2)
    const [total, setTotal] = useState()

    const getAllUsers = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/user`, {
            params: {
                page: currentPage,
                perpage: size
            }
        })
        // OR 
        // const { data } = await axios.get(`http://localhost:5000/api/user/?page=${currentPage}&perpage=${size}`)

        setUsers(pre => pre.concat(data.result))
        setTotal(data.totalBtn)
        setCurrentPage(pre => pre + 1)
        console.log("called");
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <>
            <InfiniteScroll
                dataLength={users.length}
                hasMore={currentPage != total}
                next={getAllUsers}
                loader={<h1>Loading....</h1>}
            >

                {
                    users.map(item => <div key={item._id} style={{ height: "1000px" }} >
                        <h1>{item.name}</h1>
                        <p>{item.city}</p>
                    </div>
                    )
                }
                {
                    currentPage === total && <h1>No more data</h1>
                };
            </InfiniteScroll>

        </>
    )
}