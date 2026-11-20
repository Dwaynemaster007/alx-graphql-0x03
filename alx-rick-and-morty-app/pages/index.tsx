import { useQuery } from "@apollo/client"
import { GET_EPISODES } from "@/graphql/queries"
import { EpisodeProps } from "@/interfaces"
import EpisodeCard from "@/components/common/EpisodeCard"
import ErrorProneComponent from "@/components/ErrorProneComponent"
import { useState } from "react"



const Home: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  // Renders a component that throws, to show the ErrorBoundary (and Sentry) in action
  const [showTestError, setShowTestError] = useState<boolean>(false)
  // Changing `page` changes the query variables, so Apollo fetches the new page by itself
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: { page },
  })

  if (loading) return <h1 className="p-6 text-2xl">Loading episodes...</h1>
  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Couldn&apos;t load episodes</h1>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <button onClick={() => refetch()} className="mt-4 bg-[#45B69C] text-white py-2 px-6 rounded-lg">Try again</button>
      </div>
    )
  }

  const results = data?.episodes.results
  const info = data?.episodes.info

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
        <button
          onClick={() => setShowTestError(true)}
          className="mt-3 text-sm underline opacity-80 hover:opacity-100"
        >
          Trigger a test error
        </button>
        {showTestError && <ErrorProneComponent />}
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results && results.map(({ id, name, air_date, episode }: EpisodeProps, key: number) => (
            <EpisodeCard
              id={id}
              name={name}
              air_date={air_date}
              episode={episode}
              key={key}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button 
            disabled={page <= 1}
            onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
            Previous
          </button>
          <span className="font-medium">Page {page} of {info?.pages ?? 1}</span>
          <button 
            disabled={!info || page >= info.pages}
            onClick={() => setPage(prev => prev < info.pages ? prev + 1 : prev)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; {new Date().getFullYear()} Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home