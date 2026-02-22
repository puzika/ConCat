import { Form } from "../../../widgets/form"
import { Input } from "../../../shared/ui/input/Input"
import { Button } from "../../../shared/ui/button/Button"
import { Alternative } from "../../../shared/ui/alternative/Alternative"

export const SignInPage = () => {
  return (
    <>
      <Form title="Sign in">
        <Input name="email" placeholder="Email" inputType="text" />
        <Input name="password" placeholder="Password" inputType="password" />
        <Button buttonType='submit' name={"Sign in"} />
      </Form>
      <Alternative 
        message={"Don't have an account yet?"}
        name={"Sign up"}
        link={"/auth/sign-up"}
      />
    </>
  )
}