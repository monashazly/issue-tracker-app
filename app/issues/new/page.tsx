'use client';
import { Button, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import { useForm  , Controller} from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm{
  title : string ,
  description : string
}

const NewIssuePage = () => {

  const { register , control , handleSubmit} = useForm<IssueForm>();
  const router = useRouter()

  return (
    <form onSubmit={handleSubmit(async (data)=>{
      await axios.post('/api/issue' , data)
      router.push('/issues')

    })}
    className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')}>
        </TextField.Input>
      </TextField.Root>
      <Controller
      name="description"
      control={control}
      render={({field})=> <SimpleMDE placeholder="Description"  {...field} />}/>
      <Button>Submit new issue</Button>
    </form>
  )
}

export default NewIssuePage
