import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../../widgets/form"
import { Input } from "../../../shared/ui/input/Input"
import { Button } from "../../../shared/ui/button/Button"
import { Alternative } from "../../../shared/ui/alternative/Alternative"
import { Spinner } from "../../../shared/ui/spinner/Spinner"
import { useAppDispatch } from "../../../shared/lib/store"
import { updateUserInfo } from "../../../entities/user"
import { useNavigate } from "react-router-dom"
import { signInSchema, type TSignInSchema } from "../model/definitions"

export const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const submitHandler = async (data: TSignInSchema) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    //MOCKING SIGN IN

    const { email } = data;

    const id = email === 'pj@gmail.com' ? 1 : 2;
    const username = email === 'pj@gmail.com' ? "Patrick Jane" : "Teresa Lisbon";

    reset();
    dispatch(updateUserInfo({ id, username}));
    navigate("/");
  }

  return (
    <>
      <Form title="Sign in" submitHandler={handleSubmit(submitHandler)}>
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
        <Button 
          testid="submit-btn" 
          disabled={isSubmitting} 
          buttonType='submit'
        >
          {
            isSubmitting ? (
              <>
                <Spinner />
                <span>Loading</span>
              </>
            ) : (
              <span>Sign in</span>
            )
          }
        </Button>
      </Form>
      <Alternative 
        message={"Don't have an account yet?"}
        name={"Sign up"}
        link={"/auth/sign-up"}
      />
    </>
  )
}