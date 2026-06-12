import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Form } from "../../../widgets/form"
import { Input } from "../../../shared/ui/input/Input"
import { Button } from "../../../shared/ui/button/Button"
import { Alternative } from "../../../shared/ui/alternative/Alternative"
import { Spinner } from "../../../shared/ui/spinner/Spinner"
import { signUpSchema, type TSignUpSchema } from "../model/definitions"
import { useSignup } from "../api/signup.query"

export const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { mutate, isPending, isSuccess, isError } = useSignup();

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSuccess]);
  
  const submitHandler = async (signupBody: TSignUpSchema) => {
    mutate(signupBody);
    reset();
  }

  return (
    <>
      <Form submitHandler={handleSubmit(submitHandler)} title="Sign up">
        <Input 
          {...register("username")} 
          placeholder="Username" 
          error={errors.username}
          testid="username"
        />
        <Input 
          {...register("email")}
          placeholder="Email" 
          error={errors.email}
          testid="email"
        />
        <Input
          {...register("password")}
          placeholder="Password" 
          type="password" 
          error={errors.password}
          testid="password"
        />
        <Input
          {...register("confirmPassword")}
          placeholder="Confirm password" 
          type="password"
          error={errors.confirmPassword}
          testid="confirmPassword"
        />
        <Button 
          disabled={isSubmitting} 
          buttonType='submit'
          testid="submit-btn"
        >
          {
            isSubmitting ? (
              <>
                <Spinner />
                <span>Loading</span>
              </>
            ) : (
              <span>Sign up</span>
            )
          }
        </Button>
      </Form>
      <Alternative 
        message={"Already have an account?"}
        name={"Sign in"}
        link={"/auth/signin"}
      />
    </>
  )
}