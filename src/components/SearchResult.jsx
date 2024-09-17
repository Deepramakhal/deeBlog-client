/*eslint-disable*/
import React from 'react'
import { useSelector } from 'react-redux'

function SearchResult() {
    const searchTerm = useSelector((state)=>state.search.searchTerm);
    const searchResult = useSelector((state)=>state.search.searchResult);
    const status = useSelector((state)=>state.search.status)

    let content;

    if(status === 'loading'){
        content = (
            <div class="loader w-48 h-48">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                <div class="bar5"></div>
                <div class="bar6"></div>
                <div class="bar7"></div>
                <div class="bar8"></div>
                <div class="bar9"></div>
                <div class="bar10"></div>
                <div class="bar11"></div>
                <div class="bar12"></div>
            </div>
        )
    }
    else if ( status === 'succeeded'){
        
        if(searchResult.length>0){
            content = (
                <div className='w-[90vw] h-fit p-6 border-cyan-400 border-4 rounded-lg bg-white'>
                    <ul>
                    {searchResult.map((blog)=>(
                        <li key={blog._id}> 
                            <h1 className='underline font-bold text-2xl text-center mb-2'>{blog.title}</h1>
                            <p className='text-justify text-lg'>{blog.content}</p>
                            <div className='flex bg-slate-300 items-center p-2 gap-2 w-fit rounded-lg mt-4'>
                                <h1>This blog is written by- {blog.writer.username}</h1>
                                <img src={blog.writer.profilePicture} alt="" 
                                    className='w-12 h-12 rounded-full'
                                />
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            )
        } else {
            content = <p>Search karke kuch bhee nehi mila</p>
        }
    } else if(status === 'failed'){
        content = <p>Error fetching search result</p>
    }
    
    
return (
    <div>
    <h1 className='text-3xl font-semibold text-slate-400'>Search result for "{searchTerm}"</h1>
    {content}
    </div>
)
}

export default SearchResult