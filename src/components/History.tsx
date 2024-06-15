'use client'

import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { app } from '../lib/firebase';
import Link from 'next/link';

interface IProps {
  id: string
}

const History = ({ id }: IProps) => {
  const [transcpts, setTranscpts] = React.useState<any>([])

  // const getTranscripts = async (id: any) => {
  //   const db = getFirestore(app);

  //   if (!id || id === "") setTranscpts([])
  
  //   const usersCollection = collection(db, 'Transcripts');
  //   const userSnapshot = await getDocs(usersCollection);
  //   const data = userSnapshot.docs.filter(doc => doc.data().userId == id && { id: doc.id, ...doc.data() });
    
  //   setTranscpts(data)
  // }  
  
  // useEffect(() => {
  //   getTranscripts(id)
  // }, [id])

  console.log('transcpts', transcpts)
  return (
    <div>
      {
        transcpts.map((doc: any, i: number) => (
          <Link href={`chat/${doc.uid}`} className='flex gap-2 text-primary-foreground' key={i}>
            {/* date */}
            <span>{new Date(doc.createdAt).getUTCFullYear()}</span>
            <span>{doc.text.slice(0, 20)}</span>
          </Link>
        ))
      }
    </div>
  )
}

export default History