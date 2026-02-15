import { Form } from "../../../widgets/form"
import { Alternative } from "../../../shared/ui/alternative/Alternative"

export const SignUpPage = () => {
  return (
    <>
      <Form
        title="Sign up"
        fields={[
          { name: 'username', placeholder: 'Username', inputType: 'text', },
          { name: 'email', placeholder: 'Email', inputType: 'text', },
          { name: 'password', placeholder: 'Password', inputType: 'password', }
        ]}
      />
      <Alternative 
        message={"Already have an account?"}
        name={"Sign in"}
        link={"/auth/sign-in"}
      />
    </>
  )
}