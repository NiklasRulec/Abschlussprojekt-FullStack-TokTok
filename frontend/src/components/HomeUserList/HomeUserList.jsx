import axios from "axios"
import { useEffect, useState, useContext } from 'react'
import HomeUserItem from '../HomeUserItem/HomeUserItem'
import { RefreshContext } from '../../user/RefreshContext'
import './HomeUserList.css'

const HomeUserList = () => {
    const [postData, setPostData] = useState([])
    const {refresh, setRefresh} = useContext(RefreshContext)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/post/")
            setPostData(data)
        }
        fetchData()
    },[refresh])

    return ( 
        <section className="HomeUserList">
        {postData ? (
            postData.map((post, index) => { return <HomeUserItem post={post} key={index} /> })
        ) : (
            <p>Lädt..</p>
        )}
        </section>
     );
}
 
export default HomeUserList;