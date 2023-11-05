'use client';
import { Button, Callout, Select, SelectGroup, Text, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/api/validationSchemas";
import { z } from "zod"
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof issueSchema>

interface Props{
  params : {id : string}
}

const IssueForm = ({params} : Props) => {

  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema)
  });
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if(params.id) await axios.patch('/api/issues/'+ params.id , data)
      else await axios.post('/api/issue', data)
      router.push('/issues')
    } catch (error) {
      setSubmitting(false)
      setError('An unexpected error occured .')
    }
  })

  return (
    <div className="max-w-xl ">
      <form onSubmit={onSubmit}
        className="space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')}>
          </TextField.Input>
        </TextField.Root>
        {<ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description"  {...field} />} />
        {<ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>}
        {error && <Callout.Root color="red" className="mt-5">
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>}
        <Button disabled={isSubmitting}>
          {params.id ? 'Update Issue' : 'Submit new issue'}
          {isSubmitting && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
