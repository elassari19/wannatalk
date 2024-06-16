'use server'

import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, where } from "firebase/firestore";
import { revalidatePath } from "next/cache"
import { app, db } from "./firebase";
// import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { app } from "@/lib/firebase";

export const revalidateUrlPath = (path: string) => {
  revalidatePath(path, "page")
}

export const saveSummary = async (data: any, id: string) => {

  try {
    const docRef = await addDoc(collection(db, "Transcripts"), {
      ...data,
      createdAt: Date.now(),
      userId: id,
    });
    return { status: 200, id: docRef.id};
  } catch (error) {
    return { status: 500, error}
    // console.log("Error adding document: ", error);
  }
};

// export const getTranscripts = async (id: any) => {

//   if (!id || id === "") {
//     return { status: 400, data: "User not authenticated"};
//   }

//   const usersCollection = collection(db, 'Transcripts');
//   const userSnapshot = await getDocs(usersCollection);
//   const data = userSnapshot.docs.filter(doc => doc.data().userId == id && doc.data());
//   return data
// }

export const fetchTranscripts = async (id: any) => {

  const trans = collection(db, 'Transcripts');
  const q = query(trans, where('userId', '==', id));
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() };
  });

  return  data
}

export const getTranscriptById = async (id: any) => {

  const docSnap = await getDoc(doc(db, 'Transcripts', id));

  if (docSnap.exists()) {
    return  { id: docSnap.id, ...docSnap.data() };
  } else {
    return { error: 'No such document' }
  }
}