import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import prisma from "@/prisma/client";

interface Params{
    params : { id : string},
}

export async function PATCH(
    request: NextRequest, 
    { params }: Params) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
  
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) }
    });
    if (!issue) 
      return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description
      }
    });
  
    return NextResponse.json(updatedIssue);
  }

export async function DELETE(request : NextRequest , {params} : Params){

  const issue = await prisma.issue.findUnique({
    where : {id : parseInt(params.id)}
  })

  if(!issue) return NextResponse.json({error : 'invalid issue'}, {status : 404})

  await prisma.issue.delete({
    where : { id : issue.id}
  })

  return NextResponse.json({ message : 'issue deleted sucessfully'})

}