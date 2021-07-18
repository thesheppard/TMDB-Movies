import { useRouter } from 'next/router';

function Search({movieSearch}) {

    const router = useRouter()
    const { search } = router.query
    console.log(movieSearch)
    

    return (

        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
            <header className="dark:bg-gray-800">
              <nav className="dark:bg-gray-800">

                <div className="flex items-center justify-center w-ful border-t">
                  <a
                    className="flex items-center justify-center"
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  
                    <img src="/Obelisk-logo.png" alt="Obelisk Company Logo" className="h-24 ml-2" />

                  </a>
                </div>
              </nav>
            </header>

            <main>

            <div className="flex flex-col items-center w-full md:flex-row md:w-1/2">
                <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">Search: "{search}" has {movieSearch.results.length} results</h1>
            </div>

            {movieSearch.results.map((movie) => {
                return (
                    <div class="container bg-gray-200 border border-gray-400 rounded-3xl flex flex-col m-6 mx-auto md:h-100 md:flex-row md:items-center md:space-x-6">
                        <div className="flex items-center justify-center w-full h-100 md:w-1/2">
                            <img className="object-fill w-full h-full max-w-2xl rounded-l-3xl" src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt="" />
                        </div>
                
                        <div className="max-w-lg md:mx-12 md:order-2">
                        <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">{movie.title}</h1>
                            <p className="mt-4 text-gray-500 dark:text-gray-300">
                                {movie.overview}
                            </p>
                            
                            
                            <div class="flex items-start justify-between pt-4">
                                <p class="text-md text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {movie.release_date}</p>
                                <p class="text-md mr-4 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    {movie.vote_average}
                                </p>
                            </div>
                        </div>
                
                    </div>
                )
            })},
            </main>
        </div>
       
        
    )
}


export async function getStaticPaths() {
    // Get the paths we want to pre-render based on search
    const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=YOURAPIKEY&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    const movieSearch = await response.json()
   
    const paths = movieSearch.results.map((search) => ({
        params: { search: search.title}
    }))
   
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
  }

export async function getStaticProps({params}) {
    
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=YOURAPIKEY&query=" + params.search)
    const movieSearch = await response.json()
  
    return {
      props: {
        movieSearch,
      }
    }
  }

export default Search
