import { Status } from "@prisma/client"
import { Card, Flex, Link, Text } from "@radix-ui/themes"

interface Props {
    open : number,
    inProgress : number,
    closed : number
}
const IssuesSummary = ({open , inProgress , closed} : Props) => {
     
    const containers:
    { label : string , 
       value : number,
       status : Status
    }[] = [
        {label : 'Open Issues' , value : open , status  : 'OPEN'},
        {label : 'In-progress Issues' , value : inProgress , status  : 'IN_PROGRESS'},
        {label : 'Closed Issues' , value : closed, status  : 'CLOSED'}
    ]

  return (
    <Flex gap="4">
        {containers.map(container =>( 
            <Card key={container.label}>
                <Flex direction="column">
                    <Link className='text-sm font-medium'
                    href={`/issues/list?status=${container.status}`}>{container.label}</Link>
                    <Text size="5" className="font-bold text-center" >{container.value}</Text>
                </Flex>
            </Card>
        ))}
        
    </Flex>
  )
}

export default IssuesSummary
