import logo from "./logo.svg";


const Header = () => (
    <header className="row">
        <div className="navbar navbar-light bg-light">
        <img src={logo} className="d-inline-block align-top logo" alt="logo" />
        <span className="navbar-brand mb-0 h1">Line22</span>
        </div>
    </header>
);

export default Header