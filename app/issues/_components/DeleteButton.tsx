'use client';

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    const [error, setError] = useState(false)
    const [ isDeleting , setDeleting ] = useState(false)
    const deleteIssue = async () => {
        try {
            setDeleting(true)
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues')
            router.refresh()
        }
        catch {
            setDeleting(false)
            setError(true)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">
                        <TrashIcon />
                        Delete issue
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                    <AlertDialog.Title>Delete Issue</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This Issue will no longer be accessible.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={deleteIssue} disabled={isDeleting}>
                               Delete { isDeleting && <Spinner/> }  
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be deleted.
                    </AlertDialog.Description>
                    <Button
                        color="gray"
                        variant="soft"
                        mt="2"
                        onClick={() => setError(false)}
                    >
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
