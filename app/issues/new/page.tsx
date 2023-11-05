import dynamic from "next/dynamic"

const IssueForm = dynamic(()=> import ('@/app/issues/_components/IssueForm'))

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage
