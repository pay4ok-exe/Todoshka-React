import Logo from "../../assets/logo.png";

function Header() {
  return (
    <div className="Header">
      <div>
        <img src={Logo} />
        <h1>Todoshka - Simple To Do List</h1>
      </div>
      <p>
        Today is awesome day. The weather is awesome, you are awesome too! Make
        every day as awesome as today!
      </p>
    </div>
  );
}

export default Header;
