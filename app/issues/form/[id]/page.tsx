'use client';
import IssueForm from "../page"

interface Props{
  params : {id : string}
}

const UpdateIssue = ({params} : Props) => {
  return <IssueForm params={params}/>
}

export default UpdateIssue
