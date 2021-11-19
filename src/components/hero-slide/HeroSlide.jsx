import React, { useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useHistory } from 'react-router-dom'

import tmdbApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import Button, { OutlineButton } from "../button/Button"
import Modoal, { ModalContent } from "../modal/Modal"
const HeroSlide = () => {
    const [movieItems, setMovieItems] = useState([])
    SwiperCore.use([Autoplay])

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params })
                setMovieItems(response.results.slice(0, 4))
            } catch {
                console.log('erro');
            }
        }
        getMovies()

    }, [])

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 3000
                }}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSLideItem item={item} className={`${isActive ? 'active' : ''} `} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, index) => (
                    <TrailerModal item={item} key={index} />
                ))
            }
        </div>
    )
}

const HeroSLideItem = props => {
    let history = useHistory()

    const item = props.item

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id)
        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
        } else {
            modal.querySelector('.modal__content').innerHTML = "No Trailer"
        }
        modal.classList.toggle('active')
    }
    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{
                backgroundImage: `url(${background})`
            }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => history.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )

}

const TrailerModal = props => {
    const item = props.item
    const iframeRef = React.useRef()

    const onClose = () => iframeRef.current.setAttribute('src', '')
    return (
        <Modoal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modoal>
    )

}

export default HeroSlide
