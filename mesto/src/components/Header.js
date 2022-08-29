import headerLogo from '../images/logo(1).svg';

function Header()
{
    return (
        <header className="header">
            <img src={headerLogo} alt="логотип место" className="header__logo" />
        </header>
    )
}

export default Header;