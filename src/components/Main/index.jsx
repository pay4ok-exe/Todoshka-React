import './main.css'
import AddBtn from '../../assets/add.png'

function Main() {
    return (
      <div className="main">
        <div className="item-actions">
          <div className="control-buttons">
            <button className='btn selected'>To Do</button>
            <button className='btn'>Done</button>
            <button className='btn'>Trash</button>
          </div>

          <button className='add-btn'>
            <img src={AddBtn}/>
          </button>
        </div>
      </div>
    )
  }
  
  export default Main
  