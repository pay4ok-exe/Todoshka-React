import './main.css'
import AddBtn from '../../assets/add.png'
import ToDo from './ToDo'

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

        <div className='to-do'>
          <h1 className='title'> To Do</h1>
          <hr/>
          <div className='to-do-list'>
              <ToDo/>
              <ToDo/>
              <ToDo/>
              <ToDo/>
              <ToDo/>
              <ToDo/>
          </div>
          <hr/>

        </div>
      </div>
    )
  }
  
  export default Main
  