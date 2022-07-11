import React,{useState} from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';


const Square=(props)=>{

  return(
    <button className='squarediv'
    onClick={props.onClickEvent}>
       {props.value}   
    </button>

  );

};


const Board=()=>{
  const init=new Array(9).fill(null);
  const[squares,setSquares] =useState(init);
  const[isStateX,setStateX]=useState(true);
  const handleClickEvent=(i)=>{
    //WE CANNOT MUTATE THE STATE DIRECTLY
    //Make a copy of the state array
    const newval= [...squares];
    //mutate the copy
    if(newval[i]==null)
    {
      newval[i]=isStateX?'X':'O';
      setStateX(!isStateX);      
    } 
    const winover=(calculatewinner(squares));
    if(winover!=null)
    {
      return;
      
    }
    //call the setState usin the mutated copy
    setSquares(newval);
    
  };


  const Rendersquare=(i)=>{ 
    return(
      <Square value={squares[i]} onClickEvent={()=>handleClickEvent(i)}/>

    );

  };

  const winner=calculatewinner(squares);
 

  const status=winner?`Winner:${winner}`:`Next player:${isStateX?'X':'O'}`; 
  
  

  return(
    <div className='borderdiv'>
      <div className='playername'>{status}</div>
      <div className='board-row'>
      {Rendersquare(0)}{Rendersquare(1)}{Rendersquare(2)}
      </div>
      <div className='board-row'>
      {Rendersquare(3)}{Rendersquare(4)}{Rendersquare(5)}
      </div>
      <div className='board-row'>
      {Rendersquare(6)}{Rendersquare(7)}{Rendersquare(8)}
      </div>
    </div>
  );

};

const Game=()=>{
  return(
    <div className='Gamediv'>
      TiC TAk tOE
    <Board/>
    </div>
  );


};

// const root=createRoot(document.getElementById("root"));
// root.render(<Game/>);

ReactDOM.render(<Game/>,document.getElementById('root'));

function calculatewinner(squares){

  const lines=[
    [0,1,2],[3,4,5],[6,7,8],//rows
    [0,3,6],[1,4,7],[2,5,8],//columns
    [0,4,8],[2,4,6],//diagonal
  ];

  for(let line of lines){
    let [a,b,c]=line;
    // console.log(a,b,c,squares[a],squares[b],squares[c]);
    if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c] && squares[c]===squares[a])
    {
      return squares[a];
    }
  }
  return null;

}
