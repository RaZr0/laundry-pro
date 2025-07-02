import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export default function Login() {
    return (
        <div>
            <ClerkSignIn routing="hash" />
        </div>
    );
}