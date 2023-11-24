import Pagination from "./components/Pagination"

export default function Home() {
  return (
     <>
     <Pagination itemCount={3000} pageSize={100} currentPage={1}/>
     </>
  )
}
