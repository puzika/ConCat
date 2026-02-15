import { Form } from "../../../widgets/form"
import { Alternative } from "../../../shared/ui/alternative/Alternative"

export const SignInPage = () => {
  return (
    <>
      <Form
        title="Sign in"
        fields={[
          { name: 'email', placeholder: 'Email', inputType: 'text', },
          { name: 'password', placeholder: 'Password', inputType: 'password', }
        ]}
      />
      <Alternative 
        message={"Don't have an account yet?"}
        name={"Sign up"}
        link={"/auth/sign-up"}
      />
    </>
  )
}