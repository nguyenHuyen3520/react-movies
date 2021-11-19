import react from 'react'
import React from 'react'

import { useParams, useHistory } from 'react-router'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../button/Button'
import Input from '../input/Input'

import MovieCard from '../movie-card/MovieCard'


const MovieGrid = (props) => {

    const [items, setItems] = React.useState([])

    const [page, setPage] = React.useState(1)

    const [totalPages, setTotalPages] = React.useState(3)

    const { keyword } = useParams()
    React.useEffect(() => {
        const getList = async () => {
            let response = null
            if (keyword === undefined) {
                const params = {}
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params })
                        break;
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params })
            }
            setItems(response.results)
            console.log('response', response);
            console.log('tatal', totalPages);
            setTotalPages(response.total_pages)
        }
        getList()

    }, [props.category, keyword, totalPages]);

    const loadMore = async () => {
        let response = null
        if (keyword === undefined) {
            const params = {
                page: page + 1
            }
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params })
                    break;
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params })
        }
        setItems([...items, ...response.results])
        setPage(page + 1)
    }
    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} key={keyword} />
            </div>
            <div className="movie-grid">
                {
                    items.map((item, index) => (
                        <MovieCard
                            category={props.category}
                            item={item}
                            key={index}
                        />
                    ))
                }
            </div>
            {
                page < totalPages ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore} >Load More</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

const MovieSearch = props => {
    const history = useHistory()

    const [keyword, setKeyword] = React.useState(props.keyword ? props.keyword : "")

    const goToSearch = React.useCallback(() => {
        if (keyword.trim().length > 0) {
            history.push("")
            history.push(`${category[props.category]}/search/${keyword}`)
        }
    }, [keyword, props.category, history])
    React.useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if (e.keyCode === 13) {
                goToSearch()
            }
        }
        document.addEventListener('keyup', enterEvent)
        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    }, [keyword, goToSearch])
    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keywords"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}  >Search</Button>
        </div>
    )
}

export default MovieGrid
