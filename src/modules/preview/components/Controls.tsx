const Controls = (props: any) => {
    return (
      <div className="flex flex-col">

        <div className="swatch">
          <label htmlFor="color1" className="info">
            <h1>Car Body</h1>
          </label>
          <input type="color" id="color1" name="color1" defaultValue={props.bodyColor} onChange={(e) => {
            props.setBodyColor(e.target.value);
          }}/>
        </div>

        <div className="swatch">
          <label htmlFor="color2" className="info">
            <h1>Wheel Color</h1>
          </label>
          <input type="color" id="color2" name="color2" defaultValue={props.wheelColor} onChange={(e) => {
            props.setWheelColor(e.target.value);
          }}/>
        </div>

        <div className="swatch">
          <label htmlFor="color3" className="info">
            <h1>Alloygator</h1>
          </label>
          <input type="color" id="color3" name="color3" defaultValue={props.rimColor} onChange={(e) => {
            props.setRimColor(e.target.value);
          }}/>
        </div>




        
      
          
      
      </div>
    )
  }

  export default Controls;