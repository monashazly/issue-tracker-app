import LatestIssues from "./LatestIssues"
import { Flex } from "@radix-ui/themes"
import IssuesSummary from "./IssuesSummary"
import prisma from "@/prisma/client"

export default async function Home() {
   
  const open = await prisma.issue.count({
    where : {status : 'OPEN'}
  })
  const closed = await prisma.issue.count({
    where : {status : 'CLOSED'}
  })
  const inProgress = await prisma.issue.count({
    where : {status : 'IN_PROGRESS'}
  })
     
  return (
     <Flex  justify="between" gap="2">
     <IssuesSummary  open={open} closed={closed} inProgress={inProgress}/>
     <LatestIssues/>
     </Flex>
  )
}
