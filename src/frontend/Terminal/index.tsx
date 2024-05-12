import './terminal.css'
import React, {ReactNode,  useState, useRef} from 'react';
import {displayHelp, displayAbout,displayPrice,fetchPrice} from './commands'

import axios from 'axios';
import { Draw } from './draw';



export const Terminal = () => {

    const [command, setCommand] = useState("") //initial state is empty
    const [result, setResult] = useState(<div></div>)
   // const [file, setFile] = useState<any>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);


    const [commandHistory, setCommandHistory] = useState<JSX.Element[]>(
        []
      );


    const handleSubmit = (file:File | null) => {

        if (file){
        const formData = new FormData()
           formData.append('file',file)
           console.log(file)

            axios.post('http://localhost:3000/file/upload',formData).then(response => {
                if (response.status === 200 ) {
                    
                  setResult(<div>File uploaded successfully!</div>)
                } else {
                  console.error('Failed to upload file:', response.statusText);
                }
              }).catch(error => {
                console.error('Error uploading file:', error);
              });
            }
    }

   
 
    const OnChangeCommand = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCommand(e.target.value)
    }

    const handleKeyDown = (e: { key: string;  }) => {
        if (e.key === 'Enter') {
            if (command)
          executeCommand()
          setCommand('')
          }
          
    }


    const executeCommand = async ()=> {

        const trimmedCommand = command.trim().toLowerCase();

        if (trimmedCommand === 'help') {
            setResult(displayHelp());
        } else if (trimmedCommand === 'about') {
            setResult(displayAbout());
        } else if (trimmedCommand.startsWith('fetch-price')) {
            const pair = trimmedCommand.split(' ')[1];
           if (pair) {const price= await fetchPrice(pair.toUpperCase());
            setResult(displayPrice(pair, price));}
            else { setResult(<div>Unknown command</div>) }
        }
        else if (trimmedCommand==='upload'){
            openDialogue()
        }
        else if (trimmedCommand.startsWith('draw')){
            const draw_file = trimmedCommand.split(' ')[1] //draw file is a string 
            const columns = trimmedCommand.split(' ')[2]?.split(',');
            let postobj = {file: draw_file}
     
             axios.post('http://localhost:3000/file/draw', postobj).then(response => {
                console.log('Response:', response.data);
                setResult(<Draw data={response.data} columns={columns} file={draw_file} />)
            }).catch(error => {
                console.error('Error:', error);
            });             
        
        } 
        else if (trimmedCommand.startsWith('delete')){
            const file_to_delete = trimmedCommand.split(' ')[1]

            let postobj = {filename:file_to_delete}
            
            axios.post('http://localhost:3000/file/delete',postobj).then(
                response => { 
                    console.log(response)
                    setResult(<div>{file_to_delete} deleted successfully!</div>)  }
            ).catch( error => {
                console.error('Error:', error);
            } )
        }
        
        else {
            setResult(<div>Unknown command</div>);
        }

    } 

    const openDialogue = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically click the file input
          }
    }

   // useEffect (()=>{
   //     <Terminal/>
   // }) 
  
   return (
    <div className='terminal'>
        <div className='terminal__line'>
            React Terminal App
        </div>
      
      
        <div className='terminal__prompt'>
            <div className='terminal__prompt__label'>
                      Enter a command: 
            </div>
            <div className='terminal__prompt__input'>
                  <input type='text' onChange={OnChangeCommand}  onKeyDown={handleKeyDown} />
            </div>

        </div>
        <div className='terminal__line'>
            {result}
        </div>
        <div>
              <input name='file' ref={fileInputRef} style={{ display: "none" }} type='file' onChange={(e)=>{
                 const selectedFile = e.target.files && e.target.files[0];
                 handleSubmit(selectedFile)
              }} accept='.csv'/>
       </div>

    </div>
   )
}