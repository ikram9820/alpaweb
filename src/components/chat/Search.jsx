import classes from './search.module.css';
import { useState } from "react";


export default function Search(){
    const [searchTerm, setSearchTerm] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(searchTerm)    
      }

    return (
        <form onSubmit={handleSubmit}>
        <input
          className={classes.input}
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    )
}