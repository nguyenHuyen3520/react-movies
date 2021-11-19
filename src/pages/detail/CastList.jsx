import React from 'react'
import { useParams } from 'react-router'
import apiConfig from '../../api/apiConfig'
import tmdbApi from '../../api/tmdbApi'


const Cast = (props) => {
    const category = useParams()

    const [casts, setCast] = React.useState([])

    React.useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category.category, props.id)
            setCast(res.cast.slice(0, 5))
        }
        getCredits()
    }, [category, props.id])
    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div className="casts__item" key={i}>
                        <div className="casts__item__img" style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Cast
