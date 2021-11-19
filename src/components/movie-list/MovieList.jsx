import React from 'react'
import PropTypes from 'prop-types'

import { SwiperSlide, Swiper } from 'swiper/react'

import tmdbApi, { category } from '../../api/tmdbApi'

import MovieCard from '../movie-card/MovieCard'


const MovieList = props => {
    const [items, setItems] = React.useState([])
    React.useEffect(() => {
        const getList = async () => {
            let response = null
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params: {} })
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params: {} })
                        break;
                }
            } else {
                console.log("props type:", props.type);
                response = await tmdbApi.similar(props.category, props.id)
            }
            console.log('response trong movie-list', response);
            setItems(response.results)
        }
        getList()

    }, [props.id, props.type, props.category])

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={item.category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default MovieList
