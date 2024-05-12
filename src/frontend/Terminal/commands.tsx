import './terminal.css'
import axios from 'axios';


export const displayHelp = () => {
return(<div>Available commands:
    <p>- help: Show available commands</p>
    <p>- about: Display information about this CLI</p>
    <p> - fetch-price [coin]: Fetch the current price of a specified cryptocurrency</p>
    <p> - upload: Opens the file explorer to allow uploading csv files only.</p>
    <p> - draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory.</p>
</div>
)
}




export const displayAbout = () => {
    return(
    <div className='terminal'>
    <div className='terminal__line'>
    CLI Version 1.0<p>
This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities </p>
<p>Developed by: Momina Nadeem</p>
        </div>
    </div>
    )
}

 export const fetchPrice = async (pair: string) => {
           try{
            const response = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${pair}`);
            const price = response.data.price;
            console.log(price) //debug
            return price


           }catch(e){
           console.log("wrong pair name")
           
           }
}


export const displayPrice = (pair: string,price: any) => {
   return( 
        <div >
              The current price of {pair.toUpperCase()} is ${price}.

        </div>
    )
          
}




  