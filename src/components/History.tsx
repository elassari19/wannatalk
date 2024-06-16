'use client'

import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface IProps {
  id: string
}

const History = ({ id }: IProps) => {
  const [transcpts, setTranscpts] = React.useState<any>([])

  const getTranscripts = async (id: any) => {

    if (!id || id === "") setTranscpts([])
  
    const trans = collection(db, 'Transcripts');
    const q = query(trans, where('userId', '==', id));
    const snapshot = await getDocs(q);
  
    const data = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setTranscpts(data)
  }  
  
  useEffect(() => {
    getTranscripts(id)
  }, [id])

  // console.log('transcpts', transcpts)
  return (
    <div>
      {
        transcpts.map((doc: any, i: number) => (
          <Link href={`chat/${doc.id}`} className='flex gap-2 text-primary-foreground' key={i}>
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