import { Form } from "../../../widgets/form"
import { Input } from "../../../shared/ui/input/Input"
import { Button } from "../../../shared/ui/button/Button"
import { Alternative } from "../../../shared/ui/alternative/Alternative"

export const SignUpPage = () => {
  return (
    <>
      <Form title="Sign up">
        <Input name="username" placeholder="Username" inputType="text" />
        <Input name="email" placeholder="Email" inputType="text" />
        <Input name="password" placeholder="Password" inputType="password" />
        <Button buttonType='submit' name={"Sign up"} />
      </Form>
      <Alternative 
        message={"Already have an account?"}
        name={"Sign in"}
        link={"/auth/sign-in"}
      />
    </>
  )
}