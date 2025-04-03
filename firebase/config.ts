// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
// import { getFirestore, collection, addDoc, doc, updateDoc, getDoc, query, where, onSnapshot, orderBy, deleteDoc } from "firebase/firestore";

// export interface Document {
//   _id: string;
//   title: string;
//   userId: string;
//   isArchived: boolean;
//   isPublished: boolean;
//   parentDocument?: string | null;
//   icon?: string;
// }

// const firebaseConfig = {
//   apiKey: "AIzaSyAf_WAPEu88t3r8yCKelmrjEcVv0B5qJY0",
//   authDomain: "notes-d80a2.firebaseapp.com",
//   projectId: "notes-d80a2",
//   storageBucket: "notes-d80a2.firebasestorage.app",
//   messagingSenderId: "448335966624",
//   appId: "1:448335966624:web:58237c341140f7dcb934c5"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// export const login = (email: string, password: string) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// export const register = (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// export const logout = () => {
//   return signOut(auth);
// };

// export const createDocument = async (title: string = "Без названия", parentDocument?: string) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const documentData: Omit<Document, "_id"> = {
//     title,
//     userId: user.uid,
//     isArchived: false,
//     isPublished: false,
//     parentDocument: parentDocument || null,
//   };

//   const document = await addDoc(collection(db, "documents"), documentData);
//   return document.id;
// };

// export const archiveDocument = async (id: string) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const docRef = doc(db, "documents", id);
//   await updateDoc(docRef, { isArchived: true });
// };

// export const getDocumentById = async (documentId: string): Promise<Document | null> => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const docRef = doc(db, "documents", documentId);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) return null;

//   const document = { _id: docSnap.id, ...docSnap.data() } as Document;
//   if (document.userId !== user.uid && (!document.isPublished || document.isArchived)) {
//     throw new Error("Unauthorized");
//   }

//   return document;
// };

// export const updateDocument = async (
//   id: string,
//   updates: Partial<{
//     content: string;
//     isPublished: boolean;
//     title: string;
//     coverImage: string;
//     icon: string | null;
//   }>
// ) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const docRef = doc(db, "documents", id);
//   await updateDoc(docRef, updates);
// };

