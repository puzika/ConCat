import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../../widgets/form"
import { Input } from "../../../shared/ui/input/Input"
import { Button } from "../../../shared/ui/button/Button"
import { Alternative } from "../../../shared/ui/alternative/Alternative"
import { signInSchema, type TSignInSchema } from "../model/definitions"

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const submitHandler = async (data: TSignInSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return (
    <>
      <Form title="Sign in" submitHandler={handleSubmit(submitHandler)}>
        <Input 
          {...register("email")}
          placeholder="Email"
          error={errors.email}
        />
        <Input 
          {...register("password")} 
          placeholder="Password" 
          type="password" 
          error={errors.password}
        />
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