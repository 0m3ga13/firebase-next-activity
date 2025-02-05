import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/util/firebase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      setSignedIn(true);
      setUser(newUser);

      // You can set the user's name here
      // Example: updateProfile(newUser, { displayName: name });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={() => setUser(null)}>Sign Out</button>
        </div>
      ) : (
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Create a new account
          </h2>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
              <form className='space-y-6' onSubmit={signUp}>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Name
                  </label>
                  <div className='mt-2'>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id='name'
                      name='name'
                      type='text'
                      autoComplete='name'
                      required
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Email address
                  </label>
                  <div className='mt-2'>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                  <div className='mt-2'>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={signedIn}
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className='flex items-center justify-between mt-4'>
                <div className='text-sm'>
                  <Link
                    href='/Login'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
