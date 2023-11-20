import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
export default function FormDemo({fetchPosts}) {
  const [data,setData] = useState({
    title : "" ,
    content : ""
  })
  const createPost = async(newPost) =>{
    const response = axios.post('http://localhost:4000/users' , newPost)
    return (await response).data
  }
const queryClient = useQueryClient()

  const mutation = useMutation(
    {
      mutationFn : createPost,
      onSuccess : () =>{
        queryClient.invalidateQueries({queryKey : ["user"]})
      }
    }
  )


  const submitData = () =>{
    mutation.mutate(data)
  }
  const handleChange = (e) =>{
    
    setData(prev =>(
      {
        ...prev,
        [e.target.name] : e.target.value
      }
    ))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    submitData()
  } 

 
  return (
    <Form.Root className="w-[260px]" onSubmit={handleSubmit} >
    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-sky-600">Title</Form.Label>
        <Form.Message className="text-[13px] text-sky-600 opacity-[0.8]" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="text-[13px] text-sky-600 opacity-[0.8]" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild onChange={(e) => handleChange(e)}>
        <input
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-sky-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
          type="text"
          name="title"
          required
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[10px]" name="question">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-sky-600">
          Description
        </Form.Label>
        <Form.Message className="text-[13px] text-sky-600 opacity-[0.8]" match="valueMissing">
          Please enter a question
        </Form.Message>
      </div>
      <Form.Control asChild onChange={(e) => handleChange(e)}>
        <textarea
          
          name='content'
          className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-sky-600 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
          required
        />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <button type='submit' className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
        Post question
      </button>
    </Form.Submit>
  </Form.Root>
  )
}
