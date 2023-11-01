'use client';
import { Button, Callout, Text, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/api/validationSchemas";
import { z } from "zod"

type IssueForm =  z.infer<typeof createIssueSchema>


const NewIssuePage = () => {

  const { register, control, handleSubmit ,  formState : {errors}} = useForm<IssueForm>({
    resolver : zodResolver(createIssueSchema)
  });
  const router = useRouter()
  const [error, setError] = useState('')

  return (
    <div className="max-w-xl ">
      <form onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issue', data)
          router.push('/issues')
        } catch (error) {
          setError('An unexpected error occured .')
        }
      })}
        className="space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')}>
          </TextField.Input>
        </TextField.Root>
        { errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description"  {...field} />} />
           { errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
        {error && <Callout.Root color="red" className="mt-5">
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>}
        <Button>Submit new issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
