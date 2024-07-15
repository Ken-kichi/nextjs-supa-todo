import { Alert,Box,Typography } from "@mui/material";
import AuthForm from "./components/AuthForm";

const Home = ()=>{
  return (
    <Box display='flex' justifyContent='center'>
      <Box sx={{my:2}}>
        <Typography variant="h2">TODOリストへようこそ</Typography>
        <Alert sx={{my:2}}>
          メールアドレスを登録してTODOリストを使ってみましょう！
        </Alert>
        <Box display='flex' justifyContent='center'>
          <AuthForm />
        </Box>
      </Box>
    </Box>
  )
}

export default Home
