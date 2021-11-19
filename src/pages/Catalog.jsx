import React from 'react'

import { useParams } from 'react-router'

import PageHeader from '../components/page-haeder/PageHeader'

import { category as cate } from "../api/tmdbApi"
import MovieGrid from '../components/movie-grid/MovieGrid'

const Catalog = (props) => {
    const { category } = useParams()
    return (
        <div>
            <PageHeader>
                {
                    category === cate.movie ? "Movies" : "TV series"
                }

            </PageHeader>
            <div className="container mb-3">
                <MovieGrid category={category} />
            </div>
        </div>
    )
}

export default Catalog
