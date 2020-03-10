import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/Header.css'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Navigation } from '.'

const Header = ({ site, data, twitterUrl, facebookUrl }) => <div className="header">
    <div className="header__sup">
        <Link to="/">
            {site.logo ?
                <img className="header__logo" src={site.logo} alt={site.title} />
                : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
            }
        </Link>
        <div className="header__social">
            { site.facebook && <a href={ facebookUrl } className="header__social__link" target="_blank" rel="noopener noreferrer"><img className="header__social__icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
            { site.twitter && <a href={ twitterUrl } className="header__social__link" target="_blank" rel="noopener noreferrer"><img className ="header__social__icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
            <a href="https://www.instagram.com/ester_exposito/" className="header__social__link" target="_blank" rel="noopener noreferrer"><img className ="header__social__icon" src="/images/icons/instagram.svg" alt="Twitter" /></a>
        </div>
    </div>
    <div className="header__inf">
        <Navigation data={site.navigation} />
    </div>
</div>

Header.propTypes = {
    twitterUrl: PropTypes.string,
    facebookUrl: PropTypes.string,
    site: PropTypes.any,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

export default Header
