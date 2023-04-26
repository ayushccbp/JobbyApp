import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdMail} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <nav className="navbar-container">
      <ul className="nav">
        <Link to="/" className="link-item">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </li>
        </Link>
        {windowSize[0] < 590 ? (
          <li className="icon-container">
            <Link to="/" className="link-item">
              <AiFillHome className="nav-icon" />
            </Link>
            <Link to="/jobs" className="link-item">
              <MdMail className="nav-icon" />
            </Link>
            <FiLogOut onClick={onClickLogout} className="nav-icon" />
          </li>
        ) : (
          <>
            <li className="header-list-items">
              <Link to="/" className="link-item">
                <li className="home-heading home">Home</li>
              </Link>
              <Link to="/jobs" className="link-item">
                <li className="jon-heading home">Jobs</li>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default withRouter(Header)