// export const getSidebarDocuments = (parentDocument?: string, callback: (docs: Document[]) => void) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const q = query(
//     collection(db, "documents"),
//     where("userId", "==", user.uid),
//     where("isArchived", "==", false),
//     parentDocument ? where("parentDocument", "==", parentDocument) : where("parentDocument", "==", null),
//     orderBy("title", "desc")
//   );

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const documents: Document[] = snapshot.docs.map((doc) => ({
//       _id: doc.id,
//       title: doc.data().title,
//       userId: doc.data().userId,
//       isArchived: doc.data().isArchived,
//       isPublished: doc.data().isPublished,
//       parentDocument: doc.data().parentDocument ?? null,
//       icon: doc.data().icon,
//     }));
//     callback(documents);
//   });

//   return unsubscribe;
// };

// export const getSearchDocuments = (callback: (docs: Document[]) => void) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const q = query(
//     collection(db, "documents"),
//     where("userId", "==", user.uid),
//     where("isArchived", "==", false),
//     orderBy("title", "desc")
//   );

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const documents: Document[] = snapshot.docs.map((doc) => ({
//       _id: doc.id,
//       title: doc.data().title,
//       userId: doc.data().userId,
//       isArchived: doc.data().isArchived,
//       isPublished: doc.data().isPublished,
//       parentDocument: doc.data().parentDocument ?? null,
//       icon: doc.data().icon,
//     }));
//     callback(documents);
//   });

//   return unsubscribe;
// };

// export const restoreDocument = async (id: string) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const docRef = doc(db, "documents", id);
//   await updateDoc(docRef, { isArchived: false });
// };

// export const removeDocument = async (id: string) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const docRef = doc(db, "documents", id);
//   await deleteDoc(docRef);
// };

// export const getTrashDocuments = (callback: (docs: Document[]) => void) => {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Not authenticated");

//   const q = query(
//     collection(db, "documents"),
//     where("userId", "==", user.uid),
//     where("isArchived", "==", true),
//     orderBy("title", "desc")
//   );

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const documents: Document[] = snapshot.docs.map((doc) => ({
//       _id: doc.id,
//       title: doc.data().title,
//       userId: doc.data().userId,
//       isArchived: doc.data().isArchived,
//       isPublished: doc.data().isPublished,
//       parentDocument: doc.data().parentDocument ?? null,
//       icon: doc.data().icon,
//     }));
//     callback(documents);
//   });
//   return unsubscribe;
// };


import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc, query, where, onSnapshot, orderBy, deleteDoc } from "firebase/firestore";

export interface Document {
  _id: string;
  title: string;
  userId: string;
  isArchived: boolean;
  isPublished: boolean;
  parentDocument?: string | null;
  icon?: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyAf_WAPEu88t3r8yCKelmrjEcVv0B5qJY0",
  authDomain: "notes-d80a2.firebaseapp.com",
  projectId: "notes-d80a2",
  storageBucket: "notes-d80a2.firebasestorage.app",
  messagingSenderId: "448335966624",
  appId: "1:448335966624:web:58237c341140f7dcb934c5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const createDocument = async (title: string = "Без названия", parentDocument?: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const documentData: Omit<Document, "_id"> = {
    title,
    userId: user.uid,
    isArchived: false,
    isPublished: false,
    parentDocument: parentDocument || null,
  };

  const document = await addDoc(collection(db, "documents"), documentData);
  return document.id;
};

export const archiveDocument = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "documents", id);
  await updateDoc(docRef, { isArchived: true });
};

export const getDocumentById = async (documentId: string): Promise<Document | null> => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "documents", documentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const document = { _id: docSnap.id, ...docSnap.data() } as Document;
  if (document.userId !== user.uid && (!document.isPublished || document.isArchived)) {
    throw new Error("Unauthorized");
  }

  return document;
};

export const updateDocument = async (
  id: string,
  updates: Partial<{
    content: string;
    isPublished: boolean;
    title: string;
    coverImage: string;
    icon: string | null;
  }>
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "documents", id);
  await updateDoc(docRef, updates);
};

export const getSidebarDocuments = (
  callback: (docs: Document[]) => void,
  parentDocument: string | undefined = undefined
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(db, "documents"),
    where("userId", "==", user.uid),
    where("isArchived", "==", false),
    parentDocument ? where("parentDocument", "==", parentDocument) : where("parentDocument", "==", null),
    orderBy("title", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const documents: Document[] = snapshot.docs.map((doc) => ({
      _id: doc.id,
      title: doc.data().title,
      userId: doc.data().userId,
      isArchived: doc.data().isArchived,
      isPublished: doc.data().isPublished,
      parentDocument: doc.data().parentDocument ?? null,
      icon: doc.data().icon,
    }));
    callback(documents);
  });

  return unsubscribe;
};

export const getSearchDocuments = (callback: (docs: Document[]) => void) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(db, "documents"),
    where("userId", "==", user.uid),
    where("isArchived", "==", false),
    orderBy("title", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const documents: Document[] = snapshot.docs.map((doc) => ({
      _id: doc.id,
      title: doc.data().title,
      userId: doc.data().userId,
      isArchived: doc.data().isArchived,
      isPublished: doc.data().isPublished,
      parentDocument: doc.data().parentDocument ?? null,
      icon: doc.data().icon,
    }));
    callback(documents);
  });

  return unsubscribe;
};

export const restoreDocument = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "documents", id);
  await updateDoc(docRef, { isArchived: false });
};

export const removeDocument = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "documents", id);
  await deleteDoc(docRef);
};

export const getTrashDocuments = (callback: (docs: Document[]) => void) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(db, "documents"),
    where("userId", "==", user.uid),
    where("isArchived", "==", true),
    orderBy("title", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const documents: Document[] = snapshot.docs.map((doc) => ({
      _id: doc.id,
      title: doc.data().title,
      userId: doc.data().userId,
      isArchived: doc.data().isArchived,
      isPublished: doc.data().isPublished,
      parentDocument: doc.data().parentDocument ?? null,
      icon: doc.data().icon,
    }));
    callback(documents);
  });

  return unsubscribe;
};