import Pagination from "./components/Pagination"

export default function Home({searchParams,}: {
  searchParams: { page: string };
}) {
  return (
     <>
     <Pagination itemCount={3000} pageSize={100} currentPage={parseInt(searchParams.page)}/>
     </>
  )
}
