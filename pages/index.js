import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

export default function Home({movies}) {
  const [searchText, setSearchText] = useState('');
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault();
    router.replace({
      pathname: '/search/[search]',
      query: { search: searchText },
    })

    console.log({
        searchText
      });
      setSearchText('');
    }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Obelisk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

         
          <form onSubmit={handleSubmit} className="pt-6 ml-16 relative mx-auto text-gray-600">
            <input className="border-2 border-gray-300 bg-white h-12 px-6 pr-10 rounded-lg text-sm focus:outline-none"
              type="search" 
              name="search" 
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button className="right-0 top-0 mt-5 mr-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-black h-6 w-6 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </nav>
      </header>


      <main>


        <div className="flex flex-col items-center w-full md:flex-row md:w-1/2">
          <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">Most Popular Movies</h1>
        </div>
      {
        movies.results.map((movie) => {
            return (
              <div className="container bg-gray-400 border border-gray-400 rounded-3xl flex flex-col m-6 mx-auto md:h-100 md:flex-row md:items-center md:space-x-6">
              <div className="flex flex-col items-center w-full md:flex-row md:w-1/2">
                <div className="max-w-lg md:mx-12 md:order-2">
                  <h1 className="text-3xl font-medium tracking-wide text-gray-800 dark:text-white md:text-4xl">{movie.title}</h1>
                  <p className="mt-4 text-gray-300 dark:text-gray-300">{movie.overview}</p>
                  <div className="mt-6">
                    <a href="#" className="block px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform bg-gray-800 rounded-md md:inline hover:bg-blue-400">Watch Now</a>
                  </div>
                </div>
              </div>
              ,
              <div className="flex items-center justify-center w-full h-100 md:w-1/2">
                <img className="object-fill w-full h-full max-w-2xl rounded-r-3xl" src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="" />
              </div>
              </div>
            );
          })
        }
      </main>
     
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          This product uses the TMDB API but is not endorsed or certified by {' '}
          <img src="/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB Logo" className="h-4 ml-2" />
          
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=YOURAPIKEY&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
  const movies = await response.json()

  return {
    props: {
      movies,
    }
  }
}
