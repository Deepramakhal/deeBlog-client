/*eslint-disable*/
import React from 'react'
import { useSelector } from 'react-redux'

function SearchResult() {
    const searchTerm = useSelector((state)=>state.search.searchTerm);
    const searchResult = useSelector((state)=>state.search.searchResult);
    const status = useSelector((state)=>state.search.status)

    let content;

    if(status === 'loading'){
        content = <p>Loading ka animation abhi taiyaar hua nehi</p>
    }
    else if ( status === 'succeeded'){
        
        if(searchResult.length>0){
            content = (
                <ul>
                    {searchResult.map((blog)=>(
                        <li key={blog._id}> 
                            <h1 className='underline font-bold'>{blog.title}</h1>
                            <p>{blog.content}</p>
                            <h1>written by- {blog.writer.username}</h1>
                            <img src={blog.writer.profilePicture} alt="" />
                        </li>
                    ))}
                </ul>
            )
        } else {
            content = <p>Search karke kuch bhee nehi mila</p>
        }
    } else if(status === 'failed'){
        content = <p>Error fetching search result</p>
    }
    
    
return (
    <div>
    <h1>Search result for "{searchTerm}"</h1>
    {content}
    </div>
)
}

export default SearchResult