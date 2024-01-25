import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const userAuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  //   const [todos, setTodos] = useState(() => {
  //     const localValue = localStorage.getItem("ITEMS");
  //     if (localValue === null) return [];

  //     return JSON.parse(localValue);
  //   });

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState([]);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    return signOut(auth);
  };

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function addTodo(title) {
    // setTodos((currentTodos) => [
    //   ...currentTodos,
    //   {
    //     id: crypto.randomUUID(),
    //     title,
    //     completed: false,
    //   },
    // ]);
    setTask({
      id: crypto.randomUUID(),
      title,
      completed: false,
    });
    try {
      const docRef = await addDoc(collection(db, user.uid), {
        id: crypto.randomUUID(),
        title,
        completed: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getTodos() {
    setTodos([]);
    if (user) {
      const querySnapshot = await getDocs(collection(db, `${user.uid}`));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc}`);
        setTodos((currentTodos) => [...currentTodos, doc.data()]);
        console.log(todos);
      });
    }
  }

  useEffect(() => {
    // localStorage.setItem("ITEMS", JSON.stringify(todos));
    getTodos();
  }, [user, db, task]);

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        forgotPassword,
        addTodo,
        toggleTodo,
        deleteTodo,
        todos,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
