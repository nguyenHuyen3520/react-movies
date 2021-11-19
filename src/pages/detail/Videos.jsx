import React from 'react'
import tmdbApi from '../../api/tmdbApi'
import { useParams } from 'react-router'
const Videos = (props) => {

    const { category } = useParams()

    const [videos, setVideos] = React.useState([])

    React.useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id)
            setVideos(res.results.slice(0, 5))
        }
        getVideos()
    }, [category, props.id])
    return (
        <>
            {
                videos.map((item, index) => (
                    <Video key={index} item={item} />
                ))
            }
        </>
    )
}

const Video = props => {
    const item = props.item
    const iframeRef = React.useRef()
    React.useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
        iframeRef.current.setAttribute('height', height)
    }, [])
    return (
        <div className="video">
            <div className="video__title">
                <h2> {item.name} </h2>
            </div>
            <iframe
                src={`https://youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            />
        </div>
    )
}

export default Videos
