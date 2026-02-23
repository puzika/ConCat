import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../../../widgets/form"
import { Input } from "../../../shared/ui/input/Input"
import { Button } from "../../../shared/ui/button/Button"
import { Alternative } from "../../../shared/ui/alternative/Alternative"
import { signUpSchema, type TSignUpSchema } from "../model/definitions"

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const submitHandler = async (data: TSignUpSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return (
    <>
      <Form submitHandler={handleSubmit(submitHandler)} title="Sign up">
        <Input 
          {...register("username")} 
          placeholder="Username" 
          error={errors.username}
        />
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
        <Input
          {...register("confirmPassword")}
          placeholder="Confirm password" 
          type="password"
          error={errors.confirmPassword}
        />
        <Button buttonType='submit' name={"Sign up"} />
        { isSubmitting && <p>Submitting...</p>}
      </Form>
      <Alternative 
        message={"Already have an account?"}
        name={"Sign in"}
        link={"/auth/sign-in"}
      />
    </>
  )
}