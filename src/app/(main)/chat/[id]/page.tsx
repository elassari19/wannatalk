import React from 'react'
import WithGuard from '@/components/WithGuard'

interface IProps {
  params: {
    id: string
  }
}

const page = ({ params}: IProps) => {
  console.log("params", params)
  return (
    <div>
      {
        <WithGuard>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus hic adipisci deleniti tenetur eos excepturi alias nam doloremque laudantium rerum in accusantium dignissimos voluptate vero voluptates dolore, est quam. Enim.0</div>
        </WithGuard>
      }
    </div>
  )
}

export default page