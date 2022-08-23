import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

function App() {
  useEffect(() => {
      viewPost();
  }, []);
 
  return (
  <div className="App">
    <div className="container">
      <div className="row">
        <h1 className="App__tittle"> React <span> Quill </span> powerful rich text editor </h1>
        <Link to="/Add" className="btn btn__theme btn__add"> Create Now </Link>

        {ispost.map((item,index) => ( 
          <div className="post__list" key={index}>
            <h2>{item.title}</h2>

            <div className="post__description" dangerouslySetInnerHTML={{ __html: item.description}}  />
            <div className="post__description" dangerouslySetInnerHTML={{ __html: item.information}}  />
            <Link to={`/Edit/${item.id}`} className="btn btn__theme"> Edit </Link>

          </div>
        ))}
        
      </div>
    </div>
  </div>
  );
}

export default App;