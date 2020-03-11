import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import '../../styles/Navigation.css'

/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/
const Navigation = ({ data }) => {
    const [style, setStyle] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const redirection = (urlObject, key = 0) => {
        if (urlObject.url.match(/^\s?http(s?)/gi)) {
            return <a className="navigation__link" href={urlObject.url} key={key} target="_blank" rel="noopener noreferrer">{urlObject.label}</a>
        } else {
            return <Link className="navigation__link" to={urlObject.url} key={key}>{urlObject.label}</Link>
        }
    }

    const firstItemIndex = data.findIndex(element => !element.url.match(/^\/tag/gi))    
    const firstItem = () => redirection(data[firstItemIndex])

    const tagsArray = data.filter(element => element.url.match(/^\/tag/gi))

    const tags = tagsArray.map((element, i) => <Link className="navigation__link" key={i + 1} to={element.url}>{element.label}</Link>
    )

    const restArray = data.filter((element, i) => !element.url.match(/^\/tag/gi) && firstItemIndex !== i)

    const rest = restArray.map((element, i) => redirection(element, i + tagsArray.length))

    return (
        <>
            <div className="navigation">
                {firstItem()}
                <div className="navigation__tags">
                    <span className="navigation__link">Productos</span>
                    <div className="navigation__tags__dropdown">
                        {tags}
                    </div>
                </div>
                {rest}
                <a className="navigation__login" href="https://apartamobladosinn.herokuapp.com/ghost" target="_blank" rel="noopener noreferrer">Login</a>
            </div>
            <div className="movil-navigation" onClick={() => setShowModal(true)}>
                <div className="movil-navigation__line" />
                <div className="movil-navigation__line" />
                <div className="movil-navigation__line" />
            </div>
            <div className={showModal ? `menu-modal menu-modal--show` : `menu-modal`}>
                <div className="menu-modal__close" onClick={() => setShowModal(false)}>
                    <div className="close-box">
                        <div className="close-box__line close-box__horizontal" />
                        <div className="close-box__line close-box__vertical" />
                    </div>
                </div>
                {firstItem()}
                <span className="navigation__link" onClick={() => setStyle(!style)}>Productos</span>
                <div className={style ? `navigation__tags--dropdown navigation__tags--show` : `navigation__tags--dropdown`}>
                    {tags}
                </div>
                {rest}
                <a className="navigation__link" href="https://apartamobladosinn.herokuapp.com/ghost" target="_blank" rel="noopener noreferrer">Login</a>
            </div>
        </>
    )
}

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default Navigation
