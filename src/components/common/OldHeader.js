import React from "react"
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Navigation } from '.'
import config from '../../utils/siteConfig'

const OldHeader = ({ site, data, twitterUrl, facebookUrl, isHome }) => (<header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
    <div className="container">
        <div className="site-mast">
            <div className="site-mast-left">
                <Link to="/">
                    {site.logo ?
                        <img className="site-logo" src={site.logo} alt={site.title} />
                        : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                    }
                </Link>
            </div>
            <div className="site-mast-right">
                { site.twitter && <a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>
            </div>
        </div>
        { isHome ?
            <div className="site-banner">
                <h1 className="site-banner-title">{site.title}</h1>
                <p className="site-banner-desc">{site.description}</p>
            </div> :
            null}
        <nav className="site-nav">
            <div className="site-nav-left">
                {/* The navigation items as setup in Ghost */}
                <Navigation data={site.navigation} navClass="site-nav-item" />
            </div>
            <div className="site-nav-right">
                <Link className="site-nav-button" to="/about">About</Link>
            </div>
        </nav>
    </div>
</header>)

OldHeader.propTypes = {
    site: PropTypes.string,
    twitterUrl: PropTypes.string || null,
    facebookUrl: PropTypes.string || null,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

export default OldHeader
