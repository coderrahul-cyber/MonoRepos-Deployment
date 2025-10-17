"use client"
export const AuthPage = ({isSignIn} : {
    isSignIn: boolean
}) => {
  return (
    <div className="flex flex-col text-black items-center justify-center min-h-screen ">
        <div className="p-2 m-2 bg-white rounded">
            <input type="text" placeholder="Email"></input>
            <input type="password" placeholder="Password" />

            <button className="bg-blue-500 text-white p-2 rounded mt-2">
                {isSignIn ? "Sign In" : "Sign Up"}
            </button>

        </div>

    </div>
  )
}